import mongoose from "mongoose";
import { ICar, ICarMethods, CarModel } from "../types/car";

const addressSchema = new mongoose.Schema({
  place: { type: String },
  pincode: { type: Number }, // pincode as Number
});

const CarSchema = new mongoose.Schema<ICar, CarModel, ICarMethods>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    brand: {
      type: String,
      required: [true, "Car make is required"],
      trim: true,
      minlength: [2, "Make must be at least 2 characters"],
      maxlength: [30, "Make cannot exceed 30 characters"],
    },
    model: {
      type: String,
      required: [true, "Car model is required"],
      trim: true,
      minlength: [1, "Model must be at least 1 character"],
      maxlength: [50, "Model cannot exceed 50 characters"],
    },
    year: {
      type: Number,
      required: [true, "Manufacturing year is required"],
      min: [1990, "Year cannot be before 1990"],
      max: [new Date().getFullYear() + 1, "Year cannot be in the future"],
    },
    licensePlate: {
      type: String,
      required: [true, "License plate is required"],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[A-Z0-9\s\-]{3,15}$/, "Invalid license plate format"],
    },
    dailyRate: {
      type: Number,
      required: [true, "Daily rate is required"],
      min: [0, "Daily rate cannot be negative"],
      max: [10000, "Daily rate cannot exceed 10,000"],
    },
    category: {
      type: String,
      required: [true, "Car category is required"],
      enum: {
        values: ["economy", "compact", "midsize", "luxury", "suv", "sports"],
        message: "Invalid car category",
      },
    },
    transmission: {
      type: String,
      required: [true, "Transmission type is required"],
      enum: {
        values: ["manual", "automatic", "cvt"],
        message: "Transmission must be manual, automatic, or cvt",
      },
    },
    fuelType: {
      type: String,
      required: [true, "Fuel type is required"],
      enum: {
        values: ["petrol", "diesel", "hybrid", "electric"],
        message: "Invalid fuel type",
      },
    },
    seatingCapacity: {
      type: Number,
      required: [true, "Seating capacity is required"],
      min: [2, "Seating capacity must be at least 2"],
      max: [8, "Seating capacity cannot exceed 8"],
    },
    color: {
      type: String,
      required: [true, "Car color is required"],
      trim: true,
      minlength: [3, "Color must be at least 3 characters"],
      maxlength: [20, "Color cannot exceed 20 characters"],
    },
    address: addressSchema,
    amenities: [
      {
        type: String,
        trim: true,
        enum: {
          values: [
            "gps",
            "bluetooth",
            "backup_camera",
            "sunroof",
            "leather_seats",
            "heated_seats",
            "cruise_control",
            "keyless_entry",
            "usb_charging",
            "wifi_hotspot",
            "premium_audio",
            "parking_sensors",
          ],
          message: "Invalid amenity type",
        },
      },
    ],
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required"],
    },
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);



// Indexes
CarSchema.index({ licensePlate: 1 }, { unique: true });
CarSchema.index({ brand: 1, model: 1 });
CarSchema.index({ category: 1 });
CarSchema.index({ dailyRate: 1 });
CarSchema.index({ year: -1 });
CarSchema.index({ owner: 1 });

// Virtual for full car name
CarSchema.virtual("fullName").get(function () {
  return `${this.year} ${this.brand} ${this.model}`;
});

// Method to calculate total rental cost
CarSchema.methods.calculateRentalCost = function (
  days: number,
  discountPercent: number = 0
) {
  const baseAmount = this.dailyRate * days;
  const discount = (baseAmount * discountPercent) / 100;
  return baseAmount - discount;
};

const Car = mongoose.model<ICar, CarModel>("Car", CarSchema);
export default Car;
