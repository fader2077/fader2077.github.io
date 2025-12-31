/* ================================
   Main JavaScript
   Dark Future Bento Grid Theme
   Version 2.0 - Refactored
================================ */

/* ================================
   Component Loader (DRY Principle)
================================ */
async function loadComponent(elementId, componentPath) {
    const element = document.getElementById(elementId);
    if (!element) {
        console.warn(`Element #${elementId} not found`);
        return false;
    }
    
    try {
        const response = await fetch(componentPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        element.innerHTML = html;
        return true;
    } catch (error) {
        console.error(`Failed to load component ${componentPath}:`, error);
        return false;
    }
}

// Load all components and initialize
async function initComponents() {
    // Load navbar and footer components
    const navbarLoaded = await loadComponent('navbar-placeholder', 'components/navbar.html');
    const footerLoaded = await loadComponent('footer-placeholder', 'components/footer.html');
    
    // After components are loaded, set active nav link
    if (navbarLoaded) {
        setActiveNavLink();
    }
    
    // Initialize all modules after components are loaded
    initNavigation();
    initScrollEffects();
    initCounterAnimation();
    initSmoothScroll();
    initParallax();
    initIntersectionObserver();
    initTypingEffect();
    initGlassmorphism();
}

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const pageName = currentPage.replace('.html', '') || 'index';
    
    // Desktop nav
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === pageName || (pageName === '' && linkPage === 'index')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Mobile nav
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page');
        if (linkPage === pageName || (pageName === '' && linkPage === 'index')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initComponents();
});

/* ================================
   Navigation
================================ */
function initNavigation() {
    // Use event delegation since components are loaded dynamically
    document.addEventListener('click', (e) => {
        // Handle nav toggle
        if (e.target.closest('.nav-toggle')) {
            const mobileNav = document.querySelector('.mobile-nav');
            const hamburger = document.querySelector('.hamburger');
            
            if (mobileNav && hamburger) {
                mobileNav.classList.toggle('active');
                hamburger.classList.toggle('active');
                
                if (hamburger.classList.contains('active')) {
                    hamburger.style.background = 'transparent';
                } else {
                    hamburger.style.background = '';
                }
            }
        }
        
        // Handle mobile nav link click
        if (e.target.closest('.mobile-nav-link')) {
            const mobileNav = document.querySelector('.mobile-nav');
            const hamburger = document.querySelector('.hamburger');
            
            if (mobileNav && hamburger) {
                mobileNav.classList.remove('active');
                hamburger.classList.remove('active');
                hamburger.style.background = '';
            }
        }
    });
    
    // Navbar background on scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
                navbar.style.background = 'rgba(2, 6, 23, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.borderBottomColor = 'rgba(99, 102, 241, 0.3)';
            } else {
                navbar.classList.remove('scrolled');
                navbar.style.background = 'rgba(2, 6, 23, 0.8)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.borderBottomColor = 'rgba(99, 102, 241, 0.2)';
            }
        }
    });
}

/* ================================
   Glassmorphism Enhancement
================================ */
function initGlassmorphism() {
    // Add mouse tracking for glassmorphism glow effect
    document.querySelectorAll('.bento-card, .project-card, .publication-card').forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            this.style.setProperty('--mouse-x', `${x}px`);
            this.style.setProperty('--mouse-y', `${y}px`);
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.setProperty('--mouse-x', `50%`);
            this.style.setProperty('--mouse-y', `50%`);
        });
    });
}

/* ================================
   Scroll Effects
================================ */
function initScrollEffects() {
    const revealElements = document.querySelectorAll('.bento-card, .project-card, .publication-card');
    
    const revealOnScroll = () => {
        revealElements.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                // Staggered animation
                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, index * 50);
            }
        });
    };
    
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);
}

/* ================================
   Counter Animation
================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number, [data-count]');
    
    const animateCounter = (counter) => {
        const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
        if (isNaN(target)) return;
        
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
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a[href^="#"]');
        if (!link) return;
        
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
    const animatedElements = document.querySelectorAll('.bento-card, .section-header, .skill-progress, .project-card, .publication-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
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
   Loading Animation
================================ */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
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
initScrollProgress();

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
