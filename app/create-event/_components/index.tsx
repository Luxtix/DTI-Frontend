"use client";
import TicketRow from "./TicketRow";
import VoucherRow from "./VoucherRow";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FormField } from "@/components/ui";
import { Input } from "@/components/ui/input";

const eventCategories = [
  "Entertainment",
  "Educational & Business",
  "Arts & Culture",
  "Sports & Fitness",
  "Technology & Innovation",
  "Travel & Adventure",
];

function CreateEvent() {
  const [ticketRows, setTicketRows] = useState([{ id: 0 }]);
  const [voucherRows, setVoucherRows] = useState([{ id: 0 }]);

  const addTicketRow = () => {
    const newTicketRow = { id: ticketRows.length };
    setTicketRows([...ticketRows, newTicketRow]);
  };

  const removeTicketRow = (indexToRemove: number) => {
    const updatedRows = ticketRows.filter(
      (_, index) => index !== indexToRemove
    );
    setTicketRows(updatedRows);
  };

  const addVoucherRow = () => {
    const newVoucherRow = { id: voucherRows.length };
    setVoucherRows([...voucherRows, newVoucherRow]);
  };

  const removeVoucherRow = (indexToRemove: number) => {
    const updatedRows = voucherRows.filter(
      (_, index) => index !== indexToRemove
    );
    setVoucherRows(updatedRows);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="block sm:py-6">
        <Link href="/" className="text-luxtix-1">
          <AiOutlineArrowLeft size={25} />
        </Link>
      </div>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Event Details</h2>
        <FormField
          label="Event Title"
          type="text"
          placeholder="Enter the name of your event"
        />
        <div className="mb-4">
          <label className="text-md mb-2 text-luxtix-8">Event Category</label>
          <select className="w-full p-2 border border-input rounded">
            <option value="">Please select one</option>
            {eventCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Date & Time</h2>
        <div className="mb-4">
          <label className="text-md mb-2 text-luxtix-8">Event Type</label>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <label>
            <input
              type="radio"
              name="eventType"
              value="offline"
              className="mr-2"
            />
            Offline
          </label>
          <label>
            <input
              type="radio"
              name="eventType"
              value="online"
              className="mr-2"
            />
            Online
          </label>
        </div>
        <div className="flex flex-col">
          <label className="text-md text-luxtix-8 mb-2">Session</label>
          <div className="grid grid-cols-2 gap-x-4 sm:grid-cols-3">
            <div className="mb-4">
              <label className="text-sm mb-2 text-luxtix-7">Start Time</label>
              <Input
                type="time"
                placeholder="HH/MM"
                className="w-full p-2 border border-input rounded"
              />
            </div>
            <div className="mb-4">
              <label className="text-sm mb-2 text-luxtix-7">End Time</label>
              <Input
                type="time"
                placeholder="HH/MM"
                className="w-full p-2 border border-input rounded"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="py-2">
        {ticketRows.map((_, index) => (
          <TicketRow key={index} index={index} removeRow={removeTicketRow} />
        ))}

        <button
          onClick={addTicketRow}
          className="btn-anim bg-luxtix-6 hover:bg-luxtix-2 text-black text-sm p-2 rounded-md"
        >
          Add Ticket
        </button>
      </div>
      <div className="py-2">
        {voucherRows.map((_, index) => (
          <VoucherRow key={index} index={index} removeRow={removeVoucherRow} />
        ))}
        <button
          onClick={addVoucherRow}
          className="btn-anim bg-luxtix-6 hover:bg-luxtix-2 text-black text-sm p-2 rounded-md"
        >
          Add Voucher
        </button>
      </div>
    </div>
  );
}

export default CreateEvent;
