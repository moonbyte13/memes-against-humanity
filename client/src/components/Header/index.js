import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className='flex flex-row justify-between'>
      <h1 className='!w-fit'>
        Memes Against Humanity
      </h1>
      <nav className='w-fit'>
        {Auth.loggedIn() ? (
              <>
                <button onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  Login
                </Link>
                <Link to="/signup">
                  Signup
                </Link>
              </>
            )}
      </nav>
    </header>
  )
}

export default Header;