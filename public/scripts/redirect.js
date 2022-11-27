import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { auth } from './firebase-config.js';

onAuthStateChanged(auth, (user) => {
  const { pathname } = window.location;
  const isHome = pathname === '/';
  const isDashboard = pathname.includes('dashboard');

  if (isHome && user) {
    window.location.href = `${window.location.origin}/dashboard.html`;

    return;
  }

  if (isDashboard && !user) {
    window.location.href = '/';
  }
});
