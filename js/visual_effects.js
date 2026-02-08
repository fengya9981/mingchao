/**
 * Wuthering Waves Style Digital Particle Background
 * Adds 'Tethys' data dust effects - floating digital particles.
 */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollReveal();
});

function initParticles() {
    // Create Canvas
    const canvas = document.createElement('canvas');
    canvas.id = 'tethys-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];

    // Accents
    const colors = [
        'rgba(51, 235, 212, ', // Cyan
        'rgba(212, 177, 6, ',  // Gold
        'rgba(52, 152, 219, '  // Blue
    ];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            // Digital square look
            this.size = Math.random() * 2 + 1;
            this.speedY = Math.random() * 0.5 - 0.2; // Slowly float up or drift
            this.speedX = Math.random() * 0.4 - 0.2;
            this.life = Math.random() * 100 + 100;
            this.opacity = Math.random() * 0.5;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y -= this.speedY; // Tend upwards
            this.life--;

            // Fade in/out
            if (this.life < 50) {
                this.opacity -= this.fadeSpeed;
            } else if (this.opacity < 0.5) {
                this.opacity += this.fadeSpeed;
            }

            if (this.life <= 0 || this.opacity <= 0 || this.y < 0 || this.y > height || this.x < 0 || this.x > width) {
                this.reset();
                // Respawn at bottom randomly or random position
                if (Math.random() > 0.5) {
                    this.y = height + 10;
                }
            }
        }

        draw() {
            ctx.fillStyle = this.colorPrefix + this.opacity + ')';
            // Draw square for digital feel
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }
    }

    function init() {
        resize();
        const particleCount = Math.floor((width * height) / 15000); // Density
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        resize();
        particles = [];
        init();
    });

    init();
    animate();
}

function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Select common content blocks
    const elements = document.querySelectorAll('section, .timeline-item, .log-box, .quote-box, .conclusion-box');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}


// Global Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('open');
    }
}

// Make it available globally
window.toggleSidebar = toggleSidebar;
