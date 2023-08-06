import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import Client from "../components/Client";
import Logo from "../components/Logo";
import Editor from "../components/Editor";
import { initSocket } from "../socket";
import Actions from "./Actions.js";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";

const EditorPage = () => {
  const socketRef = useRef(null);
  const codeRef = useRef(null);
  const location = useLocation();
  const reactNavigator = useNavigate();
  const emittedJoinEvent = useRef(false);
  const [clients, setClients] = useState([]);
  const { roomId } = useParams();


  const handleErrors = useMemo(() => {
    return (err) => {
      console.log(`socket error ${err}`);
      reactNavigator("/");
      toast.error("Socket connection failed, please try again later");
    };
  }, [reactNavigator]);

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      // Listening for join event

      if (!emittedJoinEvent.current) {
        socketRef.current.emit(Actions.JOIN, {
          roomId,
          username: location.state?.username,
        });
        emittedJoinEvent.current = true;
      }

      // Listening for joined event

      socketRef.current.on(
        Actions.JOINED,
        ({ socketId, clients, username }) => {
          if (username !== location.state?.username) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          socketRef.current.emit(Actions.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
        }
      );

      // Listening for disconnected event

      socketRef.current.on(Actions.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room.`);
        setClients((prev) => {
          return prev.filter((client) => client.socketId !== socketId);
        });
      });
    };
    init();
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(Actions.JOINED);
        socketRef.current.off(Actions.DISCONNECTED);
      }
    };
  }, [roomId, location.state?.username, handleErrors]);

  if (!location.state) {
    return <Navigate to="/" />;
  }

  async function copyRoomID() {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("RoomID has been copied successfully.");
    } catch (err) {
      toast.error("soory! some thing went wrong.");
      console.error(err);
    }
  }

  function leaveRoom() {
    reactNavigator("/");
  }

  return (
    <div className="mainWrap">
      <div className="aside">
        <div className="asideInner">
          <div className="logoWraper">
            <Logo />
          </div>
          <h3>Connected</h3>
          <div className="clientsList">
            {clients.map((client) => (
              <Client key={client.socketId} username={client.username} />
            ))}
          </div>
        </div>
        <button className="btn copyBtn" onClick={copyRoomID}>
          Copy RoomID
        </button>
        <button className="btn leaveBtn" onClick={leaveRoom}>
          Leave
        </button>
      </div>
      <div className="editorWrap">
        <Editor
          socketRef={socketRef}
          roomId={roomId}
          onCodeChange={(code) => {
            codeRef.current = code;
          }}
        />
      </div>
    </div>
  );
};

export default EditorPage;
