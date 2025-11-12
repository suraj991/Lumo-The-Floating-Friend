// Mico - Microsoft Copilot Character
// Main elements
const blobWrapper = document.getElementById('blobWrapper');
const blob = document.getElementById('blob');
const face = document.getElementById('face');
const mouth = document.getElementById('mouth');
const container = document.querySelector('.container');
const particlesContainer = document.getElementById('particles');

// Current mode
let currentMode = 'smile';

// Cursor following variables
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let targetX = mouseX;
let targetY = mouseY;
let currentX = mouseX;
let currentY = mouseY;

// Cursor offset state
let cursorOffsetX = 0;
let cursorOffsetY = 0;

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
    
    // Apply easing (0.03 creates a very subtle, slow follow effect - Microsoft Mico style)
    currentX += dx * 0.03;
    currentY += dy * 0.03;
    
    // Calculate offset from center - very subtle movement
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = (currentX - centerX) * 0.15; // 15% movement range - subtle like Microsoft Mico
    const offsetY = (currentY - centerY) * 0.15;
    
    // Store cursor offset
    cursorOffsetX = offsetX;
    cursorOffsetY = offsetY;
    
    // Apply cursor offset - very subtle movement like Microsoft Mico
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
    const distance = 90 + Math.random() * 70;
    const blobRect = blobWrapper.getBoundingClientRect();
    const blobCenterX = blobRect.left + blobRect.width / 2;
    const blobCenterY = blobRect.top + blobRect.height / 2;
    
    const x = blobCenterX + Math.cos(angle) * distance;
    const y = blobCenterY + Math.sin(angle) * distance;
    
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.animationDelay = `${Math.random() * 3}s`;
    particle.style.animationDuration = `${2.5 + Math.random() * 2.5}s`;
    
    particlesContainer.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 4000);
}

// Create particles periodically
function spawnParticles() {
    createParticle();
    setTimeout(spawnParticles, 600 + Math.random() * 1000);
}

// Start particle spawning
spawnParticles();

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

// Enhanced hover effect - Mico reacts when cursor comes close
let hoverTimer;
let isHovered = false;

blobWrapper.addEventListener('mouseenter', () => {
    clearTimeout(hoverTimer);
    isHovered = true;
    // Gentle scale on hover - Microsoft Mico style
    blob.style.transform = 'scale(1.06)';
    blob.style.filter = 'drop-shadow(0 0 35px rgba(255, 210, 160, 0.7)) drop-shadow(0 0 70px rgba(255, 190, 140, 0.5))';
});

blobWrapper.addEventListener('mouseleave', () => {
    clearTimeout(hoverTimer);
    isHovered = false;
    hoverTimer = setTimeout(() => {
        // Return to normal
        blob.style.transform = '';
        blob.style.filter = '';
    }, 100);
});

// Mode switching functionality
const modeTabs = document.querySelectorAll('.mode-tab');
const tabSmile = document.getElementById('tabSmile');
const tabThinking = document.getElementById('tabThinking');
const tabTalking = document.getElementById('tabTalking');

function setMode(mode) {
    currentMode = mode;
    const thinkingHand = document.getElementById('thinkingHand');
    
    // Remove all mode classes
    face.classList.remove('smile', 'thinking', 'talking');
    mouth.classList.remove('smile', 'thinking', 'talking');
    blob.classList.remove('thinking-mode');
    modeTabs.forEach(tab => tab.classList.remove('active'));
    
    // Apply new mode with smooth transition
    setTimeout(() => {
        switch(mode) {
            case 'smile':
                face.classList.add('smile');
                mouth.classList.add('smile');
                blob.classList.remove('thinking-mode');
                tabSmile.classList.add('active');
                // Normal blinking animation
                document.querySelectorAll('.eye').forEach(eye => {
                    eye.style.animation = 'blink 4s ease-in-out infinite';
                    eye.style.background = '#1a1a1a';
                    eye.style.border = 'none';
                    eye.style.width = '22px';
                    eye.style.height = '22px';
                    eye.style.borderRadius = '50%';
                    eye.style.transform = 'scaleY(0.85)';
                });
                // Show catchlights
                document.querySelectorAll('.catchlight').forEach(light => {
                    light.style.display = 'block';
                });
                // Remove any ::after pseudo-elements (pupils) by resetting styles
                document.querySelectorAll('.eye').forEach(eye => {
                    const style = window.getComputedStyle(eye, '::after');
                    if (style.content !== 'none') {
                        // Pupils are created via CSS ::after, they'll be hidden when thinking class is removed
                    }
                });
                break;
            case 'thinking':
                face.classList.add('thinking');
                mouth.classList.add('thinking');
                blob.classList.add('thinking-mode');
                tabThinking.classList.add('active');
                // White eyes with pupils looking up
                document.querySelectorAll('.eye').forEach(eye => {
                    eye.style.animation = 'thinkBlink 6s ease-in-out infinite, thinkMove 4s ease-in-out infinite';
                    eye.style.background = '#ffffff';
                    eye.style.border = '2px solid #1a1a1a';
                    eye.style.width = '20px';
                    eye.style.height = '16px';
                    eye.style.borderRadius = '50% 50% 60% 40% / 50% 50% 70% 30%';
                    eye.style.transform = 'translateY(-1px)';
                });
                // Hide catchlights
                document.querySelectorAll('.catchlight').forEach(light => {
                    light.style.display = 'none';
                });
                // Show thinking hand
                if (thinkingHand) {
                    thinkingHand.style.opacity = '1';
                }
                break;
            case 'talking':
                face.classList.add('talking');
                mouth.classList.add('talking');
                blob.classList.remove('thinking-mode');
                tabTalking.classList.add('active');
                // Normal black eyes
                document.querySelectorAll('.eye').forEach(eye => {
                    eye.style.animation = 'talkBlink 0.8s ease-in-out infinite';
                    eye.style.background = '#1a1a1a';
                    eye.style.border = 'none';
                    eye.style.width = '22px';
                    eye.style.height = '22px';
                    eye.style.borderRadius = '50%';
                    eye.style.transform = 'scaleY(1)';
                });
                // Show catchlights
                document.querySelectorAll('.catchlight').forEach(light => {
                    light.style.display = 'block';
                });
                // Hide thinking hand
                if (thinkingHand) {
                    thinkingHand.style.opacity = '0';
                }
                break;
        }
    }, 50);
}

// Add event listeners to tabs
tabSmile.addEventListener('click', () => setMode('smile'));
tabThinking.addEventListener('click', () => setMode('thinking'));
tabTalking.addEventListener('click', () => setMode('talking'));

// Initialize with smile mode
setMode('smile');
