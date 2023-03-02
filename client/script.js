import React, { useState } from "react";
import axios from "axios";

const serverApi = "https://openai-207p.onrender.com/";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSpeechRecognition = () => {
    // rozpoczęcie rozpoznawania mowy
    // przekazanie rozpoznanego tekstu do chatbota
  };

  const handleSendMessage = async (text) => {
    setMessages([...messages, { text, sender: "user" }]);
    setLoading(true);

    try {
      const response = await axios.post(serverApi, {
        prompt: text,
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage = data.bot.trim();
        setMessages([...messages, { text: botMessage, sender: "bot" }]);
      }
    } catch (err) {
      setError("Something went wrong!");
      console.log(err);
    }

    setLoading(false);
  };

  const handleSpeechSynthesis = (text) => {
    // syntezowanie mowy i odtwarzanie dźwięku
  };

  return (
    <div>
      <div id="chat_container">
        {messages.map((message, index) => (
          <div key={index} className={`wrapper ${message.sender}`}>
            <div className="chat">
              <div className="profile">
                <img
                  src={message.sender === "bot" ? bot : user}
                  alt={message.sender === "bot" ? "bot" : "user"}
                />
              </div>
              <div className="message">{message.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={handleSpeechRecognition}>Start recognition</button>
        <button onClick={() => handleSendMessage("Hello, bot!")}>
          Send message
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
