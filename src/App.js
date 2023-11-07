import React,{useState,useRef, useEffect} from "react";
import chatgpt from "./assets/chatgpt.svg";
import addbtn from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendImg from "./assets/send.svg";
import logo from "./assets/chatgptLogo.svg";
import userLogo from "./assets/user-icon.png";
import "./App.css";
import { sendMsgToOpenAI } from "./openai";
function App() {
  let msgEnd=useRef(null);

  const [input,setInput]=useState("");
  const [messages,setMessages]=useState([{
     text:"Hi, I am Chatgpt",
     isBot:true,
  }])

  
  useEffect(()=>{
    msgEnd.current.scrollIntoView();
  },[messages])
  
   const handleSend=async()=>
   {
    const text=input;
    setInput('');
    setMessages([...messages,{text,isBot:false}])
    const res= await sendMsgToOpenAI(input);
     setMessages([
      ...messages,
      {text:text,isBot:false},
      {text:res,isBot:true}
     ]);
   }
    async function handleEnter(e)
   {
     if(e.key=="Enter")
     {
       await handleSend();
     }
   }

   const handleQuery= async (e)=>
   {
    const text=e.target.value;
    setInput('');
    setMessages([...messages,{text,isBot:false}])
    const res= await sendMsgToOpenAI(input);
     setMessages([
      ...messages,
      {text:text,isBot:false},
      {text:res,isBot:true}
     ]);

   }
  return (
    <div className="App">
      <div className="sidebar">
        <div className="upperside">
          <div className="uppersideTop">
            <img src={chatgpt} alt="logo" className="logo" />
            <span className="brand">chatGPT</span>
          </div>
          <button className="midButton" onClick={()=>window.location.reload()}>
            <img src={addbtn} alt="addBtn" className="addBtn" />
            New Chat
          </button>
          <div className="uppersidequery">

          {messages.map((message,i)=>
            
             !(message.isBot) && <button className="query" onClick={handleQuery} value={message.text}>
             <img src={msgIcon} alt="query" /> {message.text}
           </button> 
            
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
          <div ref={msgEnd} />
        </div>
        
        <div className="footer">
          <div className="inp">
            <input type="text" placeholder="Send a message"  value={input} onKeyDown={handleEnter} onChange={(e)=>{setInput(e.target.value)}} />
            <button className="send"  onClick={handleSend}>
              <img src={sendImg} alt="" className="sendImg" />
            </button>
          </div>
          <p>
            Chatgpt may produce inaccurate information about people place or
            facts
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
