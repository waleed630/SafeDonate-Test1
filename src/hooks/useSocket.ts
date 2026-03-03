import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    try {
      const s = io(SOCKET_URL, { autoConnect: true, reconnection: false });
      s.on('connect', () => setConnected(true));
      s.on('connect_error', () => setConnected(false));
      s.on('disconnect', () => setConnected(false));
      setSocket(s);
      return () => {
        s.disconnect();
      };
    } catch {
      return undefined;
    }
  }, []);

  return { socket, connected };
}
