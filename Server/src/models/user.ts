import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { IUser, IUserMethods, UserModel } from "../types/user";

const companyAddressSchema = new mongoose.Schema({
  place: { type: String },
  pincode: { type: Number }, // pincode as Number
});

const companyDetailsSchema = new mongoose.Schema({
  companyName: { type: String },
  companyAddress: companyAddressSchema, // Using the updated company address schema
  companyEmail: { type: String },
  isCompanyEmailVerified: { type: Boolean, default: false }, // New field for company email verification
  isCompanyVerified: { type: Boolean, default: false }, // For verifying company and giving badge
  companyPhone: { type: String },
  since: { type: Number, default: 2025 }, // Experience in years
  bio: { type: String },
});

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>(
  {
    customId: { type: String }, // Custom unique ID field
    fname: {
      type: String,
      required: [true, "First Name is required"],
      trim: true,
      minlength: [2, "First Name must be at least 2 characters"],
      maxlength: [50, "First Name cannot exceed 50 characters"],
    },
    lname: {
      type: String,
      required: [true, "Last Name is required"],
      trim: true,
      minlength: [2, "Last Name must be at least 2 characters"],
      maxlength: [50, "Last Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: function(this: IUser): boolean { return !this.googleId; },
      minlength: [6, "Password must be at least 6 characters"],
      match: [
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      ],
    },
    googleId: {
      type: String,
      sparse: true,
    },
    gender: {
      type: String,
      required: function(this: IUser): boolean { return !this.googleId; },
      enum: {
        values: ["male", "female", "other"],
        message: "Gender must be male, female, or other",
      },
    },
    age: {
      type: Number,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ["admin", "owner", "renter"],
        message: "Role must be admin, owner, or renter",
      },
      default: "renter",
    },
    phone: {
      type: String,
      required: function(this: IUser): boolean { return !this.googleId; },
      trim: true,
      match: [
        /^[+]?[1-9][\d\s\-()]{7,15}$/,
        "Please enter a valid phone number",
      ],
    },
    address: {
      street: { type: String, trim: true },
      city: { type: String, trim: true },
      emirate: { type: String, trim: true },
      zipCode: { type: String, trim: true },
    },
    profileImage: {
      type: String,
      default: null,
    },
    companyDetails: companyDetailsSchema,
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ customId: 1 }, { unique: true });
UserSchema.index({ googleId: 1 }, { sparse: true });
UserSchema.index({ role: 1 });
UserSchema.index({ createdAt: -1 });

UserSchema.pre("validate", function (next) {
  if (this.role !== "renter" && !this.companyDetails) {
    this.invalidate(
      "companyDetails",
      "Company details are required for non-renter roles"
    );
  }

  if (this.role !== "renter" && !this.companyDetails?.companyName) {
    this.invalidate("companyDetails.companyName", "Company name is required");
  }

  next();
});

// Pre-save hook for customId generation and password hashing
UserSchema.pre("save", async function (next) {
  // Generate unique customId if not provided
  if (!this.customId) {
    const generateCustomId = () => {
      const prefix = this.role.toUpperCase().substring(0, 2);
      const timestamp = Date.now().toString().slice(-6);
      const random = Math.random().toString(36).substring(2, 6).toUpperCase();
      return `${prefix}${timestamp}${random}`;
    };
    
    let customId = generateCustomId();
    let exists = await User.findOne({ customId });
    
    while (exists) {
      customId = generateCustomId();
      exists = await User.findOne({ customId });
    }
    
    this.customId = customId;
  }

  // Hash password if modified and exists
  if (!this.isModified("password") || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

// Remove password from JSON output
UserSchema.methods.toJSON = function (): Record<string, unknown> {
  const obj = this.toObject() as Record<string, unknown>;
  delete obj.password;
  return obj;
};

const User = mongoose.model<IUser, UserModel>("User", UserSchema);
export default User;
