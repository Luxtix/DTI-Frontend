"use client";

import eventCardItems from "@/utils/eventCardItems";
import EventCard from "./EventCard";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

interface Filters {
  price: string;
  category: string;
}

const initialFilters: Filters = {
  price: "",
  category: "",
};

const filterOptions = {
  price: ["Free", "Paid"],
  category: [
    "Entertainment",
    "Educational & Business",
    "Arts & Culture",
    "Sports & Fitness",
    "Technology & Innovation",
    "Travel & Adventure",
  ],
};

function EventsTab() {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>(initialFilters);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    setActiveFilters({
      ...activeFilters,
      [filterType]: activeFilters[filterType] === value ? "" : value,
    });
  };

  const resetFilters = () => {
    setActiveFilters(initialFilters);
  };

  const filteredEvents = eventCardItems.filter((event) => {
    const matchesPrice =
      activeFilters.price === "" ||
      (activeFilters.price === "Free" && event.price === "Free Admission") ||
      (activeFilters.price === "Paid" && event.price !== "Free Admission");
    const matchesCategory =
      activeFilters.category === "" ||
      event.category === activeFilters.category;

    return matchesPrice && matchesCategory;
  });

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
        {Object.keys(filterOptions).map((filterType) => (
          <div className="mb-6" key={filterType}>
            <h3 className="text-lg font-medium mb-2">
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {filterOptions[filterType as keyof Filters].map((filter) => (
                <div
                  key={filter}
                  onClick={() =>
                    handleFilterChange(filterType as keyof Filters, filter)
                  }
                  className={`px-4 py-2 text-xs sm:text-base rounded-full border cursor-pointer ${
                    activeFilters[filterType as keyof Filters] === filter
                      ? "bg-luxtix-4 text-luxtix-1"
                      : "border-luxtix-7 text-luxtix-7"
                  }`}
                >
                  {filter}
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={resetFilters}
          className="btn-anim underline text-luxtix-1 px-4 py-2 rounded-md mt-4"
        >
          Reset Filters
        </button>
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
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsTab;
