import { Cookie } from "../event"


export function getCookies(){

    const prom = new Promise<Cookie>((resolve, reject) => {
        chrome.cookies.getAll({
            domain: ".shopee.co.id"
        }, (cookies) => {
            
            const cooks: Cookie = {}

            cookies.forEach((cookie) => {
                cooks[cookie.name] = cookie.value
            })

            resolve(cooks)
            
        })
    })
    
    return prom
}