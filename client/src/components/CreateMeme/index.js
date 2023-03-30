import { createGiphyFetch } from '../../utils/giphyApi';
import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_MEME } from '../../utils/mutations';

const giphyFetch = createGiphyFetch();

function CreateMeme() {

  const [gifs, setGifs] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [formState, setFormState] = useState({
    title: '',
    imageUrl: '',
    text: '',
  });
  const [addMeme, { error }] = useMutation(CREATE_MEME);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addMeme({
        variables: { ...formState },
      });
      console.log(data);
    } catch (e) {
      console.error(e);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSearch = async (event) => {
    const { data } = await giphyFetch.search(event.target.value, { limit: 25 });
    setGifs(data);
  };

  const handleGifClick = (imageUrl) => {
    navigator.clipboard.writeText(imageUrl); // copy image URL to clipboard
    setFormState({
      ...formState,
      imageUrl: imageUrl,
    });
  };

  const handleWindowResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const getGifWidth = () => {
    if (windowWidth >= 768) { // large screens
      return 300;
    } else if (windowWidth >= 640) { // medium screens
      return 250;
    } else { // small screens
      return windowWidth * 0.8;
    }
  };

  const getGifHeight = () => {
    return 'auto';
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-4">
      <h2>Search for a gif</h2>
      <input
        name='gifSearch'
        type='text'
        placeholder='Search for a gif'
        onChange={handleSearch}
        className="border border-gray-300 px-2 py-1 rounded-md"
      >
      </input>
      {gifs.length > 0 && (
        <div className="gifs-container flex justify-center items-center flex-wrap">
          {gifs.map((gif) => (
            <div
              className="gif p-2"
              key={gif.id}
              onClick={() => handleGifClick(gif.images.fixed_height.url)}
            >
              <img
                src={gif.images.fixed_height.url}
                alt={gif.title}
                width={getGifWidth()}
                height={getGifHeight()}
              />
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <input
          name='title'
          type='text'
          placeholder='Enter title'
          onChange={handleInputChange}
          className="border border-gray-300 px-2 py-1 rounded-md"
        />
        <input
          name='text'
          type='text'
          placeholder='Enter text'
          onChange={handleInputChange}
          className="border border-gray-300 px-2 py-1 rounded-md"
        />
        <input
          name='imageUrl'
          type='text'
          placeholder='Enter image URL'
          onChange={handleInputChange}
          className="border border-gray-300 px-2 py-1 rounded-md"
          value={formState.imageUrl}
        />
        <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-md">Create Meme</button>
      </form>
      {error && <div>Something went wrong...</div>}
    </div>
  );
}

export default CreateMeme;
