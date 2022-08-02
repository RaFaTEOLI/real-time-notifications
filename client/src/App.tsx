import { useState, useEffect } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

type Notification = {
  id: string;
  message: string;
  user: {
    name: string;
    email: string;
  };
};

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState('');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('notifications', data => {
      setLastPong(new Date().toISOString());
      console.log('data', data);
      setNotifications(prev => [...prev, data]);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('notifications');
    };
  }, []);

  return (
    <div className='App'>
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <p>Notifications</p>
      <ul>
        <li>Hello, notification 1</li>
        <li>Hello, notification 2</li>
        {notifications.map(not => (
          <li key={not.id}>{not.message}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
