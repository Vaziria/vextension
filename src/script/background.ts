import { extesionId } from "../config";
import { AllEvent, SessionEvent } from "../event";
import { getCookies } from "../utils/cookies";
import { emitToServer } from "../utils/socket";


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


function setupBackground(){
    console.log(`${process.env.NODE_ENV} background setup...${extesionId}`)

    setupMessageListener()
}



setupBackground();

export {}
