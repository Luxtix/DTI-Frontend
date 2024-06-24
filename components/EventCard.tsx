"use client";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { GiTicket } from "react-icons/gi";
import Image, { StaticImageData } from "next/image";
import { useState } from "react";

interface EventCardProps {
  event: {
    id: number;
    title: string;
    image: StaticImageData;
    date: string;
    time: string;
    description: string;
    price: string;
    interested: number;
    category: string;
  };
}

function EventCard({ event }: EventCardProps) {
  const [isStarred, setIsStarred] = useState<boolean>(false);

  const handleStarClick = () => {
    setIsStarred(!isStarred);
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm relative">
      <div className="relative">
        <Image
          src={event.image}
          alt={event.title}
          className="w-full h-40 object-cover relative"
          width={600}
          height={400}
        />
        <div className="absolute top-2 right-2">
          <button className="btn-anim" onClick={handleStarClick}>
            {isStarred ? (
              <AiFillStar
                size={30}
                className="fill-luxtix-2 p-1 bg-white rounded-full"
              />
            ) : (
              <AiOutlineStar
                size={30}
                className="fill-luxtix-1 p-1 bg-white rounded-full"
              />
            )}
          </button>
        </div>
        <div className="absolute bottom-0 left-0 bg-luxtix-6 text-luxtix-1 px-2 py-1 rounded-tr-md">
          <span className="text-xs font-medium">{event.category}</span>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-2 sm:mb-4">
          <span className="text-xs sm:text-sm font-bold text-luxtix-5">
            {event.date}
          </span>
        </div>
        <div className="flex flex-col">
          <h3 className="text-md sm:text-lg font-semibold text-luxtix-1 mb-2">
            {event.title}
          </h3>
          <p className="text-xs sm:text-sm text-luxtix-7 mb-1 sm:mb-2">
            {event.description}
          </p>
          <p className="text-xs sm:text-sm text-luxtix-1 mb-1 sm:mb-2">
            {event.time}
          </p>
          <p className="text-xs sm:text-sm space-x-2 text-orange-500 flex items-center">
            <GiTicket className="mr-1" /> {event.price}
            <span className="text-luxtix-2">
              ★ {event.interested} interested
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventCard;