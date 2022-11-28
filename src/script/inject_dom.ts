import { keyExtensionName } from "../config"
import { createDomInterface } from "../dom_interface"
import { sendMessage } from "../utils/message"

function getExtensionId(): string {
  return localStorage.getItem(keyExtensionName) || ''
}

function syncSession(init: RequestInit){
  const headers = init.headers as any
  if(headers == undefined){
    return
  }
  
  if (!('af-ac-enc-dat' in headers)) {
    return
  }

  if (!('sz-token' in headers)) {
    return
  }


  const encData = headers['af-ac-enc-dat']
  const szToken = headers['sz-token']
  const extId = getExtensionId()

  if(extId != ''){
    sendMessage(extId, {
      event_name: 'token_event',
      data: {
        afAcEncDat: encData as string,
        szToken: szToken as string
      }
    })
  }
  
  

}


function createProxyFetch(){
  const fetchfunc = window.fetch

  window.fetch = async function(input: RequestInfo | URL, init?: RequestInit) {
    if(init){
      syncSession(init)
    }

    const hasil = await fetchfunc(input, init)
    return hasil
  }
}




// pastikan dipanggil sekali
function setupInject() {
  console.log('setup inject');

  createProxyFetch()
  createDomInterface()
}


setupInject()


export {}