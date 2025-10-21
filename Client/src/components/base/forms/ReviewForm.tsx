"use client";

import React from "react";
import { Button } from "@/components/base/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/base/ui/card";
import { Textarea } from "@/components/base/ui/textarea";
import { Label } from "@/components/base/ui/label";
import { Star, Send } from "lucide-react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { AxiosError } from "axios";
import { createReview } from "@/services/reviewService";
import { CreateReviewPayload } from "@/types/review";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Please select a rating")
    .max(5, "Rating cannot exceed 5")
    .required("Rating is required"),
  comment: Yup.string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment cannot exceed 500 characters")
    .required("Comment is required"),
});

interface ReviewFormValues {
  rating: number;
  comment: string;
}

interface ReviewFormProps {
  propertyId: string;
  propertyType: 'room' | 'car';
  onReviewAdded?: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ propertyId, propertyType, onReviewAdded }) => {
  const handleSubmit = async (values: ReviewFormValues, { resetForm, setSubmitting }: FormikHelpers<ReviewFormValues>) => {
    try {
      const payload: CreateReviewPayload = {
        rating: values.rating,
        comment: values.comment.trim(),
        propertyType,
        propertyId,
      };

      await createReview(payload);
      toast.success("Review added successfully!");
      resetForm();
      
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message || "Failed to add review");
      } else {
        toast.error("Failed to add review");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <Star className="h-5 w-5 text-amber-500 mr-2" />
          Add Your Review
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Formik
          initialValues={{
            rating: 0,
            comment: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form className="space-y-6">
              {/* Rating */}
              <div>
                <Label htmlFor="rating">Rating *</Label>
                <div className="flex items-center space-x-1 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFieldValue("rating", star)}
                      className="focus:outline-none"
                    >
                      <Star
                        className={`h-8 w-8 transition-colors ${
                          star <= values.rating
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300 hover:text-amber-300"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {values.rating > 0 && `${values.rating} star${values.rating > 1 ? 's' : ''}`}
                  </span>
                </div>
                <ErrorMessage
                  name="rating"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Comment */}
              <div>
                <Label htmlFor="comment">Comment *</Label>
                <Field
                  as={Textarea}
                  id="comment"
                  name="comment"
                  placeholder="Share your experience..."
                  rows={4}
                  className="mt-2 resize-none"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {values.comment.length}/500 characters (minimum 10)
                </div>
                <ErrorMessage
                  name="comment"
                  component="p"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Submit Review
                  </>
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;