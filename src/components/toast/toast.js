/**
 * ============================================================
 *  RDP Toast Component JS — v1.0.0
 *  Radian Data Platform · radian.web.id
 *
 *  Interaktivitas untuk memunculkan toast notification.
 * ============================================================
 */

(function () {
  'use strict';

  const RDP = window.RDP || {};

  /**
   * Menampilkan toast notification programmatik.
   * @param {Object} options 
   * @param {string} options.title - Judul toast
   * @param {string} options.message - Pesan toast
   * @param {'success'|'danger'|'warning'|'info'} [options.type='info'] - Tipe semantic
   * @param {number} [options.duration=5000] - Durasi tampil (ms)
   * @param {'top-right'|'top-left'|'top-center'|'bottom-right'|'bottom-left'|'bottom-center'} [options.position='top-right'] - Posisi container
   */
  RDP.showToast = function (options = {}) {
    const {
      title,
      message,
      type = 'info',
      duration = 5000,
      position = 'top-right',
      action
    } = options;

    // Cari atau buat container
    const containerClass = `rdp-toast-container--${position}`;
    let container = document.querySelector(`.rdp-toast-container.${containerClass}`);
    if (!container) {
      container = document.createElement('div');
      container.className = `rdp-toast-container ${containerClass}`;
      document.body.appendChild(container);
    }

    // Buat elemen toast
    const toast = document.createElement('div');
    toast.className = `rdp-toast rdp-toast--${type}`;
    toast.setAttribute('role', 'alert');

    // Buat progress bar jika ada durasi
    let progressBarHTML = '';
    if (duration > 0) {
      progressBarHTML = `<div class="rdp-toast__progress" style="animation-duration: ${duration}ms"></div>`;
    }

    // Buat tombol aksi jika disediakan
    let actionButtonHTML = '';
    if (action && action.text && action.callback) {
      actionButtonHTML = `<button class="rdp-toast__action">${action.text}</button>`;
    }

    // HTML Content
    toast.innerHTML = `
      <div class="rdp-toast__content">
        ${title ? `<div class="rdp-toast__title">${title}</div>` : ''}
        ${message ? `<div class="rdp-toast__message">${message}</div>` : ''}
        ${actionButtonHTML}
      </div>
      <button class="rdp-toast__close" aria-label="Tutup">&times;</button>
      ${progressBarHTML}
    `;

    // Append ke container
    container.appendChild(toast);

    // Fungsi tutup toast
    const dismiss = () => {
      toast.classList.add('rdp-toast--hiding');
      toast.addEventListener('animationend', () => {
        toast.remove();
        // Hapus container jika kosong
        if (container.children.length === 0) {
          container.remove();
        }
      }, { once: true });
    };

    // Event listener tutup manual
    const closeBtn = toast.querySelector('.rdp-toast__close');
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      dismiss();
    });

    // Event listener tombol aksi
    if (action && action.text && action.callback) {
      const actionBtn = toast.querySelector('.rdp-toast__action');
      if (actionBtn) {
        actionBtn.addEventListener('click', (e) => {
          e.preventDefault();
          action.callback();
          dismiss();
        });
      }
    }

    // Auto dismiss
    if (duration > 0) {
      setTimeout(dismiss, duration);
    }
  };

  // Expose ke global
  window.RDP = RDP;

})();
