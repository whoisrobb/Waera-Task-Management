import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { serverUrl } from '../utils/utils';

const Sidebar = () => {
    const navigate = useNavigate();

    const [boardName, setBoardName] = useState('');
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [description, setDescription] = useState('');
    const [boardModal, setBoardModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('accessToken')

        if (token) {
            const decodedToken = jwtDecode(token)
            setUserId(decodedToken.userId)
            setUserData(decodedToken)
        }
    }, []);

    const handleBoardCreate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('accessToken');
        if (!token) {
            return 'Token Unavailable!'
        }
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.userId;

        const formData = { boardName, description, userId };

        try {
            const response = await fetch(`${serverUrl}/user/boards/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                const responseData = await response.json();
                setBoardName('');
                setDescription('');
                setBoardModal(false);
                navigate(`/workspace/boards/${responseData.BoardID}`);
            } else {
                console.error(response.status, response.statusText);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const placehold = () => {
        console.log('stuff')
    }

  return (
    <div className='sidebar'>
        <div className="logo">
            <button onClick={() => navigate(`/workspace/${userId}`)}>Waera</button>
        </div>
        <div className="main-nav">
            <h3>main</h3>
            <nav>
                <Link to={`/workspace/${userId}`} className="btn-boards">
                    workspace
                </Link>
                <Link to={'#'} className="btn-teams">
                    teams
                </Link>
                <Link to={'#'} className="btn-workspace-settings">
                    workspace settings
                </Link>
            </nav>
        </div>
        <div className="workspace-views">
            <h3>workspace views</h3>
            <p className="item">table</p>
            <p className="item">calendar</p>
            <p className="item">kanban board</p>
        </div>
        <div className="actions" onMouseLeave={() => setBoardModal(false)}>
            <h3>actions</h3>
            <div className="create">
                <p>create board</p>
                <button onClick={() => setBoardModal(prev => !prev)}>+</button>
            </div>
            {boardModal &&
            <div className="create-board modal">
                <form onSubmit={handleBoardCreate}>
                    <div className="input-group">
                        {/* <label htmlFor="boardname">board name</label> */}
                        <input
                            type="text"
                            name="boardName"
                            placeholder="board name"
                            value={boardName}
                            onChange={(e) => setBoardName(e.target.value)}
                        />
                    </div>
                    
                    <div className="input-group">
                        {/* <label htmlFor="description">description</label> */}
                        <input
                            type="text"
                            name="description"
                            placeholder="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="btn-group">
                        <button type='submit' className='primary'>create board</button>
                        <button type='button' onClick={() => setBoardModal(false)} className='secondary'>cancel</button>
                    </div>
                </form>
            </div>}
            <div className="settings">
                <p className="item">settings</p>
            </div>
        </div>
        <div className="profile" onMouseLeave={() => setUserModal(false)}>
            <button className="secondary" onClick={() => {setUserModal((prev) => !prev)}}>
                <div className="pfp"></div>
                {userData &&
                <div className="user">
                    <p className="name">{userData.username}</p>
                    <h4 className="email">{userData.email}@gmail.com</h4>
                </div>}
            </button>
            {userModal &&
            <div className="modal">
                <div className="user">
                    <div className="pfp">
                    PN
                    </div>
                    <div className="details">
                    <p>{userData.username}</p>
                    <h6>{userData.email}</h6>
                    </div>
                </div>
                <button className="logout">
                    log out
                </button>
            </div>}
        </div>
    </div>
  )
}

export default Sidebar