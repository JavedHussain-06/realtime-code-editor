import { v4 as uuid4 } from 'uuid';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'
import Logo from '../components/Logo';


const Home = () => {

  const navigate = useNavigate()
  const [roomID, setRoomId] = useState('')
  const [username , setUsername] = useState('')


  function createNewRoom(e) {
    e.preventDefault()
    const id = uuid4()
    setRoomId(id)
    toast.success("Created a new room")
  }

  function joinRoom(){
    if(!roomID || !username){
      toast.error("RoomID And Username both required")
      return
    }
    navigate(`/editor/${roomID}`,{
      state : {
        username
      }
    })
  }

  function handlleInputEnter(e){
    if(e.code === "Enter"){
      joinRoom()
    }
  }

  return (
    <div className="homePageWrapper">
      <div className="formWrapper">
       <Logo />
        <h4 className="mainLable">Enter Room ID</h4>
        <div className="inputGroup">
          <input
            type="text"
            className="inputBox"
            placeholder="Room ID"
            onChange={(e)=>setRoomId(e.target.value)}
            value={roomID}
            onKeyUp={handlleInputEnter}
          />
          <input
            type="text"
            className="inputBox"
            placeholder="UserName"
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            onKeyUp={handlleInputEnter}
          />
          <button className="btn joinBtn" onClick={joinRoom}>Join</button>
          <p className="createInfo">
            If you don&apos;t have a Room Id then create &nbsp;
            <span onClick={createNewRoom} className="createNewBtn" href="">New Room</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home