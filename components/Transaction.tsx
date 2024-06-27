"use client";

import { usePurchasedEvents } from "../contexts/PurchasedEventsContext";
import { EventType } from "@/types/event";
import eventCardItems from "@/utils/eventCardItems";
import Image from "next/image";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GiTicket } from "react-icons/gi";

function Transaction() {
  const { id } = useParams();
  const router = useRouter();
  const { addPurchasedEvent } = usePurchasedEvents();
  const event = eventCardItems.find(
    (event: EventType) => event.id === Number(id)
  );

  const [ticketTier, setTicketTier] = useState<string>("Regular");
  const initialPrice =
    ticketTier === "VIP" ? event?.vipPrice || 0 : event?.price || 0;
  const [people, setPeople] = useState<number>(1);
  const [subtotal, setSubtotal] = useState<number>(initialPrice * people);
  const [voucherApplied, setVoucherApplied] = useState<boolean>(false);
  const [pointsUsed, setPointsUsed] = useState<boolean>(false);
  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherAlert, setVoucherAlert] = useState<string>("");

  const voucherDiscount = 20000;
  const pointsDiscount = 20000;

  if (!event) {
    return <p>Event not found</p>;
  }

  useEffect(() => {
    setSubtotal(initialPrice * people);
  }, [ticketTier, people]);

  useEffect(() => {
    if (voucherApplied) {
      alert("Voucher successfully applied!");
    }
  }, [voucherApplied]);

  const handlePeopleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPeople = Number(e.target.value);
    setPeople(selectedPeople);
    setSubtotal(initialPrice * selectedPeople);
  };

  const handleTicketTierChange = (tier: string) => {
    setTicketTier(tier);
  };

  const handleApplyVoucher = () => {
    if (voucherCode === "888") {
      setVoucherApplied(true);
      setVoucherAlert("");
    } else {
      setVoucherAlert("Invalid voucher code");
    }
  };

  const handleRemoveVoucher = () => {
    setVoucherApplied(false);
    setVoucherCode("");
    setVoucherAlert("");
  };

  const handleUsePoints = () => {
    setPointsUsed(!pointsUsed);
  };

  const handleCheckout = () => {
    if (event) {
      addPurchasedEvent(event);
      router.push("/thank-you");
    }
  };

  const totalDiscount =
    (voucherApplied ? voucherDiscount : 0) + (pointsUsed ? pointsDiscount : 0);
  const total = subtotal - totalDiscount;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="block py-6">
          <Link href="/" className="text-luxtix-1">
            <AiOutlineArrowLeft size={25} />
          </Link>
        </div>
        <div
          key={event.id}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
        >
          <div>
            <Image
              className="w-full rounded-lg"
              src={event.image}
              alt="Event Image"
            />
            <div className="mt-4">
              <div className="flex items-center mb-2">
                <div className="bg-white rounded-full">
                  <img
                    className="w-8 h-8 rounded-full"
                    src={event.host.logo}
                    alt={`${event.host.name} Logo`}
                  />
                </div>
                <span className="ml-2 text-sm font-medium">
                  {event.host.name}
                </span>
              </div>
              <h2 className="text-2xl font-bold">{event.title}</h2>
              <div className="flex items-center text-luxtix-8 mt-2">
                <span className="text-sm sm:text-md">
                  {event.day}, {event.date}
                </span>
              </div>
              <p className="text-sm sm:text-md">{event.time}</p>
              <p className="mt-2 text-luxtix-8">{event.location}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-bold text-luxtix-3 sm:text-lg">
                  <div className="flex flex-row flex-center">
                    <GiTicket size={20} className="mr-1" />
                    {initialPrice === 0
                      ? "Free"
                      : `IDR ${initialPrice.toLocaleString()}`}
                  </div>
                </span>
                <div className="flex items-center">
                  <span className="text-xs sm:text-sm text-luxtix-7">
                    {event.quota} Remaining
                  </span>
                  <select
                    className="ml-2 p-2 border rounded-lg"
                    value={people}
                    onChange={handlePeopleChange}
                  >
                    <option value={1}>1 Person</option>
                    <option value={2}>2 Person</option>
                    <option value={3}>3 Person</option>
                    <option value={4}>4 Person</option>
                  </select>
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Ticket Tier
                </label>
                <div className="flex space-x-4">
                  <div
                    onClick={() => handleTicketTierChange("Regular")}
                    className={`flex-1 p-4 border-2 rounded-lg cursor-pointer flex flex-col items-center ${
                      ticketTier === "Regular"
                        ? "border-luxtix-5"
                        : "border-luxtix-7"
                    }`}
                  >
                    <span className="text-luxtix-1">Regular</span>
                    <span className="text-sm">{`IDR ${event?.price?.toLocaleString()}`}</span>
                  </div>
                  <div
                    onClick={() => handleTicketTierChange("VIP")}
                    className={`flex-1 p-4 border-2 rounded-lg cursor-pointer flex flex-col items-center ${
                      ticketTier === "VIP"
                        ? "border-luxtix-5"
                        : "border-luxtix-7"
                    }`}
                  >
                    <span className="text-luxtix-1">VIP</span>
                    <span className="text-sm">{`IDR ${event?.vipPrice?.toLocaleString()}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-2">{event.title}</h3>
              <div className="border-b border-luxtix-7 mb-4"></div>
              <div className="flex justify-between mb-2">
                <span>Date</span>
                <span>{event.date}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Time</span>
                <span>{event.time}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>City</span>
                <span>{event.city}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span>Venue</span>
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center mb-4">
                <div className="w-3/4">
                  <p className="font-light text-luxtix-8">Have voucher?</p>
                  <div className="flex flex-row">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-lg flex-1"
                      placeholder="Enter code"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                      disabled={voucherApplied || initialPrice === 0}
                    />
                    <button
                      className="btn-anim ml-2 p-2 bg-luxtix-6 text-luxtix-1 rounded-lg"
                      onClick={handleApplyVoucher}
                      disabled={voucherApplied || initialPrice === 0}
                    >
                      Apply
                    </button>
                    {voucherApplied && (
                      <button
                        className="btn-anim ml-2 p-2 text-sm underline text-luxtix-1 rounded-lg"
                        onClick={handleRemoveVoucher}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {voucherAlert && (
                    <p className="text-red-500 text-sm">{voucherAlert}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  id="usePoints"
                  className="mr-2"
                  checked={pointsUsed}
                  onChange={handleUsePoints}
                  disabled={initialPrice === 0}
                />
                <label htmlFor="usePoints">Use Points</label>
                <span className="ml-auto">20,000</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>
                  Subtotal ({people} item{people > 1 ? "s" : ""})
                </span>
                <span>{`IDR ${subtotal.toLocaleString()}`}</span>
              </div>
              {voucherApplied && (
                <div className="flex justify-between mb-2">
                  <span>Referral Voucher</span>
                  <span>-{`IDR ${voucherDiscount.toLocaleString()}`}</span>
                </div>
              )}
              {pointsUsed && (
                <div className="flex justify-between mb-2">
                  <span>Points</span>
                  <span>-{`IDR ${pointsDiscount.toLocaleString()}`}</span>
                </div>
              )}
              <div className="flex justify-between font-bold mb-4">
                <span>Total</span>
                <span>{`IDR ${total.toLocaleString()}`}</span>
              </div>
              <button
                className="btn-anim w-full py-2 px-4 bg-luxtix-6 text-luxtix-1 font-bold rounded-lg"
                onClick={handleCheckout}
              >
                Checkout Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
