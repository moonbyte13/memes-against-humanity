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
      <div className="gallery">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.downsized_medium.url}
            alt={gif.title}
            width='50%'
          />
        ))}
      </div>
    </div>
  );
}

export default GiphyGallery;
