import React from "react";

interface SubscriberOptionDropdownProps {
  onSubscribeOptionChange: (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => void;
}

const SubscriberOptionDropdown = ({
  onSubscribeOptionChange,
}: SubscriberOptionDropdownProps) => {
  return (
    <div className="m-2">
      <strong className="text-2xl text-white mx-2">Subscribed:</strong>
      <select
        className="w-auto text-black"
        onChange={onSubscribeOptionChange}
        defaultValue={"all"}
      >
        <option key="all" value="all">
          All
        </option>
        <option key="subscribed" value="subscribed">
          Subscribed
        </option>
      </select>
    </div>
  );
};

export default SubscriberOptionDropdown;
