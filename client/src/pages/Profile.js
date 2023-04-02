import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';

function Profile() {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading user information</div>;
  }

  const { me } = data;

  return (
    <div>
      <h2>{me.username}'s Profile</h2>
      <p>Email: {me.email}</p>
      <p>Memes:</p>
      <ul>
        {me.memes.map((meme) => (
          <li key={meme._id}>{meme.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Profile;
