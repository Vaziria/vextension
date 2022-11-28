
function injectDom(){
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL("src/script/inject_dom.js");
    (document.head || document.documentElement).appendChild(s);


    // const body = document.createElement('div')
    // body.innerHTML = "<h1>Kampret Was Here</h1>"
    // document.body.appendChild(body)
}

function injectBody(){

    function callback(){
        console.log("injected body")

        // const body = document.createElement('div')
        // body.innerHTML = "<h1>Kampret Was Here</h1>"
        // document.body.appendChild(body)
    }

    document.addEventListener('DOMContentLoaded', callback)
}

async function setupContentscript(){


    window.addEventListener("message", function(event){
        if(event.source != window)
            return;

        if (event.data.type && (event.data.type == "FROM_PAGE")) {
            console.log("Content script received message: " + event.data.text);
        }
    })
    
    


    // injecting script and body
    injectDom()
    injectBody()
}

setupContentscript().then(function() {
    console.log("setup script")
})

export default {}