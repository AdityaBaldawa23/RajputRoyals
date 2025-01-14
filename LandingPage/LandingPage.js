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

async function submitForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const number = document.getElementById("number").value;
  const email = document.getElementById("email").value;
  const eventDate = document.getElementById("eventdate").value;
  const eventType = document.getElementById("type").value;
  const message = document.querySelector("textarea").value;

  if (!name || !number || !email || !eventDate || eventType === "select") {
    alert("Please fill in all required fields");
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        number,
        email,
        eventDate,
        eventType,
        message,
      }),
    });

    if (response.ok) {
      alert("Form submitted successfully");
      document.getElementById("contactForm").reset();
    } else {
      const errorData = await response.json();
      alert(`Error: ${errorData.error}`);
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Failed to submit the form. Please try again.");
  }
}

// Get the current date in YYYY-MM-DD format
const today = new Date().toISOString().split("T")[0];

// Set the value of the date input to the current date
document.getElementById("eventdate").value = today;

const words = ["Wedding","Engagement", "Birthdays", "Receptions"]; // Array to store words
let wordIndex = 0; // Track the current word (0 = "Engagement", 1 = "Wedding")
let charIndex = 0; // Track the character position
const element = document.getElementById("typewriter");

element.style.display = "inline-block";
element.style.width = "200px";
element.style.color = "#191970";
element.style.fontWeight = "bolder"
// element.style.paddingTop = "10px"

function typeWriter() {
  const currentWord = words[wordIndex];

  // Type the current word
  if (charIndex < currentWord.length) {
    element.innerHTML += currentWord.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 200); // Adjust the typing speed
  } else {
    // Once the word is fully typed, start erasing
    setTimeout(() => {
      eraseWord();
    }, 1000); // Wait for 1 second before starting to erase
  }
}

function eraseWord() {
  const currentWord = words[wordIndex];

  // Erase the current word one character at a time
  if (charIndex > 0) {
    element.innerHTML = currentWord.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseWord, 100); // Adjust the erasing speed
  } else {
    // Once the word is erased, move to the next word
    wordIndex = (wordIndex + 1) % words.length; // Toggle between 0 and 1
    setTimeout(typeWriter, 500); // Pause before typing the next word
  }
}

// Start the typewriter effect when the page is loaded
window.onload = typeWriter;
