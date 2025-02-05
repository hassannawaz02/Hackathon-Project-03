import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface Review {
  text: string;
}

const WriteReview: React.FC = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [submittedReviews, setSubmittedReviews] = useState<Review[]>([]);

  const handleWriteReviewClick = () => {
    setShowReviewForm(true);
  };

  const handleCancelReview = () => {
    setShowReviewForm(false);
    setReviewText("");
  };

  const handleSubmitReview = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedReviewText = reviewText.trim();

    if (trimmedReviewText !== "") {
      const newReview: Review = { text: trimmedReviewText };
      setSubmittedReviews([...submittedReviews, newReview]);
      console.log("Review submitted:", trimmedReviewText);
      setShowReviewForm(false);
      setReviewText("");
    } else {
      alert("Please enter a review.");
    }
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReviewText(event.target.value);
  };

  return (
    <div>
      <Button
        className="rounded-[16px] bg-black text-white"
        onClick={handleWriteReviewClick}
      >
        Write a Review
      </Button>

      {showReviewForm && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <h2 className="text-2xl font-bold mb-4">Write a Review</h2>
          <form onSubmit={handleSubmitReview}>
            <textarea
              className="w-full h-32 border border-gray-300 rounded-md p-2 mb-4 resize-none"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={handleTextAreaChange}
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="px-4 py-2 mr-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300"
                onClick={handleCancelReview}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default WriteReview;
