import { useState } from "react"
import Client from "../components/Client"
import Logo from "../components/Logo"
import Editor from "../components/Editor"

const EditorPage = () => {
  const [clients , setClients] = useState([
    {
      socketId : 1 ,
      username : "javed"
    },
    {
      socketId : 2 ,
      username : "sameer"
    }
  ])
  return (
    <div className="mainWrap">
        <div className="aside">
          <div className="asideInner">
            <div className="logoWraper">
              <Logo />
            </div>
            <h3>Connected</h3>
            <div className="clientsList">
                {
                  clients.map(client => (
                    <Client key={client.socketId} username={client.username} />
                  ))
                }
            </div>
          </div>
          <button className="btn copyBtn">Copy RoomID</button>
          <button className="btn leaveBtn">Leave</button>
        </div>
        <div className="editorWrap">
          <Editor />
        </div>
    </div>
  )
}

export default EditorPage