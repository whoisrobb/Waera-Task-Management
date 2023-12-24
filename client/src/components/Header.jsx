import React, { useState } from 'react'

const Header = () => {
  const [searchResults, setSearchResults] = useState('');
  const [userModal, setUserModal] = useState(false);

  const runSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className='header'>
      <div className="search">
        <form onSubmit={runSearch}>
          <input
            type="text"
            name=""
            // value={searchResults}
            placeholder='search'
          />
        </form>
      </div>
      {/* <div className="profile" onMouseLeave={() => setUserModal(false)}>
        <button className='pfp' onClick={() => setUserModal((prev) => !prev)}>PN</button>
        {userModal &&
        <div className="modal">
          <div className="user">
            <div className="pfp">
              PN
            </div>
            <div className="details">
              <p>Peter Nyawanga</p>
              <h6>nyawangapetero@gmail.com</h6>
            </div>
          </div>
          <button className="logout">
            log out
          </button>
        </div>}
      </div> */}
    </div>
  )
}

export default Header