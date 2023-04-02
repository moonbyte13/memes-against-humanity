import { useState, useEffect } from 'react';
import { createGiphyFetch } from '../../utils/giphyApi';
import { Link, useParams } from 'react-router-dom';

const giphyFetch = createGiphyFetch();

function GiphyGallery() {
  const [gifs, setGifs] = useState([]);
  const { id } = useParams(); // get the ID from the URL params

  useEffect(() => {
    async function fetchGifs() {
      const { data } = await giphyFetch.gifs('memes', 'fail');
      setGifs(data);
    }
    fetchGifs();
  }, []);

  // filter the GIFs array to find the one with the matching ID
  const selectedGif = gifs.find(gif => gif.id === id);

  return (
    <div>
      {selectedGif ? (
        <div>
          <Link to="/memes">Back to gallery</Link>
          <img
            src={selectedGif.images.downsized_medium.url}
            alt={selectedGif.title}
            className='w-full object-cover self-center'
          />
        </div>
      ) : (
        <div className="gallery grid grid-cols-2 gap-4">
          {gifs.map((gif) => (
            <Link to={`/memes/${gif.id}`} key={gif.id}>
              <img
                src={gif.images.downsized_medium.url}
                alt={gif.title}
                className='w-full object-cover self-center'
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default GiphyGallery;
