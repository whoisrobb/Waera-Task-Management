import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { serverUrl } from '../utils/utils';

const Register = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState(undefined);
    const [lastName, setLastName] = useState(undefined);
    const [username, setUsername] = useState(undefined);
    const [email, setEmail] = useState(undefined);
    const [password, setPassword] = useState(undefined);

    const formData = { firstName, lastName, username, email, password };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${serverUrl}/auth/register`, {
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
    <section id='register'>
        <div className="wrapper">
            <div className="form-container">
                <h1>register</h1>
                <form onSubmit={handleSubmit}>

                    <div className="input-group">
                        {/* <label htmlFor="firstname">First name</label> */}
                            <input
                                type="text"
                                name="firstName"
                                placeholder="first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                    </div>

                    <div className="input-group">
                        {/* <label htmlFor="lastName">Last name</label> */}
                            <input
                                type="text"
                                name="lastName"
                                placeholder="last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                    </div>

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
                        {/* <label htmlFor="email">Email</label> */}
                            <input
                                type="text"
                                name="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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

                    <button type='submit' className='primary'>register</button>

                    <p>
                        Already have an account?
                        <Link to={'/login'}>login</Link>
                    </p>
                </form>
            </div>
        </div>
    </section>
  )
}

export default Register