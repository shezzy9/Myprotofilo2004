// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const typedTextSpan = document.querySelector('.typed-text');
    const texts = ['Web Developer', 'UI/UX Designer', 'Frontend Developer', 'Creative Coder'];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 2000); // Wait before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(type, 500); // Wait before typing next word
        } else {
            setTimeout(type, isDeleting ? 100 : 200);
        }
    }

    type(); // Start the typing animation
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll reveal animation
window.addEventListener('scroll', function() {
    const elements = document.querySelectorAll('.highlight-item, .project-card');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
});

// Animate skill bars when they come into view
const animateSkills = () => {
    const skillPers = document.querySelectorAll('.skill-per');
    
    skillPers.forEach(skillPer => {
        const per = skillPer.getAttribute('per');
        skillPer.style.width = per + '%';
    });
};

// Trigger skill animation when scrolled into view
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
        }
    });
}, { threshold: 0.5 });

const skillsContainer = document.querySelector('.skills-container');
if (skillsContainer) {
    skillsObserver.observe(skillsContainer);
}

// Handle contact form navigation and scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Handle Hire Me button click
    const hireMeBtn = document.getElementById('hireMeBtn');
    if (hireMeBtn) {
        // Add click handler
        hireMeBtn.addEventListener('click', function(e) {
            // Create ripple effect
            const rect = hireMeBtn.getBoundingClientRect();
            const effect = hireMeBtn.querySelector('.button-effect');
            
            if (effect) {
                effect.style.width = effect.style.height = '0';
                effect.style.opacity = '1';
                
                requestAnimationFrame(() => {
                    effect.style.width = effect.style.height = '200px';
                    effect.style.opacity = '0';
                });
            }

            // Navigate to contact page
            setTimeout(() => {
                window.location.href = 'contact.html#contact';
            }, 200);
        });

        // Add keyboard accessibility
        hireMeBtn.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }

    // Handle scrolling on contact page
    if (window.location.pathname.includes('contact.html')) {
        // Check both hash and localStorage
        if (window.location.hash === '#contact' || localStorage.getItem('scrollToContact')) {
            // Clear localStorage
            localStorage.removeItem('scrollToContact');
            
            // Scroll after a short delay to ensure page is ready
            setTimeout(() => {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    // Smooth scroll to contact form
                    window.scrollTo({
                        top: contactSection.offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Focus on name input after scroll completes
                    setTimeout(() => {
                        const nameInput = document.querySelector('#name');
                        if (nameInput) {
                            nameInput.focus();
                            // Optional: Scroll the input into view if needed
                            nameInput.scrollIntoView({ block: 'center', behavior: 'smooth' });
                        }
                    }, 600);
                }
            }, 300);
        }
    }
});

// Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('nav-open');
            navToggle.classList.toggle('nav-open');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-open');
                navToggle.classList.remove('nav-open');
            });
        });
    }
}); 
