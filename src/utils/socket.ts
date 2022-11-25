import { io } from 'socket.io-client'
import { Cookie } from './cookies'


export const socket = io('ws://localhost:5000', {
  transports: ['websocket'],
  path: '/ws/socket.io'
})


export interface CookiesData {
    cookies: Cookie
}

export interface KeyHeader {
    afAcEncDat: string
    szToken: string
}


interface Event {
    cookies: CookiesData
    key: KeyHeader
}




export function emitToServer<T extends Event, K extends keyof Event>(event: K, data: Event[K]){
    if(socket.connected) {
        socket.emit(event, data)
    }
}



socket.on('connect', function(){
    console.log('connected on bot upload')
})
