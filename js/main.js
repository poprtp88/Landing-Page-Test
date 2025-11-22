
(function() {
    'use strict';

    const TARGET_MONTH = 11; // December (0-indexed: Jan=0, Dec=11)
    const TARGET_DAY = 1;
    
    /**
     * @returns {Date} The target launch date object.
     */
    function getTargetDate() {
        const now = new Date();
        const currentYear = now.getFullYear();
        

        let target = new Date(currentYear, TARGET_MONTH, TARGET_DAY, 0, 0, 0);

        if (now.getTime() > target.getTime()) {
            target = new Date(currentYear + 1, TARGET_MONTH, TARGET_DAY, 0, 0, 0);
        }

        return target;
    }

    /**
     * Updates the DOM elements with the remaining time.
     * @param {Date} targetDate - The future date to count down to.
     */
    function updateTimer(targetDate) {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        if (distance < 0) {
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            
            const title = document.querySelector('.title');
            if (title) title.innerText = "WE ARE LIVE!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days.toString().padStart(2, '0');
        hoursEl.innerText = hours.toString().padStart(2, '0');
        minutesEl.innerText = minutes.toString().padStart(2, '0');
        secondsEl.innerText = seconds.toString().padStart(2, '0');
    }

    /**
     */
    function init() {
        const targetDate = getTargetDate();
        
        updateTimer(targetDate);
        
        setInterval(() => {
            updateTimer(targetDate);
        }, 1000);
        
        initParticles();
        console.log(`Countdown initialized. Target: ${targetDate}`);
    }


    function initParticles() {
        const container = document.querySelector('.app-container');
        if (!container) return;

        const particleCount = 10; // Increased stars count

        // Create Top Particles
        for (let i = 0; i < particleCount; i++) {
            createParticle(container, 'top');
        }

        for (let i = 0; i < particleCount; i++) {
            createParticle(container, 'bottom');
        }
    }

    function createParticle(container, position) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 12 + 8; // 8px to 20px
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        particle.style.left = `${Math.random() * 100}%`;
        
        if (position === 'top') {
            particle.style.top = `${Math.random() * 15}%`; // Top 15%
            particle.style.animation = `float-down ${Math.random() * 3 + 3}s ease-in-out infinite`;
            particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
        } else {
            particle.style.bottom = `${Math.random() * 15}%`; // Bottom 15%
            particle.style.animation = `float-up ${Math.random() * 3 + 3}s ease-in-out infinite`;
            particle.style.background = `rgba(255, 214, 10, ${Math.random() * 0.5 + 0.2})`; // Yellow tint for bottom
        }

        particle.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(particle);
    }

    document.addEventListener('DOMContentLoaded', init);

})();
