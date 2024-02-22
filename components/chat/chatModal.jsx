'use client'
import React, { useEffect, useState } from 'react';
import { RiShining2Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoChatbubbleOutline, IoSend } from "react-icons/io5";
import useUserInfo from '@/hooks/useUser';

const ChatModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [botMessage, setBotMessage] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const userInfo = useUserInfo();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:5000/chatbot');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await res.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (e) => {
    setUserMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const botResponse = getBotResponse(userMessage.toLowerCase());
    setBotMessage(botResponse);
    setUserMessage('');
   
    setChatHistory(prevHistory => [...prevHistory, { userMessage, botResponse }]);
  };
  

  const getBotResponse = (message) => {
    
    if (message.toLowerCase() === 'hi') {
        return "Hello, how can I help you?";
    } else if (message.toLowerCase().includes('thank you') || message.toLowerCase().includes('thank for your help')) {
        return "You're welcome!";
    } else if (message.toLowerCase().includes('you are so sweet')) {
    } else if (message.toLowerCase().includes('can you help me') || message.toLowerCase().includes('help')) {
        return "Sure, how can I help you?";
    } else if (message.toLowerCase().includes('you are so sweet')) {
        return "Sorry! I'm an Artificial Intelligence program.";
    }
    
    
    const movie = data.find((movie) => message.toLowerCase().includes(movie.title.toLowerCase()));
   

    if(!movie){
      return "Sorry, I couldn't find information about that movie";
    }
    

    
    let response = '';
    

    // Respond based on the user's query
    if (message.includes('box office collection')) {
        response += `The box office collection of ${movie.title} is ${movie.boxOffice}. `;
    }
    if (message.includes('total income')) {
        response += `total income ${movie.title} is ${movie.boxOffice}. `;
    }

    if (message.includes('release date')) {
        response += `The release date of ${movie.title} is ${movie.releaseDate}.`;
    }
    if (message.includes('director')) {
        response += `The director name of ${movie.title} movie is ${movie.director}.`;
    }

  
    if (response === "") {
        return "I'm sorry, I didn't understand that. Please specify if you want to know about the box office collection or the release date.";
    }

    return response;
};



  return (
    <>
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-full w-16 h-16  bg-black hover:bg-gray-700 mr-16 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        data-state={isOpen ? 'open' : 'closed'}
        onClick={toggleModal}
      >
        <IoChatbubbleOutline className='w-8 h-8' />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className="bg-gray-100 h-[500px] flex flex-col max-w-lg mx-auto"
          >
            <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
              <img src={userInfo?.photoURL} id="login" className="hover:bg-blue-400 rounded-md h-6 w-6">
                
              </img>
              <span>Chatbot</span>
              <div className="relative inline-block text-left">
                <button onClick={toggleModal} id="setting" className="hover:bg-blue-400 rounded-md p-1">
                  <IoMdClose />
                </button>
                
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col space-y-2">
                {chatHistory.map((chat, index) => (
                  <React.Fragment key={index}>
                    {/* User message */}
                    <div className="flex justify-end">
                      <div className="bg-blue-200 text-black p-2 rounded-lg max-w-xs">
                        {chat.userMessage}
                      </div>
                    </div>
                    {/* Bot response */}
                    <div className="flex">
                      <div className="bg-gray-300 text-black p-2 rounded-lg max-w-xs">
                        {chat.botResponse}
                      </div>
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 flex items-center">
              <input type="text" placeholder="Type your message..." className="flex-1 bg-black border rounded-full px-4 py-2 focus:outline-none" value={userMessage} onChange={handleChange} />
              <button  type="submit" className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none" onClick={handleSubmit}>
                <IoSend />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatModal;