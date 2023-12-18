import io from 'socket.io-client';

const socket = io('http://192.168.0.11:3000');

socket.on('connect', () => {
    console.log('Connexion socket établie !');
    
  });



export default socket;