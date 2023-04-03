import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-4xl font-bold mb-8">
        Welcome! Here are some of our favourite memes.
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://media.tenor.com/6oSEDVpeB-YAAAAd/dies-of-cringe-cringe.gif"
            alt="Meme 1"
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://media.tenor.com/w81ncYP9p0oAAAAd/balcony-bleach.gif"
            alt="Meme 2"
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://media.tenor.com/9PTGVf4BLwYAAAAC/crying-emoji-dies.gif"
            alt="Meme 3"
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://via.placeholder.com/300"
            alt="Meme 4"
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://via.placeholder.com/300"
            alt="Meme 5"
            className="w-full h-48 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://via.placeholder.com/300"
            alt="Meme 6"
            className="w-full h-48 object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
