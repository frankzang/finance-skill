import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  GoogleAuthProvider,
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { auth } from './firebase-config.js';
import { showAlertDialog } from './utils.js';

const createAccountForm = document.querySelector('#create-account-form');
const loginForm = document.querySelector('#login-form');
const toggleFormLogin = document.querySelector('#toggle-form-login');
const toggleFormCreate = document.querySelector('#toggle-form-create');
const googleLoginBtn = document.querySelector('#google-login');
const provider = new GoogleAuthProvider();

createAccountForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  try {
    const { email, password } = Object.fromEntries(new FormData(evt.target));

    await createUserWithEmailAndPassword(auth, email, password);

    window.location.href = `${window.location.origin}/dashboard.html`;
  } catch (error) {
    showAlertDialog({ title: 'Algo deu errado...' });
  }
});

loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  try {
    const { email, password } = Object.fromEntries(new FormData(evt.target));

    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = `${window.location.origin}/dashboard.html`;
  } catch (error) {
    showAlertDialog({ title: 'Algo deu errado...' });
  }
});

toggleFormCreate.addEventListener('click', () => {
  loginForm.setAttribute('hidden', '');
  createAccountForm.removeAttribute('hidden');
});
toggleFormLogin.addEventListener('click', () => {
  createAccountForm.setAttribute('hidden', '');
  loginForm.removeAttribute('hidden');
});

googleLoginBtn.addEventListener('click', async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.log({ error });
    showAlertDialog({ title: 'Algo deu errado...' });
  }
});
