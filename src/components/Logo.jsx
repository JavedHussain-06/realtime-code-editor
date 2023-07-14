import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode } from '@fortawesome/free-solid-svg-icons';

const Logo = () => {
  return (
     <div className='logoContainer'>
    <FontAwesomeIcon className='logo mainLogo' icon={faCode} />
    <h2 className='mainLogo logoText'>Realtime Collaboration</h2>
  </div>
  )
}

export default Logo