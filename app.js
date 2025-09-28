// Copy protection and security measures
document.addEventListener('DOMContentLoaded', function() {
    /* --- SECURITY AND PROTECTION --- */
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable common keyboard shortcuts for copying/saving
    document.addEventListener('keydown', function(e) {
        // Disable Ctrl+A (Select All)
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+C (Copy)
        if (e.ctrlKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+V (Paste)
        if (e.ctrlKey && e.keyCode === 86) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+X (Cut)
        if (e.ctrlKey && e.keyCode === 88) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+S (Save)
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+U (View Source)
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        // Disable F12 (Developer Tools)
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+I (Developer Tools)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+J (Console)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        // Disable Ctrl+Shift+C (Inspect Element)
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
    });

    /* --- INTERACTIVE ELEMENTS --- */
    // Cursor trail effect
    let cursorTrail = document.getElementById('cursor-trail');
    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateTrail() {
        trailX += (mouseX - trailX) * 0.1;
        trailY += (mouseY - trailY) * 0.1;
        
        if (cursorTrail) {
            cursorTrail.style.left = trailX - 10 + 'px';
            cursorTrail.style.top = trailY - 10 + 'px';
        }
        
        requestAnimationFrame(animateTrail);
    }

    animateTrail();

    // Interactive particles on click
    document.addEventListener('click', function(e) {
        createClickEffect(e.clientX, e.clientY);
    });

    function createClickEffect(x, y) {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'click-particle';
            particle.style.cssText = `
                position: fixed;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: #00d4ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 10000;
                animation: particleFloat 1s ease-out forwards;
            `;
            particle.style.setProperty('--random-x', (Math.random() - 0.5) * 100 + 'px');
            particle.style.setProperty('--random-y', (Math.random() - 0.5) * 100 + 'px');
            document.body.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.remove();
                }
            }, 1000);
        }
    }

    /* --- EASTER EGGS --- */
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        // Don't interfere with existing security measures
        if (!e.ctrlKey && !e.shiftKey && e.keyCode !== 123) {
            konamiCode.push(e.code);
            
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }
            
            if (konamiCode.join(',') === konamiSequence.join(',')) {
                activateKonamiEasterEgg();
                konamiCode = [];
            }
        }
    });

    function activateKonamiEasterEgg() {
        // Rainbow effect on the entire page
        document.body.style.animation = 'rainbow 2s ease-in-out';
        
        // Show secret message
        const secretMessage = document.createElement('div');
        secretMessage.innerHTML = '🎉 Konami Code Activated! 🎉<br>You found the secret!';
        secretMessage.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: #fff;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            z-index: 10000;
            font-size: 1.2rem;
            animation: bounce 1s ease-in-out;
        `;
        
        document.body.appendChild(secretMessage);
        
        setTimeout(() => {
            if (secretMessage.parentNode) {
                secretMessage.remove();
            }
            document.body.style.animation = '';
        }, 3000);
    }

    // Click counter easter egg
    let clickCount = 0;
    document.addEventListener('click', function() {
        clickCount++;
        
        if (clickCount === 50) {
            showClickEasterEgg();
        }
    });

    function showClickEasterEgg() {
        const easterEgg = document.createElement('div');
        easterEgg.innerHTML = '🎪 Wow! 50 clicks! You\'re really exploring! 🎪';
        easterEgg.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: linear-gradient(45deg, #ff6b9d, #c471ed);
            color: white;
            padding: 15px;
            border-radius: 10px;
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
        `;
        
        document.body.appendChild(easterEgg);
        
        setTimeout(() => {
            easterEgg.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                if (easterEgg.parentNode) {
                    easterEgg.remove();
                }
            }, 500);
        }, 3000);
    }

    // Disable text selection with mouse
    document.onselectstart = function() {
        return false;
    };

    document.onmousedown = function() {
        return false;
    };

    // Disable drag and drop
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Additional protection against print screen
    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 44) {
            e.preventDefault();
            return false;
        }
    });

    // Donation modal functionality
    const donationBtn = document.getElementById('donation-btn');
    const donationModal = document.getElementById('donation-modal');
    const cancelBtn = document.getElementById('cancel-btn');
    const donateBtn = document.getElementById('donate-btn');
    const amountInput = document.getElementById('amount-input');

    // Open donation modal
    donationBtn.addEventListener('click', function() {
        console.log('Donation button clicked'); // Debug log
        donationModal.classList.add('active');
        setTimeout(() => {
            amountInput.focus();
            console.log('Input focused'); // Debug log
        }, 100);
    });

    // Close donation modal
    cancelBtn.addEventListener('click', function() {
        donationModal.classList.remove('active');
        amountInput.value = '';
    });

    // Close modal when clicking outside
    donationModal.addEventListener('click', function(e) {
        if (e.target === donationModal) {
            donationModal.classList.remove('active');
            amountInput.value = '';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 27 && donationModal.classList.contains('active')) {
            donationModal.classList.remove('active');
            amountInput.value = '';
        }
    });

    // Custom input validation - only allow numbers and decimal point
    amountInput.addEventListener('input', function(e) {
        let value = this.value;
        
        // Remove any non-numeric characters except decimal point
        value = value.replace(/[^0-9.]/g, '');
        
        // Ensure only one decimal point
        const parts = value.split('.');
        if (parts.length > 2) {
            value = parts[0] + '.' + parts.slice(1).join('');
        }
        
        // Limit decimal places to 9 (nanoton precision)
        if (parts[1] && parts[1].length > 9) {
            value = parts[0] + '.' + parts[1].substring(0, 9);
        }
        
        // Update value if changed
        if (this.value !== value) {
            this.value = value;
        }
    });

    // Handle keydown for better input control
    amountInput.addEventListener('keydown', function(e) {
        // Allow: backspace, delete, tab, escape, enter, arrows
        if ([8, 9, 27, 13, 46, 37, 38, 39, 40].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true) ||
            // Allow: home, end
            (e.keyCode >= 35 && e.keyCode <= 36)) {
            return;
        }
        
        // Ensure that it is a number or decimal point and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && 
            (e.keyCode < 96 || e.keyCode > 105) && 
            e.keyCode !== 190 && e.keyCode !== 110) {
            e.preventDefault();
        }
        
        // Only allow one decimal point
        if ((e.keyCode === 190 || e.keyCode === 110) && this.value.indexOf('.') !== -1) {
            e.preventDefault();
        }
    });

    // Prevent paste of invalid characters
    amountInput.addEventListener('paste', function(e) {
        setTimeout(() => {
            let value = this.value;
            
            // Remove any non-numeric characters except decimal point
            value = value.replace(/[^0-9.]/g, '');
            
            // Ensure only one decimal point
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
            
            // Limit decimal places to 9 (nanoton precision)
            if (parts[1] && parts[1].length > 9) {
                value = parts[0] + '.' + parts[1].substring(0, 9);
            }
            
            this.value = value;
        }, 0);
    });

    // Handle donation button click
    donateBtn.addEventListener('click', function() {
        const amount = amountInput.value.trim();
        
        if (!amount || amount === '' || parseFloat(amount) <= 0) {
            // Add shake animation for invalid input
            amountInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                amountInput.style.animation = '';
            }, 500);
            return;
        }

        // Convert TON to nanoton (1 TON = 1,000,000,000 nanoton)
        const tonAmount = parseFloat(amount);
        const nanotonAmount = Math.floor(tonAmount * 1000000000);
        
        // te TON donation link
        const tonLink = `ton://transfer/th3ryks-dev.ton?amount=${nanotonAmount}`;
        
        // Create temporary link and click it
        const tempLink = document.createElement('a');
        tempLink.href = tonLink;
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        
        // Close modal and reset input
        donationModal.classList.remove('active');
        amountInput.value = '';
        
        // Show success feedback
        showNotification('Thank you!');
    });

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 212, 255, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0, 212, 255, 0.3);
            border-radius: 12px;
            padding: 16px 24px;
            color: #00d4ff;
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Add animations to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        @keyframes particleFloat {
            0% {
                opacity: 1;
                transform: translate(0, 0) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--random-x), var(--random-y)) scale(0);
            }
        }
        
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            50% { filter: hue-rotate(180deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translate(-50%, -50%) translateY(0); }
            40% { transform: translate(-50%, -50%) translateY(-10px); }
            60% { transform: translate(-50%, -50%) translateY(-5px); }
        }
        
        @keyframes slideInRight {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // Smooth scroll prevention (additional layer)
    window.addEventListener('scroll', function(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
        return false;
    });

    // Prevent zoom
    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, { passive: false });

    // Prevent pinch zoom on mobile
    document.addEventListener('touchstart', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchmove', function(e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    // Console welcome message
    console.clear();
    console.log('%cWelcome to Th3ryks Portfolio!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
    console.log('%c✨ Click around to see particle effects!', 'color: #00d4ff; font-size: 14px;');
});