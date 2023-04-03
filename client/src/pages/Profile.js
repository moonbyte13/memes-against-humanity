import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { REMOVE_MEME } from "../utils/mutations";
import { EDIT_EMAIL } from "../utils/mutations";

function Profile() {
  const { loading, error, data } = useQuery(GET_ME);
  const [removeMeme] = useMutation(REMOVE_MEME);
  const [editEmail] = useMutation(EDIT_EMAIL);
  const [newEmail, setNewEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading user information</div>;
  }

  const { me } = data;

  const handleRemoveMeme = (memeId) => {
    removeMeme({
      variables: { memeId },
      update(cache, { data: { removeMeme } }) {
        const existingMe = cache.readQuery({ query: GET_ME });
        const newMemes = existingMe.me.memes.filter(
          (meme) => meme._id !== memeId
        );
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...existingMe.me, memes: newMemes } },
        });
      },
    });
  };

  const handleEditEmail = (e) => {
    e.preventDefault();
    editEmail({
      variables: { email: newEmail },
      update(cache, { data: { editEmail } }) {
        const existingMe = cache.readQuery({ query: GET_ME });
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...existingMe.me, email: editEmail.email } },
        });
      },
    });
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-5xl md:text-6xl font-bold mb-4 font-futura mt-5">
        🔥 Welcome {me.username}! 🔥
      </h2>
      <p className="text-gray-700 font-futura text-5xl md:text-xl mb-4">
        Email: {me.email}
      </p>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 md:mt-4"
        onClick={togglePopup}
      >
        Edit Email
      </button>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <form onSubmit={handleEditEmail}>
              <label
                htmlFor="email"
                className="block font-medium text-gray-700 mt-4 mb-2 md:mb-4 font-futura text-lg md:text-xl"
              >
                Email:
              </label>
              <input
                id="email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
                className="border-gray-400 shadow-inner p-2 rounded-md w-full text-lg md:text-xl"
              />
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-6">
                Submit
              </button>
            </form>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-6"
              onClick={togglePopup}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <h3 className="text-3xl md:text-4xl font-bold mt-8 mb-4">
        Here are your saved Memes.
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {me.memes.map((meme) => (
          <div
            className="bg-white rounded-lg overflow-hidden shadow-md"
            key={meme._id}
          >
            <img
              src={meme.imageUrl}
              className="h-72 md:h-80 lg:h-96 w-full object-cover"
              alt={meme.title}
            />
            <div className="p-4">
              <h5 className="font-bold text-xl md:text-2xl mb-2">
                {meme.title}
              </h5>
              <p className="text-gray-700 text-lg md:text-xl">
                {meme.description}
              </p>
              <div className="mt-4 flex justify-end">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-lg md:text-xl"
                  onClick={() => handleRemoveMeme(meme._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
