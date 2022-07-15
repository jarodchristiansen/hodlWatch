import React, { useState, useEffect } from "react";

const TimeButtons = ({ availTimes, setTimeQuery, refetch }) => {
  return (
    <div>
      Time Buttons
      <div>Div for Buttons</div>
      {availTimes &&
        availTimes.map((time) => (
          <button
            onClick={() => {
              setTimeQuery(time);
              refetch({
                time,
              });
            }}
          >
            {time} - (D)
          </button>
        ))}
    </div>
  );
};

export default TimeButtons;
