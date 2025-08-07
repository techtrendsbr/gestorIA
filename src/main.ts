// Landing Page Interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href') as string);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Add animation classes to elements
    const animateElements = document.querySelectorAll('.stat-card, .module-card, .benefit-card, .info-card, .pricing-card');
    animateElements.forEach((el, index) => {
        (el as HTMLElement).style.opacity = '0';
        (el as HTMLElement).style.transform = 'translateY(30px)';
        (el as HTMLElement).style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });

    // Add floating animation to hero elements
    const heroElements = document.querySelectorAll('.hero-badge, .instructor-badge');
    heroElements.forEach(el => {
        (el as HTMLElement).style.animation = 'float 3s ease-in-out infinite';
    });

    // Add pulse effect to CTA buttons on hover
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            (button as HTMLElement).style.animation = 'pulse 0.6s ease-in-out';
        });

        button.addEventListener('animationend', () => {
            (button as HTMLElement).style.animation = '';
        });
    });

    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-bg') as HTMLElement;
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Dynamic pricing calculation
    const updatePricing = () => {
        const installmentPrice = document.querySelector('.pricing-card:not(.featured) .amount');
        const totalPrice = document.querySelector('.pricing-card:not(.featured) .total');
        const cashPrice = document.querySelector('.pricing-card.featured .amount');

        if (installmentPrice && totalPrice && cashPrice) {
            // Simulate dynamic pricing (could be connected to a real API)
            const baseInstallment = 450;
            const baseCash = 1600;

            // Add some visual feedback
            installmentPrice.textContent = `R$ ${baseInstallment}`;
            totalPrice.textContent = `Total: R$ ${baseInstallment * 4}`;
            cashPrice.textContent = `R$ ${baseCash}`;
        }
    };

    updatePricing();

    // Add loading state to WhatsApp buttons
    const whatsappButtons = document.querySelectorAll('a[href*="wa.me"]');
    whatsappButtons.forEach(button => {
        button.addEventListener('click', () => {
            const originalText = button.textContent;
            button.textContent = 'Abrindo WhatsApp...';
            (button as HTMLElement).style.opacity = '0.7';

            setTimeout(() => {
                button.textContent = originalText;
                (button as HTMLElement).style.opacity = '1';
            }, 2000);
        });
    });

    // Module cards hover effect
    const moduleCards = document.querySelectorAll('.module-card');
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            (card as HTMLElement).style.boxShadow = '0 20px 40px rgba(76, 162, 121, 0.2)';
        });

        card.addEventListener('mouseleave', () => {
            (card as HTMLElement).style.boxShadow = '';
        });
    });

    // Add countdown timer effect
    const urgencySection = document.querySelector('.urgency');
    if (urgencySection) {
        const countdownText = urgencySection.querySelector('.countdown-text');
        if (countdownText) {
            // Simple urgency text rotation
            const urgencyMessages = [
                "Não deixe para depois. Transforme sua gestão AGORA:",
                "Vagas limitadas! Garante sua vaga antes que esgote:",
                "Seja um dos primeiros a dominar IA na gestão:",
                "O futuro da gestão começa agora. Participe:"
            ];

            let currentIndex = 0;
            setInterval(() => {
                currentIndex = (currentIndex + 1) % urgencyMessages.length;
                countdownText.textContent = urgencyMessages[currentIndex];
            }, 4000);
        }
    }

    // FAQ Accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    for (const item of faqItems) {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other FAQ items
                for (const otherItem of faqItems) {
                    otherItem.classList.remove('active');
                }

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    }

    // Track scroll progress for sticky effects
    window.addEventListener('scroll', () => {
        const scrollProgress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

        // Add progress indicator
        let progressBar = document.querySelector('.scroll-progress') as HTMLElement;
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 0%;
                height: 3px;
                background: linear-gradient(45deg, #4ca279, #4348bb);
                z-index: 1000;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }

        progressBar.style.width = `${scrollProgress}%`;
    });
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }

    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }

    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(45deg, #4ca279, #4348bb);
        z-index: 1000;
        transition: width 0.1s ease;
    }
`;
document.head.appendChild(style);
