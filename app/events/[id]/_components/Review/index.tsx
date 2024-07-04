import { AiOutlineArrowRight } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import reviews from "@/utils/reviewItems";
import ReviewCard from "./ReviewCard";

function Review() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 pb-8">
      <h2 className="text-lg font-semibold text-luxtix-5 mb-4">Reviews</h2>
      <div className="space-y-4">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex flex-row mt-4 space-x-8">
          <button>
            <AiOutlineArrowLeft size={20} className="btn-anim text-luxtix-1" />
          </button>
          <button>
            <AiOutlineArrowRight size={20} className="btn-anim text-luxtix-1" />
          </button>
        </div>
        <button className="btn-anim mt-4 bg-luxtix-4 text-luxtix-1 py-2 px-4 rounded-lg hover:bg-luxtix-2">
          Add Review
        </button>
      </div>
    </div>
  );
}

export default Review;
