
// Custom cursor
const cursor = document.querySelector('.cursor');
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Three.js Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'),
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 30;

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;
const posArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x00f3ff
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Animation
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.0001;
    particlesMesh.rotation.y += 0.0001;
    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission
const form = document.querySelector('.contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
});

// Scroll animations
const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with animation classes
const animatedElements = document.querySelectorAll('.slide-in, .slide-left, .slide-right, .fade-in');
animatedElements.forEach(element => observer.observe(element));

// Add stagger effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.2}s`;
    card.classList.add('slide-in');
    observer.observe(card);
});

// Add stagger effect to skill categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach((category, index) => {
    category.style.transitionDelay = `${index * 0.2}s`;
    category.classList.add('slide-right');
    observer.observe(category);
});

// Initialize AOS
AOS.init({
    duration: 1000,
    once: false,
    mirror: true
});

// Mobile menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    spans[0].classList.toggle('rotate-45');
    spans[1].classList.toggle('opacity-0');
    spans[2].classList.toggle('rotate-negative-45');
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    const navbar = document.querySelector('.cyber-nav');
    
    if (currentScroll > lastScroll) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// CV Download functionality
document.querySelector('.download-cv').addEventListener('click', function() {
    // Create a link to your CV file
    const link = document.createElement('a');
    link.href = 'path/to/your/cv.pdf'; // Replace with actual CV path
    link.download = 'Brendon_Buwerimwe_CV.pdf';
    
    // Add loading animation
    this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
    
    // Simulate download delay for better UX
    setTimeout(() => {
        link.click();
        // Reset button text
        this.innerHTML = '<i class="fas fa-download"></i> Download CV';
        
        // Show success notification
        showNotification('CV downloaded successfully!');
    }, 1000);
});

// Smooth scroll to projects section
function scrollToProjects() {
    const projectsSection = document.querySelector('#projects');
    projectsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cyber-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Add these styles for the notification
    const styles = document.createElement('style');
    styles.textContent = `
        .cyber-notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: rgba(0, 243, 255, 0.1);
            border: 1px solid var(--neon-blue);
            color: var(--neon-blue);
            padding: 1rem;
            border-radius: 5px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideIn 0.3s ease forwards, slideOut 0.3s ease forwards 3s;
            z-index: 1000;
        }
        
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    
    document.head.appendChild(styles);
    
    // Remove notification after animation
    setTimeout(() => {
        notification.remove();
        styles.remove();
    }, 3500);
}

// Theme Settings Management
const themes = {
    cyber: {
        '--neon-blue': '#00f3ff',
        '--dark-bg': '#0a0a0a',
        '--accent': '#ff2957'
    },
    purple: {
        '--neon-blue': '#b24fff',
        '--dark-bg': '#0a0a0a',
        '--accent': '#00f3ff'
    },
    green: {
        '--neon-blue': '#00ff9d',
        '--dark-bg': '#0a0a0a',
        '--accent': '#ff2957'
    },
    red: {
        '--neon-blue': '#ff2957',
        '--dark-bg': '#0a0a0a',
        '--accent': '#00f3ff'
    }
};
  // Settings Panel Toggle
  document.addEventListener('DOMContentLoaded', function() {
      initializeSettings();
  });

  function initializeSettings() {
      const settingsToggle = document.querySelector('.settings-toggle');
      const settingsPanel = document.querySelector('.settings-panel');
    
      if (settingsToggle && settingsPanel) {
          settingsToggle.addEventListener('click', () => {
              settingsPanel.classList.toggle('active');
          });
      }
  }
// Color Theme Selection
const colorButtons = document.querySelectorAll('.color-btn');
colorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const theme = btn.dataset.theme;
        applyTheme(theme);
        
        // Update active state
        colorButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Save preference
        localStorage.setItem('preferred-theme', theme);
    });
});

function applyTheme(theme) {
    const root = document.documentElement;
    Object.entries(themes[theme]).forEach(([property, value]) => {
        root.style.setProperty(property, value);
    });
}
    const modeToggle = document.getElementById('modeToggle');
    const root = document.documentElement;





    modeToggle.addEventListener('click', () => {
        const currentTheme = root.getAttribute('data-theme');
        const newTheme = currentTheme === 'minimal' ? null : 'minimal';
    









        root.setAttribute('data-theme', newTheme || 'futuristic');
    




        // Save preference
        localStorage.setItem('theme-preference', newTheme || 'futuristic');
    





        // Animate the transition
        document.body.style.animation = 'themeTransition 0.5s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 500);
    });

    // Load saved preference
    document.addEventListener('DOMContentLoaded', () => {
        const savedTheme = localStorage.getItem('theme-preference');
        if (savedTheme) {
            root.setAttribute('data-theme', savedTheme);
        }
    });
// Close panel when clicking outside
document.addEventListener('click', (e) => {
    if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
        settingsPanel.classList.remove('active');
    }
});
  class TextRotator {
      constructor(element, words, waitTime = 3000) {
          this.element = element;
          this.words = words;
          this.waitTime = waitTime;
          this.currentIndex = 0;
          this.txt = '';
          this.isDeleting = false;
          this.type();
      }

      type() {
          const currentWord = this.words[this.currentIndex];
          const typeSpeed = this.isDeleting ? 100 : 200;

          if (this.isDeleting) {
              this.txt = currentWord.substring(0, this.txt.length - 1);
          } else {
              this.txt = currentWord.substring(0, this.txt.length + 1);
          }

          this.element.textContent = this.txt;

          if (!this.isDeleting && this.txt === currentWord) {
              setTimeout(() => {
                  this.isDeleting = true;
              }, this.waitTime);
          } else if (this.isDeleting && this.txt === '') {
              this.isDeleting = false;
              this.currentIndex = (this.currentIndex + 1) % this.words.length;
          }

          setTimeout(() => this.type(), typeSpeed);
      }
  }

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
      const element = document.getElementById('dynamic-text');
      const words = [
          'Full Stack Developer',
          'UI/UX Designer',
          'Problem Solver',
          'Tech Innovator',
          'Code Artisan'
      ];
    
      new TextRotator(element, words);
  });

// Scroll reveal initialization
const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.8;

        if (elementTop < triggerPoint) {
            element.classList.add('reveal-active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Set progress bar values dynamically
document.querySelectorAll('.progress-bar').forEach(bar => {
    bar.style.setProperty('--progress', bar.dataset.progress + '%');
});

// Add tag index for staggered animations
document.querySelectorAll('.tech-tag').forEach((tag, index) => {
    tag.style.setProperty('--tag-index', index);
});

document.addEventListener('DOMContentLoaded', () => {
    const scrollScene = new ScrollScene();
});
  document.addEventListener('DOMContentLoaded', () => {
      // Hide loader and show content
      window.addEventListener('load', () => {
          const loader = document.querySelector('.loader-wrapper');
          const body = document.body;

          // Fade out loader
          loader.style.opacity = '0';
        
          // Show content
          setTimeout(() => {
              loader.style.display = 'none';
              body.classList.add('content-loaded');
          }, 500);
      });
  });
  const settingsToggle = document.getElementById('settingsToggle');
  const settingsPanel = document.getElementById('settingsPanel');
  const darkModeToggle = document.getElementById('darkModeToggle');
  const animationsToggle = document.getElementById('animationsToggle');
  const soundToggle = document.getElementById('soundToggle');
  
  settingsToggle.addEventListener('click', () => {
      settingsPanel.classList.toggle('active');
  });
  
  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
      if (!settingsPanel.contains(e.target) && !settingsToggle.contains(e.target)) {
          settingsPanel.classList.remove('active');
      }
  });
  
  // Save settings to localStorage
  function saveSettings() {
      const settings = {
          darkMode: darkModeToggle.checked,
          animations: animationsToggle.checked,
          sound: soundToggle.checked
      };
      localStorage.setItem('systemSettings', JSON.stringify(settings));
  }
  
  // Load saved settings
  function loadSettings() {
      const savedSettings = JSON.parse(localStorage.getItem('systemSettings'));
      if (savedSettings) {
          darkModeToggle.checked = savedSettings.darkMode;
          animationsToggle.checked = savedSettings.animations;
          soundToggle.checked = savedSettings.sound;
          applySettings(savedSettings);
      }
  }
  
  // Apply settings to the system
  function applySettings(settings) {
      document.body.classList.toggle('dark-mode', settings.darkMode);
      document.body.classList.toggle('no-animations', !settings.animations);
  }
  
  // Event listeners for settings changes
  darkModeToggle.addEventListener('change', saveSettings);
  animationsToggle.addEventListener('change', saveSettings);
  soundToggle.addEventListener('change', saveSettings);
  
  // Initialize settings
  loadSettings();
  