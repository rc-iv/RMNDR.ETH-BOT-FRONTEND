import React from "react";
import { Event } from "../page";
import { subscribe } from "diagnostics_channel";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const unixTimestamp = parseInt(event.timestamp);
  // convert unix timestamp to a datetime
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const time = hours + ":" + minutes;
  const timezone = date.getTimezoneOffset() / 60;

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dateString =
    month + "/" + day + "/" + year + " " + time + " UTC" + timezone;

  return (
    <div className="md:w-full bg-slate-700 rounded-lg p-3">
      <div className="my-2">
        <h1 className="text-2xl font-bold">{event.title}</h1>
      </div>
      <div className="text-xl">
        <h2>Type</h2>
      </div>
      <div className="my-2 bg-slate-600">
        <p className="">{event.type}</p>
      </div>
      <div className="text-xl">
        <p>Description</p>
      </div>
      <div className="my-2 bg-slate-600">
        <p className="">{event.description}</p>
      </div>
      <div className="text-xl">
        <p>Event Date</p>
      </div>
      <div className="my-2 bg-slate-600">
        <p className="">{dateString}</p>
      </div>
      <div className="text-xl">
        <p>Chain</p>
      </div>
      <div className="my-2 bg-slate-600">
        <p className="">{event.chain}</p>
      </div>
      <div className="text-xl">
        <p>Creator</p>
      </div>
      <div className="my-2 bg-slate-600">
        <p className="">{event.creator}</p>
      </div>
      <div className="flex justify-between text-center">
        <button
          className="bg-green-500 w-1/4 rounded-md"
        >
          Subscribe
        </button>
        <div className="bg-blue-500 w-1/4 rounded-md">Edit</div>
        <div className="bg-blue-500 w-1/4 rounded-md">Delete</div>
      </div>
    </div>
  );
};

export default EventCard;
