// When the user scrolls down 80px from the top of the document, resize the navbar's padding and the logo's font size
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
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("navbar").style.boxShadow = "0px 0px";
  }
}

const toggle = document.getElementById("toggle");
const navbarRight = document.getElementById("navbar-right");

toggle.addEventListener("click", () => {
  navbarRight.classList.toggle("show");
  navbar.style.backgroundColor = "#F2F2F2";
  document.getElementById("navbar").style.padding = "10px 10px";
  document.getElementById("logo").style.fontSize = "25px";
});

const navLinks = document.querySelectorAll("#navbar-right a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbarRight.classList.remove("show");
  });
});

document.querySelector("#home-btn").addEventListener("click", (event) => {
  event.preventDefault(); // Prevent default link behavior
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Get the current date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

// Set the value of the date input to the current date
document.getElementById("eventdate").value = today;


document.getElementById("typewriter").style.width = "50px";
document.getElementById("typewriter").style.height= "100px";

document.addEventListener("DOMContentLoaded", function () {
  const words = ["Weddings", "Engagements", "Birthdays", "Receptions"];
  let wordIndex = 0;
  let charIndex = 0;
  const element = document.getElementById("typewriter");

  if (!element) {
      console.error("Typewriter element not found!");
      return;
  }

  function typeWriter() {
      const currentWord = words[wordIndex];
      if (charIndex < currentWord.length) {
          element.innerHTML += currentWord.charAt(charIndex);
          charIndex++;
          setTimeout(typeWriter, 200);
      } else {
          setTimeout(eraseWord, 1000);
      }
  }

  function eraseWord() {
      const currentWord = words[wordIndex];
      if (charIndex > 0) {
          element.innerHTML = currentWord.substring(0, charIndex - 1);
          charIndex--;
          setTimeout(eraseWord, 100);
      } else {
          wordIndex = (wordIndex + 1) % words.length;
          setTimeout(typeWriter, 500);
      }
  }

  typeWriter();
});

let currentSlide = 0;
const slides = document.querySelectorAll('.faq-slide');
const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function changeSlide(step) {
    showSlide(currentSlide + step);
}

function goToSlide(index) {
    showSlide(index);
}

// Target specific links for smooth scrolling
const smoothScrollLinks = ['#section7', '#faq'];

smoothScrollLinks.forEach(selector => {
    const link = document.querySelector(`a[href="${selector}"]`);
    if (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default jump behavior

            const targetElement = document.querySelector(selector);

            if (targetElement) {
                // Offset calculation for fixed navbar
                const headerOffset = document.getElementById('navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset;

                // Scroll to the calculated position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth',
                });
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("x_yufovpcBm7C1UWH"); // Your public key

  document.getElementById("contactForm").addEventListener("submit", sendEmail);
});

function sendEmail(e) {
  e.preventDefault();

  const formData = {
    user_name: document.getElementById("name").value,
    user_number: document.getElementById("number").value,
    user_email: document.getElementById("email").value,
    event_date: document.getElementById("eventdate").value,
    event_type: document.getElementById("type").value,
    message: document.getElementById("AdditionalMessage").value,
  };

  // 1️⃣ Send email to the admin (existing template)
  emailjs
    .send("service_0midm8h", "template_0u6rm9c", formData, "x_yufovpcBm7C1UWH")
    .then(() => console.log("Admin Email sent!"))
    .catch((error) => console.error("Error sending admin email:", error.text));

  // 2️⃣ Send acknowledgment email to the user (new template)
  emailjs
    .send("service_0midm8h", "template_tmlam98", formData, "x_yufovpcBm7C1UWH")
    .then(() => {
      console.log("User acknowledgment email sent!");
      alert("Your query has been received. Please check your email!");
    })
    .catch((error) => console.error("Error sending acknowledgment email:", error.text));

  // Reset the form
  e.target.reset();
}
