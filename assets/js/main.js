
// ========== Function Dropdown 
(function () {
    const wrappers = Array.from(document.querySelectorAll('.dropdown-wrapper'));
    if (!wrappers.length) return;

    wrappers.forEach(wrapper => {
        // hindari mendaftarkan listener dua kali
        if (wrapper.dataset.dropdownInit === 'true') return;

        // cari trigger (dukung .dropdown dan .dropdown-toggle)
        const toggle = wrapper.querySelector('.dropdown') || wrapper.querySelector('.dropdown-toggle');
        // cari menu (dukung .dropdown-menu dan .dropdown-content)
        const menu = wrapper.querySelector('.dropdown-menu') || wrapper.querySelector('.dropdown-content');

        // jika tidak ada trigger, lewati wrapper ini
        if (!toggle) return;

        // tandai sudah di-init
        wrapper.dataset.dropdownInit = 'true';

        // aksesibilitas dasar
        if (!toggle.hasAttribute('role')) toggle.setAttribute('role', 'button');
        if (!toggle.hasAttribute('tabindex')) toggle.setAttribute('tabindex', '0');
        toggle.setAttribute('aria-expanded', 'false');

        // fungsi untuk menutup semua dropdown
        const closeAll = () => {
            wrappers.forEach(w => {
                w.classList.remove('active');
                const t = w.querySelector('.dropdown') || w.querySelector('.dropdown-toggle');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        };

        // klik/tap pada trigger
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = wrapper.classList.contains('active');

            // tutup semua dulu
            closeAll();

            // buka jika sebelumnya tertutup
            if (!isActive) {
                wrapper.classList.add('active');
                toggle.setAttribute('aria-expanded', 'true');
            }
        });

        // keyboard support: Enter / Space untuk toggle
        toggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });

        // jika ada menu, buat item klik menutup dropdown
        if (menu) {
            const items = Array.from(menu.querySelectorAll('li'));
            items.forEach(item => {
                item.addEventListener('click', (e) => {
                    // opsional: you can read value e.target.textContent
                    wrapper.classList.remove('active');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
    });

    // klik di luar: tutup semua dropdown
    document.addEventListener('click', () => {
        wrappers.forEach(w => {
            const t = w.querySelector('.dropdown') || w.querySelector('.dropdown-toggle');
            w.classList.remove('active');
            if (t) t.setAttribute('aria-expanded', 'false');
        });
    });

    // Esc untuk menutup
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.key === 'Esc') {
            wrappers.forEach(w => {
                const t = w.querySelector('.dropdown') || w.querySelector('.dropdown-toggle');
                w.classList.remove('active');
                if (t) t.setAttribute('aria-expanded', 'false');
            });
        }
    });
})();


// ============ Function Scroll Header
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");

    if (window.scrollY > 10) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ============ Function Mobile Menu
document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.querySelector(".mobile-menu-overlay");
    const closeButton = document.querySelector(".mobile-menu-close");

    if (!menuButton || !mobileMenu || !overlay || !closeButton) {
        console.warn("Mobile menu elements not found in DOM");
        return;
    }

    // Open Menu
    menuButton.addEventListener("click", () => {
        mobileMenu.classList.add("active");
        overlay.classList.add("active");
        document.body.classList.add("no-scroll");
    });

    // Close Menu
    function closeMenu() {
        mobileMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.classList.remove("no-scroll");
    }

    closeButton.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
});

