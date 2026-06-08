(function () {
  function showAlert(el, msg, type) {
    if (!el) return;
    el.textContent = msg;
    el.className = 'alert ' + (type === 'ok' ? 'alert-ok' : 'alert-err');
  }

  // Password toggle
  var pwToggle = document.getElementById('pw-toggle');
  var pwInput = document.getElementById('password') || document.getElementById('login-password');
  if (pwToggle && pwInput) {
    pwToggle.addEventListener('click', function () {
      pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
    });
  }

  // REGISTRATION
  var regForm = document.getElementById('register-form');
  if (regForm) {
    regForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var alertEl = document.getElementById('form-alert');
      var firstName = document.getElementById('firstName').value.trim();
      var lastName = document.getElementById('lastName').value.trim();
      var email = document.getElementById('email').value.trim().toLowerCase();
      var password = document.getElementById('password').value;
      var level = document.getElementById('level').value;
      var goal = document.getElementById('goal').value;

      if (!firstName) { showAlert(alertEl, 'Please enter your first name.', 'err'); return; }
      if (!email || !/^[^@]+@[^@]+\.[^@]+$/.test(email)) { showAlert(alertEl, 'Please enter a valid email address.', 'err'); return; }
      if (password.length < 6) { showAlert(alertEl, 'Password must be at least 6 characters.', 'err'); return; }
      if (!level) { showAlert(alertEl, 'Please select your skill level.', 'err'); return; }

      var users = [];
      try { users = JSON.parse(localStorage.getItem('codepath_users')) || []; } catch (ex) {}
      if (users.find(function (u) { return u.email === email; })) {
        showAlert(alertEl, 'An account with this email already exists. Try logging in.', 'err');
        return;
      }

      var user = {
        id: Date.now().toString(),
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: btoa(password),
        level: level,
        goal: goal || 'Not set',
        joinedAt: new Date().toISOString(),
        progress: {},
        badges: [],
        streak: 1,
        lastVisit: new Date().toDateString()
      };

      users.push(user);
      localStorage.setItem('codepath_users', JSON.stringify(users));
      localStorage.setItem('codepath_user', JSON.stringify(user));

      showAlert(alertEl, '🎉 Account created! Taking you to your dashboard...', 'ok');
      setTimeout(function () { window.location.href = 'dashboard.html'; }, 1400);
    });
  }

  // LOGIN
  var loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var alertEl = document.getElementById('form-alert');
      var email = document.getElementById('login-email').value.trim().toLowerCase();
      var password = document.getElementById('login-password').value;

      if (!email || !password) { showAlert(alertEl, 'Please fill in all fields.', 'err'); return; }

      var users = [];
      try { users = JSON.parse(localStorage.getItem('codepath_users')) || []; } catch (ex) {}
      var user = users.find(function (u) { return u.email === email && u.password === btoa(password); });

      if (!user) {
        showAlert(alertEl, 'Invalid email or password. Please try again.', 'err');
        return;
      }

      // Update streak
      var today = new Date().toDateString();
      if (user.lastVisit !== today) {
        var yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (user.lastVisit === yesterday.toDateString()) {
          user.streak = (user.streak || 0) + 1;
        } else {
          user.streak = 1;
        }
        user.lastVisit = today;
        var allUsers = JSON.parse(localStorage.getItem('codepath_users') || '[]');
        var idx = allUsers.findIndex(function (u) { return u.id === user.id; });
        if (idx > -1) { allUsers[idx] = user; localStorage.setItem('codepath_users', JSON.stringify(allUsers)); }
      }

      localStorage.setItem('codepath_user', JSON.stringify(user));
      showAlert(alertEl, 'Welcome back, ' + user.firstName + '! Redirecting...', 'ok');
      setTimeout(function () { window.location.href = 'dashboard.html'; }, 1000);
    });
  }
}());
