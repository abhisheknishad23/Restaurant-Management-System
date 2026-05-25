'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});



// BOOK TABLE
document.getElementById("reservationForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.querySelector("[name=name]").value,
    phone: document.querySelector("[name=phone]").value,
    persons: document.querySelector("[name=person]").value,
    date: document.querySelector("[name='reservation-date']").value,
    time: document.querySelector("[name=time]").value,
    message: document.querySelector("[name=message]").value
  };

  try {

    const res = await fetch("http://localhost:5000/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || "Server error occurred");
    }

    // Success Popup
    const bId = result.bookingId || result.id || "N/A";

    alert(`Reservation Pending! wait a approval in 5 minutes\nBooking ID: ${bId}`);

    // Generate Slip
    if (typeof generateSlip === "function") {
        generateSlip(bId, data);
    }

    document.getElementById("reservationForm").reset();

  } catch (err) {
    console.error("Submission Error:", err);
    alert("Booking Failed: " + err.message);
  }
});


// LOAD MENU
async function loadMenu() {
  const res = await fetch("http://localhost:5000/api/menu");
  const data = await res.json();

  const container = document.getElementById("menuContainer");
  
  container.innerHTML = data.map(item => `
    <li>
      <div class="menu-card hover:card">
        <figure class="card-banner img-holder">
          <img src="http://localhost:5000/uploads/${item.image}" 
               
               alt="${item.name}" class="img-cover">
        </figure>

        <div>
          <div class="title-wrapper">
            <h3 class="title-3">
              <a href="#" class="card-title">${item.name}</a>
            </h3>
            <span class="badge label-1">${item.category || 'Food'}</span>
            <span class="span title-2">₹${item.price}</span>
          </div>

          <p class="card-text label-1">
            ${item.description}
          </p>
        </div>
      </div>
    </li>
  `).join("");
}

loadMenu();


// online slip reservation
function generateSlip(bookingId, data) {

  const slipWindow = window.open("", "_blank");

  if (!slipWindow) {
    alert("Popup blocked! Please allow popups for this website to see your receipt.");
    return;
  }

  slipWindow.document.write(`
    <html>
    <head>
      <title>Reservation Slip</title>
      <style>
        body { font-family: Arial; padding: 40px; text-align: center; }
        .slip { border: 2px solid black; padding: 20px; width: 400px; margin: auto; }
        h2 { color: #b99351; }
        p { font-size: 18px; text-align: left; margin: 10px 0; }
        button { padding: 10px 20px; margin-top: 20px; cursor: pointer; }
      </style>
    </head>
    <body>
      <div class="slip">
        <h2>Restaurant Reservation Slip</h2>
        <p><strong>Booking ID:</strong> ${bookingId}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Persons:</strong> ${data.persons}</p>
        <p><strong>Date:</strong> ${data.date}</p>
        <p><strong>Time:</strong> ${data.time}</p>
        <button onclick="window.print()">Print Slip</button>
      </div>
    </body>
    </html>
  `);

  slipWindow.document.close(); 
}

//events
async function loadFrontendEvents(){

  const response = await fetch(
    "http://localhost:5000/api/events"
  );

  const data = await response.json();

  const container =
    document.getElementById("eventContainer");

  container.innerHTML = "";

  data.forEach(event => {

    container.innerHTML += `

      <li>

        <div class="event-card has-before hover:shine">

          <div class="card-banner img-holder">

            <img
              src="http://localhost:5000/uploads/${event.image}"
              class="img-cover"
            >

            <time class="publish-date label-2">
             ${new Date(event.event_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
          </div>

          <div class="card-content">

            <p class="card-subtitle label-2 text-center">

              ${event.description}

            </p>

            <h3 class="card-title title-2 text-center">

              ${event.title}

            </h3>

          </div>

        </div>

      </li>

    `;

  });

}


loadFrontendEvents();

//subscribers

document
.getElementById("subscribeForm")

.addEventListener("submit",

async function(e){

  e.preventDefault();

  const email =
  document.getElementById(
    "subscriberEmail"
  ).value;


  try{

    const response = await fetch(

      "http://localhost:5000/api/subscribe",

      {

        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body:JSON.stringify({
          email
        })

      }

    );

    const data = await response.json();

    alert(data.message);

    document
    .getElementById("subscribeForm")
    .reset();

  }

  catch(error){

    console.log(error);

  }

});

//review

async function submitReview(){

  const name =
    document.getElementById(
      "customerName"
    ).value;

  const profession =
    document.getElementById(
      "customerProfession"
    ).value;

  const message =
    document.getElementById(
      "customerMessage"
    ).value;

  const rating =
    document.getElementById(
      "customerRating"
    ).value;

  const image =
    document.getElementById(
      "customerImage"
    ).files[0];


  const formData = new FormData();

  formData.append("name", name);

  formData.append("profession", profession);

  formData.append("message", message);

  formData.append("rating", rating);

  formData.append("image", image);


  const response = await fetch(

    "http://localhost:5000/api/reviews",

    {
      method:"POST",
      body:formData
    }

  );

  const data = await response.json();

  alert(data.message);

}

async function approveReview(id){

  await fetch(

    `http://localhost:5000/api/reviews/approve/${id}`,

    {
      method:"PUT"
    }

  );

  loadReviews();

}

//get review 
let reviews = [];

let currentIndex = 0;


/* LOAD REVIEWS */
async function loadReviews(){

  const response = await fetch(
    "http://localhost:5000/api/reviews"
  );

  const data = await response.json();


  reviews = data.filter(

    review =>
    review.status === "approved"

  );


  renderReviews();

}



/* RENDER ONLY 3 REVIEWS */
function renderReviews(){

  const container =
    document.getElementById(
      "reviewContainer"
    );

  container.innerHTML = "";


  let visibleReviews = reviews.slice(

    currentIndex,

    currentIndex + 3

  );


  // LOOP AGAIN
  if(visibleReviews.length < 3){

    visibleReviews = [

      ...visibleReviews,

      ...reviews.slice(
        0,
        3 - visibleReviews.length
      )

    ];

  }


  visibleReviews.forEach(review => {

    container.innerHTML += `

      <div class="review-card">

        <img
          src="http://localhost:5000/uploads/${review.image}"
          class="review-image"
        >

        <h3>${review.name}</h3>

        <h4>${review.profession}</h4>

        <div class="stars">

          ${"⭐".repeat(review.rating)}

        </div>

        <p>${review.message}</p>

      </div>

    `;

  });

}



/* NEXT */
function nextSlide(){

  currentIndex++;

  if(currentIndex >= reviews.length){

    currentIndex = 0;

  }

  renderReviews();

}



/* PREVIOUS */
function prevSlide(){

  currentIndex--;

  if(currentIndex < 0){

    currentIndex =
      reviews.length - 1;

  }

  renderReviews();

}



/* AUTO SLIDE */
setInterval(() => {

  nextSlide();

}, 4000);



window.onload = () => {

  loadReviews();

};