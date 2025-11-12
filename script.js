// Cursor following with smooth easing
const blobWrapper = document.getElementById('blobWrapper');
const blob = document.getElementById('blob');
const container = document.querySelector('.container');
const particlesContainer = document.getElementById('particles');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = mouseX;
let targetY = mouseY;
let currentX = mouseX;
let currentY = mouseY;

// Update mouse position
document.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
});

// Smooth cursor following with easing
function animateBlob() {
    // Calculate distance to target
    const dx = targetX - currentX;
    const dy = targetY - currentY;
    
    // Apply easing (0.05 creates a smooth, slow follow effect)
    currentX += dx * 0.05;
    currentY += dy * 0.05;
    
    // Calculate offset from center
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = (currentX - centerX) * 0.3; // 30% movement range
    const offsetY = (currentY - centerY) * 0.3;
    
    // Apply transform to wrapper (blob inside continues its CSS animations)
    blobWrapper.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    
    requestAnimationFrame(animateBlob);
}

// Start animation loop
animateBlob();

// Create particle sparkles
function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random position around the blob
    const angle = Math.random() * Math.PI * 2;
    const distance = 80 + Math.random() * 60;
    const blobRect = blobWrapper.getBoundingClientRect();
    const blobCenterX = blobRect.left + blobRect.width / 2;
    const blobCenterY = blobRect.top + blobRect.height / 2;
    
    const x = blobCenterX + Math.cos(angle) * distance;
    const y = blobCenterY + Math.sin(angle) * distance;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    particle.style.animationDuration = `${2 + Math.random() * 2}s`;
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 3000);
}

// Create particles periodically
function spawnParticles() {
    createParticle();
    setTimeout(spawnParticles, 800 + Math.random() * 1200);
}

// Start particle spawning
spawnParticles();

// Eye pupil following (subtle)
const pupils = document.querySelectorAll('.pupil');
document.addEventListener('mousemove', (e) => {
    pupils.forEach(pupil => {
        const blobRect = blobWrapper.getBoundingClientRect();
        const blobCenterX = blobRect.left + blobRect.width / 2;
        const blobCenterY = blobRect.top + blobRect.height / 2;
        
        const deltaX = e.clientX - blobCenterX;
        const deltaY = e.clientY - blobCenterY;
        
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const maxDistance = 150;
        const maxMove = 3;
        
        if (distance < maxDistance) {
            const moveX = (deltaX / maxDistance) * maxMove;
            const moveY = (deltaY / maxDistance) * maxMove;
            pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
            pupil.style.transform = 'translate(0, 0)';
        }
    });
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        mouseX = window.innerWidth / 2;
        mouseY = window.innerHeight / 2;
        targetX = mouseX;
        targetY = mouseY;
        currentX = mouseX;
        currentY = mouseY;
    }, 250);
});

// Optimize performance by using CSS transforms
// The blob already uses CSS animations, we just add the cursor offset
// This ensures smooth 60fps performance

// Add subtle breathing effect on hover (optional enhancement)
blob.addEventListener('mouseenter', () => {
    blob.style.animation = 'float 3s ease-in-out infinite, morph 6s ease-in-out infinite, glow 2s ease-in-out infinite';
});

blob.addEventListener('mouseleave', () => {
    blob.style.animation = 'float 4s ease-in-out infinite, morph 8s ease-in-out infinite, glow 3s ease-in-out infinite';
});

