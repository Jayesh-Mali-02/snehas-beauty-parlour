/* ── Nav scroll shadow ── */
  window.addEventListener('scroll', function() {
    document.getElementById('mainNav').classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── Set min date to today ── */
  document.getElementById('inp-date').min = new Date().toISOString().split('T')[0];

  /* ── Hamburger menu ── */
  function toggleMenu() {
    var btn  = document.getElementById('hamburger');
    var menu = document.getElementById('navMenu');
    var isOpen = menu.classList.toggle('open');
    btn.classList.toggle('open', isOpen);
    btn.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  function closeMenu() {
    document.getElementById('hamburger').classList.remove('open');
    document.getElementById('navMenu').classList.remove('open');
    document.getElementById('hamburger').setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  /* Close on outside click */
  document.addEventListener('click', function(e) {
    if (!e.target.closest('nav')) closeMenu();
  });
  /* Close on Escape key */
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ── Scroll spy — active nav link ── */
  var navLinks = {
    'services':     document.querySelector('.nav-menu a[href="#services"]'),
    'portfolio':    document.querySelector('.nav-menu a[href="#portfolio"]'),
    'about':        document.querySelector('.nav-menu a[href="#about"]'),
    'booking':      document.querySelector('.nav-menu a[href="#booking"]')
  };
  var sections = Object.keys(navLinks).map(function(id) {
    return document.getElementById(id);
  }).filter(Boolean);

  var spyObs = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        Object.values(navLinks).forEach(function(a) { if(a) a.classList.remove('active'); });
        var link = navLinks[entry.target.id];
        if (link) link.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(function(sec) { spyObs.observe(sec); });
  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
  } else {
    /* Fallback for old browsers */
    document.querySelectorAll('.reveal').forEach(function(el) { el.classList.add('visible'); });
  }

  /* ── Email form validation & send ── */
  function sendEmail() {
    var name    = document.getElementById('inp-name').value.trim();
    var address = document.getElementById('inp-address').value.trim();
    var phone   = document.getElementById('inp-phone').value.trim();
    var service = document.getElementById('inp-service').value;
    var date    = document.getElementById('inp-date').value;
    var vision  = document.getElementById('inp-vision').value.trim();

    /* Validation */
    if (!name) { alert('Please enter your name.'); document.getElementById('inp-name').focus(); return; }
    if (!address) { alert('Please enter your address.'); document.getElementById('inp-address').focus(); return; }
    if (!service) { alert('Please select a service.'); document.getElementById('inp-service').focus(); return; }

    var subject = 'Booking Inquiry \u2013 ' + service + ' | ' + name;
    var body =
      'New Booking Inquiry \u2013 Sneha\'s Beauty Parlour\n\n' +
      'Name:    ' + name + '\n' +
      'Address: ' + (address || 'Not provided') + '\n' +
      'Phone:   ' + (phone || 'Not provided') + '\n' +
      'Service: ' + service + '\n' +
      'Date:    ' + (date || 'Not specified') + '\n' +
      'Vision:  ' + (vision || 'Not specified') + '\n\n' +
      'Sent via Sneha\'s Beauty Parlour Website';

    var toEmail = 'patilsneha102005@gmail.com';
    window.location.href = 'mailto:' + toEmail +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);
  }
