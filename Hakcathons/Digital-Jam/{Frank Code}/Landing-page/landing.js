document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
      });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Form submission
    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const email = this.querySelector('input[type="email"]').value;
        const password = this.querySelector('input[type="password"]').value;
        
        // Here you would typically send this to your backend
        console.log('Signup attempt with:', { email, password });
        
        // Show success message (in a real app, you'd handle the response)
        alert('Account created successfully! Redirecting to dashboard...');
        // window.location.href = '/dashboard';
      });
    }
    
    // Demo video modal (placeholder)
    const demoBtn = document.querySelector('a[href="#demo"]');
    if (demoBtn) {
      demoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert('This would open a video demo modal in a real implementation');
      });
    }
  });