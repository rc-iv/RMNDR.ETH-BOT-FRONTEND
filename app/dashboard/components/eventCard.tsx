import React from "react";
import { Event } from "../page";

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const dateString = parseTimestamp(event.timestamp);
  const links = findLinks(event.description);
  const description = removeLinks(event.description);

  const subscribeToEvent = async () => {
    const payload = {
      data: {
        component_type: 2,
        custom_id: `subscribe-${event.id}`,
      },
      guild: {
        id: event.guild,
      },
      member: {
        user: {
          id: event.userId,
        },
      },
    };
    const url =
      "https://hnrkhewcy8.execute-api.us-east-1.amazonaws.com/default/rmndrBotMain";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(payload),
      cache: "no-store",
    });
    if (response.status === 200) {
      alert("Successfully subscribed to event!");
    } else {
      alert("Failed to subscribe to event.");
    }
  };

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
        <p className="break-all">{description}</p>
      </div>
      <div className="text-xl">
        <p>Links</p>
      </div>
      <div className="my-2 bg-slate-600">
        {links.map((link) => {
          return (
            <div key={link}>
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="break-all text-xs text-blue-300"
              >
                {link}
              </a>
            </div>
          );
        })}
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
          onClick={subscribeToEvent}
        >
          Subscribe
        </button>
        <div className="bg-blue-500 w-1/4 rounded-md">Edit</div>
        <div className="bg-blue-500 w-1/4 rounded-md">Delete</div>
      </div>
    </div>
  );
};

const parseTimestamp = (timestamp: string) => {
  const unixTimestamp = parseInt(timestamp);
  // convert unix timestamp to a datetime
  const date = new Date(unixTimestamp * 1000);
  const hours = date.getHours();
  const minutes = "0" + date.getMinutes();
  const time = hours + ":" + minutes;
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dateString = month + "/" + day + "/" + year + " " + time;

  return dateString;
};

const findLinks = (description: string) => {
  const links = [];
  const regex = /(https?:\/\/[^\s]+)/g;
  let match = regex.exec(description);
  while (match != null) {
    links.push(match[0]);
    match = regex.exec(description);
  }
  return links;
};

const removeLinks = (description: string) => {
  const regex = /(https?:\/\/[^\s]+)/g;
  return description.replace(regex, "");
};
export default EventCard;
