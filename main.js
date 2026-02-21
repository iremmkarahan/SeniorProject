document.addEventListener('DOMContentLoaded', () => {

  /* ── Reveal on scroll ───────────────────────── */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // Immediately reveal above-fold content
  setTimeout(() => {
    document.querySelector('.hero-banner')?.classList.add('active');
  }, 80);

  /* ── Topbar scroll shadow ───────────────────── */
  const topbar = document.querySelector('.topbar');
  window.addEventListener('scroll', () => {
    topbar?.classList.toggle('scrolled', window.scrollY > 10);
  }, { passive: true });

  /* ── Notification dropdown ──────────────────── */
  const notifBtn      = document.getElementById('notifBtn');
  const notifDropdown = document.getElementById('notifDropdown');
  notifBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    notifDropdown.classList.toggle('open');
  });
  document.addEventListener('click', () => notifDropdown?.classList.remove('open'));

  /* ── Sidebar toggle (mobile) ────────────────── */
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarLeft   = document.getElementById('sidebarLeft');
  sidebarToggle?.addEventListener('click', () => {
    sidebarLeft?.classList.toggle('open');
  });

  /* ── Active nav link on scroll ──────────────── */
  const sections  = document.querySelectorAll('section[id], div[id]');
  const navItems  = document.querySelectorAll('.nav-item[data-section]');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(item => {
          item.classList.toggle('active', item.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── Feed filter buttons ────────────────────── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── Swap request button feedback ──────────────*/
  document.querySelectorAll('.btn-swap').forEach(btn => {
    btn.addEventListener('click', () => {
      const orig = btn.textContent;
      btn.textContent = '✓ Sent!';
      btn.style.background = 'linear-gradient(135deg, #10b981, #0891b2)';
      setTimeout(() => {
        btn.textContent = orig;
        btn.style.background = '';
      }, 2200);
    });
  });

  /* ── Search input live feedback ──────────────── */
  const searchInput = document.getElementById('searchInput');
  searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      searchInput.style.borderColor = 'var(--secondary)';
      setTimeout(() => { searchInput.style.borderColor = ''; }, 1200);
    }
  });

  /* ── Skill pills hover pulse ─────────────────── */
  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('mouseenter', () => {
      pill.style.transform = 'scale(1.07)';
    });
    pill.addEventListener('mouseleave', () => {
      pill.style.transform = '';
    });
  });

  /* ── Topbar scrolled style ───────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    .topbar.scrolled {
      background: rgba(15,23,42,0.98);
      box-shadow: 0 2px 20px rgba(0,0,0,0.5);
    }
  `;
  document.head.appendChild(style);

});
