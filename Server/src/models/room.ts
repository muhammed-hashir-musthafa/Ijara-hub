import mongoose from "mongoose";
import { IRoom, IRoomMethods, RoomModel } from "../types/room";

const addressSchema = new mongoose.Schema({
  place: { type: String },
  pincode: { type: Number }, // pincode as Number
});

const RoomSchema = new mongoose.Schema<IRoom, RoomModel, IRoomMethods>(
  {
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      unique: true,
      trim: true,
      uppercase: true,
      match: [
        /^[A-Z0-9]{2,10}$/,
        "Room number must be 2-10 alphanumeric characters",
      ],
    },
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    type: {
      type: String,
      required: [true, "Room type is required"],
      enum: {
        values: ["single", "double", "suite", "deluxe", "presidential"],
        message:
          "Room type must be single, double, suite, deluxe, or presidential",
      },
    },
    rooms: {
      bedroom: {
        type: Number,
        required: [true, "Bedroom Count is required"],
      },
      bathroom: {
        type: Number,
        required: [true, "bathroom Count is required"],
      },
    },
    areaSqft: {
      type: Number,
      min: 0,
    },
    pricePerNight: {
      type: Number,
      required: [true, "Price per night is required"],
      min: [0, "Price cannot be negative"],
      max: [50000, "Price cannot exceed 50,000"],
    },
    amenities: [
      {
        type: String,
        trim: true,
        enum: {
          values: [
            "wifi",
            "tv",
            "ac",
            "minibar",
            "balcony",
            "sea_view",
            "city_view",
            "jacuzzi",
            "kitchen",
            "parking",
            "gym_access",
            "pool_access",
            "room_service",
            "laundry",
            "safe",
          ],
          message: "Invalid amenity type",
        },
      },
    ],
    address: addressSchema,
    capacity: {
      type: Number,
      required: [true, "Room capacity is required"],
      min: [1, "Capacity must be at least 1"],
      max: [10, "Capacity cannot exceed 10"],
    },
    floor: {
      type: Number,
      required: [true, "Floor number is required"],
      min: [1, "Floor must be at least 1"],
      max: [100, "Floor cannot exceed 100"],
    },
    images: [
      {
        type: String,
        trim: true,
      },
    ],
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
RoomSchema.index({ roomNumber: 1 }, { unique: true });
RoomSchema.index({ status: 1 });
RoomSchema.index({ type: 1 });
RoomSchema.index({ pricePerNight: 1 });
RoomSchema.index({ floor: 1 });
RoomSchema.index({ amenities: 1 });

const Room = mongoose.model<IRoom, RoomModel>("Room", RoomSchema);
export default Room;
