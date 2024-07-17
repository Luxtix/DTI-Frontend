"use client";

import EventCard from "@/components/EventCard";
import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useSearchParams, useRouter } from "next/navigation";
import { useEvents } from "@/hooks/useEvents";
import CircularLoader from "@/components/ui/circular-loader";

interface Filters {
  price: string;
  type: string;
  category: string;
}

const initialFilters: Filters = {
  price: "",
  type: "",
  category: "",
};

const filterOptions = {
  price: ["Free", "Paid"],
  type: ["Offline", "Online"],
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
  const [queryParams, setQueryParams] = useState("");
  const { events, loading, error } = useEvents(queryParams);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>(initialFilters);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const category = searchParams.get("category");
    const price =
      searchParams.get("isPaid") === "true"
        ? "Paid"
        : searchParams.get("isPaid") === "false"
        ? "Free"
        : "";
    const type =
      searchParams.get("isOnline") === "true"
        ? "Online"
        : searchParams.get("isOnline") === "false"
        ? "Offline"
        : "";

    setActiveFilters({
      price: price,
      type: type,
      category: category || "",
    });
  }, [searchParams]);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const updateURLParams = (filters: Filters) => {
    const params = new URLSearchParams();

    if (filters.price === "Paid") params.append("isPaid", "true");
    if (filters.price === "Free") params.append("isPaid", "false");
    if (filters.type === "Online") params.append("isOnline", "true");
    if (filters.type === "Offline") params.append("isOnline", "false");
    if (filters.category) params.append("category", filters.category);

    const newQueryParams = params.toString();
    setQueryParams(newQueryParams);
    router.push(`?${newQueryParams}`, { scroll: false });
  };

  const handleFilterChange = (filterType: keyof Filters, value: string) => {
    const updatedFilters = { ...activeFilters };
    updatedFilters[filterType] =
      updatedFilters[filterType] === value ? "" : value;
    setActiveFilters(updatedFilters);
    updateURLParams(updatedFilters);
  };

  const resetFilters = () => {
    setActiveFilters(initialFilters);
    setQueryParams("");
    router.push("");
  };

  if (loading) {
    return (
      <div className="flex flex-center">
        <CircularLoader />
      </div>
    );
  }

  if (error) {
    return <div>Error loading events</div>;
  }

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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default EventsTab;
