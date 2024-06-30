"use client";
import TicketRow from "./TicketRow";
import VoucherRow from "./VoucherRow";
import { useState } from "react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

const eventCategories = [
  "Art",
  "Sport",
  "Entertainment",
  "Tech",
  "Business",
  "Travel",
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
      <div className="py-2">
        {ticketRows.map((_, index) => (
          <TicketRow key={index} index={index} removeRow={removeTicketRow} />
        ))}

        <button
          onClick={addTicketRow}
          className="bg-luxtix-6 hover:bg-luxtix-2 text-black text-sm p-2 rounded-md"
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
          className="bg-luxtix-6 hover:bg-luxtix-2 text-black text-sm p-2 rounded-md"
        >
          Add Voucher
        </button>
      </div>
    </div>
  );
}

export default CreateEvent;
