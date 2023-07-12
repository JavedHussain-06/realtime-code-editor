import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';
import { v4 as uuid4 } from 'uuid';
import { useState } from 'react';

const Home = () => {

  const [roomID, setRoomId] = useState('')
  const [username , setUsername] = useState('')
  console.log(username)
  function createNewRoom(e) {
    e.preventDefault()
    const id = uuid4()
    setRoomId(id)
  }
  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
        <div className='logoContainer'>
          <FontAwesomeIcon className='logo mainLogo' icon={faCode} />
          <h2 className='mainLogo logoText'>Realtime Collaboration</h2>
        </div>
        <h4 className="mainLable">Enter Room ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Room ID"
            onChange={(e)=>setRoomId(e.target.value)}
            value={roomID}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="UserName"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
          />
          <button className="btn joinBtn">Join</button>
          <span className="createInfo">
            If you don&apos;t have a Room Id then create &nbsp;
            <a onClick={createNewRoom} className="createNewBtn" href="#">New Room</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Home