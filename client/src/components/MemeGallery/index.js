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
  const [isMemeSelected, setIsMemeSelected] = useState(false);

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
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSearch = async (event) => {
    const { data } = await giphyFetch.search(
      event.target.value, 
      { limit: 10 }
    );
    
    setGifs(data);
  };

  const handleGifClick = (imageUrl) => {
    navigator.clipboard.writeText(imageUrl); // copy image URL to clipboard
    setFormState({
      ...formState,
      imageUrl: imageUrl,
    });
    setIsMemeSelected(true);
  };

  const handleGoBack = () => {
    setIsMemeSelected(false);
    setFormState({
      ...formState,
      imageUrl: '',
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

  const gifContainerStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    margin: '0 -10px'
  };

  const gifStyle = {
    padding: '10px',
    width: getGifWidth(),
    height: getGifHeight(),
    cursor: 'zoom-in',
  };

  const zoomedImageStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 999999,
    maxHeight: '90vh',
    height: 'auto',
    width: 'auto',
    cursor: 'zoom-out',
  };

  return (
    <div className="flex justify-center items-center flex-col space-y-4">
      {!isMemeSelected ? (
        <>
          <h2>Search for a gif</h2>
          <input
            name='gifSearch'
            type='text'
            placeholder='Search for a gif'
            onChange={handleSearch}
            className="border border-gray-300 px-2 py-1 rounded-md"
          />
          {gifs.length > 0 && (
            <div style={gifContainerStyle}>
              {gifs.map((gif) => (
                <div
                  style={gifStyle}
                  key={gif.id}
                  onClick={() => handleGifClick(gif.images.original.url)}
                >
                  <img
                    src={gif.images.fixed_height.url}
                    alt={gif.title}
                  />
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
          >
            <img
              src={formState.imageUrl}
              alt="Selected Meme"
              style={zoomedImageStyle}
              onClick={handleGoBack}
            />
          </div>
          <button onClick={() => setIsMemeSelected(false)}>Show Search Bar</button>
        </>
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
