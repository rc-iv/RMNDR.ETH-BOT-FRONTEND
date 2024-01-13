import React from "react";

export default function Usage() {
  return (
    <div className="bg-gradient-to-r from-green-700 to-blue-700">
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold my-4">Commands</h2>
        <hr></hr>
        <div className="flex justify-between gap-x-6">
          <div className="my-6 bg-slate-800 rounded-md p-4">
            <h3 className="text-3xl font-semibold mb-5">/add</h3>
            <p className="my-3">
              <strong>Description:</strong> Adds a new event.
            </p>
            <p className="my-3">
              <strong>Usage:</strong>{" "}
              <div>
                <code>
                  /add name:&lt;event_name&gt; type:&lt;event_type&gt;
                  date:&lt;date&gt; time:&lt;time&gt; timezone:&lt;timezone&gt;
                  chain:&lt;chain&gt; description:&lt;description&gt;
                  [contractaddress:&lt;address&gt;] [explorerurl:&lt;url&gt;]
                </code>
              </div>
            </p>
            <p className="my-3">
              <strong>Fields:</strong>
            </p>
            <ul>
              <li>
                <strong>name</strong>: Name of the event.
              </li>
              <li>
                <strong>type</strong>: Type of the event.
              </li>
              <li>
                <strong>date</strong>: Date of the event (DD-MM-YYYY format).
              </li>
              <li>
                <strong>time</strong>: Time of the event (HH:mm format).
              </li>
              <li>
                <strong>timezone</strong>: Timezone for the event.
              </li>
              <li>
                <strong>chain</strong>: The blockchain chain related to the
                event.
              </li>
              <li>
                <strong>description</strong>: Brief description of the event.
              </li>
              <li>
                <strong>contractaddress</strong> (Optional): Contract address
                related to the event.
              </li>
              <li>
                <strong>explorerurl</strong> (Optional): URL of the contract
                explorer.
              </li>
            </ul>
          </div>

          <div className="my-6 bg-slate-800 rounded-md p-4">
            <h3 className="text-3xl font-semibold mb-5">/edit</h3>
            <p className="my-3">
              <strong>Description:</strong> Edits an existing event.
            </p>
            <p className="my-3">
              <strong>Usage:</strong>{" "}
              <div>
                <code>
                  /edit eventId:&lt;event_id&gt; name:&lt;event_name&gt;
                  type:&lt;event_type&gt; date:&lt;date&gt; time:&lt;time&gt;
                  timezone:&lt;timezone&gt; chain:&lt;chain&gt;
                  description:&lt;description&gt;
                  [contractaddress:&lt;address&gt;] [explorerurl:&lt;url&gt;]
                </code>
              </div>
            </p>
            <p className="my-3">
              <strong>Fields:</strong>
            </p>
            <ul>
              <li>
                <strong>event_id</strong>: Id of the event to be edited. Found
                by clicking the Edit button on the event embed.
              </li>
              <li>
                <strong>name</strong>: Name of the event.
              </li>
              <li>
                <strong>type</strong>: Type of the event.
              </li>
              <li>
                <strong>date</strong>: Date of the event (DD-MM-YYYY format).
              </li>
              <li>
                <strong>time</strong>: Time of the event (HH:mm format).
              </li>
              <li>
                <strong>timezone</strong>: Timezone for the event.
              </li>
              <li>
                <strong>chain</strong>: The blockchain chain related to the
                event.
              </li>
              <li>
                <strong>description</strong>: Brief description of the event.
              </li>
              <li>
                <strong>contractaddress</strong> (Optional): Contract address
                related to the event.
              </li>
              <li>
                <strong>explorerurl</strong> (Optional): URL of the contract
                explorer.
              </li>
            </ul>
          </div>
        </div>
        <hr></hr>
        <div className="my-6 bg-slate-800 rounded-md p-4 w-[46.5%]">
        <h2 className="text-2xl font-bold my-4 ">Interactive Buttons</h2>
          <ul>
            <li className="flex items-center my-2">
              <strong className="text-xl bg-green-800 rounded-md py-1 px-2 mr-2">Subscribe</strong>Allows users to subscribe to
              event notifications. Users will be pinged 15 minutes before the
                event starts.
            </li>
            <li className="flex items-center my-2">
              <strong className="text-xl bg-blue-700 rounded-md py-1 px-10 mr-2">Edit</strong>Provides the event ID for editing
              using the `/edit` command.
            </li>
            <li className="flex items-center mt-3">
              <strong className="text-xl bg-blue-700 rounded-md py-1 px-2 mr-2">Broadcast</strong>Broadcasts event details to the
              channel.
            </li>
          </ul>
        </div>
        <hr></hr>
      </div>
    </div>
  );
}
