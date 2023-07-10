import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="homePageWrapper">
      <div className="formWrapper"> 
      <div className='logoContainer'>
        <FontAwesomeIcon className='logo mainLogo' icon={faCode} />
        <h2 className='mainLogo logoText'>Realtime Collaboration</h2>
      </div>
        <h4 className="mainLable">Enter Room ID</h4>
        <div className="inputGroup">
          <input type="text" className="inputBox" placeholder="Room ID" />
          <input type="text" className="inputBox" placeholder="UserName" />
          <button className="btn joinBtn">Join</button>
          <sapn className="createInfo">
            If you don&apos;t have a Room Id then create <a className="createNewBtn" href="#">new Room</a>
          </sapn>
        </div>
      </div>
    </div>
  )
} 

export default Home