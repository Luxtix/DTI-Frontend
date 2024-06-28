"use client";
import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai";

function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  return (
    <div className="bg-luxtix-4 mt-8">
      <div className="p-4 sm:p-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
        <div className="mb-4 sm:mb-0 sm:mr-4 flex-1">
          <h2 className="text-md sm:text-xl font-semibold">
            Subscribe to our Newsletter
          </h2>
          <p className="text-luxtix-1 text-xs sm:text-lg">
            Receive our weekly newsletter & updates with new events from your
            favourite organizers & venues.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto">
          <input
            type="email"
            placeholder="Enter your e-mail address"
            className="p-2 focus:outline-none rounded-md focus:ring-2 focus:ring-luxtix-5 w-full sm:w-64 mb-2 sm:mb-0"
          />
          <button
            onClick={handleSubscribe}
            className="btn-anim bg-luxtix-6 text-luxtix-1 p-2 rounded-md sm:rounded-r-md sm:rounded-l-none flex items-center justify-center w-full sm:w-32"
            disabled={subscribed}
          >
            {subscribed ? (
              <span className="flex items-center">
                <AiOutlineCheck className="mr-1" />
                Thank you
              </span>
            ) : (
              "Subscribe"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newsletter;
