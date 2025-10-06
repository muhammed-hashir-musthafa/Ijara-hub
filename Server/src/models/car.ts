import mongoose from "mongoose";

const CarSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: [true, "Car make is required"],
      trim: true,
      minlength: [2, "Make must be at least 2 characters"],
      maxlength: [30, "Make cannot exceed 30 characters"]
    },
    model: {
      type: String,
      required: [true, "Car model is required"],
      trim: true,
      minlength: [1, "Model must be at least 1 character"],
      maxlength: [50, "Model cannot exceed 50 characters"]
    },
    year: {
      type: Number,
      required: [true, "Manufacturing year is required"],
      min: [1990, "Year cannot be before 1990"],
      max: [new Date().getFullYear() + 1, "Year cannot be in the future"]
    },
    licensePlate: {
      type: String,
      required: [true, "License plate is required"],
      unique: true,
      trim: true,
      uppercase: true,
      match: [/^[A-Z0-9\s\-]{3,15}$/, "Invalid license plate format"]
    },
    dailyRate: {
      type: Number,
      required: [true, "Daily rate is required"],
      min: [0, "Daily rate cannot be negative"],
      max: [10000, "Daily rate cannot exceed 10,000"]
    },
    availabilityStatus: {
      type: String,
      required: true,
      enum: {
        values: ["available", "rented", "maintenance", "out_of_service"],
        message: "Status must be available, rented, maintenance, or out_of_service"
      },
      default: "available"
    },
    category: {
      type: String,
      required: [true, "Car category is required"],
      enum: {
        values: ["economy", "compact", "midsize", "luxury", "suv", "sports", "convertible"],
        message: "Invalid car category"
      }
    },
    transmission: {
      type: String,
      required: [true, "Transmission type is required"],
      enum: {
        values: ["manual", "automatic", "cvt"],
        message: "Transmission must be manual, automatic, or cvt"
      }
    },
    fuelType: {
      type: String,
      required: [true, "Fuel type is required"],
      enum: {
        values: ["petrol", "diesel", "hybrid", "electric"],
        message: "Invalid fuel type"
      }
    },
    seatingCapacity: {
      type: Number,
      required: [true, "Seating capacity is required"],
      min: [2, "Seating capacity must be at least 2"],
      max: [8, "Seating capacity cannot exceed 8"]
    },
    features: [{
      type: String,
      trim: true,
      enum: {
        values: [
          "gps", "bluetooth", "backup_camera", "sunroof", "leather_seats",
          "heated_seats", "cruise_control", "keyless_entry", "usb_charging",
          "wifi_hotspot", "premium_audio", "parking_sensors"
        ],
        message: "Invalid feature type"
      }
    }],
    images: [{
      type: String,
      trim: true
    }],
    mileage: {
      type: Number,
      min: [0, "Mileage cannot be negative"],
      default: 0
    },
    color: {
      type: String,
      required: [true, "Car color is required"],
      trim: true,
      minlength: [3, "Color must be at least 3 characters"],
      maxlength: [20, "Color cannot exceed 20 characters"]
    },
    location: {
      branch: {
        type: String,
        required: [true, "Branch location is required"],
        trim: true
      },
      address: {
        type: String,
        trim: true
      },
      coordinates: {
        latitude: { type: Number },
        longitude: { type: Number }
      }
    },
    currentRental: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CarRental",
      default: null
    },
    maintenanceHistory: [{
      date: { type: Date, required: true },
      type: { type: String, required: true },
      description: { type: String },
      cost: { type: Number, min: 0 }
    }]
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes
CarSchema.index({ licensePlate: 1 }, { unique: true });
CarSchema.index({ availabilityStatus: 1 });
CarSchema.index({ make: 1, model: 1 });
CarSchema.index({ category: 1 });
CarSchema.index({ dailyRate: 1 });
CarSchema.index({ "location.branch": 1 });
CarSchema.index({ year: -1 });

// Virtual for full car name
CarSchema.virtual("fullName").get(function () {
  return `${this.year} ${this.make} ${this.model}`;
});

// Virtual for availability check
CarSchema.virtual("isAvailable").get(function () {
  return this.availabilityStatus === "available";
});

// Method to check availability for date range
CarSchema.methods.isAvailableForDates = async function (startDate: Date, endDate: Date) {
  const CarRental = mongoose.model("CarRental");
  const conflictingRental = await CarRental.findOne({
    car: this._id,
    status: { $in: ["confirmed", "active"] },
    $or: [
      { startDate: { $lt: endDate }, endDate: { $gt: startDate } }
    ]
  });
  return !conflictingRental;
};

// Method to calculate total rental cost
CarSchema.methods.calculateRentalCost = function (days: number, discountPercent: number = 0) {
  const baseAmount = this.dailyRate * days;
  const discount = (baseAmount * discountPercent) / 100;
  return baseAmount - discount;
};

const Car = mongoose.model("Car", CarSchema);
export default Car;