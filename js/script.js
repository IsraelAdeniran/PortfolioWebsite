// Smooth scrolling for anchor links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));

        targetSection.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll Animations for Sections
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.3, // 30% of the section should be in view
    rootMargin: "0px 0px -100px 0px" // bottom margin to trigger animations
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
    });
}, options);

sections.forEach(section => {
    observer.observe(section);
});

// Typing Effect for Hero Subtitle
function typingEffect(element, text, speed) {
    let index = 0;
    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        typingEffect(subtitle, "Results-Oriented Software Engineer", 100);
    }
});

// Dynamic Skill Card Hover Effect
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseover', () => {
        card.classList.add('skill-hover');
    });

    card.addEventListener('mouseleave', () => {
        card.classList.remove('skill-hover');
    });

    card.addEventListener('click', () => {
        card.classList.toggle('skill-active');
    });
});

// Contact Form Validation
const form = document.querySelector('form');
form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = form.querySelector('input[type="text"]');
    const email = form.querySelector('input[type="email"]');
    const message = form.querySelector('textarea');

    if (!name.value || !email.value || !message.value) {
        alert('Please fill in all fields');
        return;
    }

    if (!validateEmail(email.value)) {
        alert('Please enter a valid email address');
        return;
    }

    // If validation passes
    alert('Thank you for your message!');
    form.reset();
});

// Email Validation Function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}
