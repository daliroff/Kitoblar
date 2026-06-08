(function () {
  var params = new URLSearchParams(window.location.search);
  var id = params.get('id');
  if (!id || !COURSES[id]) { window.location.href = 'index.html'; return; }

  var course = COURSES[id];
  var user = null;
  try { user = JSON.parse(localStorage.getItem('codepath_user')); } catch (e) {}

  // Fill header
  document.title = course.title + ' – CodePath';
  document.getElementById('course-title').textContent = course.title;
  document.getElementById('course-desc').textContent = course.desc;
  document.getElementById('course-about').textContent = course.about;
  document.getElementById('course-emoji').textContent = course.emoji;
  document.getElementById('course-duration').textContent = course.duration;
  document.getElementById('course-instructor').textContent = course.instructor;
  document.getElementById('lesson-count').textContent = course.lessons.length;

  var thumbEl = document.getElementById('course-thumb');
  thumbEl.className = 'course-thumb-hero ' + course.cover;

  var lvlEl = document.getElementById('course-level-badge');
  var lvlClass = course.level === 'Beginner' ? 'lvl-beginner' : (course.level === 'Intermediate' ? 'lvl-inter' : 'lvl-advanced');
  lvlEl.innerHTML = '<span class="lvl ' + lvlClass + '">' + course.level + '</span>';

  // Set video
  document.getElementById('course-video').src =
    'https://www.youtube.com/embed/' + course.ytId + '?rel=0&modestbranding=1';

  // Progress
  var progress = user ? (user.progress[id] || []) : [];
  renderProgress(progress);

  if (!user) {
    document.getElementById('prog-text').textContent = 'Log in to track your progress';
    document.getElementById('login-prompt-box').style.display = 'block';
  }

  // Render curriculum
  var list = document.getElementById('cur-list');
  list.innerHTML = course.lessons.map(function (lesson, i) {
    var done = progress.indexOf(i) > -1;
    return '<div class="cur-item' + (done ? ' done' : '') + '" data-idx="' + i + '" onclick="toggleLesson(' + i + ', this)">' +
      '<div class="check">' + (done ? '✓' : '') + '</div>' +
      '<span>' + (i + 1) + '. ' + lesson + '</span>' +
      '</div>';
  }).join('');

  function renderProgress(prog) {
    var pct = course.lessons.length ? Math.round((prog.length / course.lessons.length) * 100) : 0;
    document.getElementById('prog-fill').style.width = pct + '%';
    if (user) {
      document.getElementById('prog-text').textContent =
        prog.length + ' / ' + course.lessons.length + ' lessons (' + pct + '%)';
    }
  }

  window.toggleLesson = function (idx, el) {
    if (!user) {
      if (confirm('Create a free account to track your progress!')) {
        window.location.href = 'register.html';
      }
      return;
    }

    if (!user.progress[id]) user.progress[id] = [];
    var arr = user.progress[id];
    var pos = arr.indexOf(idx);
    if (pos > -1) {
      arr.splice(pos, 1);
      el.classList.remove('done');
      el.querySelector('.check').textContent = '';
    } else {
      arr.push(idx);
      el.classList.add('done');
      el.querySelector('.check').textContent = '✓';
    }

    saveUser();
    renderProgress(arr);

    if (arr.length === course.lessons.length) {
      awardBadge();
    }
  };

  function saveUser() {
    localStorage.setItem('codepath_user', JSON.stringify(user));
    var users = [];
    try { users = JSON.parse(localStorage.getItem('codepath_users')) || []; } catch (e) {}
    var idx = users.findIndex(function (u) { return u.id === user.id; });
    if (idx > -1) { users[idx] = user; localStorage.setItem('codepath_users', JSON.stringify(users)); }
  }

  function awardBadge() {
    if (!user.badges) user.badges = [];
    if (user.badges.indexOf(id) === -1) {
      user.badges.push(id);
      saveUser();
      showToast('🏆 Badge earned: ' + course.title + ' Complete!');
    }
  }

  function showToast(msg) {
    var t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, 4000);
  }
}());
