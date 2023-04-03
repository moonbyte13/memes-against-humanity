import React from "react";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">
      ✨Welcome! Here are some of our favourite memes.✨
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://media2.giphy.com/media/NWg7M1VlT101W/giphy.gif?cid=ecf05e47snkej7pecrwhg93i8h5by8d6axa564eyqbx85zsl&rid=giphy.gif&ct=g"
            alt="Meme 1"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://media0.giphy.com/media/mTPjPA6SSXgTsnZ1Dh/giphy.gif?cid=ecf05e47lma7sctke2ec400b3m7rpyjct99190rv939k48br&rid=giphy.gif&ct=g"
            alt="Meme 2"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://media.tenor.com/9PTGVf4BLwYAAAAC/crying-emoji-dies.gif"
            alt="Meme 3"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExODZjMTMzMjIxNmQwMDdjYjlkM2Q5MGQ2ODIwZGY5OTk0YTY2MjI2YyZjdD1n/5n067EUZwH8cvtRfGz/giphy.gif"
            alt="Meme 4"
            className="w-full h-80 object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://media3.giphy.com/media/3o6fJbwYFe3SmVVQ4M/giphy.gif?cid=ecf05e478nr6isq863ldo5w6hds6o7bk90pjjaqvy8jrszyh&rid=giphy.gif&ct=g"
            alt="Meme 5"
            className="w-full h-[24rem] object-cover"
          />
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <img
            src="https://gifdb.com/images/file/cartoon-character-louise-belcher-coding-is-fun-ctmkcciuc1gyxos2.gif"
            alt="Meme 6"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
