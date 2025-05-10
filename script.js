document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navActions = document.querySelector('.nav-actions');
  const ctaSmall = document.querySelector('.cta-small');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      navActions.classList.toggle('active');
      ctaSmall.classList.toggle('active');
      menuToggle.classList.toggle('active');
    });
  }

  // Enhanced navigation hover effects
  const navItems = document.querySelectorAll('.nav-links a');
  
  navItems.forEach(item => {
    // Create hover effect with smooth movement
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-2px)';
    });
    
    item.addEventListener('mouseleave', () => {
      // Return to normal state unless it's the active item
      if (!item.classList.contains('active')) {
        item.style.transform = '';
      }
    });
  });

  // Smooth Scrolling for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Add highlighting effect to section being scrolled to
        const highlightSection = () => {
          targetElement.classList.add('section-highlight');
          setTimeout(() => {
            targetElement.classList.remove('section-highlight');
          }, 1000);
        };
        
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
        
        // Trigger highlighting after scroll completes
        setTimeout(highlightSection, 800);
      }

      // Close mobile menu if open
      if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        ctaSmall.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });

  // Course Timeline Interaction
  const timelineItems = document.querySelectorAll('.timeline-item');
  const moduleContents = document.querySelectorAll('.module-content');

  if (timelineItems.length > 0) {
    timelineItems.forEach(item => {
      item.addEventListener('click', () => {
        // Check if this is a web or blockchain module
        const isBlockchain = item.hasAttribute('data-blockchain-module');
        const moduleType = isBlockchain ? 'blockchain-module' : 'module';
        const moduleNumber = isBlockchain ? 
          item.getAttribute('data-blockchain-module') : 
          item.getAttribute('data-module');
        
        // Remove active class from all items of the same type
        const relevantItems = isBlockchain ? 
          document.querySelectorAll('[data-blockchain-module]') : 
          document.querySelectorAll('[data-module]');
        
        relevantItems.forEach(i => i.classList.remove('active'));
        
        // Remove active class from relevant module contents
        const relevantModules = isBlockchain ?
          document.querySelectorAll('[id^="blockchain-module-"]') :
          document.querySelectorAll('[id^="module-"]:not([id^="blockchain-module-"])');
        
        relevantModules.forEach(content => {
          content.classList.remove('active');
          content.classList.remove('fade-in');
        });
        
        // Add active class to clicked item with animation
        item.classList.add('active');
        
        // Show corresponding module content
        const moduleContent = document.getElementById(`${moduleType}-${moduleNumber}`);
        
        if (moduleContent) {
          moduleContent.classList.add('active');
          // Add fade-in animation
          setTimeout(() => {
            moduleContent.classList.add('fade-in');
          }, 50);
        }
      });
    });
  }

  // Learning Path Switching
  const pathBtns = document.querySelectorAll('.path-btn');
  const pathContents = document.querySelectorAll('.course-flow');
  
  if (pathBtns.length > 0) {
    // Set the first path as active by default if none is active
    const activePath = document.querySelector('.course-flow.active');
    if (!activePath && pathContents.length > 0) {
      pathContents[0].classList.add('active');
      pathBtns[0].classList.add('active');
    }
    
    pathBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        pathBtns.forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Hide all path contents
        pathContents.forEach(content => {
          content.classList.remove('active');
        });
        
        // Show corresponding path content
        const pathType = btn.getAttribute('data-path');
        const pathContent = document.querySelector(`.path-${pathType}`);
        
        if (pathContent) {
          pathContent.classList.add('active');
          
          // Activate first item in timeline if none is active
          const activeItem = pathContent.querySelector('.timeline-item.active');
          if (!activeItem) {
            const firstItem = pathContent.querySelector('.timeline-item');
            if (firstItem) {
              firstItem.click();
            }
          }
        }
      });
    });
  }

  // Feature Cards Interaction - Enhanced
  const featureCards = document.querySelectorAll('.feature-card');
  
  if (featureCards.length > 0) {
    // Add 3D tilt effect to cards
    featureCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // Calculate rotation based on mouse position
        const rotateY = -(mouseX / 10);
        const rotateX = mouseY / 10;
        
        // Apply rotation and raise effect
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });
      
      // Reset transform on mouse leave
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
      
      // Show/hide details with expanded class
      card.addEventListener('mouseenter', () => {
        card.classList.add('expanded');
      });
      
      card.addEventListener('mouseleave', () => {
        card.classList.remove('expanded');
      });
    });
  }

  // Stats Counter Animation - Improved with easing
  const statNumbers = document.querySelectorAll('.stat-number');
  let animationTriggered = false;

  function animateStats() {
    if (animationTriggered) return;
    
    statNumbers.forEach(stat => {
      const targetValue = parseInt(stat.getAttribute('data-count'));
      const duration = 2500; // 2.5 seconds for more dramatic effect
      const stepTime = 20; // Update more frequently for smoother animation
      const totalSteps = duration / stepTime;
      
      // Use easeOutExpo for more natural counting
      const easeOutExpo = t => (t === 1) ? 1 : 1 - Math.pow(2, -10 * t);
      
      let currentStep = 0;
      
      const counter = setInterval(() => {
        currentStep++;
        const progress = currentStep / totalSteps;
        const easedProgress = easeOutExpo(progress);
        const currentValue = Math.floor(targetValue * easedProgress);
        
        if (currentStep >= totalSteps) {
          clearInterval(counter);
          stat.textContent = targetValue;
          
          // Add a pulse animation after counting completes
          stat.classList.add('pulse-animation');
        } else {
          stat.textContent = currentValue;
        }
      }, stepTime);
      
      // Add counting class for styling during animation
      stat.classList.add('counting');
    });
    
    animationTriggered = true;
  }

  // Trigger stats animation when scrolled into view
  const statsSection = document.getElementById('stats');
  
  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateStats();
      }
    }, { threshold: 0.3 }); // Trigger earlier when scrolling
    
    observer.observe(statsSection);
  }

  // Enhanced AI Chat Interaction
  const chatInput = document.querySelector('.chat-input input');
  const chatSendBtn = document.querySelector('.chat-input button');
  const chatMessages = document.querySelector('.chat-messages');
  
  if (chatInput && chatSendBtn) {
    // Add focus effects
    chatInput.addEventListener('focus', () => {
      document.querySelector('.chat-input').classList.add('focused');
    });
    
    chatInput.addEventListener('blur', () => {
      document.querySelector('.chat-input').classList.remove('focused');
    });
    
    const sendMessage = () => {
      const message = chatInput.value.trim();
      if (message === '') return;
      
      // Add user message to chat with animation
      const userMsgElement = document.createElement('div');
      userMsgElement.className = 'message user';
      userMsgElement.innerHTML = `<p>${message}</p>`;
      chatMessages.appendChild(userMsgElement);
      
      // Add slide-in animation
      setTimeout(() => {
        userMsgElement.classList.add('show');
      }, 10);
      
      // Clear input
      chatInput.value = '';
      
      // Scroll to bottom with smooth animation
      chatMessages.scrollTo({
        top: chatMessages.scrollHeight,
        behavior: 'smooth'
      });
      
      // Show typing indicator with delay
      const typingElement = document.querySelector('.message.ai.typing');
      if (typingElement) {
        setTimeout(() => {
          typingElement.style.display = 'flex';
          typingElement.classList.add('show');
          
          // Scroll to show typing indicator
          chatMessages.scrollTo({
            top: chatMessages.scrollHeight,
            behavior: 'smooth'
          });
        }, 500);
      }
      
      // Simulate AI response after delay with more realistic typing timing
      const responseDelay = 1000 + Math.random() * 1000; // Random delay between 1-2 seconds
      
      setTimeout(() => {
        // Hide typing indicator
        if (typingElement) {
          typingElement.classList.remove('show');
          setTimeout(() => {
            typingElement.style.display = 'none';
          }, 300);
        }
        
        // Add AI response with more intelligent answers
        let response = '';
        if (message.toLowerCase().includes('hi') || message.toLowerCase().includes('hello')) {
          response = 'Hello! How can I help you with your learning journey today?';
        } else if (message.toLowerCase().includes('javascript') || message.toLowerCase().includes('js')) {
          response = 'JavaScript is a powerful programming language for web development. Would you like to learn about variables, functions, or DOM manipulation? I can also help you with practical exercises.';
        } else if (message.toLowerCase().includes('react')) {
          response = 'React is a popular JavaScript library for building user interfaces. It uses a component-based architecture which makes code reusable and maintainable. Would you like to explore state management or hooks?';
        } else if (message.toLowerCase().includes('certificate') || message.toLowerCase().includes('blockchain')) {
          response = 'Our certificates are stored on the blockchain, making them tamper-proof and easily verifiable by employers. Each certificate contains a unique hash linked to your completed projects and skills.';
        } else if (message.toLowerCase().includes('course') || message.toLowerCase().includes('curriculum')) {
          response = 'Our curriculum is designed to take you from basics to advanced concepts through hands-on projects. Would you like to know more about a specific module or our learning methodology?';
        } else if (message.toLowerCase().includes('difficult') || message.toLowerCase().includes('hard') || message.toLowerCase().includes('stuck')) {
          response = 'It\'s completely normal to face challenges when learning to code. Can you tell me more about what you\'re struggling with? I can offer specific guidance and resources to help you overcome this obstacle.';
        } else {
          response = 'That\'s an interesting question! I can help you with programming concepts, career guidance, or specific technical questions. What would you like to focus on first?';
        }
        
        const aiMsgElement = document.createElement('div');
        aiMsgElement.className = 'message ai';
        aiMsgElement.innerHTML = `<p>${response}</p>`;
        chatMessages.appendChild(aiMsgElement);
        
        // Add slide-in animation
        setTimeout(() => {
          aiMsgElement.classList.add('show');
        }, 10);
        
        // Scroll to bottom with smooth animation
        chatMessages.scrollTo({
          top: chatMessages.scrollHeight,
          behavior: 'smooth'
        });
      }, responseDelay);
    };
    
    chatSendBtn.addEventListener('click', sendMessage);
    
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
    
    // Add placeholder text cycling for better UX
    const placeholders = [
      "Ask about JavaScript...",
      "Ask about our courses...",
      "How do blockchain certificates work?",
      "Need help with a coding problem?",
      "Ask about career opportunities..."
    ];
    
    let placeholderIndex = 0;
    
    // Change placeholder text every 3 seconds
    setInterval(() => {
      placeholderIndex = (placeholderIndex + 1) % placeholders.length;
      chatInput.setAttribute('placeholder', placeholders[placeholderIndex]);
    }, 3000);
  }

  // Form Validation & Submission - Enhanced with feedback
  const betaForm = document.getElementById('beta-form');
  
  if (betaForm) {
    const emailInput = betaForm.querySelector('input[type="email"]');
    
    // Add floating label effect
    if (emailInput) {
      emailInput.addEventListener('focus', () => {
        emailInput.parentElement.classList.add('input-focused');
      });
      
      emailInput.addEventListener('blur', () => {
        if (emailInput.value.trim() === '') {
          emailInput.parentElement.classList.remove('input-focused');
        }
      });
    }
    
    betaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = emailInput.value.trim();
      
      if (isValidEmail(email)) {
        // Show loading state
        const submitBtn = betaForm.querySelector('button[type="submit"]');
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Processing...';
        submitBtn.disabled = true;
        
        // Simulate server request
        setTimeout(() => {
          // Show success message with animation
          const successMessage = document.createElement('div');
          successMessage.className = 'success-message';
          successMessage.innerHTML = `
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>You're on the list!</h3>
            <p>Thanks for joining our beta program. We'll be in touch soon at <strong>${email}</strong>.</p>
          `;
          
          // Replace form with success message using fade transition
          betaForm.style.opacity = '0';
          setTimeout(() => {
            betaForm.innerHTML = '';
            betaForm.appendChild(successMessage);
            betaForm.style.opacity = '1';
          }, 300);
        }, 1500);
      } else {
        // Show error with enhanced feedback
        emailInput.classList.add('error');
        
        // Add specific error message
        let errorMsg = betaForm.querySelector('.error-message');
        if (!errorMsg) {
          errorMsg = document.createElement('div');
          errorMsg.className = 'error-message';
          emailInput.insertAdjacentElement('afterend', errorMsg);
        }
        
        errorMsg.textContent = 'Please enter a valid email address';
        
        // Remove error class and message after 3 seconds
        setTimeout(() => {
          emailInput.classList.remove('error');
          errorMsg.textContent = '';
        }, 3000);
      }
    });
  }
  
  // Email validation helper
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Enhanced sticky Navigation with progress indicator
  const nav = document.querySelector('nav');
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  nav.appendChild(progressBar);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow and background when scrolled
    if (scrollTop > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    // Update progress bar
    const scrollPercent = (scrollTop / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = `${scrollPercent}%`;
    
    // Add active state to current section in navigation
    const sections = document.querySelectorAll('section');
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      
      if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
        currentSectionId = section.id;
      }
    });
    
    // Update active nav link
    if (currentSectionId) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
          link.classList.add('active');
          link.style.transform = 'translateY(-2px)';
        } else {
          link.style.transform = '';
        }
      });
    }
  });

  // Enhanced reveal animations for sections with staggered timing
  const revealElements = document.querySelectorAll('.section-title, .problem-card, .feature-card, .tech-layer, .ai-feature, .tech-icon, .team-member');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Add staggered delay based on element index
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, index * 100); // 100ms delay between each element
        
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  
  revealElements.forEach(element => {
    element.classList.add('reveal-element');
    revealObserver.observe(element);
  });
  
  // Add team member hover effect
  const teamMembers = document.querySelectorAll('.team-member');
  
  if (teamMembers.length > 0) {
    teamMembers.forEach(member => {
      member.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
      });
      
      member.addEventListener('mouseleave', function() {
        this.style.transform = '';
      });
    });
  }
  
  // Parallax effect for hero section
  const heroSection = document.getElementById('hero');
  const heroImage = document.querySelector('.hero-image img');
  
  if (heroSection && heroImage) {
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop < window.innerHeight) {
        const parallaxOffset = scrollTop * 0.3;
        heroImage.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${parallaxOffset}px)`;
      }
    });
  }

  // Login and Signup toggle
  const loginForm = document.querySelector('.login-form');
  const signupForm = document.querySelector('.signup-form');
  const roleSelection = document.querySelector('.role-selection');
  const signupLink = document.querySelector('.signup-link');
  const loginLink = document.querySelector('.login-link');
  const roleOptions = document.querySelectorAll('.role-option');
  const roleContinueBtn = document.querySelector('.role-continue');
  const roleBackBtn = document.querySelector('.role-back');
  const studentBadge = document.querySelector('.student-badge');
  const mentorBadge = document.querySelector('.mentor-badge');
  
  // Role selection
  let selectedRole = null;
  
  // Show role selection when clicking sign up
  if (signupLink) {
    signupLink.addEventListener('click', function(e) {
      e.preventDefault();
      loginForm.style.display = 'none';
      roleSelection.style.display = 'block';
      signupForm.style.display = 'none';
    });
  }
  
  // Go back to login from role selection
  if (roleBackBtn) {
    roleBackBtn.addEventListener('click', function(e) {
      e.preventDefault();
      loginForm.style.display = 'block';
      roleSelection.style.display = 'none';
      signupForm.style.display = 'none';
    });
  }
  
  // Select role
  if (roleOptions.length) {
    roleOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Remove selected class from all options
        roleOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selected class to clicked option
        this.classList.add('selected');
        
        // Enable continue button
        roleContinueBtn.removeAttribute('disabled');
        
        // Store selected role
        selectedRole = this.getAttribute('data-role');
      });
    });
  }
  
  // Continue to signup form after selecting role
  if (roleContinueBtn) {
    roleContinueBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (selectedRole) {
        loginForm.style.display = 'none';
        roleSelection.style.display = 'none';
        signupForm.style.display = 'block';
        
        // Show appropriate role badge
        if (selectedRole === 'student') {
          studentBadge.style.display = 'inline-block';
          mentorBadge.style.display = 'none';
        } else if (selectedRole === 'mentor') {
          studentBadge.style.display = 'none';
          mentorBadge.style.display = 'inline-block';
        }
      }
    });
  }
  
  // Back to login from signup
  if (loginLink) {
    loginLink.addEventListener('click', function(e) {
      e.preventDefault();
      loginForm.style.display = 'block';
      roleSelection.style.display = 'none';
      signupForm.style.display = 'none';
      
      // Reset role selection
      selectedRole = null;
      roleOptions.forEach(opt => opt.classList.remove('selected'));
      roleContinueBtn.setAttribute('disabled', 'disabled');
    });
  }

  // Login Form Functionality
  const loginBtn = document.querySelector('.login-btn');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  
  // Keep dropdown open when interacting with form
  const loginDropdown = document.querySelector('.login-dropdown');
  loginDropdown.addEventListener('mouseenter', () => {
    loginDropdown.classList.add('active');
  });
  
  loginDropdown.addEventListener('mouseleave', () => {
    loginDropdown.classList.remove('active');
  });
  
  // For mobile: Toggle login dropdown when button is clicked
  loginBtn.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      loginDropdown.classList.toggle('show-mobile');
    }
  });
  
  // Form submission
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = loginForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="loading-spinner"></span> Logging in...';
      
      // Validate inputs
      let isValid = true;
      
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
      } else {
        clearError(emailInput);
      }
      
      if (!passwordInput.value.trim()) {
        showError(passwordInput, 'Password is required');
        isValid = false;
      } else {
        clearError(passwordInput);
      }
      
      if (!isValid) {
        // Reset button
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 500);
        return;
      }
      
      // Simulate login process
      setTimeout(() => {
        // Get values
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const rememberMe = document.getElementById('remember').checked;
        
        // For demo purposes, log values (in production, you'd send to server)
        console.log(`Login attempt: ${email}, Remember me: ${rememberMe}`);
        
        // Show success message
        loginForm.innerHTML = `
          <div class="login-success">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>Login Successful!</h3>
            <p>Welcome back, ${email.split('@')[0]}</p>
          </div>
        `;
        
        // Update login button text
        loginBtn.innerHTML = '<i class="fas fa-user-check"></i> Account';
        loginBtn.classList.add('logged-in');
        
        // Hide dropdown after 2 seconds
        setTimeout(() => {
          if (!loginDropdown.matches(':hover')) {
            loginDropdown.classList.remove('active');
          }
          
          if (window.innerWidth <= 768) {
            loginDropdown.classList.remove('show-mobile');
          }
        }, 2000);
      }, 1500);
    });
  }
  
  // Sign-up form submission
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = signupForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="loading-spinner"></span> Creating account...';
      
      // Get form inputs
      const nameInput = document.getElementById('signup-name');
      const emailInput = document.getElementById('signup-email');
      const passwordInput = document.getElementById('signup-password');
      const confirmInput = document.getElementById('signup-confirm');
      
      // Validate inputs
      let isValid = true;
      
      if (!nameInput.value.trim()) {
        showError(nameInput, 'Name is required');
        isValid = false;
      } else {
        clearError(nameInput);
      }
      
      if (!emailInput.value.trim()) {
        showError(emailInput, 'Email is required');
        isValid = false;
      } else if (!isValidEmail(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email');
        isValid = false;
      } else {
        clearError(emailInput);
      }
      
      if (!passwordInput.value.trim()) {
        showError(passwordInput, 'Password is required');
        isValid = false;
      } else if (passwordInput.value.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
      } else {
        clearError(passwordInput);
      }
      
      if (!confirmInput.value.trim()) {
        showError(confirmInput, 'Please confirm your password');
        isValid = false;
      } else if (confirmInput.value !== passwordInput.value) {
        showError(confirmInput, 'Passwords do not match');
        isValid = false;
      } else {
        clearError(confirmInput);
      }
      
      if (!isValid) {
        // Reset button
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
        }, 500);
        return;
      }
      
      // Simulate sign-up process
      setTimeout(() => {
        const email = emailInput.value.trim();
        const name = nameInput.value.trim();
        
        // For demo purposes, log values
        console.log(`Sign-up: ${name} (${email})`);
        
        // Show success message
        signupForm.innerHTML = `
          <div class="login-success">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>
            <h3>Account Created!</h3>
            <p>Welcome to Learnova, ${name}!</p>
          </div>
        `;
        
        // Update login button text
        loginBtn.innerHTML = '<i class="fas fa-user-check"></i> Account';
        loginBtn.classList.add('logged-in');
        
        // Hide dropdown after 2 seconds
        setTimeout(() => {
          if (!loginDropdown.matches(':hover')) {
            loginDropdown.classList.remove('active');
          }
          
          if (window.innerWidth <= 768) {
            loginDropdown.classList.remove('show-mobile');
          }
        }, 2000);
      }, 1500);
    });
  }
  
  // Helper functions for form validation
  function showError(input, message) {
    const formField = input.closest('.form-field');
    if (!formField.querySelector('.error-message')) {
      const error = document.createElement('div');
      error.className = 'error-message';
      error.textContent = message;
      formField.appendChild(error);
    } else {
      formField.querySelector('.error-message').textContent = message;
    }
    input.classList.add('error');
  }
  
  function clearError(input) {
    const formField = input.closest('.form-field');
    if (formField.querySelector('.error-message')) {
      formField.querySelector('.error-message').remove();
    }
    input.classList.remove('error');
  }

  // Initialize the animations for stats counters
  initCounters();

  // Handle mentor booking functionality
  initMentorBooking();
});

// Additional CSS classes for enhanced animations
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .reveal-element {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .revealed {
      opacity: 1;
      transform: translateY(0);
    }
    
    .nav-links.active, .cta-small.active {
      display: flex;
      flex-direction: column;
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: rgba(255, 255, 255, 0.98);
      padding: 1.5rem;
      box-shadow: var(--shadow);
      z-index: 1;
      animation: slideDown 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .nav-links a.active {
      color: var(--primary-color);
      font-weight: 600;
      position: relative;
    }
    
    .nav-links a.active::after {
      content: '';
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--primary-color);
      animation: growLine 0.3s ease forwards;
    }
    
    @keyframes growLine {
      from { width: 0; }
      to { width: 100%; }
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .success-message {
      background: linear-gradient(135deg, var(--secondary-color), var(--secondary-dark));
      color: white;
      padding: 2rem;
      border-radius: var(--border-radius);
      text-align: center;
      animation: fadeIn 0.5s ease;
      box-shadow: var(--shadow);
    }
    
    .success-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
      animation: scaleIn 0.5s ease;
    }
    
    @keyframes scaleIn {
      from {
        transform: scale(0);
      }
      to {
        transform: scale(1);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    .error {
      border-color: #ef4444 !important;
      animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    .error-message {
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.5rem;
      animation: fadeIn 0.3s ease;
    }
    
    @keyframes shake {
      0%, 100% {
        transform: translateX(0);
      }
      10%, 30%, 50%, 70%, 90% {
        transform: translateX(-5px);
      }
      20%, 40%, 60%, 80% {
        transform: translateX(5px);
      }
    }
    
    .chat-input.focused {
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
    }
    
    .loading-spinner {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 0.8s linear infinite;
      margin-right: 0.5rem;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    
    .scroll-progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 3px;
      width: 0;
      background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
      transition: width 0.1s ease;
      z-index: 1001;
    }
    
    .pulse-animation {
      animation: pulse 0.6s ease-in-out;
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    .section-highlight {
      animation: highlight 1s ease;
    }
    
    @keyframes highlight {
      0% { background-color: transparent; }
      30% { background-color: rgba(99, 102, 241, 0.1); }
      100% { background-color: transparent; }
    }
    
    .message {
      opacity: 0;
      transform: translateY(10px);
      transition: opacity 0.3s ease, transform 0.3s ease;
    }
    
    .message.show {
      opacity: 1;
      transform: translateY(0);
    }
    
    .module-content {
      opacity: 0;
      transform: translateX(20px);
      transition: opacity 0.4s ease, transform 0.4s ease;
    }
    
    .module-content.fade-in {
      opacity: 1;
      transform: translateX(0);
    }
    
    #beta-form {
      transition: opacity 0.3s ease;
    }
  </style>
`);

// Add preloader for better page load experience
document.body.insertAdjacentHTML('afterbegin', `
  <div id="preloader">
    <div class="loader">
      <svg viewBox="0 0 80 80">
        <circle id="loader-circle" cx="40" cy="40" r="32"></circle>
      </svg>
      <div class="loader-text">Learnova</div>
    </div>
  </div>
  <style>
    #preloader {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: opacity 0.5s ease, visibility 0.5s ease;
    }
    .loader {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .loader svg {
      width: 80px;
      height: 80px;
      transform-origin: center;
      animation: rotate 2s linear infinite;
    }
    #loader-circle {
      fill: none;
      stroke: url(#gradient);
      stroke-width: 4;
      stroke-dasharray: 200;
      stroke-dashoffset: 200;
      animation: dash 4s ease-in-out infinite;
    }
    .loader-text {
      margin-top: 20px;
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--primary-color);
      letter-spacing: 1px;
      animation: pulse 1.5s ease-in-out infinite alternate;
    }
    @keyframes rotate {
      100% { transform: rotate(360deg); }
    }
    @keyframes dash {
      0% { stroke-dashoffset: 200; }
      50% { stroke-dashoffset: 50; }
      100% { stroke-dashoffset: 200; }
    }
  </style>
`);

// Add SVG gradient definition
const svgGradient = document.createElementNS("http://www.w3.org/2000/svg", "svg");
svgGradient.style.width = 0;
svgGradient.style.height = 0;
svgGradient.style.position = 'absolute';
svgGradient.innerHTML = `
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#8b5cf6" class="gradient-def" />
      <stop offset="100%" stop-color="#ec4899" class="gradient-def" />
    </linearGradient>
  </defs>
`;
document.body.appendChild(svgGradient);

// Hide preloader after page loads
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  setTimeout(() => {
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    
    // Add page intro animation
    document.body.classList.add('page-loaded');
  }, 500);
});

// Initialize mentor booking functionality
function initMentorBooking() {
  const bookButtons = document.querySelectorAll('.mentor-card .btn');
  const modal = document.querySelector('.booking-modal');
  const closeModal = document.querySelector('.close-modal');
  
  if (bookButtons.length && modal) {
    bookButtons.forEach(button => {
      button.addEventListener('click', () => {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
    
    if (closeModal) {
      closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      });
    }
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Date and time selection
    const dateButtons = document.querySelectorAll('.date-btn');
    const timeButtons = document.querySelectorAll('.time-btn');
    
    dateButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        dateButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    
    timeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        timeButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });
    
    // Form submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const topic = document.getElementById('session-topic').value;
        const selectedDate = document.querySelector('.date-btn.selected');
        const selectedTime = document.querySelector('.time-btn.selected');
        
        if (!topic || !selectedDate || !selectedTime) {
          alert('Please complete all fields to book a session');
          return;
        }
        
        // Simulate booking confirmation
        modal.innerHTML = `
          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="booking-confirmation">
              <div class="confirmation-icon">
                <i class="fas fa-check-circle"></i>
              </div>
              <h3>Booking Confirmed!</h3>
              <p>Your mentoring session has been scheduled for ${selectedDate.textContent} at ${selectedTime.textContent}.</p>
              <p>Topic: ${topic}</p>
              <p>You will receive a confirmation email with all the details.</p>
              <button class="btn btn-primary btn-block close-confirmation">Done</button>
            </div>
          </div>
        `;
        
        // Add new close functionality
        const closeConfirmation = modal.querySelector('.close-confirmation');
        const newCloseModal = modal.querySelector('.close-modal');
        
        if (closeConfirmation) {
          closeConfirmation.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          });
        }
        
        if (newCloseModal) {
          newCloseModal.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
          });
        }
      });
    }
  }
  
  // Handle "Join Mentor Program" button
  const mentorProgramBtn = document.querySelector('.mentor-program-btn');
  if (mentorProgramBtn) {
    mentorProgramBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Thank you for your interest in our Mentor Program! Registration will open soon.');
    });
  }
}

// Initialize the animations for stats counters
function initCounters() {
  const counters = document.querySelectorAll('.stat-number');
  
  if (counters.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.getAttribute('data-count'));
          let count = 0;
          const duration = 2000; // Duration in milliseconds
          const interval = duration / target;
          
          const timer = setInterval(() => {
            count++;
            counter.textContent = count;
            
            if (count >= target) {
              clearInterval(timer);
            }
          }, interval);
          
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });
    
    counters.forEach((counter) => {
      observer.observe(counter);
    });
  }
} 