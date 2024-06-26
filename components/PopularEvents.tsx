"use client";
import eventCardItems from "@/utils/eventCardItems";
import EventCard from "./EventCard";
import Link from "next/link";
import { useState } from "react";

interface Filter {
  label: string;
}

function PopularEvents() {
  const filters: Filter[] = [
    { label: "All" },
    { label: "Free" },
    { label: "Paid" },
  ];

  const [activeFilter, setActiveFilter] = useState<string>("All");
  const handleFilterClick = (filterLabel: string) => {
    setActiveFilter(filterLabel);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:py-8">
      <h2 className="text-3xl font-bold text-luxtix-5 mb-8 mt-8 sm:mt-0">
        Popular Events
      </h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {filters.map((filter, index) => (
          <button
            key={index}
            onClick={() => handleFilterClick(filter.label)}
            className={`px-4 py-2 text-xs sm:text-base rounded-full border ${
              activeFilter === filter.label
                ? "bg-luxtix-4 text-luxtix-1"
                : "border-luxtix-7 text-luxtix-7"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {eventCardItems.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          href="/events"
          className="btn-anim px-8 sm:px-40 py-4 text-lg border border-luxtix-7 text-luxtix-1 rounded-full"
        >
          See More
        </Link>
      </div>
    </div>
  );
}

export default PopularEvents;
