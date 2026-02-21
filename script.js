// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbar = document.querySelector('.navbar');
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight - 20; // Extra 20px padding
                
                window.scrollTo({
                    top: Math.max(0, targetPosition),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('hero');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        
        if (currentScroll < heroBottom - 100) {
            // Over hero section - transparent navbar
            navbar.classList.add('over-hero');
            navbar.style.boxShadow = 'none';
        } else {
            // Past hero section - normal navbar
            navbar.classList.remove('over-hero');
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.12)';
            } else {
                navbar.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
            }
        }
        
        lastScroll = currentScroll;
    });

    // Set initial navbar state
    if (window.pageYOffset < heroSection.offsetHeight - 100) {
        navbar.classList.add('over-hero');
    }

    // Active nav link highlighting
    const sections = document.querySelectorAll('.section, .hero');
    
    function highlightNav() {
        const scrollPos = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNav);
    highlightNav();

    // Typing animation for hero subtitle
    const typingElement = document.querySelector('.typing-text');
    const words = ['Reciprocity System', 'Skill Exchange Network', 'Community Connection Hub'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Typing speed in milliseconds
    let deletingSpeed = 50; // Deleting speed in milliseconds
    let pauseTime = 2000; // Pause time after completing a word

    function typeText() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete characters
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = deletingSpeed;
        } else {
            // Type characters
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Word completed, pause then start deleting
            typingSpeed = pauseTime;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Word deleted, move to next word
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeText, typingSpeed);
    }

    // Start typing animation after a short delay
    setTimeout(typeText, 1000);
});

