

console.log("script connected.")
var heart_status = 0; // 0 is empty and 1 is filled
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth();
var day = date.getDate();

const previousDate = (year, month, day) => {
  if (day - 1 < 1) {
    month -= 1;
  } else {
    day -= 1;
  }
  return [year, month, day];
};

const dateToString = (year, month, day) =>
  String(year) + "-" + String(month) + "-" + String(day);
var heart_status = 0 // 0 is empty and 1 is filled.

document.getElementById("heart-button").addEventListener("click", () => {
    let heart = document.getElementById("heart-button");
    if (heart_status == 0) {
        heart.src = "static/heart-filled.png"
        heart_status = 1
        // TODO: update the database and mark this image as a favorite image.
        let photo_url = document.getElementById("apod-image").src;
        let date = document.getElementById("apod-date").innerHTML;
        const toSend = {photo_address: photo_url,photo_date: date};

        const options = {
            method: 'POST',
            body: JSON.stringify(toSend),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('/api/add', options).then(res => {console.log(res.json().then((json)=>console.log(json)))});
        



    } else {
        heart_status = 0
        heart.src = "static/heart.png"
        // TODO: update the database and un-mark this image as a favorite image.

        let photo_url = document.getElementById("apod-image").src;
        let date = document.getElementById("apod-date").innerHTML;
        const toSend = {photo_date: date};
        
        const options = {
            method: 'POST',
            body: JSON.stringify(toSend),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        fetch('/api/delete', options).then(res => {console.log(res.json().then((json)=>(console.log(json))))});
    }
})

document.getElementById("next-button").addEventListener("click", () => {
    document.getElementById("heart-button").src = "static/heart.png";
    heart_status = 0;
    [year, month, day] = previousDate(year, month, day);
    fetch(
      "https://api.nasa.gov/planetary/apod?api_key=xRSoeMQHQJ5IiKwhHnOYfppEE05ADhjDFg18Qdwx&date=" +
        dateToString(year, month, day)
    )
      .then((r) => r.json())
      .then((r) => {
        console.log("current APOD data:");
        console.log(r);
        document.getElementById("apod-date").innerHTML = r.date;
        document.getElementById("apod-image").src = r.url;
        document.getElementById("apod-title").innerHTML = r.title;
        document.getElementById("apod-p").innerHTML = r.explanation;
      });
  });