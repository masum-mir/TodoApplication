import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

const SOCKET_URL = "http://localhost:8088/ws";


export const WebSocket = () => {
    const [stompClient, setStompClient] = useState(null);
  
    useEffect(() => {
      const client = new Client({
        brokerURL: SOCKET_URL,
        onConnect: () => {
          console.log("Connected to WebSocket");
        },
        onDisconnect: () => {
          console.log("Disconnected from WebSocket");
        },
        debug: (msg) => console.log(msg),
      });
  
      client.activate();
      setStompClient(client);
  
      return () => {
        client.deactivate();
      };
    }, []);
  
    return stompClient;
  };