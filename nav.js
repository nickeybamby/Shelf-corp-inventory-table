
//to access the hamburger and nav menu class to display for media screen of 768px

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");



//event listener for clicks to toggle the hamburger menu and display the nav menu
hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})


//these codes tells the browser to close the hamburger and nav menu if a link from the nav links is clicked on 
document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}))
