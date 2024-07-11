import { GoLocation } from "react-icons/go";
import { AiOutlineSearch } from "react-icons/ai";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";

interface City {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Event {
  id: string;
  name: string;
}

function SearchBar() {
  const [eventSearchTerm, setEventSearchTerm] = useState<string>("");
  const [citySearchTerm, setCitySearchTerm] = useState<string>("");
  const [cities, setCities] = useState<City[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const debouncedEventSearchTerm = useDebounce(eventSearchTerm, 500);
  const debouncedCitySearchTerm = useDebounce(citySearchTerm, 1000);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/cities?q=${debouncedCitySearchTerm}`
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    if (debouncedCitySearchTerm) {
      fetchCities();
    } else {
      setCities([]);
    }
  }, [debouncedCitySearchTerm]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/events?q=${debouncedEventSearchTerm}`
        );
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    if (debouncedEventSearchTerm) {
      fetchEvents();
    } else {
      setEvents([]);
    }
  }, [debouncedEventSearchTerm]);

  return (
    <div className="flex justify-between items-center bg-white rounded-full shadow-lg overflow-hidden w-full max-w-3xl">
      <div className="flex items-center px-4">
        <AiOutlineSearch className="text-luxtix-1 size-6" />
      </div>
      <input
        type="text"
        value={eventSearchTerm}
        onChange={(e) => setEventSearchTerm(e.target.value)}
        className="flex-grow py-3 px-4 text-luxtix-1 placeholder-zinc-400 focus:outline-none"
        placeholder="Search Events, Categories, ..."
      />
      {events.length > 0 && (
        <ul className="absolute bg-white shadow-md rounded-md mt-2">
          {events.map((event) => (
            <li
              key={event.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {event.name}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-center text-luxtix-1">
        <GoLocation />
        <input
          type="text"
          value={citySearchTerm}
          onChange={(e) => setCitySearchTerm(e.target.value)}
          className="flex-1 py-3 px-4 text-luxtix-1 placeholder-zinc-400 border-none focus:outline-none"
          placeholder="City"
        />
        {cities.length > 0 && (
          <ul className="absolute bg-white shadow-md rounded-md mt-2">
            {cities.map((city) => (
              <li
                key={city.id}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                {city.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
