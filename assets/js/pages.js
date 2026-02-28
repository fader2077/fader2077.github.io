/* ========================================
   Pages JavaScript - Projects & Publications
   Modal and Interactive Features
   ======================================== */

// Open Project Modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation
        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.animation = 'slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }
}

// Close Project Modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Open Publication Modal
function openPubModal(modalId) {
    openModal(modalId);
}

// Close Publication Modal
function closePubModal(modalId) {
    closeModal(modalId);
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('project-modal')) {
        const activeModal = document.querySelector('.project-modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.project-modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// Add entrance animations to cards
document.addEventListener('DOMContentLoaded', function() {
    // Animate project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100 + index * 100);
    });

    // ── Fade-in-up via IntersectionObserver for publication cards ──
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('pub-revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.pub-filterable, .pub-year-section').forEach(el => {
        revealObserver.observe(el);
    });

    // ── Publication Filter ──
    initPubFilter();

    // Animate stats
    const statNumbers = document.querySelectorAll('.pub-stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace('+', ''));
        let current = 0;
        const increment = target / 30;
        const hasPlus = stat.textContent.includes('+');
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        }, 50);
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .publication-card, .pub-year-section').forEach(el => {
    observer.observe(el);
});

// Add ripple effect to cards
function createRipple(event, element) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = event.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = event.clientY - rect.top - size / 2 + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.1);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .project-card, .publication-card {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

console.log('Pages.js loaded successfully');

/* ========================================
   Publication Filter
   ======================================== */
function initPubFilter() {
    const filterBtns = document.querySelectorAll('.pub-filter-btn');
    if (!filterBtns.length) return;

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const cards = document.querySelectorAll('.pub-filterable');
            const yearSections = document.querySelectorAll('.pub-year-section');

            cards.forEach(card => {
                const matchType = card.dataset.type === filter;
                const matchYear = card.dataset.year === filter;
                const show = filter === 'all' || matchType || matchYear;

                if (show) {
                    card.classList.remove('pub-hidden');
                    // Re-trigger reveal animation
                    card.classList.remove('pub-revealed');
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => card.classList.add('pub-revealed'));
                    });
                } else {
                    card.classList.add('pub-hidden');
                }
            });

            // Show / hide year-section headings when all cards inside are hidden
            yearSections.forEach(section => {
                const visibleCards = section.querySelectorAll('.pub-filterable:not(.pub-hidden)');
                section.style.display = visibleCards.length === 0 ? 'none' : '';
            });
        });
    });
}
