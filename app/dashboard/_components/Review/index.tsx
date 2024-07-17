'use client'
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import reviews from "@/utils/reviewItems";
import ReviewCard from "./ReviewCard";
import useEventReview from "@/hooks/useEventReview";
import { usePurchasedEvents } from "@/contexts/PurchasedEventsContext";

function Review() {
  const { eventId } = usePurchasedEvents();
  const { eventReview } = useEventReview(eventId)
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 pb-8">
      <h2 className="text-lg font-semibold text-luxtix-5 mb-4">Reviews</h2>
      <div className="hidden sm:grid grid-cols-5 gap-4 p-4 bg-secondary text-secondary-foreground font-semibold sm:text-center">
        <div className="col-span-1">#</div>
        <div className="col-span-1">Name</div>
        <div className="col-span-1">Subject</div>
        <div className="col-span-1">Review</div>
        <div className="col-span-1">Rating</div>
      </div>
      <div>
        {eventReview?.data.map((review, index) => (
          <ReviewCard key={index} {...review} index={index} />
        ))}
      </div>

      <div className="flex justify-between items-center mt-4">
        <button>
          <AiOutlineArrowLeft size={25} className="btn-anim text-luxtix-1" />
        </button>
        <button>
          <AiOutlineArrowRight size={25} className="btn-anim text-luxtix-1" />
        </button>
      </div>
    </div>
  );
}

export default Review;
