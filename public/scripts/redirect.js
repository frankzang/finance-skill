import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { auth } from './firebase-config.js';

onAuthStateChanged(auth, (user) => {
  const { pathname } = window.location;
  const isHome = pathname === '/';
  const isDashboard = pathname === '/dashboard';

  if (isHome && user) {
    window.location.href = '/dashboard';

    return;
  }

  if (isDashboard && !user) {
    window.location.href = '/';
  }
});
