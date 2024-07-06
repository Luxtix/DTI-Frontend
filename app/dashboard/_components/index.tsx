import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";

function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="block sm:py-6">
        <Link href="/" className="text-luxtix-1">
          <AiOutlineArrowLeft size={25} />
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row items-center mb-6">
        <label htmlFor="event-select" className="mr-4 mb-2 sm:mb-0">
          Select your created events
        </label>
        <select
          id="event-select"
          className="border border-luxtix-7 rounded p-2 flex-grow"
        >
          <option>Please select one</option>
        </select>
        <div className="flex flex-wrap mt-2 sm:mt-0">
          <Link href="/create-event">
            <button className="btn-anim bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 ml-0 sm:ml-4 px-4 py-2 rounded mb-2 sm:mb-0">
              Create
            </button>
          </Link>
          <button className="btn-anim bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 ml-0 sm:ml-4 px-4 py-2 rounded mb-2 sm:mb-0">
            Modify
          </button>
          <button className="btn-anim bg-luxtix-3 text-white hover:bg-luxtix-2 ml-0 sm:ml-4 px-4 py-2 rounded mb-2 sm:mb-0">
            Delete
          </button>
        </div>
      </div>

      <div className="mb-6 text-center sm:text-left">
        <h1 className="text-3xl font-bold">Event Title</h1>
        <p className="text-luxtix-8">Date</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-card p-6 rounded shadow">
          <h2 className="text-luxtix-5">Ticket Sold</h2>
          <p className="text-luxtix-7">Capacity: 650/1000 Tickets</p>
          <div className="flex justify-center items-center h-32">
            <div className="text-4xl font-bold">65%</div>
          </div>
        </div>
        <div className="bg-card p-6 rounded shadow">
          <h2 className="text-luxtix-5">Average Event Rating</h2>
          <div className="flex justify-center items-center h-32">
            <div className="text-4xl font-bold">4</div>
          </div>
        </div>
        <div className="bg-card p-6 rounded shadow">
          <h2 className="text-luxtix-5">Ticket Revenue</h2>
          <div className="flex justify-center items-center h-32">
            <div className="text-4xl font-bold">IDR 30,000,000</div>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded shadow mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h2 className="text-luxtix-5 mb-2 sm:mb-0">Ticket Sales Over Time</h2>
          <div className="flex space-x-2">
            <button className="btn-anim bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 px-2 py-1 rounded">
              D
            </button>
            <button className="btn-anim bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 px-2 py-1 rounded">
              W
            </button>
            <button className="btn-anim bg-luxtix-6 text-luxtix-1 hover:bg-luxtix-2 px-2 py-1 rounded">
              M
            </button>
          </div>
        </div>
        <div className="h-40 flex justify-center items-center">
          <img
            src="https://placehold.co/200x100?text=Chart"
            alt="Chart Placeholder"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
