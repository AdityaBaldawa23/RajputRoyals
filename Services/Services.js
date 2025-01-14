document.addEventListener("DOMContentLoaded", () => {
  const slideshows = document.querySelectorAll(".slideshow-container");

  slideshows.forEach((slideshow) => {
    let slides = slideshow.querySelectorAll(".slide");
    let currentIndex = 0;

    // Hide all slides initially
    slides.forEach((slide) => (slide.style.display = "none"));

    // Function to show the next slide
    function showNextSlide() {
      slides[currentIndex].style.display = "none"; // Hide current slide
      currentIndex = (currentIndex + 1) % slides.length; // Move to next slide
      slides[currentIndex].style.display = "block"; // Show next slide
    }

    // Show the first slide
    slides[currentIndex].style.display = "block";

    // Set an interval for the slideshow
    setInterval(showNextSlide, 3000); // Change slide every 3 seconds
  });
});


window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
    document.getElementById("navbar").style.padding = "10px 10px";
    document.getElementById("navbar").style.boxShadow =
      "0 4px 6px rgba(0,0,0,0.2)";
    document.getElementById("navbar").style.backgroundColor = "#F2F2F2";
    document.getElementById("logo").style.fontSize = "25px";
  } else {
    document.getElementById("navbar").style.padding = "20px 10px";
    document.getElementById("logo").style.fontSize = "35px";
    document.getElementById("navbar").style.backgroundColor = "#F2F2F2";
    document.getElementById("navbar").style.boxShadow = "0px 0px";
  }
}


const toggle = document.getElementById("toggle");
const navbarRight = document.getElementById("navbar-right");

toggle.addEventListener("click", () => {
  navbarRight.classList.toggle("show");
});
