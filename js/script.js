// Typing Effect for Hero Title with Callback
function typingEffect(element, text, speed, callback) {
    let index = 0;

    function type() {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(type, speed);
        } else if (callback) {
            callback(); // Call the callback function after typing is complete
        }
    }

    type();
}

// Typing and Deleting Effect for Hero Subtitle with Callback, keeping the "A" constant
function typingAndDeletingEffect(element, prefixText, text, typingSpeed, deletingSpeed, delayBeforeDelete, callback) {
    let index = 0;
    let isDeleting = false;

    function type() {
        if (!isDeleting) {
            // Typing phase
            if (index < text.length) {
                element.innerHTML = prefixText + text.substring(0, index + 1); // Add prefixText and type rest
                index++;
                setTimeout(type, typingSpeed);
            } else {
                // Wait for a while after typing is complete
                setTimeout(() => {
                    isDeleting = true;
                    type();
                }, delayBeforeDelete);
            }
        } else {
            // Deleting phase
            if (index > 0) {
                element.innerHTML = prefixText + text.substring(0, index - 1); // Keep prefixText, delete rest
                index--;
                setTimeout(type, deletingSpeed);
            } else {
                isDeleting = false; // Reset to typing mode
                if (callback) callback(); // Call the callback function after deleting is complete
            }
        }
    }

    type();
}

// Function to cycle through subtitles with typing and deleting effect
function cycleSubtitles(element, prefixText, texts, typingSpeed, deletingSpeed, delayBeforeDelete, delayBetweenCycles) {
    let index = 0;

    function cycle() {
        element.innerHTML = prefixText; // Set the initial constant text

        // Type out the next subtitle and then delete it
        typingAndDeletingEffect(element, prefixText, texts[index], typingSpeed, deletingSpeed, delayBeforeDelete, () => {
            setTimeout(() => {
                index = (index + 1) % texts.length; // Cycle through the texts array
                cycle(); // Call cycle again to loop
            }, delayBetweenCycles);
        });
    }

    cycle(); // Start the cycle
}

document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');

    // Array of subtitles to cycle through
    const subtitles = [
        "Results-Oriented Software Engineer",
        "Passionate Full Stack Developer",
        "Game Developer"
    ];

    if (title) {
        // Start typing effect for the title (no backspace effect)
        typingEffect(title, "Hi, I'm Adefolajuwon Adeniran", 100, () => {
            // Start typing effect for the subtitles after the title is done
            if (subtitle) {
                subtitle.classList.add('animate-subtitle'); // Add the animation class
                cycleSubtitles(subtitle, "A ", subtitles, 100, 50, 1000, 1000); // Start cycling through subtitles with typing and deleting effect
            }
        });
        // Add the animation class for the title
        title.classList.add('animate-title');
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
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
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, options);

    sections.forEach(section => {
        observer.observe(section);
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
    if (form) {
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
    }

    // Email Validation Function
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
