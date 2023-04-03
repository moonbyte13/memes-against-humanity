import React from "react";
import Memes from "../components/Memes";

function MemesPage() {
  return (
    <div className="mt-10">
      <h1 className="text-4xl font-futura mb-4">Latest Memes</h1>
      <div>
        <Memes />
      </div>
    </div>
  );
}

export default MemesPage;
