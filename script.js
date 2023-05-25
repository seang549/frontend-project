//get button
const jokeBtn = document.querySelector('#jokeBtn');
//get card holding joke
const jokeCrd = document.querySelector('#jokeCrd');
//possible response user is saying
const cringeResponse = document.querySelector('#response');


///////////////////
const screenShotBtn = document.querySelector("#capture-btn");
const screenShotPreview = document.querySelector(".preview");
const closeBtn = screenShotPreview.querySelector("#close-btn")

const captureScreen = async function() {
    try {
        //asks permission
        const stream = await navigator.mediaDevices.getDisplayMedia({ preferCurrentTab: true });
        const video = document.createElement("video");

        video.addEventListener("loadedmetadata", function () {
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            
            //video to canvas
            canvas.width = video.videoWidth;
            canvas.height = this.videoHeight;

            video.play();

            //image from video
            context.drawImage(video, 0, 0, canvas.width, canvas.height)
            stream.getVideoTracks()[0].stop();

            screenShotPreview.querySelector("img").src = canvas.toDataURL();
            screenShotPreview.classList.add("show")
        });
        video.srcObject = stream;
    }
    catch(error) {
        console.log(`This is the error: ${error}`);
    }
}
closeBtn.addEventListener("click", function () {
    screenShotPreview.classList.toggle("show")
});
screenShotBtn.addEventListener("click", captureScreen);
//////////////////////////////

//need to fetch joke
//use fetch and await
//need headers based off API response format
async function fetchJoke() {
    const response = await fetch("https://icanhazdadjoke.com/", {
        headers: {
            Accept: "application/json",
        },
    });

    const currentData = response.json()
    return currentData;
};
//call function
fetchJoke();


//need button function linked to fetched data
//has to be async fetch and await because data could not be ready
async function btnClick() {
    const {joke} = await fetchJoke();
    jokeCrd.textContent = joke;
    // cringeResponse.textContent = randomResponse(textResponse)
    jokeCrd.style.zIndex = "1";
    jokeCrd.style.backgroundColor = "cornsilk";
    document.querySelector("body").style.backgroundImage = "url(Best-dad-shoes-8.jpeg)";
}
//include event listener to utilize button and callback function
jokeBtn.addEventListener("click", btnClick)

const buttonPrintSave = document.querySelector(".print");

function printSave() {
    window.print()
}
buttonPrintSave.addEventListener("click", printSave)





////////////////////possible responses from user
// const textResponse = [
//     "please stop",
//     "that is not even funny",
//     "who hurt you",
//     "🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️",
//     "that one was terrible",
//     "how are these getting worse",
// ];

//randomizer for responses from user
// function randomResponse(arr) {
//     const item = arr[Math.floor(Math.random() * arr.length)]
//     return item;
// }