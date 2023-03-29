import { useState, useEffect } from 'react';
import { createGiphyFetch } from '../../utils/giphyApi';

const giphyFetch = createGiphyFetch();

function GiphyGallery() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    async function fetchGifs() {
      const { data } = await giphyFetch.search('memes', { limit: 20 });
      setGifs(data);
    }
    fetchGifs();
  }, []);

  return (
    <div>
      <h2>Popular Memes</h2>
      <div className="gallery grid grid-cols-2 gap-4 p-4">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.downsized_medium.url}
            alt={gif.title}
          />
        ))}
      </div>
    </div>
  );
}

export default GiphyGallery;
