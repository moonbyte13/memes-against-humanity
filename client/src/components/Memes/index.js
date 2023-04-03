import { useState, useEffect } from "react";
import { createGiphyFetch } from "../../utils/giphyApi";
import { Link, useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { SAVE_MEME_AND_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const giphyFetch = createGiphyFetch();

function GiphyGallery() {
  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Fail");
  const { id } = useParams(); // get the ID from the URL params
  const [saveMemeAndUser] = useMutation(SAVE_MEME_AND_USER);
  const userId = Auth.getCurrentUserId();
  console.log("memeId", id);

  // now you can use the `id` variable in your component
  console.log("userId", userId);
  useEffect(() => {
    async function fetchGifs() {
      let query = "";
      if (searchTerm) {
        query = searchTerm;
      } else {
        query = selectedSubcategory;
      }
      const { data } = await giphyFetch.gifs("memes", query);
      setGifs(data);
    }
    fetchGifs();
  }, [selectedSubcategory, searchTerm]);

  // filter the GIFs array to find the one with the matching ID
  const selectedGif = gifs.find((gif) => gif.id === id);

  // define the list of subcategories for the dropdown
  const subcategories = [
    "Fail",
    "Confused",
    "Dank memes",
    "Deal with it",
    "Feels",
    "Forever alone",
    "Hair flip",
    "Judge Judy",
    "Like a boss",
    "Look at all the fucks I give",
    "Sips tea",
    "Steal yo girl",
  ];

  // define the onClick handler for the "Save" button
  // define the onClick handler for the "Save" button
  const handleSave = () => {
    if (!Auth.loggedIn() || !selectedGif) return;

    saveMemeAndUser({
      variables: {
        userId: userId,
        memeId: selectedGif.id.toString(),
        imageUrl: selectedGif.images.downsized_medium.url,
      },
    })
      .then(() => {
        window.location.href = "/profile";
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div class="flex flex-col">
      <div class="flex justify-between items-center mb-4">
        <div class="flex items-center">
          <select
            class="px-2 py-1 border rounded mr-2 text-lg"
            value={searchTerm ? searchTerm : selectedSubcategory}
            onChange={(e) => {
              setSelectedSubcategory(e.target.value);
              setSearchTerm("");
            }}
            disabled={searchTerm ? true : false}
          >
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search for GIFs"
            class="px-2 py-1 border rounded text-lg"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
        {selectedGif && (
          <div>
            <Link
              to="/memes"
              className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Back to gallery
            </Link>
          </div>
        )}
      </div>
      {selectedGif ? (
        <div class="flex flex-col items-center">
          <img
            src={selectedGif.images.downsized_medium.url}
            alt={selectedGif.title}
            class="object-contain h-fit w-full mb-4"
          />
          <div class="flex justify-center space-x-4">
            {Auth.loggedIn() ? (
              <button
                class="px-4 py-2 border rounded bg-green-500 text-white hover:bg-green-700"
                onClick={handleSave}
              >
                Save
              </button>
            ) : (
              <Link
                to="/login"
                class="px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-700"
              >
                Log in to save
              </Link>
            )}
            <button class="px-4 py-2 border rounded bg-gray-300 hover:bg-gray-400">
              Like
            </button>
          </div>
        </div>
      ) : (
        <div class="gallery grid grid-cols-2 gap-4">
          {gifs.map((gif) => (
            <Link to={`/memes/${gif.id}`} key={gif.id}>
              <div className="w-full h-[40rem]">
                <img
                  src={gif.images.downsized_medium.url}
                  alt={gif.title}
                  class="object-cover w-full h-full"
                />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default GiphyGallery;
