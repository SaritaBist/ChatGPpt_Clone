import React from "react";
import chatgpt from "./assets/chatgpt.svg";
import addbtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import { sendMsgToOpenAI } from "./openai";

function Sidebar() {
  const handleQuery = async (e) => {
    const text = e.target.value;
    setInput("");
    setMessages([...messages, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(input);
    setMessages([
      ...messages,
      { text: text, isBot: false },
      { text: res, isBot: true },
    ]);
  };
  return (
    <div>
      <div className="sidebar">
        <div className="upperside">
          <div className="uppersideTop">
            <img src={chatgpt} alt="logo" className="logo" />
            <span className="brand">chatGPT</span>
          </div>
          <button
            className="midButton"
            onClick={() => window.location.reload()}
          >
            <img src={addbtn} alt="addBtn" className="addBtn" />
            New Chat
          </button>
          <div className="uppersidequery">
            {messages.map(
              (message, i) =>
                !message.isBot && (
                  <button
                    className="query"
                    onClick={handleQuery}
                    value={message.text}
                  >
                    <img src={msgIcon} alt="query" /> {message.text}
                  </button>
                )
            )}
          </div>
        </div>
        <div className="lowerside">
          <div className="listItems">
            <img src={home} alt="listImg" className="listItmsImg" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} alt="listImg" className="listItmsImg" />
            Saved
          </div>
          <div className="listItems">
            <img src={rocket} alt="listImg" className="listItmsImg" />
            upgrade to pro
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
