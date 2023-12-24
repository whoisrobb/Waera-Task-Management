import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { serverUrl } from '../utils/utils';

const Login = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('activeCard');
    const navigate = useNavigate();

    const [username, setUsername] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const formData = { value: username, password };

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await fetch(`${serverUrl}/auth/login`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
          })
          .then((response) => {
              if (response.ok) {
                  console.log('success');
              }
              return response.json();
          })
          .then((data) => {
              localStorage.setItem('accessToken', data.token);
              const userId = jwtDecode(data.token).userId;
              navigate(`/workspace/${userId}`);
          })
      } catch (err) {
          console.error(err);
      }
  };

  return (
    <section id='login'>
        <div className="wrapper">
            <div className="form-container">
                <h1>login</h1>
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        {/* <label htmlFor="username">Username</label> */}
                            <input
                                type="text"
                                name="username"
                                placeholder="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                    </div>

                    <div className="input-group">
                        {/* <label htmlFor="password">Password</label> */}
                            <input
                                type="text"
                                name="password"
                                placeholder="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                    </div>

                    <button type='submit' className='primary'>Login</button>

                    <p>
                        Don't have an account?
                        <Link to={'/register'}>register</Link>
                    </p>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Login