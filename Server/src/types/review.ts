import { Document, Model, Types } from "mongoose";

export interface IReview extends Document {
  rating: number;
  comment: string;
  propertyType: "room" | "car";
  propertyId: Types.ObjectId;
  reviewer: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IReviewMethods {}

export type ReviewModel = Model<IReview, {}, IReviewMethods>;