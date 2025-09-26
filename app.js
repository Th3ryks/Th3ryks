// Copy protection and security measures
document.addEventListener('DOMContentLoaded', function() {
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

    // Add shake animation to CSS dynamically
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
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

    // Console warning
    console.clear();
    console.log('%cWelcome to Th3ryks Portfolio!', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
});