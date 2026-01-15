// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect — hide when off the top
const header = document.getElementById('masthead');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('scroll-down');
        header.classList.remove('scroll-up');
        return;
    }

    // Once the user scrolls away from top, keep header hidden
    header.classList.add('scroll-down');
    header.classList.remove('scroll-up');
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.process-card, .feature-card, .testimonial-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add fade-in class style dynamically
const style = document.createElement('style');
style.textContent = `
    .fade-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);

// Image error handling - already handled in HTML with onerror attribute
// But we can add a fallback console log
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        console.log('Image failed to load:', this.src);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Lazy load iframe
const iframe = document.querySelector('iframe');
if (iframe) {
    const iframeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Iframe already has src, but we can add loading animation
                iframe.style.opacity = '1';
                iframeObserver.unobserve(iframe);
            }
        });
    });
    
    iframe.style.opacity = '0';
    iframe.style.transition = 'opacity 0.6s ease';
    iframeObserver.observe(iframe);
}

// Add click tracking for phone numbers (optional - for analytics)
document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Phone link clicked:', link.href);
        // You can add Google Analytics tracking here if needed
    });
});

// Add click tracking for email links
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Email link clicked:', link.href);
    });
});

// Add click tracking for map links
document.querySelectorAll('a[href*="maps"]').forEach(link => {
    link.addEventListener('click', () => {
        console.log('Map link clicked:', link.href);
    });
});

console.log('Phone Repair Zone website loaded successfully!');

// Handle service form submission
const serviceForm = document.getElementById('serviceForm');
if (serviceForm) {
    serviceForm.addEventListener('submit', function(e) {
        // Let the form submit naturally to FormSubmit
        // Show loading message
        const submitBtn = serviceForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending...';
        submitBtn.disabled = true;
        
        // Form will redirect after submission
        // FormSubmit will handle the email sending
    });
}
