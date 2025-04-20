# 🗨️ Real-Time Room-Based Chat Application

This is a full-stack real-time chat application that allows users to join specific chat rooms and exchange messages instantly using WebSockets. The application is built with:

- **Backend:** Spring Boot, WebSocket, MongoDB  
- **Frontend:** React (Vite), Tailwind CSS, STOMP over WebSocket  

---

## 📦 Project Setup

### MongoDB Setup (Local) 🍯

1. Install MongoDB via Homebrew: *brew install mongodb-community*
2. Start MongoDB service: **brew services start mongodb-community**
3. Connect using MongoDB Compass: mongodb://localhost:27017. Create database for chatapp.

### Backend Setup (Spring Boot) ♨️

1. Create Spring Boot project with dependencies: Spring Web, Spring WebSocket, Spring Data MongoDB, Lombok
2. Configure MongoDB connection in application.properties: spring.data.mongodb.uri=mongodb://localhost:27017/chatapp
3. Define Entities: Message, ChatRoom
4. Enable WebSocket Support: Create a config class using @EnableWebSocketMessageBroker. Implement configureMessageBroker() and registerStompEndpoints() methods.
5. Start the backend: Open the main Spring Boot file (annotated with @SpringBootApplication). Click the Run/Play button in your IDE (e.g., IntelliJ or Eclipse) to start the server.

### Frontend Setup (React + Vite) 💻

1. Create the project using Vite: npm create vite@latest
2. Install dependencies:
    npm i react-router,
    npm install -D tailwindcss@3 postcss autoprefixer\,
    npx tailwindcss init -p,
    npm i react-hot-toast,
    npm i @stomp/stompjs sockjs-client,
    npm i react-icons,
    npm i axios
3. Set up Tailwind CSS in tailwind.config.js.
4. Create reusable React components: Create/Join Room Page, Chat Page. 
   Create Room service to create room, join room chat, get messages.
   Define your Routes
   Real-time integration with STOMP and SockJS for WebSocket communication
5. Start the frontend: **npm run dev**

### 🔁 Real-Time Communication Flow 
1. Client establishes a WebSocket connection: Connects to: ws://localhost:8080/chat (using SockJS + STOMP)
2. Client subscribes to a topic to receive messages: For example: /topic/room/123. This means the client will listen for incoming messages broadcasted to this chat room.
3. Client sends a message: Messages are sent to destinations like /app/sendMessage/123. The /app prefix ensures it's routed to a server-side controller method annotated with @MessageMapping("/sendMessage/{roomId}")
4. Server receives and processes the message: Spring controller handles the incoming message. It then broadcasts a response to /topic/room/123 using @SendTo.
5. Client receives the broadcasted message: Since the client is subscribed to /topic/room/123, it instantly receives the message sent by the server. The UI is updated in real-time.


*Spring Boot receives, processes, and broadcasts them using STOMP.*
*React clients receive messages in real-time and update the UI accordingly.*

