document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.keyCode === 65) {
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.keyCode === 86) {
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.keyCode === 88) {
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.keyCode === 85) {
            e.preventDefault();
            return false;
        }
        if (e.keyCode === 123) {
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
            e.preventDefault();
            return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
            e.preventDefault();
            return false;
        }
    });

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

    document.onselectstart = function() {
        return false;
    };

    document.onmousedown = function() {
        return false;
    };

    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });

    document.addEventListener('keyup', function(e) {
        if (e.keyCode === 44) {
            e.preventDefault();
            return false;
        }
    });

    const donationModal = document.getElementById('donation-modal');
    const donationBtn = document.getElementById('donation-btn');
    const cancelBtn = document.getElementById('cancel-btn');
    const donateBtn = document.getElementById('donate-btn');
    const amountBtns = document.querySelectorAll('.amount-btn');
    
    let selectedAmount = null;

    donationBtn.addEventListener('click', function() {
        donationModal.classList.add('active');
    });

    amountBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            amountBtns.forEach(b => b.classList.remove('selected'));
            this.classList.add('selected');
            selectedAmount = this.dataset.amount;
            donateBtn.disabled = false;
        });
    });

    cancelBtn.addEventListener('click', function() {
        donationModal.classList.remove('active');
        amountBtns.forEach(btn => btn.classList.remove('selected'));
        selectedAmount = null;
        donateBtn.disabled = true;
    });

    donationModal.addEventListener('click', function(e) {
        if (e.target === donationModal) {
            donationModal.classList.remove('active');
            amountBtns.forEach(btn => btn.classList.remove('selected'));
            selectedAmount = null;
            donateBtn.disabled = true;
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === 27 && donationModal.classList.contains('active')) {
            donationModal.classList.remove('active');
            amountBtns.forEach(btn => btn.classList.remove('selected'));
            selectedAmount = null;
            donateBtn.disabled = true;
        }
    });





    donateBtn.addEventListener('click', function() {
        if (!selectedAmount) {
            return;
        }

        const tonAmount = parseFloat(selectedAmount);
        const nanotonAmount = Math.floor(tonAmount * 1000000000);
        
        const tonLink = `ton://transfer/th3ryks-dev.ton?amount=${nanotonAmount}`;
        
        const tempLink = document.createElement('a');
        tempLink.href = tonLink;
        tempLink.style.display = 'none';
        document.body.appendChild(tempLink);
        tempLink.click();
        document.body.removeChild(tempLink);
        
        donationModal.classList.remove('active');
        amountBtns.forEach(btn => btn.classList.remove('selected'));
        selectedAmount = null;
        donateBtn.disabled = true;
        
        showNotification('Thank you!');
    });

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
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

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

    window.addEventListener('scroll', function(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
        return false;
    });

    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, { passive: false });

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
});