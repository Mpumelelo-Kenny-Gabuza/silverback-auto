// Get modal and buttons
const contactModal = document.getElementById('contactModal');
const contactButtons = document.querySelectorAll('[href*="contact"], .btn-primary'); // Adjust selector to match your donate button
const closeButton = document.querySelector('.close-button');
const cancelBtn = document.getElementById('cancelBtn');
const proceedBtn = document.getElementById('proceedBtn');

// Function to open modal
function openContactModal(event) {
    event.preventDefault(); // Prevent immediate redirect
    contactModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Function to close modal
function closeContactModal() {
    contactModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

// Function to proceed to donation page
function proceedToContact() {
    // Replace with your actual donation page URL
    window.location.href = 'contact.html';
}

// Event listeners
contactButtons.forEach(button => {
    button.addEventListener('click', openContactModal);
});

closeButton.addEventListener('click', closeContactModal);
cancelBtn.addEventListener('click', closeContactModal);
proceedBtn.addEventListener('click', proceedToContact);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === contactModal) {
        closeContactModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && contactModal.style.display === 'block') {
        closeContactModal();
    }
});

// FAQ
const faqs = document.querySelectorAll(".faq-item");

faqs.forEach(faq => {
    faq.querySelector(".faq-question1").addEventListener("click", () => {
        faq.classList.toggle("active");

        // Close others when one is opened
        faqs.forEach(otherFaq => {
            if (otherFaq !== faq) otherFaq.classList.remove("active");
        });
    });
});

// ANIMATION
const animatedElements = document.querySelectorAll(".fade-in, .fade-in-up");

    const observer = new IntersectionObserver(
        entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
            observer.unobserve(entry.target);
            }
        });
        },
        { threshold: 0.2 }
    );

    animatedElements.forEach(el => {
        el.style.animationPlayState = "paused";
        observer.observe(el);
    });


document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".testimonial-container");
    const slides = Array.from(container.querySelectorAll(".testimonial-slide"));
    const prevBtn = container.querySelector(".prev");
    const nextBtn = container.querySelector(".next");
    const dotsContainer = container.querySelector(".dots");

    if (!slides.length) return;

    // ✅ Create a track to wrap slides (no HTML modification)
    const track = document.createElement("div");
    track.classList.add("testimonial-track");
    slides.forEach(slide => track.appendChild(slide));
    container.insertBefore(track, prevBtn); // keeps arrows functional and visible

    // ✅ Create dots dynamically
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
        currentIndex = i;
        updateSlidePosition();
        restartAutoSlide();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll(".dot");
    let currentIndex = 0;
    let interval;
    const intervalTime = 8000;

    // ✅ Update visible slide
    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle("active", i === currentIndex));
    }

    // ✅ Manual Navigation
    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlidePosition();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlidePosition();
    }

    nextBtn.addEventListener("click", () => {
        nextSlide();
        restartAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        restartAutoSlide();
    });

    // ✅ Auto-slide functionality
    function startAutoSlide() {
        interval = setInterval(nextSlide, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(interval);
    }

    function restartAutoSlide() {
        stopAutoSlide();
        startAutoSlide();
    }

    // Pause on hover
    container.addEventListener("mouseenter", stopAutoSlide);
    container.addEventListener("mouseleave", startAutoSlide);

    // Initialize
    updateSlidePosition();
    startAutoSlide();
});

