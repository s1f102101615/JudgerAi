import dotenv from 'dotenv';
import openai from 'openai';
import type { SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

dotenv.config();

type Message = {
  author: string;
  message: string;
};

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const apikeyer = () => {
      // .env fileからAPIキーを取得
      const apiKey = process.env.OPENAI_API_KEY;
      if (apiKey === null) return;
      // OpenAIのクライアントを作成
      const client = new openai.OpenAI({ apiKey });
      console.log('b', client);
    };
    apikeyer();
  }, []);

  const handleSendMessage = async () => {
    try {
      // const response = await client.completions.create({
      //   model: 'text-davinci-003',
      //   prompt: `User: ${inputValue}\nAI:`,
      //   max_tokens: 50,
      //   n: 1,
      //   stop: '\n',
      //   temperature: 0.5,
      // });

      // const message = response.choices[0].text.trim();
      const message = 'Hello World';
      setMessages([...messages, { author: 'them', message }]);
      setInputValue('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.chatcontainer}>
      <div className={styles.chatmessages}>
        {messages.map((message, index) => (
          <div className={styles.chatmessage} key={index}>
            <strong>{message.author}: </strong>
            <span>{message.message}</span>
          </div>
        ))}
      </div>
      <div className={styles.chatinput}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Home;
