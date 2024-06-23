"use client";

import eventCardItems from "@/utils/eventCardItems";
import EventCard from "./EventCard";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

interface Filters {
  price: string[];
  date: string[];
  category: string[];
}

const filters: Filters = {
  price: ["Free", "Paid"],
  date: ["Today", "Tomorrow", "This Week", "This Weekend", "Next Week"],
  category: [
    "Entertainment",
    "Educational & Business",
    "Cultural & Arts",
    "Sports & Fitness",
    "Technology & Innovation",
    "Travel & Adventure",
  ],
};

function EventsTab() {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="flex flex-col md:flex-row max-w-7xl mx-auto px-4 py-4 sm:py-8">
      <div className="sm:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="btn-anim flex items-center p-2 border rounded bg-luxtix-7"
        >
          {showFilters ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
          <span className="ml-2">
            {showFilters ? "Close Filters" : "Show Filters"}
          </span>
        </button>
      </div>

      <div
        className={`${
          showFilters ? "block" : "hidden"
        } sm:block w-full sm:w-1/4 p-4 border-r`}
      >
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        {Object.keys(filters).map((filterType) => (
          <div className="mb-6" key={filterType}>
            <h3 className="text-lg font-medium mb-2">
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </h3>
            <div>
              {filters[filterType as keyof Filters].map((filter) => (
                <label className="flex items-center mb-2" key={filter}>
                  <input type="checkbox" className="mr-2" />
                  {filter}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="w-full sm:w-3/4 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Events</h2>
          <div className="flex items-center">
            <span className="mr-2">Sort by:</span>
            <select className="border p-2 rounded">
              <option>Relevance</option>
              <option>Date</option>
              <option>Price</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {eventCardItems.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsTab;
