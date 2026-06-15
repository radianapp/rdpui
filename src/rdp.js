/**
 * ============================================================
 *  RDP-UI JavaScript — v1.0.0
 *  Radian Data Platform · radian.web.id
 *
 *  Interaktivitas minimal untuk RDP-UI Design System.
 *  Vanilla JavaScript, tanpa dependency.
 *
 *  Fitur:
 *    - Theme switcher (light/dark/auto)
 *    - Sidebar toggle (dashboard layout)
 *    - Alert dismiss
 *    - Mobile nav toggle
 *
 *  Penggunaan:
 *    <script src="https://cdn.radian.web.id/rdp.js"></script>
 *
 *  Atau:
 *    import './rdp.js';
 * ============================================================
 */

import './components/modal/modal.js';
import './components/toast/toast.js';

(function () {
  'use strict';

  /**
   * Namespace global RDP.
   * Semua API publik diekspos melalui window.RDP.
   */
  const RDP = window.RDP || {};


  /* ═══════════════════════════════════════════════════════════
     THEME SWITCHER
     ═══════════════════════════════════════════════════════════ */

  /**
   * Mengatur tema aplikasi.
   *
   * @param {'light'|'dark'|'auto'} theme - Tema yang dipilih.
   *   'auto' akan menghapus atribut data-theme sehingga
   *   prefers-color-scheme di auto.css yang mengambil alih.
   */
  RDP.setTheme = function (theme) {
    const root = document.documentElement;

    if (theme === 'auto') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }

    // Simpan preferensi di localStorage
    try {
      localStorage.setItem('rdp-theme', theme);
    } catch (e) {
      // localStorage tidak tersedia (private browsing, dll)
    }

    // Dispatch custom event untuk integrasi HTMX/SPA
    document.dispatchEvent(new CustomEvent('rdp:theme-change', {
      detail: { theme: theme }
    }));
  };

  /**
   * Mendapatkan tema saat ini.
   * @returns {'light'|'dark'|'auto'}
   */
  RDP.getTheme = function () {
    return document.documentElement.getAttribute('data-theme') || 'auto';
  };

  /**
   * Inisialisasi tema dari localStorage saat halaman dimuat.
   */
  function initTheme() {
    try {
      const saved = localStorage.getItem('rdp-theme');
      if (saved && saved !== 'auto') {
        document.documentElement.setAttribute('data-theme', saved);
      }
    } catch (e) {
      // Abaikan jika localStorage tidak tersedia
    }
  }


  /* ═══════════════════════════════════════════════════════════
     SIDEBAR TOGGLE (Dashboard Layout)
     ═══════════════════════════════════════════════════════════ */

  /**
   * Toggle sidebar dashboard (mobile drawer).
   * Mencari elemen .rdp-sidebar dan .rdp-sidebar-backdrop.
   */
  RDP.toggleSidebar = function () {
    const sidebar = document.querySelector('.rdp-sidebar');
    const backdrop = document.querySelector('.rdp-sidebar-backdrop');

    if (!sidebar) return;

    const isOpen = sidebar.classList.contains('is-open');

    if (isOpen) {
      sidebar.classList.remove('is-open');
      if (backdrop) backdrop.classList.remove('is-visible');
      document.body.style.overflow = '';
    } else {
      sidebar.classList.add('is-open');
      if (backdrop) backdrop.classList.add('is-visible');
      document.body.style.overflow = 'hidden';
    }
  };


  /* ═══════════════════════════════════════════════════════════
     ALERT DISMISS
     ═══════════════════════════════════════════════════════════ */

  /**
   * Menutup alert dengan animasi.
   * @param {HTMLElement} alertEl - Elemen alert yang akan ditutup.
   */
  RDP.dismissAlert = function (alertEl) {
    if (!alertEl) return;

    alertEl.classList.add('rdp-alert--hiding');
    alertEl.addEventListener('animationend', function () {
      alertEl.remove();
    }, { once: true });
  };


  /* ═══════════════════════════════════════════════════════════
     MOBILE NAV TOGGLE (Homepage Layout)
     ═══════════════════════════════════════════════════════════ */

  /**
   * Toggle mobile navigation menu.
   */
  RDP.toggleMobileNav = function () {
    const mobileMenu = document.querySelector('.rdp-topnav__mobile');
    if (!mobileMenu) return;

    mobileMenu.classList.toggle('is-open');
  };


  /* ═══════════════════════════════════════════════════════════
     AUTO-INIT — Event Delegation
     ═══════════════════════════════════════════════════════════ */

  function autoInit() {
    // Inisialisasi tema
    initTheme();

    // Event delegation untuk seluruh interaksi RDP
    document.addEventListener('click', function (e) {
      const target = e.target.closest('[data-rdp-action]');
      if (!target) return;

      const action = target.getAttribute('data-rdp-action');

      switch (action) {
        case 'toggle-sidebar':
          e.preventDefault();
          RDP.toggleSidebar();
          break;

        case 'toggle-mobile-nav':
          e.preventDefault();
          RDP.toggleMobileNav();
          break;

        case 'dismiss-alert':
          e.preventDefault();
          RDP.dismissAlert(target.closest('.rdp-alert'));
          break;

        case 'set-theme':
          e.preventDefault();
          var theme = target.getAttribute('data-rdp-theme');
          if (theme) RDP.setTheme(theme);
          break;
      }
    });

    // Close sidebar on backdrop click
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('rdp-sidebar-backdrop')) {
        RDP.toggleSidebar();
      }
    });

    // Keyboard: Escape to close sidebar/mobile-nav
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        // Close sidebar if open
        var sidebar = document.querySelector('.rdp-sidebar.is-open');
        if (sidebar) {
          RDP.toggleSidebar();
          return;
        }

        // Close mobile nav if open
        var mobileNav = document.querySelector('.rdp-topnav__mobile.is-open');
        if (mobileNav) {
          RDP.toggleMobileNav();
        }
      }
    });
  }

  // Auto-init saat DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoInit);
  } else {
    autoInit();
  }

  // Expose ke global
  window.RDP = RDP;

})();
