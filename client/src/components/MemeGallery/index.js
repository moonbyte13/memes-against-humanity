import { useState, useEffect } from 'react';
import { createGiphyFetch } from '../../utils/giphyApi';

const giphyFetch = createGiphyFetch();

function GiphyGallery() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    async function fetchGifs() {
      const { data } = await giphyFetch.gifs('memes', 'fail');
      setGifs(data);
    }
    fetchGifs();
  }, []);

  return (
    <div>
      <div className="gallery grid grid-cols-2 gap-4">
        {gifs.map((gif) => (
          <img
            key={gif.id}
            src={gif.images.downsized_medium.url}
            alt={gif.title}
            className='w-full object-cover self-center'
          />
        ))}
      </div>
    </div>
  );
}

export default GiphyGallery;
