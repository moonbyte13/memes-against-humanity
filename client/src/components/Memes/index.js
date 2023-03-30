import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_MEMES } from '../../utils/queries';

function Memes() {
  const [memes, setMemes] = useState([]);
  const { loading, data } = useQuery(QUERY_MEMES);

  useEffect(() => {
    if (data) {
      setMemes(data.memes);
    } else if (!loading) {
      console.error('something went wrong!');
    }
  }, [data, loading]);

  return (
    <div>
      <div className="gallery grid grid-cols-2 gap-4">
        {memes.map((meme) => (
          <img
            key={meme._id}
            src={meme.imageUrl}
            alt={meme.title}
            className='w-full object-cover self-center'
          />
        ))}
      </div>
    </div>
  );
}

export default Memes;