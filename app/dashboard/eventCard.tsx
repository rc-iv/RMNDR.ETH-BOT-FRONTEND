import React from "react";
import { Event } from "./page";

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

    const dateString = month + "/" + day + "/" + year + " " + time + " UTC" + timezone;



  return (
    <div className="w-auto bg-slate-900 rounded-lg m-3">
      <p className="text-2xl font-bold">{event.title}</p>
      <p className="text-xl">Description: {event.description}</p>
      <p className="text-xl">Type: {event.type}</p>
      <p className="text-xl">Chain: {event.chain}</p>
      <p className="text-xl">Creator: {event.creator}</p>
      <p className="text-xl">Timestamp: {dateString}</p>
    </div>
  );
};

export default EventCard;
