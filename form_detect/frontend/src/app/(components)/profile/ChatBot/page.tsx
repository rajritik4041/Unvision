
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState<any[]>([]);
  const [chatId, setChatId] = useState<string | null>(null);
  const [chatList, setChatList] = useState<any[]>([]);
  const [open, setopen] = useState<boolean>(false)
  const [loading, setloading] = useState<boolean>(false)

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : "";

  const fetchChats = async () => {
    try {
      const res = await axios.get("http://localhost:8000/chats", {
        headers: { Authorization: `Bearer ${token}` },
      });


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

  const newChat = () => {
    setChat([]);
    setChatId(null);
  };


  const sendMessage = async () => {
    if (!message.trim()) return;
    setloading(true)
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
      setloading(false)
    } catch (err) {
      console.log(err);
    }
  };


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
  <div className="relative  z-1">


    <button
      onClick={() => setopen(prev => !prev)}
      className="fixed bottom-4 right-2 bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 shadow-lg flex items-center justify-center text-xl"
    >
      💬
    </button>


    {open && (
      <div className="fixed bottom-20 right-2 w-80 md:w-96 h-96 bg-white rounded-2xl shadow-2xl flex overflow-hidden">
        <div className="w-1/3 border-r bg-gray-50 p-2 flex flex-col">
          <button
            onClick={newChat}
            className="bg-green-500 text-white p-2 rounded mb-2 text-sm"
          >
            + New
          </button>

          <div className="overflow-y-auto flex-1">
            {chatList.map((c) => (
              <div
                key={c.chat_id}
                className={`flex justify-between items-center p-2 rounded mb-2 cursor-pointer ${
                  chatId === c.chat_id ? "bg-blue-100" : "bg-white"
                }`}
              >
                <button
                  onClick={() => loadChat(c.chat_id)}
                  className="text-left w-full text-xs truncate"
                >
                  {c.last_message || "New Chat"}
                </button>

                <button
                  onClick={() => deleteChat(c.chat_id)}
                  className="text-red-500 ml-1"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="w-2/3 flex flex-col">

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {chat.length === 0 && (
              <p className="text-gray-400 text-center mt-10 text-sm">
                Start chatting...
              </p>
            )}

            {chat.map((c, i) => (
              <div
                key={i}
                className={`flex ${
                  c.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl text-sm max-w-[75%] ${
                    c.type === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {c.text}
                </div>
              </div>
            ))}
          </div>

          <div className="flex p-2 border-t">
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border rounded-lg px-2 py-1 w-full text-sm mr-2 outline-none"
              placeholder="Type message..."
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-3 rounded-lg text-sm"
              disabled={loading}
            >
             Send
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
