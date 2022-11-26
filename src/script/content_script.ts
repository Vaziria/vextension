import { getCookies } from "../utils/cookies";

function injectDom(){
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL("src/script/inject_dom.js");
    (document.head || document.documentElement).appendChild(s);
}

async function setupContentscript(){

    window.addEventListener("message", function(event){
        if(event.source != window)
            return;

        if (event.data.type && (event.data.type == "FROM_PAGE")) {
            console.log("Content script received message: " + event.data.text);
        }
    })
    
    



    injectDom()
}

setupContentscript().then(function() {
    console.log("setup script")
})

export default {}