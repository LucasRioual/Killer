import io from 'socket.io-client';
import { EXPO_PUBLIC_API_URL } from '@env';


const socket = io('http://172.18.32.91:3000');

export default socket;