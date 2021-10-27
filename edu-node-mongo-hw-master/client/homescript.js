

console.log("script connected.")

var heart_status = 0 // 0 is empty and 1 is filled.

document.getElementById("heart-button").addEventListener("click", () => {
    let heart = document.getElementById("heart-button");
    if (heart_status == 0) {
        heart.src = "static/heart-filled.png"
        heart_status = 1
        // TODO: update the database and mark this image as a favorite image.
        let photo_url = document.getElementById("apod-image").src;
        const Url = 'http://127.0.0.1:8080/api/liked';
        let date = document.getElementById("apod-date").innerHTML;
        const toSend = {photo_address: photo_url,photo_date: date};
;
        const options = {
            method: 'PUT',
            body: JSON.stringify(toSend),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('/api/liked', options).then(res => {console.log(res.json().then((json)=>console.log(json)))});
        



    } else {
        heart_status = 0
        heart.src = "static/heart.png"
        // TODO: update the database and un-mark this image as a favorite image.

        let photo_url = document.getElementById("apod-image").src;
        const Url = 'http://127.0.0.1:8080/api/unliked';
        let date = document.getElementById("apod-date").innerHTML;
        const toSend = {photo_address: photo_url,photo_date: date};
        
        const options = {
            method: 'PUT',
            body: JSON.stringify(toSend),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('/api/unliked', options).then(res => {console.log(res.json().then((json)=>(console.log(json))))});
    }
})

document.getElementById("next-button").addEventListener("click", () => {
    document.getElementById("heart-button").src = "static/heart.png";
    heart_status = 0
    // TODO: Get the image url, title, description, and date from the database using Fetch.
    // you can use let date = document.getElementById("apod-date"); to change the date.
    fetch('/api/next')
    .then(res=>res.json().then(
        (json) => {
            document.getElementById("apod-image").src = json.url;
            document.getElementById("apod-date").innerHTML = json.date;
            document.getElementById("apod-p").innerText = json.explanation;
            document.getElementById("apod-title").innerText = json.title;
        }
    ))
})