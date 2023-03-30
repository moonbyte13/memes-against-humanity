import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setFormState({
      email: '',
      password: '',
    });
  };
  return (
    <div className='flex flex-col justify-center p-4'>
      <h2 className='text-center font-semibold p-2'>Login</h2>
      {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form 
                onSubmit={handleFormSubmit} 
                className='flex flex-col self-center border rounded-lg border-black w-4/5 md:w-3/5'
              >
                <input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  className='p-1 rounded-t-lg border-b border-black bg-transparent placeholder:text-gray-800'
                  autoComplete='off'
                />
                <input
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                  className='p-1 bg-transparent border-b border-black placeholder:text-gray-800'
                  autoComplete='off'
                />
                <button
                  className="btn btn-block btn-primary hover:cursor-pointer"
                  type="submit"
                >
                  Login
                </button>
              </form>
            )}

            {error && (
              <div className='p-2 flex justify-center'>
                {error.message}
              </div>
            )}
    </div>
  )
}

export default Login;