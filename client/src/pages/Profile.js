import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { useMutation } from '@apollo/client';
import { REMOVE_MEME } from '../utils/mutations';
import { EDIT_EMAIL } from '../utils/mutations';

function Profile() {
  const { loading, error, data } = useQuery(GET_ME);
  const [removeMeme] = useMutation(REMOVE_MEME);
  const [editEmail] = useMutation(EDIT_EMAIL);
  const [newEmail, setNewEmail] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading user information</div>;
  }

  const { me } = data;

  const handleRemoveMeme = (memeId) => {
    removeMeme({
      variables: { memeId },
      update(cache, { data: { removeMeme } }) {
        const existingMe = cache.readQuery({ query: GET_ME });
        const newMemes = existingMe.me.memes.filter((meme) => meme._id !== memeId);
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...existingMe.me, memes: newMemes } },
        });
      },
    });
  };

  const handleEditEmail = (e) => {
    e.preventDefault();
    editEmail({
      variables: { email: newEmail },
      update(cache, { data: { editEmail } }) {
        const existingMe = cache.readQuery({ query: GET_ME });
        cache.writeQuery({
          query: GET_ME,
          data: { me: { ...existingMe.me, email: editEmail.email } },
        });
      },
    });
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };


  return (
    <div>
      <h2>{me.username}'s Profile</h2>
      <p>Email: {me.email}</p>
      <button className="btn btn-primary" onClick={togglePopup}>Edit Email</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <form onSubmit={handleEditEmail}>
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                required
              />
              <button className="btn btn-primary">Submit</button>
            </form>
            <button className="btn btn-danger" onClick={togglePopup}>Cancel</button>
          </div>
        </div>
      )}
      <h3>Saved Memes</h3>
      <div className="card-columns">
        {me.memes.map((meme) => (
          <div className="card" key={meme._id}>
            <img src={meme.imageUrl} className="card-img-top" alt={meme.title} />
            <div className="card-body">
              <h5 className="card-title">{meme.title}</h5>
              <p className="card-text">{meme.description}</p>
              <button className="btn btn-danger" onClick={() => handleRemoveMeme(meme._id)}>Delete</button>
              </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
