import { useState, useEffect } from 'react';

function GiphyGallery() {
  const [gifs, setGifs] = useState([]);

  useEffect(() => {
    async function fetchGifs() {
      const response = await fetch(
        // 'https://api.giphy.com/v1/gifs/search?q=memes&api_key=SizPu7Wh56wn3UdCbKPje0GsFgd8wAGf&limit=20'
        // 'https://api.giphy.com/v1/gifs/search?q=memes&api_key=pzUFsEoTKHdnu0i33kOqTa9jbMCLc3rg&limit=20'
        // 'https://api.giphy.com/v1/gifs/search?q=memes&api_key=YOUR_APIKEY&limit=20'
      );
      const json = await response.json();
      setGifs(json.data);
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
          />
        ))}
      </div>
    </div>
  );
}

export default GiphyGallery;