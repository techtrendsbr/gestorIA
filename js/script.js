// --- FUNÇÕES GLOBAIS ---
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    navLinks.classList.toggle('mobile-active');
    mobileToggle.classList.toggle('active');
}

// --- LÓGICA PRINCIPAL DA PÁGINA ---
document.addEventListener('DOMContentLoaded', function () {

    // Scroll suave para links âncora
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                window.scrollTo({ top: targetPosition, behavior: 'smooth' });

                // Fecha o menu mobile se estiver aberto ao clicar em um link
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('mobile-active')) {
                    toggleMobileMenu();
                }
            }
        });
    });

    // Efeito de scroll no Header para mudar o fundo
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(17, 24, 39, 0.9)';
            header.style.borderBottomColor = 'rgba(55, 65, 81, 0.5)';
        } else {
            header.style.background = 'rgba(17, 24, 39, 0.8)';
            header.style.borderBottomColor = 'var(--border-color)';
        }
    });

    // Adiciona estilos dinâmicos para o menu mobile
    const style = document.createElement('style');
    style.textContent = `
        .nav-links.mobile-active { display: flex; flex-direction: column; position: absolute; top: 100%; left: 0; right: 0; background: var(--background-medium); padding: 20px 24px; border-top: 1px solid var(--border-color); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2); gap: 20px; }
        .mobile-menu-toggle.active span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
        .mobile-menu-toggle.active span:nth-child(2) { opacity: 0; }
        .mobile-menu-toggle.active span:nth-child(3) { transform: rotate(-45deg) translate(7px, -6px); }
    `;
    document.head.appendChild(style);

});