"use client";

import { Textarea } from "@/components/ui/textarea";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import React, { useState } from "react";

function AddReview() {
  const [rating, setRating] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  const handleRating = (value: number) => {
    setRating(value === rating ? 0 : value);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="p-4 bg-background text-foreground">
      <div className="flex items-center mb-8">
        <h1 className="text-lg font-semibold">Add Review</h1>
      </div>
      <div className="flex justify-center mb-4">
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <div
              key={value}
              onClick={() => handleRating(value)}
              className={`cursor-pointer ${rating >= value ? "text-luxtix-2" : "text-luxtix-7"
                }`}
            >
              {rating >= value ? (
                <AiFillStar size={30} />
              ) : (
                <AiOutlineStar size={30} />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-2 mb-4">
        {["Overall Experience", "Quality of Events", "Improvement"].map(
          (option) => (
            <button
              key={option}
              onClick={() => handleOptionClick(option)}
              className={`p-2 border rounded-full text-xs ${selectedOption === option
                ? "bg-luxtix-4 text-luxtix-1"
                : "bg-white text-luxtix-1"
                }`}
            >
              {option}
            </button>
          )
        )}
      </div>
      <Textarea />
      <button className="btn-anim bg-luxtix-6 hover:bg-luxtix-2 w-full p-2 my-2 rounded-lg">
        Submit Review
      </button>
    </div>
  );
}

export default AddReview;
