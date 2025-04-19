Frontend Part:

~ From vite create a react js project alongside our backend project. Now we need to main pages- page having options to either join/create room, next page will be the chat ui.
npm create vite@latest

~ We use libraries like react-router, tailwind css :
npm i react-router
npm install -D tailwindcss@3 postcss autoprefixer\
npx tailwindcss init -p
npm i react-hot-toast
npm i @stomp/stompjs sockjs-client
npm i react-icons
npm i axios

~ index.html is our main file, in which javascript is loaded dynamically in runtime.

~ We also install the stompjs and sockjs libs we require for web socket.

~ To start the frontend UI use: npm run dev
