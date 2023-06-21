const img = document.querySelector("#img");
const submitBtn = document.querySelector("#submitbtn");
const msg = document.querySelector("#messagediv");
const mainText = document.querySelector("#maintext");
const imgDiv = document.querySelector("#imgdiv");
const navDiv = document.querySelector("#navdiv");
var url, screenShotUrl;

// User Screen Dimensions 
var width = window.innerWidth;
var height = window.innerHeight;


// Makes Room For Preview
function imgDivSize(divW, divH)
{
  imgDiv.style.width = divW;
  imgDiv.style.height = divH;
}

// Styles Submit Button And Nav Div Text
function button(text, color = "#0055ff")
{
  submitBtn.innerHTML = text;
  submitBtn.style.backgroundColor = color;
  navDiv.style.color = color;
}

// Events To Be Carried Out When Screenshot Can Be Downloaded 
function onDownload()
{
  button("SUBMIT", "#027030");
  imgDivSize(`${width}px`, `${height}px`);
  imgDiv.style.display = "block";
}

function message(value, msgNumber)
{
  msg.style.display = value;
  if (msgNumber == 1)
  {
    msg.innerHTML = "An errror occurred. Ensure link is correct and internet is connected.";
  }
  else if (msgNumber == 2)
  {
    msg.innerHTML = "Screenshot API limit exceeded. Site out of service.";
    button("SUBMIT", "darkred");
  }
  else if (msgNumber == 3)
  {
    msg.innerHTML = "To download:<br>● Long press on image if using a touchscreen then click on download.<br>● Right click on image if using pc then click download.";
    msg.style.textAlign = "left"
  }
}

// Gets Image Of Screenshot When Ready And Displays Alternative Message If Not
function getImage(imgUrl)
{
  if (imgUrl != undefined)
  {
    console.log("1");
    img.setAttribute("src", imgUrl);
    message("block", 3);
  	onDownload();
  }
  else
  {
    console.log("2");
    message("block", 2);
  }
}

// Main Function 
function getScreenShot() 
{
  button("LOADING...", "#efb700");
  message("none");
  
  // Get Url Of Website To Screenshot
  screenShotUrl = document.querySelector("#urlinput").value;
  console.log(screenShotUrl);
  url = `https://website-screenshot6.p.rapidapi.com/screenshot?url=${screenShotUrl}&width=${width}&height=${height}&fullscreen=true`;
  
  // From Screenshot6 API
  const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': config.KEY,
		'X-RapidAPI-Host': 'website-screenshot6.p.rapidapi.com'
	}
};

fetch(url, options)
	.then(response => response.json())
	.then(response => {
	  getImage(response.screenshotUrl);
	  console.log(response.screenshotUrl)
	})
	.catch(err => {
	  button("SUBMIT", "darkred");
	  message("block", 1);
	  console.error(err);
	});
}


submitBtn.addEventListener("click", getScreenShot);