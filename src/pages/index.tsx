import dotenv from 'dotenv';
import type { SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

dotenv.config();

type Message = {
  author: string;
  message: string;
  isSelf: boolean;
};

const botResponses = [
  'Hello!',
  'How are you?',
  'What can I help you with?',
  'Nice to meet you!',
  'I am a simple chatbot.',
  'What do you want to talk about?',
  'I am here to assist you.',
  'How can I be of service?',
  'Tell me more about yourself.',
  'I am listening.',
];

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [authorName, setAuthorName] = useState('');

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputValue(event.target.value);
  };

  const handleAuthorNameChange = (event: { target: { value: string } }) => {
    setAuthorName(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') {
      return;
    }

    const newMessage: Message = {
      author: authorName,
      message: inputValue,
      isSelf: true,
    };

    const botMessage: Message = {
      author: 'bot',
      message: botResponses[Math.floor(Math.random() * botResponses.length)],
      isSelf: false,
    };

    setMessages([...messages, newMessage, botMessage]);
    setInputValue('');
  };
  useEffect(() => {
    // const apikeyer = () => {
    //   // .env fileからAPIキーを取得
    //   const apiKey = process.env.OPENAI_API_KEY;
    //   if (apiKey === null) return;
    //   // OpenAIのクライアントを作成
    //   const client = new openai.OpenAI({ apiKey });
    //   console.log('b', client);
    // };
    // apikeyer();
  }, []);

  // const handleSendMessage = async () => {
  //   try {
  // const response = await client.completions.create({
  //   model: 'text-davinci-003',
  //   prompt: `User: ${inputValue}\nAI:`,
  //   max_tokens: 50,
  //   n: 1,
  //   stop: '\n',
  //   temperature: 0.5,
  // });

  // const message = response.choices[0].text.trim();
  //     const message = 'Hello World';
  //     setMessages([...messages, { author: 'them', message }]);
  //     setInputValue('');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <div className={styles.explain}>
        <a href="/explain">説明ページへ</a>
      </div>
      <div className={styles.chatcontainer}>
        <div className={styles.chatmessages}>
          {messages.map((message, index) => (
            <div
              className={`${styles.chatmessage} ${message.isSelf ? styles.self : ''}`}
              key={index}
            >
              <strong>{message.author}: </strong>
              <span>{message.message}</span>
            </div>
          ))}
        </div>
        <div className={styles.chatinput}>
          <input
            type="text"
            value={authorName}
            onChange={handleAuthorNameChange}
            placeholder="Enter your name"
          />
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type your message here..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </>
  );
};

export default Home;
