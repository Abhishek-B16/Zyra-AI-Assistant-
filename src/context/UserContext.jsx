import React, { Children, createContext, useState } from 'react'
export const datacontext = createContext();
import generateResponse from '../hf';


const UserContext = ({ children }) => {

  let [speaking, setspeaking] = useState(false);
  let [prompt, setprompt] = useState("listening...");
  let [response, setresponse] = useState(false);

    
        function speak(text){
            let text_speak = new SpeechSynthesisUtterance(text)
            text_speak.volume=1;
            text_speak.rate=1;
            text_speak.pitch=1;
            text_speak.lang="HI-GB"

            // text_speak.onstart=()=>{
              // setspeaking(true);
            // }

            text_speak.onend =()=>{
                setspeaking(false);
            }

            window.speechSynthesis.speak(text_speak)
        }

async function airesponse(prompt){
    try {
      let text = await generateResponse(prompt)
      // let newtext = text.split("**")&&text.split("*")&& text.replace("google","Abhishek badave")&&text.replace("Google","Abhishek badave")&&text.replace("openai","Abhishek badave")&&text.replace("OpenAI","Abhishek badave")&&text.replace("ChatGPT","Zyra")&&text.replace("chatgpt","Zyra")&&text.replace("Bing","Zyra")&&text.replace("bing","Zyra");
      let newtext = text
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/google/gi, "Abhishek badave")
      .replace(/openai/gi, "Abhishek badave")
      .replace(/chatgpt/gi, "Zyra")
      .replace(/bing/gi, "Zyra");// console.log(text);
      setprompt(newtext);
      speak(newtext);
      setresponse(true);
      // setTimeout(() => {
      //   setspeaking(false);
        
      // }, 5000);
      
    } catch (error) {
      console.error("AI response failed:", error);
    }
}

       let speechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;



let recognition = new speechRecognition();

        recognition.onresult=(e)=>{
            let current = e.resultIndex;
            let transcript = e.results[current][0].transcript;
            console.log(transcript);
            setprompt(transcript);
            // airesponse(transcript);
            takeCommand(transcript.toLowerCase());
        }

        function takeCommand(command){
          const now = new Date();

  if (command.includes("open") && command.includes("youtube")) {
    window.open("https://www.youtube.com", "_blank");
    speak("Opening YouTube");
    setresponse(true);
    setprompt("Opening YouTube..");
  } else if (command.includes("open") && command.includes("google")) {
    window.open("https://www.google.com", "_blank");
    speak("Opening Google");
    setresponse(true);
    setprompt("Opening Google..");
  } else if (command.includes("open") && command.includes("instagram")) {
    window.open("https://www.instagram.com", "_blank");
    speak("Opening Instagram");
    setresponse(true);
    setprompt("Opening Instagram..");
  } else if (command.includes("time")) {
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    speak(`The time is ${timeString}`);
    setresponse(true);
    setprompt(`The time is ${timeString}`);
  } else if (command.includes("date")) {
    const dateString = now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    speak(`Today's date is ${dateString}`);
    setresponse(true);
    setprompt(`Today's date is ${dateString}`);
  } else {
    airesponse(command);
  }
          // if(command.includes("open") && command.includes("youtube") ){
          //   window.open("https://www.youtube.com","_blank")
          //   speak("Opening YouTube")
          //   setprompt("Opening YouTube..")
          // }
          // else{
          //   airesponse(command);
          // }
        }
        let value={
            recognition,
            speaking,
            setspeaking,
            prompt,
            setprompt,
            response,
            setresponse
          };
    
  return (
    <div>
        <datacontext.Provider value={value}>
            {children}
        </datacontext.Provider>
      
    </div>
  )
}

export default UserContext 

