import React, { useEffect, useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const styles = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  chatBox: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #ccc',
    borderRadius: 8,
    padding: 10,
    minHeight: 300,
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
  message: {
    maxWidth: '70%',
    padding: 10,
    margin: '6px 0',
    borderRadius: 12,
    lineHeight: 1.4,
  },
  inputContainer: {
    marginTop: 10,
    display: 'flex',
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: '1px solid #ccc',
    fontSize: 16,
  },
  button: {
    padding: '10px 16px',
    backgroundColor: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
};

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      const randomId = Math.random();
      localStorage.setItem("userId", randomId);
      setUserId(randomId);
    }
  }, [])

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    fetch('https://ai-assistant-fawn-nine.vercel.app/api/ask_api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, question: input }),
    }).then(async (res) => {
      console.log(res);
      res.json().then((data) => {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      })
    })
  };

  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>Your AiVana 1.0</h1>
        <div style={styles.chatBox}>
          {messages.map((msg, idx) => (
            <div
              key={idx}
              style={{
                ...styles.message,
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                backgroundColor: msg.role === 'user' ? '#0070f3' : '#e2e2e2',
                color: msg.role === 'user' ? '#fff' : '#000',
              }}
            >
              <span>{msg.content}</span>
            </div>
          ))}
        </div>
        <div style={styles.inputContainer}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Type a message..."
            style={styles.input}
          />
          <button onClick={sendMessage} style={styles.button}>Send</button>
        </div>
      </div>
    </>
  );
}
