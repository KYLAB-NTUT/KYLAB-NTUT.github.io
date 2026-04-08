/* ======================================================
   SAC Lab — Main Script (無人機跟隨游標系統版)
   ====================================================== */

// ── 1. Scroll Reveal (滑動顯示動畫) ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('active'), i * 100);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
});

// 網頁載入時強制觸發一次
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('active');
    }
  });
});


// ── 2. Navbar 滾動陰影變化 ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "var(--shadow-hover)";
  } else {
    navbar.style.boxShadow = "var(--shadow-soft)";
  }
});


// ── 3. 手機版選單切換 ──
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    if (navLinks.style.display === 'flex' && navLinks.style.flexDirection === 'column') {
      navLinks.style.display = 'none';
    } else {
      navLinks.style.display = 'flex';
      navLinks.style.flexDirection = 'column';
      navLinks.style.position = 'absolute';
      navLinks.style.top = '100%';
      navLinks.style.left = '0';
      navLinks.style.width = '100%';
      navLinks.style.background = 'var(--bg-nav)';
      navLinks.style.padding = '20px';
      navLinks.style.borderRadius = '20px';
      navLinks.style.boxShadow = 'var(--shadow-soft)';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) navLinks.style.display = 'none';
    });
  });
}


// ── 4. Active nav link (導覽列隨滾動變色) ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 150) current = s.id;
  });
  navItems.forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});


// ── 5. 游標光暈 & 無人機游標 (物理傾斜效果) ──
const glow = document.getElementById('cursorGlow');
const drone = document.getElementById('droneCursor');

// 初始化座標
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let droneX = window.innerWidth / 2;
let droneY = window.innerHeight / 2;

if (window.innerWidth > 768) {
  // 記錄滑鼠真實位置
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // 光暈直接跟隨
    if (glow) {
      glow.style.left = mouseX + 'px';
      glow.style.top = mouseY + 'px';
    }
  });

  // 無人機物理動畫迴圈
  function animateDrone() {
    // 計算距離差距
    const dx = mouseX - droneX;
    const dy = mouseY - droneY;

    // 加上一點彈性延遲，模擬無人機飛行的慣性
    droneX += dx * 0.18;
    droneY += dy * 0.18;

    // 根據 X 軸移動速度產生傾斜 (飛機轉彎會傾斜)
    // dx 即代表瞬間的 X 軸速度差
    let tilt = dx * 0.6;
    const maxTilt = 35; // 限制最大傾斜角度為 35 度

    // 確保傾斜角度在合理範圍內
    tilt = Math.max(Math.min(tilt, maxTilt), -maxTilt);

    if (drone) {
      // 應用位移與旋轉 (注意: translateX/Y 會與 translate(-50%,-50%) 組合使用來保持置中)
      drone.style.transform = `translate(${droneX}px, ${droneY}px) translate(-50%, -50%) rotate(${tilt}deg)`;
    }

    requestAnimationFrame(animateDrone);
  }

  // 啟動無人機動畫
  animateDrone();
}


// ── 6. 點擊 emoji 彈跳 (可愛互動) ──
document.querySelectorAll('.card-icon-wrap, .proj-emoji, .award-icon, .team-avatar, .nav-logo-box, .prof-avatar').forEach(el => {
  el.style.cursor = 'pointer';
  el.addEventListener('click', () => {
    el.style.animation = 'none';
    el.offsetHeight;
    el.animate([
      { transform: 'scale(1)' },
      { transform: 'scale(1.2) rotate(5deg)' },
      { transform: 'scale(0.9) rotate(-5deg)' },
      { transform: 'scale(1.1) rotate(2deg)' },
      { transform: 'scale(1)' }
    ], { duration: 500, easing: 'ease-in-out' });
  });
});


// ── 7. 教授學經歷展開/收合 ──
function toggleServices() {
  const extra = document.getElementById('serviceExtra');
  const btn = document.getElementById('expandBtn');
  if (extra && btn) {
    if (extra.style.display === 'none' || extra.style.display === '') {
      extra.style.display = 'grid';
      btn.innerText = '收起學經歷 ↑';
    } else {
      extra.style.display = 'none';
      btn.innerText = '查看更多學經歷 ↓';
    }
  }
}


// ── 8. 深淺色主題切換 (Dark/Light Mode) ──
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

const savedTheme = localStorage.getItem('saclab-theme');
if (savedTheme === 'dark') {
  body.classList.add('dark-theme');
  if (themeToggle) themeToggle.innerText = '☀️';
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-theme');

    themeToggle.style.animation = 'none';
    themeToggle.offsetHeight;
    themeToggle.style.animation = 'jelly 0.5s';

    if (body.classList.contains('dark-theme')) {
      themeToggle.innerText = '☀️';
      localStorage.setItem('saclab-theme', 'dark');
    } else {
      themeToggle.innerText = '🌙';
      localStorage.setItem('saclab-theme', 'light');
    }
  });
}