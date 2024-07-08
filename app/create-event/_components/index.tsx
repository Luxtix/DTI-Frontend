"use client";

import TicketRow from "./TicketRow";
import VoucherRow from "./VoucherRow";
// import { FormField } from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsDoorOpen } from "react-icons/bs";
import { BsCurrencyDollar } from "react-icons/bs";

const eventCategories = [
  "Entertainment",
  "Educational & Business",
  "Arts & Culture",
  "Sports & Fitness",
  "Technology & Innovation",
  "Travel & Adventure",
];

function CreateEvent() {
  const [showReferralVoucher, setShowReferralVoucher] = useState(false);
  const [isTicketedEvent, setIsTicketedEvent] = useState(true);

  const toggleEventType = (type: boolean) => {
    setIsTicketedEvent(type === true);
    if (type !== true) {
      setShowReferralVoucher(false);
    }
  };

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
        <h2 className="text-3xl font-semibold mb-4">Event Details</h2>
        {/* <FormField
          label="Event Title"
          type="text"
          placeholder="Enter the name of your event"
        /> */}
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
              <label className="text-sm mb-2 text-luxtix-7">Event Date</label>
              <Input
                type="date"
                placeholder="DD/MM/YYYY"
                className="w-full p-2 border border-input rounded"
              />
            </div>
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
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Location</h2>
        {/* <FormField
          label="Where will your event take place?"
          type="text"
          placeholder="Venue Name"
        /> */}
        {/* <FormField
          label="Where is the venue located?"
          type="text"
          placeholder="Venue Address"
        /> */}
        <div className="mb-4">
          <label className="text-md mb-2 text-luxtix-8">City</label>
          <select
            name="city"
            className="w-full p-2 border border-input rounded"
          >
            <option value="">Please select one</option>
          </select>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
        <Textarea placeholder="Describe what's special about your event & other important details." />
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
        <div className="mb-4">
          <input
            type="file"
            className="w-full p-2 border border-input rounded"
          />
          <p className="text-sm mb-2 text-luxtix-7">
            Feature Image must be at least 1170 pixels wide by 504 pixels high.
            Valid file formats: JPG, GIF, PNG.
          </p>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          What type of event are you running?
        </h2>
        <div className="grid grid-cols-2 space-x-4">
          <button
            type="button"
            className={`flex-1 p-4 border-2 rounded-lg cursor-pointer flex flex-col items-center ${
              isTicketedEvent === true ? "border-luxtix-5" : "border-luxtix-7"
            }`}
            onClick={() => toggleEventType(true)}
          >
            <BsCurrencyDollar size={30} className="mb-2" />
            <span className="text-luxtix-1">Paid Event</span>
          </button>
          <button
            type="button"
            className={`flex-1 p-4 border-2 rounded-lg cursor-pointer flex flex-col items-center ${
              isTicketedEvent === false ? "border-luxtix-5" : "border-luxtix-7"
            }`}
            onClick={() => toggleEventType(false)}
          >
            <BsDoorOpen size={30} className="mb-2" />
            <span className="text-luxtix-1">Free Event</span>
          </button>
        </div>
      </section>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-4">
          What tickets are you selling?
        </h2>
        <div className="py-2">
          {ticketRows.map((_, index) => (
            <TicketRow key={index} index={index} removeRow={removeTicketRow} />
          ))}

          <button
            onClick={addTicketRow}
            className="btn-anim bg-luxtix-4 hover:bg-luxtix-2 text-black text-sm p-2 rounded-md"
          >
            Add Ticket
          </button>
        </div>
      </section>

      {isTicketedEvent && (
        <>
          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Do you want to create promotional voucher?
            </h2>
            <div className="py-2">
              {voucherRows.map((_, index) => (
                <VoucherRow
                  key={index}
                  index={index}
                  removeRow={removeVoucherRow}
                />
              ))}
              <button
                onClick={addVoucherRow}
                className="btn-anim bg-luxtix-4 hover:bg-luxtix-2 text-black text-sm p-2 rounded-md"
              >
                Add Voucher
              </button>
            </div>
          </section>

          <section className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Do you accept referral voucher?
            </h2>
            <div className="flex items-center space-x-4 mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="acceptReferralVoucher"
                  className="mr-2"
                  onClick={() => setShowReferralVoucher(!showReferralVoucher)}
                />
                Yes
              </label>
            </div>
            {showReferralVoucher && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {/* <FormField label="Name" type="text" placeholder="Name" />
                <FormField label="QTY" type="number" placeholder="QTY 0" /> */}
              </div>
            )}
          </section>
        </>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-anim bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 px-4 py-2 rounded-lg"
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
}

export default CreateEvent;
