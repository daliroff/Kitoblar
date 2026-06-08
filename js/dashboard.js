(function () {
  var user = null;
  try { user = JSON.parse(localStorage.getItem('codepath_user')); } catch (e) {}

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  // Fill profile
  var initials = (user.firstName[0] + (user.lastName ? user.lastName[0] : '')).toUpperCase();
  document.getElementById('dash-name').textContent = user.firstName + (user.lastName ? ' ' + user.lastName : '') + '!';
  document.getElementById('p-avatar').textContent = initials;
  document.getElementById('avatar-btn').textContent = initials;
  document.getElementById('p-name').textContent = user.firstName + ' ' + (user.lastName || '');
  document.getElementById('p-email').textContent = user.email;
  document.getElementById('p-level').textContent = user.level || 'Beginner';
  document.getElementById('p-goal').textContent = user.goal || 'Not set';
  document.getElementById('p-joined').textContent = new Date(user.joinedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  // Compute stats
  var prog = user.progress || {};
  var completedCourses = Object.keys(prog).filter(function (k) {
    return COURSES[k] && prog[k].length === COURSES[k].lessons.length;
  }).length;
  var totalLessons = Object.values(prog).reduce(function (a, b) { return a + b.length; }, 0);

  document.getElementById('stat-completed').textContent = completedCourses;
  document.getElementById('stat-lessons').textContent = totalLessons;
  document.getElementById('stat-badges').textContent = (user.badges || []).length;
  document.getElementById('stat-streak').textContent = user.streak || 1;

  // Course progress cards
  var coursesEl = document.getElementById('dash-courses');
  coursesEl.innerHTML = Object.keys(COURSES).map(function (id) {
    var c = COURSES[id];
    var done = prog[id] ? prog[id].length : 0;
    var pct = Math.round((done / c.lessons.length) * 100);
    return '<a href="course.html?id=' + id + '" class="dcc">' +
      '<div class="dcc-top">' +
        '<div class="dcc-ico ' + c.cover + '">' + c.emoji + '</div>' +
        '<div class="dcc-info"><h4>' + c.title + '</h4><span>' + c.duration + ' &middot; ' + c.level + '</span></div>' +
      '</div>' +
      '<div class="prog-bar-bg"><div class="prog-bar-fill" style="width:' + pct + '%"></div></div>' +
      '<div style="font-size:.78rem;color:var(--muted)">' + done + ' / ' + c.lessons.length + ' lessons &middot; ' + pct + '%</div>' +
      '</a>';
  }).join('');

  // Badges
  var allBadges = [
    { id: 'html-css', icon: '🌐', name: 'Web Builder', desc: 'Complete HTML & CSS' },
    { id: 'python', icon: '🐍', name: 'Pythonista', desc: 'Complete Python' },
    { id: 'javascript', icon: '⚡', name: 'JS Ninja', desc: 'Complete JavaScript' },
    { id: 'git', icon: '🔧', name: 'Git Master', desc: 'Complete Git & GitHub' },
    { id: 'react', icon: '⚛️', name: 'React Dev', desc: 'Complete React.js' },
    { id: 'nodejs', icon: '🟩', name: 'Backend Dev', desc: 'Complete Node.js' }
  ];
  var earned = user.badges || [];
  document.getElementById('badge-list').innerHTML = allBadges.map(function (b) {
    var isEarned = earned.indexOf(b.id) > -1;
    return '<div class="badge-item ' + (isEarned ? 'earned' : 'locked') + '">' +
      '<span class="badge-ico">' + b.icon + '</span>' +
      '<div><div class="badge-name">' + b.name + '</div>' +
      '<div class="badge-desc">' + (isEarned ? '✅ Earned' : '🔒 ' + b.desc) + '</div></div>' +
      '</div>';
  }).join('');

  // Logout
  var logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
      localStorage.removeItem('codepath_user');
      window.location.href = 'index.html';
    });
  }
}());
