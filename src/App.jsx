import React, { useContext } from 'react'
import './App.css'
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/UserContext';
import speakimg from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"

const App = () => {
  let { recognition ,speaking, setspeaking, prompt, setprompt,response, setresponse} = useContext(datacontext);

  return (
    <div className='app'>
      <img src={va} alt="Zyra Logo" id='zyra' />
      <span>I'm Zyra,Your Advanced Virtual Assistant</span>
      
      {!speaking? <button onClick={() => {
        setprompt("listening...");
        setspeaking(true);
        setresponse(false);
        recognition.stop();
       recognition.start();
      }}> Click here <CiMicrophoneOn /></button>
    :
    <div class="response">
      {!response? 
      <img src={speakimg} alt="AI Thinking..." id="speak" /> 
      :
      <img src={aigif} alt="Typing..." id="ai" />}
       {/* <img src={speakimg} alt="Typing..." id="speak" /> */}
       <p>{prompt}</p>
    </div>
      
      }
      
    </div>
  )
}

export default App


