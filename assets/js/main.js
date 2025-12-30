/* ================================
   Main JavaScript
   Dark Future Bento Grid Theme
================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initCounterAnimation();
    initSmoothScroll();
    initParallax();
    initIntersectionObserver();
    initTypingEffect();
});

/* ================================
   Navigation
================================ */
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const hamburger = document.querySelector('.hamburger');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            // Toggle hamburger animation
            if (hamburger.classList.contains('active')) {
                hamburger.style.background = 'transparent';
            } else {
                hamburger.style.background = '';
            }
        });
    }
    
    // Close mobile menu on link click
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.classList.remove('active');
            hamburger.classList.remove('active');
            hamburger.style.background = '';
        });
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(2, 6, 23, 0.95)';
            navbar.style.borderBottomColor = 'rgba(99, 102, 241, 0.3)';
        } else {
            navbar.style.background = 'rgba(2, 6, 23, 0.8)';
            navbar.style.borderBottomColor = 'rgba(99, 102, 241, 0.2)';
        }
    });
}

/* ================================
   Scroll Effects
================================ */
function initScrollEffects() {
    // Reveal elements on scroll
    const revealElements = document.querySelectorAll('.bento-card');
    
    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Initial check
    revealOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', revealOnScroll);
}

/* ================================
   Counter Animation
================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + '+';
            }
        };
        
        updateCounter();
    };
    
    // Use Intersection Observer to trigger animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => {
        observer.observe(counter);
    });
}

/* ================================
   Smooth Scroll
================================ */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ================================
   Parallax Effect
================================ */
function initParallax() {
    const glowOrbs = document.querySelectorAll('.glow-orb');
    
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        glowOrbs.forEach((orb, index) => {
            const speed = (index + 1) * 20;
            const x = (mouseX - 0.5) * speed;
            const y = (mouseY - 0.5) * speed;
            
            orb.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/* ================================
   Intersection Observer for Animations
================================ */
function initIntersectionObserver() {
    const animatedElements = document.querySelectorAll('.bento-card, .section-header, .skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate skill bars
                if (entry.target.classList.contains('skill-progress')) {
                    entry.target.style.width = entry.target.style.getPropertyValue('--progress');
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/* ================================
   Typing Effect
================================ */
function initTypingEffect() {
    const typingElement = document.querySelector('.hero-description');
    
    if (typingElement && typeof Typed !== 'undefined') {
        // Add cursor effect to greeting
        const greeting = document.querySelector('.greeting');
        if (greeting) {
            greeting.innerHTML += '<span class="typing-cursor"></span>';
        }
    }
}

/* ================================
   Skill Bar Animation
================================ */
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach(bar => {
        const progress = bar.style.getPropertyValue('--progress');
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.width = progress;
        }, 500);
    });
}

/* ================================
   Card Hover Effects
================================ */
document.querySelectorAll('.bento-card').forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        // Create glow effect
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });
});

/* ================================
   Loading Animation
================================ */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger skill bar animations after page load
    setTimeout(animateSkillBars, 1000);
});

/* ================================
   Scroll Progress Indicator
================================ */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const progressBarInner = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBarInner.style.width = `${scrolled}%`;
    });
}

// Add scroll progress styles
const progressStyles = document.createElement('style');
progressStyles.textContent = `
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        height: 3px;
        z-index: 9999;
        background: rgba(15, 23, 42, 0.5);
    }
    
    .scroll-progress-bar {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #6366f1, #a855f7);
        transition: width 0.1s ease-out;
    }
`;
document.head.appendChild(progressStyles);

// Initialize scroll progress
initScrollProgress();

/* ================================
   Cursor Effects (Optional)
================================ */
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
    });
    
    const animate = () => {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animate);
    };
    
    animate();
    
    // Hover effects
    document.querySelectorAll('a, button, .bento-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('cursor-hover');
            cursorDot.classList.add('dot-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('cursor-hover');
            cursorDot.classList.remove('dot-hover');
        });
    });
}

// Custom cursor styles (optional - uncomment to enable)
/*
const cursorStyles = document.createElement('style');
cursorStyles.textContent = `
    .custom-cursor {
        position: fixed;
        width: 40px;
        height: 40px;
        border: 2px solid rgba(99, 102, 241, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s, border-color 0.2s;
    }
    
    .cursor-dot {
        position: fixed;
        width: 8px;
        height: 8px;
        background: #6366f1;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        transition: width 0.2s, height 0.2s;
    }
    
    .cursor-hover {
        width: 60px;
        height: 60px;
        border-color: rgba(99, 102, 241, 0.8);
    }
    
    .dot-hover {
        width: 4px;
        height: 4px;
    }
    
    @media (max-width: 768px) {
        .custom-cursor, .cursor-dot {
            display: none;
        }
    }
`;
document.head.appendChild(cursorStyles);
initCustomCursor();
*/

/* ================================
   Console Easter Egg
================================ */
console.log(`
%c👋 你好！歡迎來到我的網站！

%c🔬 李捷新 (Chieh-Hsin Li)
%c💡 AI Researcher | Deep Learning | Medical Image Analysis

%c📧 如果你正在查看這裡，你可能對技術也很有興趣！
   歡迎透過網站上的聯繫方式與我交流 😊

%c🚀 Innovate. Research. Impact.
`,
    'font-size: 20px; color: #6366f1;',
    'font-size: 16px; color: #e2e8f0; font-weight: bold;',
    'font-size: 12px; color: #94a3b8;',
    'font-size: 12px; color: #64748b;',
    'font-size: 14px; color: #a855f7; font-style: italic;'
);
