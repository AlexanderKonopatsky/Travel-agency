import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT =
   window.location.host.indexOf('localhost') >= 0
      ? 'http://127.0.0.1:5000'
      : window.location.host;



export default function ChatBox(props) {
   const { userInfo } = props;
   const [socket, setSocket] = useState(null);
   const uiMessagesRef = useRef(null);
   const [isOpen, setIsOpen] = useState(false);
   const [messageBody, setMessageBody] = useState('');
   const [messages, setMessages] = useState([
      { name: 'Admin', body: 'Добрый день! Оставьте ваш вопрос здесь.' },
   ]);

   useEffect(() => {
      if (uiMessagesRef.current) {
         uiMessagesRef.current.scrollBy({
            top: uiMessagesRef.current.clientHeight,
            left: 0,
            behavior: 'smooth',
         });
      }
      if (socket) {

         socket.emit('onLogin', {
            _id: userInfo._id,
            name: userInfo.firstName,
            lastName: userInfo.lastName,
            isAdmin: userInfo.isAdmin,
         });
         socket.on('message', (data) => {
            setMessages([...messages, { body: data.body, name: data.name }]);
         });
      }
   }, [messages, isOpen, socket]);

   const supportHandler = () => {
      setIsOpen(true);
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
   };
   const submitHandler = (e) => {
      e.preventDefault();
      if (!messageBody.trim()) {
         alert('Ошибка. Пожалуйства напишите ваше сообщение.');
      } else {
         setMessages([...messages, { body: messageBody, name: userInfo.firstName,  lastName: userInfo.lastName, }]);
         setMessageBody('');
         setTimeout(() => {
            socket.emit('onMessage', {
               body: messageBody,
               name: userInfo.firstName,
               lastName: userInfo.lastName,
               isAdmin: userInfo.isAdmin,
               _id: userInfo._id,
            });
         }, 1000);
      }
   };
   const closeHandler = () => {
      setIsOpen(false);
   };
   return (
      <div className="chatbox">
         {!isOpen ? (
            <button type="button" onClick={supportHandler}>
               <i className="fas fa-comment-alt" />
            </button>
         ) : (
            <div className="card card-body">
               <div className="row">
                  <strong>Поддержка </strong>
                  <button type="button" onClick={closeHandler}>
                     <i class="fas fa-window-close" ></i>
                  </button>
               </div>
               <ul ref={uiMessagesRef}>
                  {messages.map((msg, index) => (
                     <li key={index}>
                        <strong>{`${msg.name}: `}</strong> {msg.body}
                     </li>
                  ))}
               </ul>
               <div>
                  <form onSubmit={submitHandler} className="row">
                     <input
                        value={messageBody}
                        onChange={(e) => setMessageBody(e.target.value)}
                        type="text"
                        placeholder="Напишите сообщение"
                     />
                     <button type="submit">Отправить</button>
                  </form>
               </div>
            </div>
         )}
      </div>
   );
}