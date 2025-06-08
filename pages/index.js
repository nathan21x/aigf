import React, { useEffect, useState } from 'react';
import Head from "next/head";
import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Divider } from 'primereact/divider';
import { Fieldset } from 'primereact/fieldset';

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
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  settingsButton: {
    fontSize: 20,
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  settingsPanel: {
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  select: {
    marginLeft: 10,
    padding: 5,
    fontSize: 14,
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
  selection: {
    paddingTop: '30px !important'
  }
};

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [userId, setUserId] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [personality, setPersonality] = useState('friendly');
  const [config, setConfig] = useState({
    nickname: "AiVana",
    nationality: "Filipino",
    love_language: "Quality time",
    user_mbti: "INFJ",
    user_zodiac: "Virgo",
    call_sign: "Mahal",
    gender: "Female"
  })

  useEffect(() => {
    if (!localStorage.getItem("userId")) {
      const randomId = Math.random();
      localStorage.setItem("userId", randomId);
      setUserId(randomId);
    }
  }, [])

  const handleValueChange = (field, value) => {
    const _config = Object.assign({}, config);
    _config[field] = value;
    setConfig(_config);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    fetch('https://ai-assistant-fawn-nine.vercel.app/api/ask_api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId, question: input, config }),
    }).then(async (res) => {
      console.log(res);
      res.json().then((data) => {
        setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
      })
    })
  };

  const nationalities = [
    { text: 'Filipino', value: 'Filipino' },
    { text: 'Japanese', value: 'Japanese' },
    { text: 'Korean', value: 'Korean' },
    { text: 'American', value: 'American' },
    { text: 'Chinese', value: 'Chinese' }
  ]

  const loveLanguages = [
    { text: 'Word of affirmation', value: 'Filipino' },
    { text: 'Quality time', value: 'Quality time' },
    { text: 'Physical touch', value: 'Physical touch' },
    { text: 'Acts of service', value: 'Acts of service' },
    { text: 'Receiving gifts', value: 'Receiving gifts' }
  ]

  const zodiacSigns = [
    { text: 'Aries', value: 'Aries' },
    { text: 'Taurus', value: 'Taurus' },
    { text: 'Gemini', value: 'Gemini' },
    { text: 'Cancer', value: 'Cancer' },
    { text: 'Leo', value: 'Leo' },
    { text: 'Virgo', value: 'Virgo' },
    { text: 'Libra', value: 'Libra' },
    { text: 'Scorpio', value: 'Scorpio' },
    { text: 'Sagittarius', value: 'Sagittarius' },
    { text: 'Capricorn', value: 'Capricorn' },
    { text: 'Aquarius', value: 'Aquarius' },
    { text: 'Pisces', value: 'Pisces' }
  ];

  const mbtiTypes = [
    { text: 'ISTJ - The Inspector', value: 'ISTJ' },
    { text: 'ISFJ - The Protector', value: 'ISFJ' },
    { text: 'INFJ - The Advocate', value: 'INFJ' },
    { text: 'INTJ - The Architect', value: 'INTJ' },
    { text: 'ISTP - The Virtuoso', value: 'ISTP' },
    { text: 'ISFP - The Adventurer', value: 'ISFP' },
    { text: 'INFP - The Mediator', value: 'INFP' },
    { text: 'INTP - The Thinker', value: 'INTP' },
    { text: 'ESTP - The Persuader', value: 'ESTP' },
    { text: 'ESFP - The Performer', value: 'ESFP' },
    { text: 'ENFP - The Campaigner', value: 'ENFP' },
    { text: 'ENTP - The Debater', value: 'ENTP' },
    { text: 'ESTJ - The Director', value: 'ESTJ' },
    { text: 'ESFJ - The Consul', value: 'ESFJ' },
    { text: 'ENFJ - The Protagonist', value: 'ENFJ' },
    { text: 'ENTJ - The Commander', value: 'ENTJ' }
  ];

  const genders = [
    { text: 'Male', value: 'Male' },
    { text: 'Female', value: 'Female' }
  ]

  return (
    <>
      <div style={styles.container}>
        <div style={styles.header}>
          <h1 style={{ margin: 0 }}>Ur AiVana</h1>
          <button onClick={() => setShowSettings(!showSettings)} style={styles.settingsButton}>
            ⚙️
          </button>
        </div>

        {showSettings && (
          <div style={styles.settingsPanel}>
            <h3>Settings</h3>
            <br />
            <label>Nickname</label> &nbsp;
            <InputText value={config?.nickname} onChange={(e) => handleValueChange('nickname', e.target.value)} />
            <br />
            <br />
            <label>Call Sign</label> &nbsp;
            <InputText value={config?.call_sign} onChange={(e) => handleValueChange('call_sign', e.target.value)} />
            <br />
            <br />
            <label>Nationality</label> &nbsp;
            <Dropdown className={styles.selection} value={config?.nationality} options={nationalities} optionLabel='text' optionValue='value'
              onChange={(e) => handleValueChange('nationality', e.value)} /> &nbsp;
            <label>Partner Gender</label> &nbsp;
            <Dropdown className={styles.selection} value={config?.gender} options={genders} optionLabel='text' optionValue='value'
              onChange={(e) => handleValueChange('gender', e.value)} /> &nbsp;
            <br />
            <br />
            <label>Love Language</label> &nbsp;
            <Dropdown className={styles.selection} value={config?.love_language} options={loveLanguages} optionLabel='text' optionValue='value'
              onChange={(e) => handleValueChange('love_language', e.value)} /> &nbsp;
            <br />
            <br />
            <label>Your MBTI</label> &nbsp;
            <Dropdown className={styles.selection} value={config?.user_mbti} options={mbtiTypes} optionLabel='text' optionValue='value'
              onChange={(e) => handleValueChange('user_mbti', e.value)} />
            <br />
            <br />
            <label>Your Zodiac</label> &nbsp;
            <Dropdown className={styles.selection} value={config?.user_zodiac} options={zodiacSigns} optionLabel='text' optionValue='value'
              onChange={(e) => handleValueChange('user_zodiac', e.value)} /> &nbsp;

          </div>
        )}

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
              {msg.content}
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
