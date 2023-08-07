import { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/ayu-dark.css";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/closebrackets";
import PropTypes from "prop-types";
import Actions from "../pages/Actions.js";

const Editor = ({ socketRef, roomId, onCodeChange }) => {
  const textRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    let editorInstance = null;

    async function init() {
      if (textRef.current) {
        editorInstance = CodeMirror.fromTextArea(textRef.current, {
          mode: {
            name: "javascript",
            json: true,
          },
          theme: "ayu-dark",
          autoCloseTags: true,
          autoCloseBrackets: true,
          lineNumbers: true,
        });

        // Add a null check before ttaching the event listener
        editorInstance.on("change", (instance, changes) => {
          const { origin } = changes;
          const code = instance.getValue();
          onCodeChange(code);
          if (origin !== "setValue") {
            socketRef.current.emit(Actions.CODE_CHANGE, {
              roomId,
              code,
            });
          }
        });
      }
    }

    init();

    editorRef.current = editorInstance;

    return () => {
      // Clean up CodeMirror instance when the component is unmounted
      if (editorInstance) {
        editorInstance.toTextArea();
      }
    };
  }, []);

  useEffect(() => {
    if (socketRef.current) {
      socketRef.current.on(Actions.CODE_CHANGE, ({ code }) => {
        console.log("receiving", code, "editor");
        if (code !== null) {
          editorRef.current.setValue(code);
        }
      });
    }

    return () => {
      socketRef.current.off(Actions.CODE_CHANGE);
    };
  }, [socketRef.current]);
  return <textarea ref={textRef} id="realtimeEditor"></textarea>;
};

Editor.propTypes = {
  socketRef: PropTypes.object.isRequired,
  roomId: PropTypes.string.isRequired,
  onCodeChange : PropTypes.func
};

export default Editor;
