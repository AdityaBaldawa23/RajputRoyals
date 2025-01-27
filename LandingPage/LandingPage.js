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

// async function submitForm(event) {
//   event.preventDefault(); // Prevent default form submission

//   // Reset error messages
//   const errorMessages = document.querySelectorAll('.error');
//   errorMessages.forEach((el) => (el.textContent = ''));

//   const name = document.getElementById('name').value.trim();
//   const number = document.getElementById('number').value.trim();
//   const email = document.getElementById('email').value.trim();
//   const eventDate = document.getElementById('eventdate').value.trim();
//   const eventType = document.getElementById('type').value.trim();
//   const message = document.getElementById('message').value.trim();

//   let isValid = true;

//   // Validation logic
//   if (!name || name.length < 3) {
//       document.getElementById('nameError').textContent = 'Name must be at least 3 characters long.';
//       isValid = false;
//   }
//   if (!number || number.length < 10 || isNaN(number)) {
//       document.getElementById('numberError').textContent = 'Enter a valid 10-digit mobile number.';
//       isValid = false;
//   }
//   if (!email || !/\S+@\S+\.\S+/.test(email)) {
//       document.getElementById('emailError').textContent = 'Enter a valid email address.';
//       isValid = false;
//   }
//   if (!eventDate) {
//       document.getElementById('dateError').textContent = 'Please select a valid event date.';
//       isValid = false;
//   }
//   if (eventType === 'select') {
//       document.getElementById('typeError').textContent = 'Please select an event type.';
//       isValid = false;
//   }
//   if (message.length > 200) {
//       document.getElementById('messageError').textContent = 'Message must not exceed 200 characters.';
//       isValid = false;
//   }

//   if (!isValid) {
//       return; // Stop submission if validation fails
//   }

//   // Show the loading spinner
//   document.getElementById('loadingSpinner').style.display = 'block';

//   try {
//       const response = await fetch('https://your-backend-url/submit-form', {
//           method: 'POST',
//           headers: {
//               'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({ name, number, email, eventDate, eventType, message }),
//       });

//       const result = await response.json();

//       // Hide the loading spinner
//       document.getElementById('loadingSpinner').style.display = 'none';

//       if (response.ok) {
//           alert(result.message);
//           document.getElementById('contactForm').reset(); // Reset the form
//       } else {
//           alert('Error: ' + result.error);
//       }
//   } catch (error) {
//       // Hide the loading spinner
//       document.getElementById('loadingSpinner').style.display = 'none';
//       alert('Error submitting the form.');
//   }
// }



// // Get the current date in YYYY-MM-DD format
// const today = new Date().toISOString().split("T")[0];

// // Set the value of the date input to the current date
// //document.getElementById("eventdate").value = today;


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