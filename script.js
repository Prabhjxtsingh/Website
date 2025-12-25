// ============================================
// PARTICLE.JS CONFIGURATION
// ============================================
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#8b5cf6'
        },
        shape: {
            type: 'circle',
            stroke: {
                width: 0,
                color: '#000000'
            }
        },
        opacity: {
            value: 0.3,
            random: false,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#8b5cf6',
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'grab'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 0.5
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// ============================================
// NAVIGATION
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// TYPEWRITER EFFECT
// ============================================
const typewriter = document.getElementById('typewriter');
const phrases = [
    'Web Developer',
    'Python Programmer',
    'Frontend Designer',
    'AI Researcher',
    'Digital Marketer',
    'Tech Enthusiast'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typewriter.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
    } else {
        typewriter.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }
    
    setTimeout(type, typeSpeed);
}

// Start typewriter effect
setTimeout(type, 1000);

// ============================================
// ANIMATED COUNTER FOR STATS
// ============================================
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
};

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            statNumbers.forEach(stat => animateCounter(stat));
            hasAnimated = true;
        }
    });
}, observerOptions);

const aboutSection = document.querySelector('.about-stats');
if (aboutSection) {
    observer.observe(aboutSection);
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const animatedElements = document.querySelectorAll(
    '.project-card, .service-card, .skill-card, .cert-card, .timeline-item'
);

const elementObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
}, {
    threshold: 0.1
});

animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    elementObserver.observe(element);
});

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// CONTACT FORM
// ============================================
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend endpoint)
    setTimeout(() => {
        formMessage.textContent = 'Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
        formMessage.className = 'form-message success';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }, 1500);
});

// ============================================
// SKILL CARD TILT EFFECT
// ============================================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ============================================
// PROJECT CARD PARALLAX EFFECT
// ============================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const moveX = (x - rect.width / 2) / 20;
        const moveY = (y - rect.height / 2) / 20;
        
        const img = card.querySelector('.project-image img');
        if (img) {
            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('.project-image img');
        if (img) {
            img.style.transform = 'translate(0, 0) scale(1)';
        }
    });
});

// ============================================
// CURSOR TRAIL EFFECT
// ============================================
const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const animate = () => {
        const dx = mouseX - trailX;
        const dy = mouseY - trailY;
        
        trailX += dx * 0.1;
        trailY += dy * 0.1;
        
        trail.style.left = trailX + 'px';
        trail.style.top = trailY + 'px';
        
        requestAnimationFrame(animate);
    };
    
    animate();
};

// Add cursor trail CSS
const style = document.createElement('style');
style.textContent = `
    .cursor-trail {
        position: fixed;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(139, 92, 246, 0.6), transparent);
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
    }
    
    @media (max-width: 768px) {
        .cursor-trail {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// Initialize cursor trail
createCursorTrail();

// ============================================
// SCROLL REVEAL ANIMATION
// ============================================
const revealElements = () => {
    const elements = document.querySelectorAll('.about-text, .about-stats, .contact-info, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// ============================================
// GLITCH TEXT EFFECT ON HOVER
// ============================================
const glitchText = document.querySelector('.glitch-text');

if (glitchText) {
    glitchText.addEventListener('mouseenter', () => {
        glitchText.style.animation = 'glitchAnimation 0.3s infinite';
    });
    
    glitchText.addEventListener('mouseleave', () => {
        glitchText.style.animation = 'glitchAnimation 3s infinite';
    });
}

// ============================================
// FLOATING ICONS ANIMATION
// ============================================
const floatingIcons = document.querySelectorAll('.floating-icon');

floatingIcons.forEach((icon, index) => {
    icon.addEventListener('mouseenter', () => {
        icon.style.animation = 'none';
        icon.style.transform = 'scale(1.3) rotate(360deg)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'scale(1) rotate(0deg)';
        setTimeout(() => {
            icon.style.animation = `float 3s ease-in-out infinite`;
            icon.style.animationDelay = `calc(${index} * 0.5s)`;
        }, 300);
    });
});

// ============================================
// GRADIENT ANIMATION FOR BUTTONS
// ============================================
const animatedButtons = document.querySelectorAll('.btn-primary');

animatedButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        button.style.setProperty('--x', x + 'px');
        button.style.setProperty('--y', y + 'px');
    });
});

// Add dynamic gradient CSS
const gradientStyle = document.createElement('style');
gradientStyle.textContent = `
    .btn-primary {
        --x: 50%;
        --y: 50%;
        background: radial-gradient(circle at var(--x) var(--y), #ec4899, #8b5cf6);
    }
`;
document.head.appendChild(gradientStyle);

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// TOOLTIP FOR SOCIAL LINKS
// ============================================
const socialLinks = document.querySelectorAll('.social-link[data-tooltip]');

socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
        link.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    link.addEventListener('mouseleave', () => {
        link.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// EASTER EGG: KONAMI CODE
// ============================================
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        // Easter egg activated!
        document.body.style.animation = 'rainbow 2s infinite';
        
        const easterEggStyle = document.createElement('style');
        easterEggStyle.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(easterEggStyle);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c👋 Hello there!', 'font-size: 20px; color: #8b5cf6; font-weight: bold;');
console.log('%cWelcome to my portfolio! Feel free to explore.', 'font-size: 14px; color: #ec4899;');
console.log('%cInterested in the code? Check out my GitHub: https://github.com/Prabhjxtsingh', 'font-size: 12px; color: #06b6d4;');

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy loading images
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
        // Scroll-dependent code here
    });
}, { passive: true });