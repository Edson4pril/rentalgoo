/**
 * Single integration point between the RentalGoo marketing site and the
 * RentalGoo application (Angular). Change APP_URL per environment:
 *   - dev:  http://localhost:4200
 *   - prod: https://app.rentalgoo.com (or wherever the app is hosted)
 */
window.RENTALGOO_APP_URL = 'http://localhost:4200';

// Max number of plan cards to embed in the homepage (the rest stay on /plans).
window.RENTALGOO_PLANS_MAX = 3;

document.addEventListener('DOMContentLoaded', function () {
  var appUrl = (window.RENTALGOO_APP_URL || '').replace(/\/+$/, '');
  var plansMax = window.RENTALGOO_PLANS_MAX || 3;

  // Registration CTAs -> plans page first (a plan must be chosen before signup).
  document.querySelectorAll('a[href="register.html"]').forEach(function (a) {
    a.setAttribute('href', appUrl + '/plans');
  });

  // Login CTAs ("Entrar" / login.html) -> app login.
  document.querySelectorAll('a[href="login.html"]').forEach(function (a) {
    a.setAttribute('href', appUrl + '/login');
  });

  // Embed the live pricing (Angular /plans/embed) into the plans section,
  // limited to RENTALGOO_PLANS_MAX cards to avoid overflow.
  var iframe = document.getElementById('rentalgoo-plans');
  if (iframe) {
    iframe.src = appUrl + '/plans/embed?max=' + plansMax;
    iframe.setAttribute('scrolling', 'no');
    iframe.style.width = '100%';
    iframe.style.border = '0';
  }
  // Auto-resize the embed iframe to its content height (no empty space below).
  window.addEventListener('message', function (event) {
    var data = event.data || {};
    if (data.type === 'rentalgoo-embed-height' && iframe && data.height) {
      iframe.style.height = data.height + 'px';
    }
  });
});
