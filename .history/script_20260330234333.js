
(function () {
  'use strict';

  var nav = document.getElementById('mainNav');
  var navbarHeight = nav ? nav.offsetHeight : 72;

 
  function updateNavbarOnScroll() {
    if (!nav) return;
    if (window.scrollY > 48) {
      nav.classList.add('navbar-scrolled');
    } else {
      nav.classList.remove('navbar-scrolled');
    }
    navbarHeight = nav.offsetHeight;
  }

  window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
  updateNavbarOnScroll();

 
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#' || targetId.length < 2) return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      var top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 10;
      window.scrollTo({ top: top, behavior: 'smooth' });

      var navCollapse = document.querySelector('.navbar-collapse');
      if (navCollapse && navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
      }
    });
  });

 
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target); 
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px',
      }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
  
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  
  var form = document.querySelector('.contact-form');
  var successBox = document.getElementById('formSuccess');

  function isValidEmail(value) {
   
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  function clearFieldError(input) {
    input.classList.remove('is-invalid');
  }

  if (form) {
    var nameInput = document.getElementById('contactName');
    var emailInput = document.getElementById('contactEmail');
    var messageInput = document.getElementById('contactMessage');

    [nameInput, emailInput, messageInput].forEach(function (input) {
      if (!input) return;
      input.addEventListener('input', function () {
        clearFieldError(input);
        if (successBox) {
          successBox.classList.add('d-none');
        }
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = (nameInput && nameInput.value.trim()) || '';
      var email = (emailInput && emailInput.value.trim()) || '';
      var message = (messageInput && messageInput.value.trim()) || '';
      var ok = true;

      if (nameInput) clearFieldError(nameInput);
      if (emailInput) clearFieldError(emailInput);
      if (messageInput) clearFieldError(messageInput);

      if (name.length < 2) {
        ok = false;
        if (nameInput) nameInput.classList.add('is-invalid');
      }
      if (!isValidEmail(email)) {
        ok = false;
        if (emailInput) emailInput.classList.add('is-invalid');
      }
      if (message.length < 10) {
        ok = false;
        if (messageInput) messageInput.classList.add('is-invalid');
      }

      form.classList.add('was-validated');

      if (!ok) {
        if (successBox) {
          successBox.classList.add('d-none');
        }
        return;
      }

      
      if (successBox) {
        successBox.textContent = 'Thanks, ' + name + '! Your message was validated.';
        successBox.classList.remove('d-none');
      }
      form.reset();
      form.classList.remove('was-validated');
      successBox && successBox.focus({ preventScroll: true });
    });
  }
})();
