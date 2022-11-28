import { extesionId } from "../config";
import { AllEvent } from "../event"


export function sendMessage(exId: string, data: AllEvent): Promise<any> {
    
    const prom = new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(exId, data, function(res){
            console.log('sending data', data)
            resolve(res)
        })
    })

    return prom
}