// // // "use client";
// // // import React from "react";
// // // import { useState, useEffect } from "react";
// // // import axios from "axios";

// // // export default function ChatBot() {
// // //   const [message, setMessage] = useState("");
// // //   const [chat, setChat] = useState<any[]>([]);

// // //   const token = typeof window !== "undefined" ? localStorage.getItem("token") : "";

// // //   // 📜 Load history on page load
// // //   useEffect(() => {
// // //     const fetchHistory = async () => {
// // //       const res = await axios.get("http://127.0.0.1:8000/chat-history", {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //       });

// // //       const formatted = res.data.flatMap((c: any) => [
// // //         { type: "user", text: c.message },
// // //         { type: "bot", text: c.response },
// // //       ]);

// // //       setChat(formatted);
// // //     };

// // //     fetchHistory();
// // //   }, []);

// // //   // 💬 Send message
// // //   const sendMessage = async () => {
// // //     if (!message) return;

// // //     const res = await axios.post(
// // //       "http://127.0.0.1:8000/chat",
// // //       { message },
// // //       {
// // //         headers: {
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //       }
// // //     );

// // //     setChat((prev) => [
// // //       ...prev,
// // //       { type: "user", text: message },
// // //       { type: "bot", text: res.data.bot },
// // //     ]);

// // //     setMessage("");
// // //   };

// // //   return (
// // //     <div className="w-full max-w-md mx-auto p-4 border rounded-xl">
// // //       <div className="h-80 overflow-y-auto mb-4">
// // //         {chat.map((c, i) => (
// // //           <div key={i} className={c.type === "user" ? "text-right" : "text-left"}>
// // //             <p className="bg-gray-200 inline-block p-2 rounded m-1">
// // //               {c.text}
// // //             </p>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="flex gap-2">
// // //         <input
// // //           value={message}
// // //           onChange={(e) => setMessage(e.target.value)}
// // //           className="border p-2 w-full rounded"
// // //           placeholder="Type message..."
// // //         />
// // //         <button
// // //           onClick={sendMessage}
// // //           className="bg-blue-500 text-white px-4 rounded"
// // //         >
// // //           Send
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }
// // "use client";
// // import React, { useEffect, useState } from "react";
// // import axios from "axios";

// // export default function ChatBot() {
// //   const [message, setMessage] = useState("");
// //   const [chat, setChat] = useState<any[]>([]);
// //   const [chatId, setChatId] = useState<string | null>(null);
// //   const [chatList, setChatList] = useState<any[]>([]);

// //   const token =
// //     typeof window !== "undefined" ? localStorage.getItem("token") : "";

// //   // 📜 Load all chats
// //   const fetchChats = async () => {
// //     try {
// //       const res = await axios.get("http://127.0.0.1:8000/chats", {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       setChatList(res.data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchChats();
// //   }, []);

// //   // 🆕 New Chat
// //   const newChat = () => {
// //     setChat([]);
// //     setChatId(null);
// //   };

// //   // 💬 Send Message
// //   const sendMessage = async () => {
// //     if (!message.trim()) return;

// //     try {
// //       const res = await axios.post(
// //         "http://127.0.0.1:8000/chat",
// //         { message, chat_id: chatId },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       setChatId(res.data.chat_id);

// //       setChat((prev) => [
// //         ...prev,
// //         { type: "user", text: message },
// //         { type: "bot", text: res.data.response },
// //       ]);

// //       setMessage("");
// //       fetchChats(); // refresh sidebar
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   // 📂 Load Chat
// //   const loadChat = async (id: string) => {
// //     try {
// //       setChatId(id);

// //       const res = await axios.get(
// //         `http://127.0.0.1:8000/chat/${id}`,
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );

// //       const formatted = res.data.flatMap((c: any) => [
// //         { type: "user", text: c.message },
// //         { type: "bot", text: c.response },
// //       ]);

// //       setChat(formatted);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   // ❌ Delete Chat
// //   const deleteChat = async (id: string) => {
// //     try {
// //       await axios.delete(`http://127.0.0.1:8000/chat/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });

// //       if (chatId === id) {
// //         setChat([]);
// //         setChatId(null);
// //       }

// //       fetchChats();
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   return (
// //     <div className="flex h-screen">
// //       {/* 📂 Sidebar */}
// //       <div className="w-1/3 border-r p-3 bg-gray-50">
// //         <button
// //           onClick={newChat}
// //           className="bg-green-500 text-white p-2 w-full rounded mb-3"
// //         >
// //           + New Chat
// //         </button>

// //         {chatList?.map((c) => (
// //           <div
// //             key={c.chat_id}
// //             className="flex justify-between items-center bg-white p-2 rounded mb-2 shadow"
// //           >
// //             <button
// //               onClick={() => loadChat(c.chat_id)}
// //               className="text-left w-full"
// //             >
// //             Chat {c.chat_id ? c.chat_id.slice(0, 6) : "No ID"}
// //             </button>

// //             <button
// //               onClick={() => deleteChat(c.chat_id)}
// //               className="text-red-500 ml-2"
// //             >
// //               ❌
// //             </button>
// //           </div>
// //         ))}
// //       </div>

// //       {/* 💬 Chat Area */}
// //       <div className="w-2/3 flex flex-col">
// //         {/* Messages */}
// //         <div className="flex-1 overflow-y-auto p-4">
// //           {chat.length === 0 && (
// //             <p className="text-gray-400 text-center mt-10">
// //               Start a new conversation...
// //             </p>
// //           )}

// //           {chat.map((c, i) => (
// //             <div
// //               key={i}
// //               className={`my-2 ${
// //                 c.type === "user" ? "text-right" : "text-left"
// //               }`}
// //             >
// //               <span
// //                 className={`inline-block px-3 py-2 rounded-lg ${
// //                   c.type === "user"
// //                     ? "bg-blue-500 text-white"
// //                     : "bg-gray-200"
// //                 }`}
// //               >
// //                 {c.text}
// //               </span>
// //             </div>
// //           ))}
// //         </div>

// //         {/* Input */}
// //         <div className="flex p-3 border-t">
// //           <input
// //             value={message}
// //             onChange={(e) => setMessage(e.target.value)}
// //             className="border p-2 w-full rounded mr-2"
// //             placeholder="Type message..."
// //           />
// //           <button
// //             onClick={sendMessage}
// //             className="bg-blue-500 text-white px-4 rounded"
// //           >
// //             Send
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }
// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function ChatBot() {
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState<any[]>([]);
//   const [chatId, setChatId] = useState<string | null>(null);
//   const [chatList, setChatList] = useState<any[]>([]);

//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : "";

//   // 📜 Load chats
//   const fetchChats = async () => {
//     try {
//       const res = await axios.get("http://127.0.0.1:8000/chats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setChatList(Array.isArray(res.data) ? res.data : []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchChats();
//   }, []);

//   // 🆕 New Chat
//   const newChat = () => {
//     setChat([]);
//     setChatId(null);
//   };

//   // 💬 Send Message
//   const sendMessage = async () => {
//     if (!message.trim()) return;

//     try {
//       const res = await axios.post(
//         "http://127.0.0.1:8000/chat",
//         { message, chat_id: chatId },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setChatId(res.data.chat_id);

//       setChat((prev) => [
//         ...prev,
//         { type: "user", text: message },
//         { type: "bot", text: res.data.response },
//       ]);

//       setMessage("");
//       fetchChats();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // 📂 Load Chat
//   const loadChat = async (id: string) => {
//     try {
//       setChatId(id);

//       const res = await axios.get(
//         `http://127.0.0.1:8000/chat/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const formatted = res.data.flatMap((c: any) => [
//         { type: "user", text: c.message },
//         { type: "bot", text: c.response },
//       ]);

//       setChat(formatted);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ❌ Delete Chat
//   const deleteChat = async (id: string) => {
//     try {
//       await axios.delete(`http://127.0.0.1:8000/chat/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (chatId === id) {
//         setChat([]);
//         setChatId(null);
//       }

//       fetchChats();
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-1/3 border-r p-3 bg-gray-50">
//         <button
//           onClick={newChat}
//           className="bg-green-500 text-white p-2 w-full rounded mb-3"
//         >
//           + New Chat
//         </button>

//         {chatList?.map((c) => (
//           <div
//             key={c.chat_id}
//             className="flex justify-between items-center bg-white p-2 rounded mb-2 shadow"
//           >
//             <button
//               onClick={() => loadChat(c.chat_id)}
//               className="text-left w-full"
//             >
             
//               <div className="text-sm text-gray-500 truncate">
//                 {c.last_message}
//               </div>
//             </button>

//             <button
//               onClick={() => deleteChat(c.chat_id)}
//               className="text-red-500 ml-2"
//             >
//               ❌
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Chat Area */}
//       <div className="w-2/3 flex flex-col">
//         <div className="flex-1 overflow-y-auto p-4">
//           {chat.length === 0 && (
//             <p className="text-gray-400 text-center mt-10">
//               Start a new conversation...
//             </p>
//           )}

//           {chat.map((c, i) => (
//             <div
//               key={i}
//               className={`my-2 ${
//                 c.type === "user" ? "text-right" : "text-left"
//               }`}
//             >
//               <span
//                 className={`inline-block px-3 py-2 rounded-lg ${
//                   c.type === "user"
//                     ? "bg-blue-500 text-white"
//                     : "bg-gray-200"
//                 }`}
//               >
//                 {c.text}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="flex p-3 border-t">
//           <input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             className="border p-2 w-full rounded mr-2"
//             placeholder="Type message..."
//           />
//           <button
//             onClick={sendMessage}
//             className="bg-blue-500 text-white px-4 rounded"
//           >
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatList, setChatList] = useState<any[]>([]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  // 📜 Load chats
  const fetchChats = async () => {
    try {
      const res = await axios.get("http://localhost:8000/chats", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ remove invalid / empty chats
      const filtered = (res.data || []).filter(
        (c: any) => c.chat_id && c.last_message
      );

      setChatList(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  // 🆕 New Chat
  const newChat = () => {
    setChat([]);
    setChatId(null);
  };

  // 💬 Send Message
  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/chat",
        { message, chat_id: chatId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setChatId(res.data.chat_id);

      setChat((prev) => [
        ...prev,
        { type: "user", text: message },
        { type: "bot", text: res.data.response },
      ]);

      setMessage("");
      fetchChats();
    } catch (err) {
      console.log(err);
    }
  };

  // 📂 Load Chat
  const loadChat = async (id: string) => {
    try {
      setChatId(id);

      const res = await axios.get(
        `http://localhost:8000/chat/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const formatted = res.data.flatMap((c: any) => [
        { type: "user", text: c.message },
        { type: "bot", text: c.response },
      ]);

      setChat(formatted);
    } catch (err) {
      console.log(err);
    }
  };

  // ❌ Delete Chat (instant UI update)
  const deleteChat = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/chat/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ UI se turant hatao
      setChatList((prev) => prev.filter((c) => c.chat_id !== id));

      if (chatId === id) {
        setChat([]);
        setChatId(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/3 border-r p-3 bg-gray-50">
        <button   onClick={newChat}
          className="bg-green-500 text-white p-2 w-full rounded mb-3"
        >
          + New Chat
        </button>

        {chatList.map((c) => (
          <div
            key={c.chat_id}
            className={`flex justify-between items-center p-2 rounded mb-2 shadow cursor-pointer ${
              chatId === c.chat_id ? "bg-blue-100" : "bg-white"
            }`}
          >
            <button
              onClick={() => loadChat(c.chat_id)}
              className="text-left w-full"
            >
              <div className="text-sm text-gray-500 truncate">
                {c.last_message || "New Chat"}
              </div>
            </button>

            <button
              onClick={() => deleteChat(c.chat_id)}
              className="text-red-500 ml-2"
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          {chat.length === 0 && (
            <p className="text-gray-400 text-center mt-10">
              Start a new conversation...
            </p>
          )}

          {chat.map((c, i) => (
            <div
              key={i}
              className={`my-2 ${
                c.type === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-lg ${
                  c.type === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200"
                }`}
              >
                {c.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex p-3 border-t">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 w-full rounded mr-2"
            placeholder="Type message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}