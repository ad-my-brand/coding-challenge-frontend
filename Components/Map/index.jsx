import React from "react";
import dynamic from "next/dynamic";

const MapWithNoSRR = dynamic(() => import("./Map"), { ssr: false });
const IndexMap = () => {
  return (
    <div>
      <MapWithNoSRR />
   
    </div>
  );
};

export default IndexMap;
