import React from "react";

function Foreground() {
  return (
    <div>
      <h1
        className="foreground sm:text-[200px] sm:font-semibold font-medium text-[100px] dark:text-[#000000] text-[#dcdcdc] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{ userSelect: "none" }}
      >
        Docs.
      </h1>
    </div>
  );
}

export default Foreground;
