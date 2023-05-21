import React, { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import '../App.scss';
import './EchoHooks.scss';
const EchoHooks = () => {

  const [messages, setMessages] = useState<string[]>([]);
  const [sentMessages, setSentMessages] = useState<string[]>([]);
  // const [connection,setConnection] = useState(null);
  const timerid: { current: NodeJS.Timeout | string | number | undefined } = useRef('');
  const tmp_connection = useRef<WebSocket | null>(null)


  //const tmp_messages=useRef(null);
  //tmp_messages.current = [];
  const [message, setMessage] = useState<string>('');
  const [sentMessage, setSentMessage] = useState<string>('');


  //  const [count, setCount] = useState(0);
  //  const incrementCount = () => setCount(count + 1);
  const clearSocket = () => {
    clearInterval(timerid.current);
    tmp_connection?.current?.close();
  }
  const sendSocket2Secs = () => {
    timerid.current = setInterval(() => {
      const browser: string = navigator.userAgent.search('Chrome') !== -1 ? 'Chrome' : 'FireFox';
      const message: string = `Zvi Dubin: ${Math.random()}: ${new Date().toISOString()}: ${browser}`;
      tmp_connection?.current?.send(message);
      setSentMessage(message);
    }, 2000);
  }
  const openSock = () => {
    /// Please set up a local web socket server from this page: https://www.lob.com/blog/websocket-org-is-down-here-is-an-alternative
    /// or you can try ('wss://socketsbay.com/wss/v2/1/demo/');
    tmp_connection.current = new WebSocket('ws://localhost:10000');  /// ('wss://socketsbay.com/wss/v2/1/demo/');
    tmp_connection.current.onopen = () => console.log("ws opened");
    tmp_connection.current.onclose = () => setMessage("ws closed");
    tmp_connection.current.onerror = error =>  setMessage(JSON.stringify(error));

    tmp_connection.current.onmessage = evt => {
      // add the new message to state
      setMessage(evt.data);
    };

  }

  useEffect(() => {
  //  openSock();
    return () => clearSocket();
  }, []);

  useEffect(() => {
    // add the new message to state
    setMessages([...messages, message].filter(mes => mes.substring(0, 3) === 'Zvi').slice(-5));
    console.log(messages);
  },
    [message,messages]);

  useEffect(() => {
    // add the new message to state
    setSentMessages([...sentMessages, sentMessage].slice(-5));
    console.log(sentMessages);
  },
    [sentMessage,sentMessages]);

  return <div>
    <span className='button-space'>
      <Button className='button-space' variant="outlined" onClick={clearSocket}>Close WebSocket & Auto Send</Button>
    </span>
    <span className='button-space'>
      <Button className='button-space' variant="contained" onClick={() => clearInterval(timerid.current)}>Clear Timer</Button>
    </span>

    <span className='button-space'>
      <Button className='button-space' variant="outlined" onClick={() => {
        clearInterval(timerid.current);
        openSock();
        sendSocket2Secs();
      }}>Send Socket every 2 Sec</Button>
    </span>
    <h2>Sent Messages</h2>
    <div className='echo-hooks curved-edges echo-hooks__section echo-hooks__section--sent'>
      <ol >{sentMessages.map((msg, idx) => msg ? <li key={'msgs-' + idx}>{msg}</li> : null)}</ol>
    </div>
    <h2>Received Messages</h2>
    <div className='echo-hooks curved-edges echo-hooks__section echo-hooks__section--received'>

      <ol >{messages.map((msg, idx) => <li key={'msgr-' + idx}>{msg}</li>)}</ol>
    </div>
  </div>


}
export default EchoHooks;
