import React from "react";
import Gallery from "../components/Gallery/gallery";

const page = () => {
  return (
    <div>
      <Gallery
        theme={{
          background: "#ffffff",
          text: "#B85C1B",
        }}
      />
    </div>
  );
};

export default page;
