import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { serverUrl } from '../utils/utils';

const Workspace = () => {
    const navigate = useNavigate();
    const [userBoards, setUserBoards] = useState();
    
    useEffect(() => {
        fetchUserBoards();
    }, [])

    const fetchUserBoards = async () => {
        const token = localStorage.getItem('accessToken');
        const userId = jwtDecode(token).userId;
        try {
            const response = await fetch(`${serverUrl}/user/boards/${userId}`)
            const data = await response.json();
            setUserBoards(data);
        } catch (err) {
            console.error(err);
        }
    };

    console.log(userBoards);

  return (
    <section id='workspace'>
        <div className="wrapper">
            <div className="boards">
                <div className="personal-boards">
                    <h3>personal boards</h3>
                    {userBoards &&
                        userBoards.map((board) => (
                            <Link key={board.BoardID} to={`/workspace/boards/${board.BoardID}`}>{board.BoardName}</Link>
                        ))
                    }
                </div>
                <div className="team-boards"></div>
            </div>
        </div>
    </section>
  )
}

export default Workspace