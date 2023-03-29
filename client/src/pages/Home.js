import { useQuery } from '@apollo/client';
import Header from '../components/Header';
import MemeGallery from '../components/MemeGallery';
import { GET_MEMES } from '../utils/queries';

function Home() {
  const { loading, error, data } = useQuery(GET_MEMES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error 🤦 </p>;

  return (
    <div>
      <Header />
      <MemeGallery memes={data.memes} />
    </div>
  );
}

export default Home;