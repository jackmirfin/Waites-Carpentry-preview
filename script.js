/**
 * Waites Carpentry & Kitchens — Bespoke Cabinetry Portfolio Concept Preview
 * Interactive Controller: Hover-Activated Detail Markers, Synchronised Boxes, Lightbox, Enquiry Demo Modal, and Mobile Drawer
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // ========================================================================
  // 1. DATA RECORDS: Exact, verified descriptions
  // ========================================================================
  const DETAIL_RECORDS = {
    'detail-panels': {
      number: '1',
      title: 'Panelled doors',
      description: 'Panelled cupboard doors create a consistent finish across the installation.'
    },
    'detail-finish': {
      number: '2',
      title: 'Green finish',
      description: 'A green finish across the doors, surrounding trim and plinth.'
    },
    'detail-handles': {
      number: '3',
      title: 'Brass-coloured handles',
      description: 'Brass-coloured handles provide a contrasting detail against the green cabinetry.'
    }
  };

  // ========================================================================
  // 2. SYNCHRONISED ACTIVE DETAIL CONTROLLER (Hover Activated)
  // ========================================================================
  const heroPins = document.querySelectorAll('.pin-marker');
  const stagePins = document.querySelectorAll('.stage-pin');
  const detailCards = document.querySelectorAll('.detail-card');

  // Hero Primary Note Overlay Elements
  const heroNote = document.getElementById('hero-marker-note');
  const heroNoteBadge = document.getElementById('hero-note-badge');
  const heroNoteTitle = document.getElementById('hero-note-title');
  const heroNoteText = document.getElementById('hero-note-text');
  const heroNoteClose = document.getElementById('hero-note-close');
  const resetMarkersBtn = document.getElementById('reset-markers-btn');

  let activeDetailId = null;
  let isHoveringNote = false;

  function setActiveDetail(detailId) {
    if (activeDetailId === detailId) return;

    activeDetailId = detailId;
    const record = DETAIL_RECORDS[detailId];

    // 1. Update Hero Pin Markers
    heroPins.forEach(pin => {
      const isTarget = pin.getAttribute('data-marker-target') === detailId;
      pin.classList.toggle('is-active', isTarget);
      pin.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    // 2. Update Lower Stage Pin Markers
    stagePins.forEach(pin => {
      const isTarget = pin.getAttribute('data-marker-id') === detailId;
      pin.classList.toggle('is-active', isTarget);
      pin.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    // 3. Update Detail Boxes (Selected box turns dark teal with warm ivory text; others neutral)
    detailCards.forEach(card => {
      const isTarget = card.getAttribute('data-detail-id') === detailId;
      card.classList.toggle('is-active', isTarget);
      card.setAttribute('aria-pressed', isTarget ? 'true' : 'false');
    });

    // 4. Open and update Hero Primary Note Overlay
    if (record && heroNote) {
      heroNoteBadge.textContent = `Marker ${record.number}`;
      heroNoteTitle.textContent = record.title;
      heroNoteText.textContent = record.description;
      heroNote.removeAttribute('hidden');
    }

    if (resetMarkersBtn) {
      resetMarkersBtn.removeAttribute('hidden');
    }
  }

  function clearActiveDetail() {
    activeDetailId = null;

    // Reset Hero Pins
    heroPins.forEach(pin => {
      pin.classList.remove('is-active');
      pin.setAttribute('aria-pressed', 'false');
    });

    // Reset Lower Stage Pins
    stagePins.forEach(pin => {
      pin.classList.remove('is-active');
      pin.setAttribute('aria-pressed', 'false');
    });

    // Reset Detail Boxes
    detailCards.forEach(card => {
      card.classList.remove('is-active');
      card.setAttribute('aria-pressed', 'false');
    });

    // Close Hero Note Overlay
    if (heroNote) {
      heroNote.setAttribute('hidden', '');
    }

    if (resetMarkersBtn) {
      resetMarkersBtn.setAttribute('hidden', '');
    }
  }

  // --- HOVER ACTIVATION / DEACTIVATION ON MARKERS (1, 2, 3) ---
  heroPins.forEach(pin => {
    // Activate on mouseenter
    pin.addEventListener('mouseenter', () => {
      const targetId = pin.getAttribute('data-marker-target');
      setActiveDetail(targetId);
    });

    // Deactivate on mouseleave (unless moving into the hero note or another marker)
    pin.addEventListener('mouseleave', (e) => {
      setTimeout(() => {
        if (!isHoveringNote && !document.querySelector('.pin-marker:hover') && !document.querySelector('.stage-pin:hover') && !document.querySelector('.detail-card:hover')) {
          clearActiveDetail();
        }
      }, 50);
    });

    // Accessible keyboard focus support
    pin.addEventListener('focus', () => {
      const targetId = pin.getAttribute('data-marker-target');
      setActiveDetail(targetId);
    });
    pin.addEventListener('blur', () => {
      setTimeout(() => {
        if (!document.activeElement.closest('.pin-marker, .stage-pin, .detail-card, #hero-marker-note')) {
          clearActiveDetail();
        }
      }, 50);
    });

    // Touch device support (tap to toggle)
    pin.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = pin.getAttribute('data-marker-target');
      if (activeDetailId === targetId) {
        clearActiveDetail();
      } else {
        setActiveDetail(targetId);
      }
    });
  });

  // Lower Stage Pins (Hover activation)
  stagePins.forEach(pin => {
    pin.addEventListener('mouseenter', () => {
      const targetId = pin.getAttribute('data-marker-id');
      setActiveDetail(targetId);
    });

    pin.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!isHoveringNote && !document.querySelector('.pin-marker:hover') && !document.querySelector('.stage-pin:hover') && !document.querySelector('.detail-card:hover')) {
          clearActiveDetail();
        }
      }, 50);
    });

    pin.addEventListener('focus', () => {
      const targetId = pin.getAttribute('data-marker-id');
      setActiveDetail(targetId);
    });
    pin.addEventListener('blur', () => {
      setTimeout(() => {
        if (!document.activeElement.closest('.pin-marker, .stage-pin, .detail-card, #hero-marker-note')) {
          clearActiveDetail();
        }
      }, 50);
    });

    pin.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = pin.getAttribute('data-marker-id');
      if (activeDetailId === targetId) {
        clearActiveDetail();
      } else {
        setActiveDetail(targetId);
      }
    });
  });

  // Detail Cards (Hover activation)
  detailCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const targetId = card.getAttribute('data-detail-id');
      setActiveDetail(targetId);
    });

    card.addEventListener('mouseleave', () => {
      setTimeout(() => {
        if (!isHoveringNote && !document.querySelector('.pin-marker:hover') && !document.querySelector('.stage-pin:hover') && !document.querySelector('.detail-card:hover')) {
          clearActiveDetail();
        }
      }, 50);
    });

    card.addEventListener('focus', () => {
      const targetId = card.getAttribute('data-detail-id');
      setActiveDetail(targetId);
    });
    card.addEventListener('blur', () => {
      setTimeout(() => {
        if (!document.activeElement.closest('.pin-marker, .stage-pin, .detail-card, #hero-marker-note')) {
          clearActiveDetail();
        }
      }, 50);
    });

    card.addEventListener('click', () => {
      const targetId = card.getAttribute('data-detail-id');
      if (activeDetailId === targetId) {
        clearActiveDetail();
      } else {
        setActiveDetail(targetId);
      }
    });
  });

  // Keep hero note open if user moves cursor over it
  if (heroNote) {
    heroNote.addEventListener('mouseenter', () => {
      isHoveringNote = true;
    });

    heroNote.addEventListener('mouseleave', () => {
      isHoveringNote = false;
      setTimeout(() => {
        if (!document.querySelector('.pin-marker:hover') && !document.querySelector('.stage-pin:hover') && !document.querySelector('.detail-card:hover')) {
          clearActiveDetail();
        }
      }, 50);
    });
  }

  // Explicit close button on hero note
  if (heroNoteClose) {
    heroNoteClose.addEventListener('click', (e) => {
      e.stopPropagation();
      isHoveringNote = false;
      clearActiveDetail();
    });
  }

  // Clear selection button in details section
  if (resetMarkersBtn) {
    resetMarkersBtn.addEventListener('click', clearActiveDetail);
  }

  // ========================================================================
  // 3. PHOTOGRAPH LIGHTBOX VIEWER (Accessible modal with Escape handling)
  // ========================================================================
  const lightbox = document.getElementById('photo-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightboxBtn = document.getElementById('close-lightbox-btn');
  let lastFocusedElement = null;

  function openLightbox(src, fallback, title, caption) {
    lastFocusedElement = document.activeElement;

    lightboxImg.src = src;
    lightboxImg.onerror = () => {
      if (fallback && lightboxImg.src !== fallback) {
        lightboxImg.src = fallback;
      }
    };
    lightboxImg.alt = title;
    lightboxTitle.textContent = title;
    lightboxCaption.textContent = caption;

    lightbox.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    closeLightboxBtn.focus();
  }

  function closeLightbox() {
    lightbox.setAttribute('hidden', '');
    document.body.style.overflow = '';
    lightboxImg.src = '';

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  document.querySelectorAll('[data-lightbox-src]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const src = btn.getAttribute('data-lightbox-src');
      const fallback = btn.getAttribute('data-lightbox-fallback');
      const title = btn.getAttribute('data-lightbox-title') || 'Cabinetry installation';
      const caption = btn.getAttribute('data-lightbox-caption') || 'Authentic installation photograph.';
      openLightbox(src, fallback, title, caption);
    });
  });

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // ========================================================================
  // 4. DEMONSTRATION ENQUIRY MODAL (View-Only Concept)
  // ========================================================================
  const enquiryModal = document.getElementById('enquiry-modal');
  const closeEnquiryBtn = document.getElementById('close-enquiry-btn');
  const cancelEnquiryBtn = document.getElementById('cancel-enquiry-btn');
  const demoForm = document.getElementById('demo-enquiry-form');
  const simulateSubmitBtn = document.getElementById('simulate-submit-btn');
  const demoFeedback = document.getElementById('demo-feedback');
  const feedbackResetBtn = document.getElementById('feedback-reset-btn');

  function openEnquiryModal() {
    lastFocusedElement = document.activeElement;
    enquiryModal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    closeEnquiryBtn.focus();
  }

  function closeEnquiryModal() {
    enquiryModal.setAttribute('hidden', '');
    document.body.style.overflow = '';

    if (demoFeedback) demoFeedback.setAttribute('hidden', '');
    if (demoForm) demoForm.removeAttribute('hidden');

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  document.querySelectorAll('[data-open-enquiry]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openEnquiryModal();
    });
  });

  if (closeEnquiryBtn) closeEnquiryBtn.addEventListener('click', closeEnquiryModal);
  if (cancelEnquiryBtn) cancelEnquiryBtn.addEventListener('click', closeEnquiryModal);

  if (enquiryModal) {
    enquiryModal.addEventListener('click', (e) => {
      if (e.target === enquiryModal) {
        closeEnquiryModal();
      }
    });
  }

  // Simulated Submission
  if (simulateSubmitBtn) {
    simulateSubmitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      if (demoForm) demoForm.setAttribute('hidden', '');
      if (demoFeedback) {
        demoFeedback.removeAttribute('hidden');
        if (feedbackResetBtn) feedbackResetBtn.focus();
      }
    });
  }

  if (feedbackResetBtn) {
    feedbackResetBtn.addEventListener('click', () => {
      if (demoFeedback) demoFeedback.setAttribute('hidden', '');
      if (demoForm) {
        demoForm.removeAttribute('hidden');
        const firstInput = demoForm.querySelector('input, select');
        if (firstInput) firstInput.focus();
      }
    });
  }

  // ========================================================================
  // 5. GLOBAL KEYBOARD & ESCAPE HANDLING
  // ========================================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox && !lightbox.hasAttribute('hidden')) {
        closeLightbox();
      } else if (enquiryModal && !enquiryModal.hasAttribute('hidden')) {
        closeEnquiryModal();
      } else if (activeDetailId !== null) {
        clearActiveDetail();
      } else if (mobileDrawer && mobileDrawer.classList.contains('is-open')) {
        closeMobileDrawer();
      }
    }
  });

  // ========================================================================
  // 6. MOBILE DRAWER NAVIGATION
  // ========================================================================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileDrawer() {
    mobileDrawer.classList.add('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeDrawerBtn.focus();
  }

  function closeMobileDrawer() {
    mobileDrawer.classList.remove('is-open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    mobileMenuBtn.focus();
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', openMobileDrawer);
  }

  if (closeDrawerBtn) {
    closeDrawerBtn.addEventListener('click', closeMobileDrawer);
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeMobileDrawer();
      }
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  // ========================================================================
  // 7. ACTIVE NAVIGATION SCROLL SPY
  // ========================================================================
  const navSections = document.querySelectorAll('header[id], section[id], footer[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && navSections.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          desktopNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-20% 0px -70% 0px' });

    navSections.forEach(sec => observer.observe(sec));
  }
});
