import React from 'react'
import React,{useState,useRef, useEffect} from "react";
import logo from "./assets/chatgptLogo.svg";
import userLogo from "./assets/user-icon.png";
function Main() {
    const [input,setInput]=useState("");
    const [messages,setMessages]=useState([{
       text:"Hi, I am Chatgpt",
       isBot:true,
    }])
   
    let msgEnd=useRef(null);
    useEffect(()=>{
        msgEnd.current.scrollIntoView();
      },[messages])
  return (
    <div className="main">
    <div className="chatBox">
     
     
      {messages.map((message,i)=>
      
        <div  key={i}className={message.isBot?"chat bot":"chat"}>
          <img src={message.isBot?logo:userLogo} alt="" className="mianImg" />
        <p className="text">
          {message.text}
        </p>
      </div>
      )}
      </div>
      <div ref={msgEnd} />
    </div>
  )
}

export default Main