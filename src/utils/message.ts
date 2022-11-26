import { extesionId } from "../config";
import { AllEvent } from "../event"


export function sendMessage(data: AllEvent): Promise<any> {
    
    const prom = new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(extesionId, data, function(res){
            console.log('sending data', data)
            resolve(res)
        })
    })

    return prom
}