import React, { useState, useEffect } from "react";

const TimeButtons = ({ availTimes, setTimeQuery, refetch }) => {
  return (
    <div>
      {availTimes &&
        availTimes.map((time) => (
          <button
            className={"standardized-button"}
            onClick={() => {
              setTimeQuery(time);
              refetch({
                time,
              });
            }}
          >
            -{time}-
          </button>
        ))}
    </div>
  );
};

export default TimeButtons;
