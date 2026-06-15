/**
 * ============================================================
 *  RDP Modal Component JS — v1.0.0
 *  Radian Data Platform · radian.web.id
 *
 *  Interaktivitas untuk modal dialog native <dialog>.
 * ============================================================
 */

(function () {
  'use strict';

  const RDP = window.RDP || {};

  /**
   * Membuka modal berdasarkan ID atau elemen.
   * @param {string|HTMLDialogElement} modalEl 
   */
  RDP.openModal = function (modalEl) {
    const dialog = typeof modalEl === 'string' ? document.getElementById(modalEl) : modalEl;
    if (!dialog || dialog.tagName !== 'DIALOG') return;

    dialog.showModal();
    document.body.style.overflow = 'hidden';

    // Dispatch event
    dialog.dispatchEvent(new CustomEvent('rdp:modal-open', { bubbles: true }));
  };

  /**
   * Menutup modal berdasarkan ID atau elemen.
   * @param {string|HTMLDialogElement} modalEl 
   */
  RDP.closeModal = function (modalEl) {
    const dialog = typeof modalEl === 'string' ? document.getElementById(modalEl) : modalEl;
    if (!dialog || dialog.tagName !== 'DIALOG') return;

    dialog.close();
    document.body.style.overflow = '';

    // Dispatch event
    dialog.dispatchEvent(new CustomEvent('rdp:modal-close', { bubbles: true }));
  };

  // Expose ke global
  window.RDP = RDP;

  // Event delegation untuk pemicu modal
  document.addEventListener('click', function (e) {
    // Open modal
    const openTrigger = e.target.closest('[data-rdp-action="open-modal"]');
    if (openTrigger) {
      e.preventDefault();
      const targetId = openTrigger.getAttribute('data-rdp-target');
      if (targetId) {
        RDP.openModal(targetId.replace('#', ''));
      }
    }

    // Close modal
    const closeTrigger = e.target.closest('[data-rdp-action="close-modal"]');
    if (closeTrigger) {
      e.preventDefault();
      const dialog = closeTrigger.closest('dialog.rdp-modal');
      if (dialog) {
        RDP.closeModal(dialog);
      }
    }

    // Close modal on backdrop click
    if (e.target.tagName === 'DIALOG' && e.target.classList.contains('rdp-modal')) {
      const rect = e.target.getBoundingClientRect();
      const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
      if (!isInDialog) {
        RDP.closeModal(e.target);
      }
    }
  });

})();
