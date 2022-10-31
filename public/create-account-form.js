import {
  getAuth,
  createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import { showAlertDialog } from './utils.js';

const auth = getAuth();
const form = document.querySelector('form');

form.addEventListener('submit', async (evt) => {
  evt.preventDefault();

  try {
    const { email, password } = Object.fromEntries(new FormData(evt.target));

    await createUserWithEmailAndPassword(auth, email, password);

    showAlertDialog({ title: 'Usuário criado com sucesso' });
  } catch (error) {
    showAlertDialog({ title: error.code });
  }
});
