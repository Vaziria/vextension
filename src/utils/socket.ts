import { io } from 'socket.io-client'
import { AllEvent } from '../event'

export const socket = io('ws://localhost:5000', {
  transports: ['websocket'],
  path: '/ws/socket.io'
})


export function emitToServer(event: AllEvent){
    if(socket.connected) {
        console.log('emiting to upload', event)
        socket.emit(event.event_name, event)
    }
}



socket.on('connect', function(){
    console.log('connected on bot upload')
})
