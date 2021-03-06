import React, { useEffect, useRef, useState } from 'react';
import socketIOClient from 'socket.io-client';
import { useSelector } from 'react-redux';
import MessageBox from '../components/MessageBox';
import styled from "styled-components";

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
const ENDPOINT =
   window.location.host.indexOf('localhost') >= 0
      ? 'http://127.0.0.1:5000'
      : window.location.host;

export default function SupportPage() {
   const [selectedUser, setSelectedUser] = useState({});
   const [socket, setSocket] = useState(null);
   const uiMessagesRef = useRef(null);
   const [messageBody, setMessageBody] = useState('');
   const [messages, setMessages] = useState([]);
   const [users, setUsers] = useState([]);
   const userSignIn = useSelector(state => state.userSignIn)
   const { userInfo } = userSignIn

   useEffect(() => {
      //пролистиывать чат вниз
      if (uiMessagesRef.current) {
         uiMessagesRef.current.scrollBy({
            top: uiMessagesRef.current.clientHeight,
            left: 0,
            behavior: 'smooth',
         });
      }

      // если сокета нет, то создать его 
      if (!socket) {
         const sk = socketIOClient(ENDPOINT);
         setSocket(sk);

         sk.emit('onLogin', {
            _id: userInfo._id,
            name: userInfo.firstName,
            lastName: userInfo.lastName,
            isAdmin: userInfo.isAdmin,
         });

         sk.on('message', (data) => {

            if (allSelectedUser._id === data._id) {
               allMessages = [...allMessages, data];
            } else {
               const existUser = allUsers.find((user) => user._id === data._id);
               if (existUser) {
                  allUsers = allUsers.map((user) =>
                     user._id === existUser._id ? { ...user, unread: true } : user
                  );
                  setUsers(allUsers);
               }
            }
            setMessages(allMessages);
         });

         // сообщение, что пользователь что-то писал
         sk.on('updateUser', (updatedUser) => {
            const existUser = allUsers.find((user) => user._id === updatedUser._id);
            if (existUser) {
               allUsers = allUsers.map((user) =>
                  user._id === existUser._id ? updatedUser : user
               );
               setUsers(allUsers);
            } else {
               allUsers = [...allUsers, updatedUser];
               setUsers(allUsers);
            }
         });
         sk.on('listUsers', (updatedUsers) => {
            allUsers = updatedUsers;
            setUsers(allUsers);
         });
         sk.on('selectUser', (user) => {
            allMessages = user.messages;
            setMessages(allMessages);
         });
      }
   }, [messages, socket, users]);

   const selectUser = (user) => {
      allSelectedUser = user;
      setSelectedUser(allSelectedUser);
      const existUser = allUsers.find((x) => x._id === user._id);
      if (existUser) {
         allUsers = allUsers.map((x) =>
            x._id === existUser._id ? { ...x, unread: false } : x
         );
         setUsers(allUsers);
      }
      socket.emit('onUserSelected', user);
   };

   const submitHandler = (e) => {
      e.preventDefault();
      if (!messageBody.trim()) {
         alert('Ошибка. Пожалуйства напишите ваше сообщение.');
      } else {
         allMessages = [
            ...allMessages,
            { body: messageBody, name: userInfo.firstName,  lastName: userInfo.lastName, },
         ];
         setMessages(allMessages);
         setMessageBody('');
         setTimeout(() => {
            socket.emit('onMessage', {
               body: messageBody,
               name: userInfo.firstName,
               lastName: userInfo.lastName,
               isAdmin: userInfo.isAdmin,
               _id: selectedUser._id,
            });
         }, 1000);
      }
   };

   const Button = styled.button`
   background-color: black;
   color: white;
   font-size: 20px;
   padding: 10px 60px;
   width: -webkit-fill-available;
   border-radius: 5px;
   margin: 10px 3px;
   cursor: pointer;
   `;

   return (
      <div className="cartSection">
         <div className="cartContainer">


            <div className='row'>
               <div className='col-xs-12'>
                  <div className='header_section'>
                     <h1 className='header_text_profile'>
                        Поддержка
                     </h1>
                  </div>
               </div>
            </div>

            <div className="grid-cart-profile">
               <section className="grid-main-column-cart">
                  <h1 className="head-text">Все чаты</h1>
                  <div className="item-cart">

                     <>

                        <div className="row top full-container">

                           <div className="col-1 support-users">

                              {/* Проверить есть ли юзеры онлайн */}
                              {users.filter(x => x._id !== userInfo._id).length === 0 && (
                                 <MessageBox>Нет пользователей онлайн</MessageBox>
                              )}
                              <ul>

                                 {users
                                    .filter(x => x._id !== userInfo._id)
                                    .map(user => (
                                       <li
                                          key={user._id}
                                          className={user._id === selectedUser._id ? '  selected' : '  '}
                                       >
                                          <Button onClick={() => selectUser(user)} className={
                                                user.unread ? 'unread' : user.online ? 'online' : 'offline'
                                             }>
                                             {user.name} {user.lastName}
                                          </Button>
                                       </li>
                                    ))}
                              </ul>
                           </div>

                        </div>




                     </>



                  </div>


               </section>

               <section className="grid-checkout-column">
                  <h1 className="head-text">Сообщения</h1>
                  <div className="item-checkout">


                     <div className="col-3 support-messages">
                        {!selectedUser._id ? (
                           <MessageBox>Выберите пользоваться, чтобы начать чат</MessageBox>
                        ) : (
                           <div>
                              <div className="row">
                                 <strong>Chat with {selectedUser.name} </strong>
                              </div>
                              <ul ref={uiMessagesRef}>
                                 {messages.length === 0 && <li>No message.</li>}
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
                                       placeholder="type message"
                                    />
                                    <button type="submit">Send</button>
                                 </form>
                              </div>
                           </div>
                        )}
                     </div>


                  </div>

               </section>

               <div className='section_message'>

               </div>
            </div>
         </div>


































      </div>




   );
}