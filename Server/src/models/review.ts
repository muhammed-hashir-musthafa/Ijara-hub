import mongoose from "mongoose";
import { IReview, IReviewMethods, ReviewModel } from "../types/review";

const ReviewSchema = new mongoose.Schema<IReview, ReviewModel, IReviewMethods>(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      required: [true, "Comment is required"],
      trim: true,
      minlength: [10, "Comment must be at least 10 characters"],
      maxlength: [500, "Comment cannot exceed 500 characters"],
    },
    propertyType: {
      type: String,
      required: [true, "Property type is required"],
      enum: {
        values: ["room", "car"],
        message: "Property type must be room or car",
      },
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Property ID is required"],
      refPath: "propertyType",
    },
    reviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reviewer is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
ReviewSchema.index({ propertyId: 1, propertyType: 1 });
ReviewSchema.index({ reviewer: 1 });
ReviewSchema.index({ rating: 1 });
ReviewSchema.index({ createdAt: -1 });

// Compound index to prevent duplicate reviews
ReviewSchema.index({ propertyId: 1, reviewer: 1 }, { unique: true });

const Review = mongoose.model<IReview, ReviewModel>("Review", ReviewSchema);
export default Review;