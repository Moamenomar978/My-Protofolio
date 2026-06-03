
let menuBtn = document.querySelector(".menu-btn");
let items = document.querySelector(".items");

menuBtn.addEventListener("click", () => {

    items.classList.toggle("active");

});

let allLinks = document.querySelectorAll(".items a");

allLinks.forEach(link => {

    link.addEventListener("click", () => {

        items.classList.remove("active");

    });

});

let themeBtn = document.querySelector(".theme-btn");

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        localStorage.setItem("mode", "light");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

    } else {

        localStorage.setItem("mode", "dark");

        themeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';
    }

});


let sections = document.querySelectorAll(".group");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        let sectionTop = section.offsetTop;
        let sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {

            current = section.getAttribute("id");

        }
    });

    allLinks.forEach(link => {

        link.classList.remove("active-link");

        if (link.getAttribute("href") === `#${current}`) {

            link.classList.add("active-link");

        }

    });

});

let typingText = document.querySelector(".typing-text");

let words = [
    "Frontend Developer",
    "Web Designer",
    "UI Creator",
    "Freelancer"
];

let wordIndex = 0;
let letterIndex = 0;
let isDeleting = false;

function typeEffect() {

    let currentWord = words[wordIndex];

    if (!isDeleting) {

        typingText.textContent = currentWord.substring(0, letterIndex + 1);

        letterIndex++;

        if (letterIndex === currentWord.length) {

            isDeleting = true;

            setTimeout(typeEffect, 1200);

            return;

        }

    } else {

        typingText.textContent = currentWord.substring(0, letterIndex - 1);

        letterIndex--;

        if (letterIndex === 0) {

            isDeleting = false;

            wordIndex++;

            if (wordIndex === words.length) {

                wordIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, isDeleting ? 60 : 120);

}

typeEffect();


let contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (e) => {

    e.preventDefault();

    let inputs = contactForm.querySelectorAll("input, textarea");

    let valid = true;

    inputs.forEach(input => {

        if (input.value.trim() === "") {

            input.style.border = "2px solid red";

            valid = false;

        } else {

            input.style.border = "2px solid #38bdf8";

        }

    });

    if (valid) {

        alert("Message Sent Successfully!");

        contactForm.reset();

    }

});
