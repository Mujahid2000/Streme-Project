'use client'
import React, { useEffect, useState } from 'react';
import { getFirestore, query, collection, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import useUserInfo from '@/hooks/useUser';
import { app } from '@/utils/firebase-config';
import ProtectedRoute from '@/utils/ProtectedRoute';
import MainNavbar from '@/components/MainNavbar/MainNavbar';
import Sidebar from '../Sidebar';
import axios from 'axios';

const db = getFirestore(app);

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const userInfo = useUserInfo();
  const [isOpen, setIsOpen] = useState(false);
  const [dbessage, setStoreMessage] = useState('');
  console.log(userInfo?.userName);

  useEffect(() => {
    const q = query(collection(db, "message"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
    });
    return unsubscribe;
  }, []);

  const sendMessage = async () => {
    if (!userInfo) {
      console.error("User information not available.");
      return;
    }

    if (!userInfo?.userName) {
      console.error("User display name is undefined.");
      return;
    }

    try {
      await addDoc(collection(db, 'message'), {
        uid: userInfo?.uid,
        photoURL: userInfo?.photoURL,
        displayName: userInfo?.userName,
        text: newMessage,
        timestamp: serverTimestamp()
      });
      setNewMessage(""); // Clear the input field after sending the message
      await axios.post('http://localhost:5000/messageData', {
        message: newMessage,
        user: userInfo?.userName,
        
        
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSidebarToggle = () => {
    setIsOpen(!isOpen);
  };

  const storeMessage = async() =>{
      console.log('message');
  }



  return (
    <ProtectedRoute>
     <Sidebar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle}/>
    <MainNavbar isOpen={isOpen} handleSidebarToggle={handleSidebarToggle}></MainNavbar>
    <div className="flex mt-20 h-screen overflow-hidden">
      <div className="flex-1 flex flex-col">
        <header className="bg-slate-800 p-4 text-gray-700">
          <h1 className="text-2xl font-semibold text-white text-center">Global ChatBox</h1>
        </header>
        <div className="flex-1 overflow-y-auto p-4 pb-20">
        {messages.map(msg => (
              <div key={msg.id} className={`message flex ${msg.data.uid === userInfo?.uid ? 'justify-end' : 'justify-start'}`}>
                <div className={`message flex flex-row px-3 py-1 mt-3 gap-3 rounded-[20px] items-center ${msg.data.uid === userInfo?.uid ? 'text-white  flex-row-reverse' : 'm-2'}`}>
                  <img className='w-10 h-10 rounded-full' src={msg.data.photoURL} title={msg.data?.displayName} />
                  <p className={`${msg.data.uid === userInfo?.uid ? 'bg-blue-500 px-2 py-1 rounded-lg' : 'bg-gray-800 px-2 py-1 rounded-lg'}`}>{msg.data.text}</p>
                </div>
              </div>
            ))}
        </div>
        <div className="bg-gray-600 p-4 flex">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 text-white h-10 rounded px-3 text-sm bg-gray-800"
            type="text"
            placeholder="Type your message…"
          />
          <button type='submit' onClick={sendMessage} className='ml-4 px-4 py-2 text-white rounded-lg bg-blue-500'>Send</button>
        </div>
      </div>
    </div>
  </ProtectedRoute>
  
  
  );
};

export default ChatPage;



