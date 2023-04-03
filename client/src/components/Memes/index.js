
import { useState, useEffect } from 'react';
import { createGiphyFetch } from '../../utils/giphyApi';
import { Link, useParams } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { SAVE_MEME_AND_USER, ADD_LIKE } from '../../utils/mutations';
import Auth from '../../utils/auth';


const giphyFetch = createGiphyFetch();

function GiphyGallery() {
  const [numLikes, setNumLikes] = useState(0);

  const [gifs, setGifs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubcategory, setSelectedSubcategory] = useState("Fail");
  const { id } = useParams(); // get the ID from the URL params
  const [saveMemeAndUser] = useMutation(SAVE_MEME_AND_USER);
  const userId = Auth.getCurrentUserId();
  console.log("memeId", id);


  const [addLike] = useMutation(ADD_LIKE, {
    onCompleted: (data) => {
      setNumLikes(data.addLike.numLikes);
    },
  });
  
  

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
    'SpongeBob',
    'Rickroll',
    'OBEY',
    'Deal with it',
    'All Your Base Are Belong to Us',
    'The Dancing Baby',
    'Keyboard Cat',
    'Kermit',
    'Doge',
    'Bert Is Evil',
    'Nyan Cat',
    'Steal yo girl',
  ];

  // define the onClick handler for the "Save" button
  const handleSave = () => {
    if (!Auth.loggedIn()) return;
  
    saveMemeAndUser({
      variables: {
        userId: userId,
        memeId: selectedGif.slug,
        imageUrl: selectedGif.images.downsized_medium.url,
      },
    })
      .then(() => {

        console.log('Meme saved!');
        window.location.href = '/profile';
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  
  

  const handleLikeClick = () => {
    if (!Auth.loggedIn()) return;
  
    addLike({
      variables: {
        memeId: selectedGif.id,
      },
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

            {Auth.loggedIn() && (
              <button
                className={`
                  px-4 py-2 border rounded
                  ${numLikes > 0 ? "bg-green-500 text-white" : ""}
                `}
                onClick={handleLikeClick}
              >
                {numLikes > 0 ? `${numLikes} likes` : "Like"}
              </button>
            )}
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
