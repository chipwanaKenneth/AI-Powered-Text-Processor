import { useState } from "react";
import "./Chat.css";

function AiResponce({ aiOutput }) {
  return (
    <div className="aiResponceRow">
      <span className="aiResponce">{aiOutput?.output}</span>
    </div>
  );
}

function AiAwaitResponce() {
  return (
    <div className="aiResponceRow">
      <span className="aiResponce">Generating......</span>
    </div>
  );
}

function Chat({ hInput, aiOutput, isLoading }) {
  if (hInput?.input === "") return null;

  if (isLoading) {
    return (
      <div className="chatBody">
        <div className="chat">
          <AiAwaitResponce />
        </div>
      </div>
    );
  }
  if (aiOutput?.output !== "") {
    return (
      <div className="chatBody">
        <div className="chat">
          <AiResponce aiOutput={aiOutput} />
        </div>
      </div>
    );
  }
}

export default Chat;
