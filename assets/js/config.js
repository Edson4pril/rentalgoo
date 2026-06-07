/**
 * Single integration point between the RentalGoo marketing site and the
 * RentalGoo application (Angular). Change APP_URL per environment:
 *   - dev:  http://localhost:4200
 *   - prod: https://app.rentalgoo.com (or wherever the app is hosted)
 */
window.RENTALGOO_APP_URL = 'http://localhost:4200';

document.addEventListener('DOMContentLoaded', function () {
  var appUrl = (window.RENTALGOO_APP_URL || '').replace(/\/+$/, '');

  // Registration CTAs ("Cadastrar-se" / register.html) -> app registration.
  document.querySelectorAll('a[href="register.html"]').forEach(function (a) {
    a.setAttribute('href', appUrl + '/register-company');
  });

  // Login CTAs ("Entrar" / login.html) -> app login.
  document.querySelectorAll('a[href="login.html"]').forEach(function (a) {
    a.setAttribute('href', appUrl + '/login');
  });

  // Embed the live pricing (Angular /plans/embed) into the plans section.
  var iframe = document.getElementById('rentalgoo-plans');
  if (iframe) {
    iframe.src = appUrl + '/plans/embed';
  }
  var viewAll = document.getElementById('plans-view-all');
  if (viewAll) {
    viewAll.setAttribute('href', appUrl + '/plans');
  }
});
