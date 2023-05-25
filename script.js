//get button
const jokeBtn = document.querySelector('#jokeBtn');
//get card holding joke
const jokeCrd = document.querySelector('#jokeCrd');
//possible response user is saying
const cringeResponse = document.querySelector('#response');

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
    cringeResponse.textContent = randomResponse(textResponse)
}
//include event listener to utilize button and callback function
jokeBtn.addEventListener("click", btnClick)

//possible responses from user
const textResponse = [
    "please stop",
    "that is not even funny",
    "who hurt you",
    "🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️🤦🏻‍♂️",
    "that one was terrible",
    "how are these getting worse",
];

//randomizer for responses from user
function randomResponse(arr) {
    const item = arr[Math.floor(Math.random() * arr.length)]
    return item;
}

