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
  navbar.style.backgroundColor = "#F2F2F2";
  document.getElementById("logo").style.fontSize = "25px";
});

const navLinks = document.querySelectorAll("#navbar-right a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navbarRight.classList.remove("show");
  });
});

