"use client";
import { ChangeEvent, useEffect, useState } from "react";
import eventCardItems from "@/utils/eventCardItems";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { GiTicket } from "react-icons/gi";

function Transaction() {
  const { id } = useParams();
  const event = eventCardItems.find((event) => event.id === Number(id));

  const initialPrice = event?.price || 0;
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
    if (voucherApplied) {
      alert("Voucher successfully applied!");
    }
  }, [voucherApplied]);

  const handlePeopleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedPeople = Number(e.target.value);
    setPeople(selectedPeople);
    setSubtotal(initialPrice * selectedPeople);
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

  const totalDiscount =
    (voucherApplied ? voucherDiscount : 0) + (pointsUsed ? pointsDiscount : 0);
  const total = subtotal - totalDiscount;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="max-w-7xl mx-auto">
        <div className="hidden sm:block sm:py-6">
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
                    {event.price === 0
                      ? "Free"
                      : `IDR ${event.price.toLocaleString()}`}
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
                  </select>
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
                  <span>{`- IDR ${voucherDiscount.toLocaleString()}`}</span>
                </div>
              )}
              {pointsUsed && (
                <div className="flex justify-between mb-4">
                  <span>Points Used</span>
                  <span>{`- IDR ${pointsDiscount.toLocaleString()}`}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg mb-4">
                <span>Total</span>
                <span>{`IDR ${total.toLocaleString()}`}</span>
              </div>
              <button className="btn-anim w-full p-3 bg-luxtix-6 text-black rounded-lg">
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
