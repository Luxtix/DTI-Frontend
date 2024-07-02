"use client";

import eventCardItems from "@/utils/eventCardItems";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { usePurchasedEvents } from "@/contexts/PurchasedEventsContext";
import { EventType } from "@/types/event";

function Transaction() {
  const { id } = useParams();
  const router = useRouter();
  const { addPurchasedEvent } = usePurchasedEvents();
  const event = eventCardItems.find(
    (event: EventType) => event.id === Number(id)
  );

  const [regularTickets, setRegularTickets] = useState<number>(0);
  const [vipTickets, setVipTickets] = useState<number>(0);
  const [vvipTickets, setVvipTickets] = useState<number>(0);
  const [voucherApplied, setVoucherApplied] = useState<boolean>(false);
  const [pointsUsed, setPointsUsed] = useState<boolean>(false);
  const [selectedVoucher, setSelectedVoucher] = useState<string>("");
  const [voucherAlert, setVoucherAlert] = useState<string>("");

  const availableVouchers = [
    { code: "888", discount: 10, label: "Voucher 888 - 10% Off" },
    { code: "SAVE10", discount: 5, label: "SAVE10 - 5% Off" },
    // Add more vouchers as needed
  ];

  if (!event) {
    return <p>Event not found</p>;
  }

  useEffect(() => {
    if (voucherApplied) {
      alert("Voucher successfully applied!");
    }
  }, [voucherApplied]);

  const handleIncreaseTickets = (type: string) => {
    if (type === "Regular" && regularTickets < event.quota) {
      setRegularTickets(regularTickets + 1);
    } else if (type === "VIP" && vipTickets < event.vipQuota) {
      setVipTickets(vipTickets + 1);
    } else if (type === "VVIP" && vvipTickets < event.vvipQuota) {
      setVvipTickets(vvipTickets + 1);
    }
  };

  const handleDecreaseTickets = (type: string) => {
    if (type === "Regular" && regularTickets > 0) {
      setRegularTickets(regularTickets - 1);
    } else if (type === "VIP" && vipTickets > 0) {
      setVipTickets(vipTickets - 1);
    } else if (type === "VVIP" && vvipTickets > 0) {
      setVvipTickets(vvipTickets - 1);
    }
  };

  const handleApplyVoucher = () => {
    const voucher = availableVouchers.find((v) => v.code === selectedVoucher);
    if (voucher) {
      setVoucherApplied(true);
      setVoucherAlert("");
    } else {
      setVoucherAlert("Invalid voucher code");
    }
  };

  const handleRemoveVoucher = () => {
    setVoucherApplied(false);
    setSelectedVoucher("");
    setVoucherAlert("");
  };

  const handleUsePoints = () => {
    setPointsUsed(!pointsUsed);
  };

  const handleCheckout = () => {
    if (event) {
      const totalTickets = regularTickets + vipTickets + vvipTickets;
      if (totalTickets === 0 && event.price !== 0) {
        alert("Ticket quantity must be at least 1");
        return;
      }
      addPurchasedEvent(event);
      router.push("/order-success");
    }
  };

  const regularPrice = event.price || 0;
  const vipPrice = event.vipPrice || 0;
  const vvipPrice = event.vvipPrice || 0;

  const subtotal =
    regularTickets * regularPrice +
    vipTickets * vipPrice +
    vvipTickets * vvipPrice;
  const voucherDiscount = voucherApplied
    ? Math.round(
        (subtotal *
          (availableVouchers.find((v) => v.code === selectedVoucher)
            ?.discount || 0)) /
          100
      )
    : 0;
  const pointsDiscount = pointsUsed ? 20000 : 0;
  const total = subtotal - voucherDiscount - pointsDiscount;

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
              width={500}
              height={500}
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
              <div className="mt-4">
                <label className="block text-sm font-bold text-luxtix-8 pb-4">
                  Ticket Tiers
                </label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border border-luxtix-5 rounded-lg p-4">
                    <div className="flex flex-col">
                      <span className="text-luxtix-1">Regular</span>
                      <span className="text-sm">{`IDR ${regularPrice.toLocaleString()}`}</span>
                      <span className="text-xs text-luxtix-7">{`${
                        event.quota - regularTickets
                      } Remaining`}</span>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 border rounded-lg"
                        onClick={() => handleDecreaseTickets("Regular")}
                        disabled={regularTickets === 0}
                      >
                        -
                      </button>
                      <span className="mx-2">{regularTickets}</span>
                      <button
                        className="px-2 py-1 border rounded-lg"
                        onClick={() => handleIncreaseTickets("Regular")}
                        disabled={regularTickets >= event.quota}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border border-luxtix-5 rounded-lg p-4">
                    <div className="flex flex-col">
                      <span className="text-luxtix-1">VIP</span>
                      <span className="text-sm">
                        {`IDR ${vipPrice.toLocaleString()}`}
                      </span>
                      <span className="text-xs text-luxtix-7">{`${
                        event.vipQuota - vipTickets
                      } Remaining`}</span>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 border rounded-lg"
                        onClick={() => handleDecreaseTickets("VIP")}
                        disabled={vipTickets === 0}
                      >
                        -
                      </button>
                      <span className="mx-2">{vipTickets}</span>
                      <button
                        className="px-2 py-1 border rounded-lg"
                        onClick={() => handleIncreaseTickets("VIP")}
                        disabled={vipTickets >= event.vipQuota}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between border border-luxtix-5 rounded-lg p-4">
                    <div className="flex flex-col">
                      <span className="text-luxtix-1">VVIP</span>
                      <span className="text-sm">{`IDR ${vvipPrice.toLocaleString()}`}</span>
                      <span className="text-xs text-luxtix-7">{`${
                        event.vvipQuota - vvipTickets
                      } Remaining`}</span>
                    </div>
                    <div className="flex items-center">
                      <button
                        className="px-2 py-1 border rounded-lg"
                        onClick={() => handleDecreaseTickets("VVIP")}
                        disabled={vvipTickets === 0}
                      >
                        -
                      </button>
                      <span className="mx-2">{vvipTickets}</span>
                      <button
                        className="px-2 py-1 border rounded-lg"
                        onClick={() => handleIncreaseTickets("VVIP")}
                        disabled={vvipTickets >= event.vvipQuota}
                      >
                        +
                      </button>
                    </div>
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
                  <label className="block text-sm font-bold text-luxtix-8 pb-4">
                    Select Voucher
                  </label>
                  <select
                    value={selectedVoucher}
                    onChange={(e) => setSelectedVoucher(e.target.value)}
                    className="w-3/5 mr-2 p-2 border rounded-lg"
                    disabled={voucherApplied || total === 0}
                  >
                    <option value="">Select Voucher</option>
                    {availableVouchers.map((voucher) => (
                      <option key={voucher.code} value={voucher.code}>
                        {voucher.label}
                      </option>
                    ))}
                  </select>
                  <button
                    className="btn-anim mt-2 p-2 bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 rounded-lg cursor-pointer"
                    onClick={handleApplyVoucher}
                    disabled={voucherApplied || total === 0}
                    hidden={total === 0}
                  >
                    Apply
                  </button>
                  {voucherApplied && (
                    <button
                      className="btn-anim mt-2 ml-2 p-2 text-sm underline text-luxtix-1 rounded-lg"
                      onClick={handleRemoveVoucher}
                    >
                      Remove
                    </button>
                  )}
                  {voucherAlert && (
                    <p className="text-red-500 text-sm mt-2">{voucherAlert}</p>
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
                  disabled={total === 0}
                />
                <label htmlFor="usePoints">Use Points</label>
                <span className="ml-auto">20,000</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>
                  Subtotal ({regularTickets + vipTickets + vvipTickets} item
                  {regularTickets + vipTickets + vvipTickets > 1 ? "s" : ""})
                </span>
                <span>{`IDR ${subtotal.toLocaleString()}`}</span>
              </div>
              {voucherApplied && (
                <div className="flex justify-between mb-2">
                  <span>Discount</span>
                  <span>{`-${voucherDiscount.toLocaleString()}`}</span>
                </div>
              )}
              {pointsUsed && (
                <div className="flex justify-between mb-2">
                  <span>Points</span>
                  <span>{`-20,000`}</span>
                </div>
              )}
              <div className="flex justify-between font-bold mb-4">
                <span>Total</span>
                <span>{`IDR ${total.toLocaleString()}`}</span>
              </div>
              <button
                className="btn-anim w-full py-2 px-4 bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 font-bold rounded-lg"
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
