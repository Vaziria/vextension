import { ExtensionInfoEvent } from "../event"
import { socket } from "./socket"


export class Extension {
    extensionId!: string


    async getExtensionId(){
        const eventName = 'extension_info'

        const callback = (data: ExtensionInfoEvent) => {
            this.extensionId = data.data.extensionId
            socket.off('ex')
        }
        
        socket.on('extension_info', (data: ExtensionInfoEvent) => {
        console.log('getting extendsion data', data)
        this.extensionId = data.data.extensionId
        socket.emit('ack_extension_info', {})
        })
    }

    async setup(){
        

        
    }

}