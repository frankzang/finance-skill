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
const toggleFormBtn = document.querySelector('#toggle-form');
const googleLoginBtn = document.querySelector('#google-login');
const provider = new GoogleAuthProvider();

createAccountForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  try {
    const { email, password } = Object.fromEntries(new FormData(evt.target));

    await createUserWithEmailAndPassword(auth, email, password);

    window.location.href = '/dashboard';
  } catch (error) {
    showAlertDialog({ title: 'Algo deu errado...' });
  }
});

loginForm.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  try {
    const { email, password } = Object.fromEntries(new FormData(evt.target));

    await signInWithEmailAndPassword(auth, email, password);

    window.location.href = '/dashboard';
  } catch (error) {
    showAlertDialog({ title: error.code });
  }
});

toggleFormBtn.addEventListener('click', () => {
  const isCreateAccountHidden = createAccountForm.hasAttribute('hidden');

  if (isCreateAccountHidden) {
    loginForm.setAttribute('hidden', '');
    createAccountForm.removeAttribute('hidden');
    toggleFormBtn.innerText = 'Já tenho uma conta';
  } else {
    createAccountForm.setAttribute('hidden', '');
    loginForm.removeAttribute('hidden');
    toggleFormBtn.innerText = 'Criar conta';
  }
});

googleLoginBtn.addEventListener('click', async () => {
  try {
    await signInWithRedirect(auth, provider);
  } catch (error) {
    console.log({ error });
    showAlertDialog({ title: 'Algo deu errado...' });
  }
});
