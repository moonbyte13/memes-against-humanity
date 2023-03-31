import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

function Header() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  function redirect(event) {
    event.preventDefault();
    window.location.href = '/';
  }

  return (
    <header className='flex flex-col md:flex-row items-center md:justify-between'>
      <h1 
        className='w-fit text-3xl md:text-4xl lg:text-5xl hover:cursor-pointer md:pb-0 pb-3'
        onClick={redirect}
      >
        Memes Against Humanity
      </h1>
      <nav className='w-fit'>
        {Auth.loggedIn() ? (
              <>
                <Link to="/profile" className='mr-2'>
                  Profile
                </Link>
                <button onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className='mr-2'
                >
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