import { ReviewType } from "@/types/review";

interface ReviewProps {
  review: ReviewType;
}

function ReviewCard({ review }: ReviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 p-4 border-b sm:text-center bg-white">
      <div className="col-span-1 text-sm sm:text-base break-words">
        {review.number}
      </div>
      <div className="col-span-1 text-sm sm:text-base break-words">
        {review.name}
      </div>
      <div className="col-span-1 text-sm sm:text-base break-words">
        {review.title}
      </div>
      <div className="col-span-1 text-sm sm:text-base break-words">
        {review.reviewText}
      </div>
      <div className="col-span-1 text-sm sm:text-base break-words">
        {`${review.stars}/5`}
      </div>
    </div>
  );
}

export default ReviewCard;
