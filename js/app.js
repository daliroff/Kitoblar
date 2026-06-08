(function () {
  // Navbar scroll effect
  var nav = document.getElementById('navbar');
  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    });
    if (window.scrollY > 30) nav.classList.add('scrolled');
  }

  // Hamburger mobile menu
  var hb = document.getElementById('hamburger');
  var mm = document.getElementById('mobile-menu');
  var mc = document.getElementById('mobile-close');
  if (hb && mm) {
    hb.addEventListener('click', function () { mm.classList.add('open'); });
  }
  if (mc && mm) {
    mc.addEventListener('click', function () { mm.classList.remove('open'); });
  }
  if (mm) {
    mm.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mm.classList.remove('open'); });
    });
  }

  // Typewriter effect (index page only)
  var tw = document.getElementById('typewriter');
  if (tw) {
    var code = '# Your coding journey starts now!\n\nname = input("What is your name? ")\nprint(f"Hello, {name}! 🚀")\n\ncourses = [\n  "HTML & CSS",\n  "JavaScript",\n  "Python",\n  "React.js",\n  "Node.js"\n]\n\nfor course in courses:\n  print(f"✓ {course} — unlocked!")\n\nprint("\nYou are job-ready! 🎉")';
    var i = 0;
    tw.classList.add('cursor');
    function type() {
      if (i < code.length) {
        tw.textContent += code[i];
        i++;
        setTimeout(type, i === 1 ? 500 : 22 + Math.random() * 18);
      }
    }
    setTimeout(type, 800);
  }

  // Animated stat counters
  var counters = document.querySelectorAll('.hnum[data-target]');
  if (counters.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var target = parseInt(el.dataset.target, 10);
        var suffix = el.dataset.suffix || '';
        var current = 0;
        var step = target / 45;
        var timer = setInterval(function () {
          current = Math.min(current + step, target);
          el.textContent = Math.round(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, 28);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (c) { obs.observe(c); });
  }

  // Update navbar with logged-in user
  var user = null;
  try { user = JSON.parse(localStorage.getItem('codepath_user')); } catch (e) {}
  var navActions = document.getElementById('nav-actions');
  if (navActions && user && !document.querySelector('.dash-page')) {
    var initials = (user.firstName[0] + (user.lastName ? user.lastName[0] : '')).toUpperCase();
    navActions.innerHTML =
      '<a href="dashboard.html" class="btn btn-outline">Dashboard</a>' +
      '<a href="dashboard.html" class="avatar-btn">' + initials + '</a>';
  }

  // Mobile logout
  var mlo = document.getElementById('mobile-logout');
  if (mlo) {
    mlo.addEventListener('click', function (e) {
      e.preventDefault();
      localStorage.removeItem('codepath_user');
      window.location.href = 'index.html';
    });
  }

  // Scroll reveal for cards
  var cards = document.querySelectorAll('.feat-card, .course-card, .ritem');
  if (cards.length && 'IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.animation = 'fadeUp .5s ease forwards';
          ro.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    cards.forEach(function (c) { c.style.opacity = '0'; ro.observe(c); });
  }
}());
