import { ReviewType } from "@/types/review";
import Image from "next/image";

interface ReviewProps {
  review: ReviewType;
}

function ReviewCard({ review }: ReviewProps) {
  return (
    <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 bg-white p-4 rounded-lg">
      <Image
        src={review.profile}
        alt="Reviewer image"
        className="w-12 h-12 rounded-full"
        width={48}
        height={48}
      />
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:space-x-2 items-center">
          <span className="font-bold">{review.name}</span>
          <span className="text-xs font-extralight text-luxtix-8">
            wrote a review for
          </span>
          <span className="font-light text-luxtix-5">{review.title}</span>
        </div>
        <p className="text-sm">{review.reviewText}</p>
      </div>
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }, (_, index) => (
          <span
            key={index}
            className={
              index < review.stars ? "text-yellow-500" : "text-luxtix-7"
            }
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
}

export default ReviewCard;
