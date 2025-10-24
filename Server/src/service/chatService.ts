import axios from "axios";
import Room from "../models/room";
import Car from "../models/car";
import User from "../models/user";
import Review from "../models/review";

export class ChatService {
  private groqApiKey = process.env.GROQ_API_KEY;
  private groqUrl = "https://api.groq.com/openai/v1/chat/completions";

  private async getContextData(query: string) {
    const lowerQuery = query.toLowerCase();
    let context = "";

    try {
      // Room queries
      if (
        lowerQuery.includes("room") ||
        lowerQuery.includes("apartment") ||
        lowerQuery.includes("hotel") ||
        lowerQuery.includes("villa")
      ) {
        const rooms = await Room.find()
          .limit(3)
          .select("title category type pricePerNight amenities address");
        if (rooms.length > 0) {
          context += `Available Rooms: ${JSON.stringify(
            rooms.map((r) => ({
              title: r.title,
              category: r.category,
              type: r.type,
              price: r.pricePerNight,
              amenities: r.amenities.slice(0, 3),
            }))
          )} `;
        }
      }

      // Car queries
      if (
        lowerQuery.includes("car") ||
        lowerQuery.includes("vehicle") ||
        lowerQuery.includes("rental")
      ) {
        const cars = await Car.find()
          .limit(3)
          .select("title brand model year dailyRate category amenities");
        if (cars.length > 0) {
          context += `Available Cars: ${JSON.stringify(
            cars.map((c) => ({
              title: c.title,
              brand: c.brand,
              model: c.model,
              year: c.year,
              dailyRate: c.dailyRate,
              category: c.category,
            }))
          )} `;
        }
      }

      // Price queries
      if (
        lowerQuery.includes("price") ||
        lowerQuery.includes("cost") ||
        lowerQuery.includes("cheap")
      ) {
        const cheapRooms = await Room.find()
          .sort({ pricePerNight: 1 })
          .limit(2)
          .select("title pricePerNight");
        const cheapCars = await Car.find()
          .sort({ dailyRate: 1 })
          .limit(2)
          .select("title dailyRate brand model");

        if (cheapRooms.length > 0)
          context += `Cheapest Rooms: ${JSON.stringify(cheapRooms)} `;
        if (cheapCars.length > 0)
          context += `Cheapest Cars: ${JSON.stringify(cheapCars)} `;
      }

      // Location queries
      if (
        lowerQuery.includes("dubai") ||
        lowerQuery.includes("uae") ||
        lowerQuery.includes("location")
      ) {
        const locations = await Room.find({
          "address.place": { $exists: true },
        })
          .limit(3)
          .select("title address");
        if (locations.length > 0) {
          context += `Locations: ${JSON.stringify(
            locations.map((l) => ({ title: l.title, place: l.address?.place }))
          )} `;
        }
      }
    } catch (error) {
      console.error("Database query error:", error);
    }

    return context;
  }

  async processMessage(message: string, userId?: string) {
    try {
      // Validate API key
      if (!this.groqApiKey) {
        console.error("Groq API key is missing.");
        return "Chat service is not configured. Please contact support.";
      }
      // Use supported model, configurable via env
      const model = process.env.GROQ_MODEL || "openai/gpt-oss-120b";
      if (!model) {
        console.error("Groq model is missing.");
        return "Chat model is not configured. Please contact support.";
      }
      // Get context data and limit its size
      let contextData = await this.getContextData(message);
      if (contextData.length > 1000) {
        contextData = contextData.slice(0, 1000) + "...";
      }

      const systemPrompt = `You are Ijara Hub assistant for UAE rental platform. You help users with:
      - Room rentals (hotels, apartments, villas, studios, penthouses)
      - Car rentals (economy, luxury, SUV, sports cars)
      - Platform information and booking process
      - UAE rental market insights

      Platform Info:
      - We serve UAE market
      - Users: Owners (list properties), Renters (book properties), Admins (manage platform)
      - Real-time chat and booking updates
      - Verified listings for rooms and cars

      ${contextData ? `Current Data: ${contextData}` : ""}

      Be helpful, friendly, and concise. If asked about specific properties, use the provided data.`;

      const payload = {
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 200,
        temperature: 0.7,
      };

      const headers = {
        Authorization: `Bearer ${this.groqApiKey}`,
        "Content-Type": "application/json",
      };

      let response;
      try {
        response = await axios.post(this.groqUrl, payload, { headers });
      } catch (apiError: any) {
        if (apiError.response) {
          // Specific error for decommissioned model
          if (apiError.response.data?.error?.code === "model_decommissioned") {
            console.error(
              `Groq model decommissioned: ${model}. Please update GROQ_MODEL to a supported model. See https://console.groq.com/docs/deprecations.`
            );
          }
          console.error("Groq API error:", {
            status: apiError.response.status,
            data: apiError.response.data,
            headers: apiError.response.headers,
          });
          return `Chat service error: ${
            apiError.response.data?.error?.message || "Bad Request"
          }`;
        } else {
          console.error("Groq API request error:", apiError.message);
          return "Chat service is currently unavailable. Please try again later.";
        }
      }

      if (
        !response?.data?.choices ||
        !response.data.choices[0]?.message?.content
      ) {
        console.error("Groq API returned unexpected response:", response?.data);
        return "Chat service did not return a valid response.";
      }
      return response.data.choices[0].message.content;
    } catch (error) {
      console.error("Chat service error:", error);
      return "I'm having trouble right now. Please try asking about our rooms, cars, or platform features!";
    }
  }
}
