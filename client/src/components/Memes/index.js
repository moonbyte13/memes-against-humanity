import { useState, useEffect } from 'react';
import { createGiphyFetch } from '../../utils/giphyApi';
import { Link, useParams } from 'react-router-dom';

const giphyFetch = createGiphyFetch();

function GiphyGallery() {
  const [gifs, setGifs] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState('fail');
  const { id } = useParams(); // get the ID from the URL params

  useEffect(() => {
    async function fetchGifs() {
      const { data } = await giphyFetch.gifs('memes', selectedSubcategory);
      setGifs(data);
    }
    fetchGifs();
  }, [selectedSubcategory]);

  // filter the GIFs array to find the one with the matching ID
  const selectedGif = gifs.find(gif => gif.id === id);

  // define the list of subcategories for the dropdown
  const subcategories = [
    'Fail',
    'Confused',
    'Dank memes',
    'Deal with it',
    'Feels',
    'Forever alone',
    'Hair flip',
    'Judge Judy',
    'Like a boss',
    'Look at all the fucks I give',
    'Sips tea',
    'Steal yo girl'
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <select
            className="px-2 py-1 border rounded"
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            {subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>{subcategory}</option>
            ))}
          </select>
        </div>
        {selectedGif && (
          <div>
            <Link to="/memes">Back to gallery</Link>
          </div>
        )}
      </div>
      {selectedGif ? (
        <div className="h-3/6 flex flex-col">
          <img
            src={selectedGif.images.downsized_medium.url}
            alt={selectedGif.title}
            className='h-3/5 object-contain'
          />
          <div className="flex justify-center mt-4">
            <button className="mr-4 px-4 py-2 border rounded">Save</button>
            <button className="px-4 py-2 border rounded">Like</button>
          </div>
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
