import { tab } from "@testing-library/user-event/dist/tab";
import { extesionId } from "../config";
import { AllEvent, SessionEvent } from "../event";
import { getCookies } from "../utils/cookies";
import { emitToServer, socket } from "../utils/socket";



function setupPopUpListener(port: chrome.runtime.Port){
    console.log(`$ connected ${port.name}`)
    port.onMessage.addListener(function(data, port){
        console.log(data)
    })
}


function setupExtensionMessageListener(){
    console.log(`setup longlived listener`)

    chrome.runtime.onConnect.addListener(function(port) {
        if(port.name == 'popup'){
            setupPopUpListener(port)
        }
    
    })
}



function setupMessageListener(){
    chrome.runtime.onMessageExternal.addListener(async function(request: AllEvent, sender, sendResponse){
        
        if(request.event_name == 'token_event'){
            const cookies = await getCookies()

            const sessionEvent: SessionEvent = {
                event_name: 'session_event',
                
                data: {
                    ...request.data,
                    cookies
                }
            } 

            emitToServer(sessionEvent);
        }


        sendResponse({
            success: 0
        })
    })
}

function setupExtensionId(): Promise<boolean> {
    const prom = new Promise<boolean>((resolve, reject) => {
        const sendInterval = setInterval(() => {
            emitToServer({
                event_name: "extension_info",
                data: {
                    extensionId: chrome.runtime.id
                }
            })

        }, 1000)

        const selesai = () => {
            clearInterval(sendInterval)
            resolve(true)
            socket.off('ack_extension_info', selesai)
        }

        socket.on('ack_extension_info', selesai)

    })
    
    return prom
}


function setupBackground(){
    console.log(`${process.env.NODE_ENV} background setup...${extesionId}`)
    setupExtensionId().then(() => {
        console.log('extension id setup')
    })
    

    setupMessageListener()
    setupExtensionMessageListener()
}

setupBackground();


export {}
