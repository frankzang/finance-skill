import {
  signOut,
  onAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-auth.js';
import {
  arrayUnion,
  arrayRemove,
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
} from 'https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js';

import { auth, db } from './firebase-config.js';
import data from './data.json' assert { type: 'json' };

const usersCollection = collection(db, 'users');

const signOutBtn = document.querySelector('#sign-out');

const safeGetUser = async () => {
  return new Promise((res, rej) => {
    onAuthStateChanged(auth, (user) => {
      if (user) res(user);

      rej();
    });
  });
};

const startApp = async () => {
  const user = await safeGetUser();

  const userDocRef = doc(db, 'users', user.uid);
  const docSnap = await getDoc(userDocRef);
  const ticketsList = document.querySelector('#tickets-list');

  onSnapshot(userDocRef, (doc) => {
    const docData = doc.data();
    if (!docData?.tickets) return;

    ticketsList.innerHTML = '';

    const { tickets } = docData;
    console.log({ docData });

    tickets.forEach((ticket) => {
      const ticketData = data.tickets.find((t) => t.issuingCompany === ticket);
      const li = document.createElement('li');
      const removeBtn = document.createElement('button');

      removeBtn.setAttribute('data-ticket', ticket);
      removeBtn.textContent = 'Remover';
      li.textContent = `${ticket} - ${ticketData.companyName}`;
      li.append(removeBtn);

      ticketsList.appendChild(li);
    });
  });

  if (docSnap.exists()) {
    console.log('Document data:', docSnap.data());
  } else {
    // Create user
    await setDoc(doc(usersCollection, user.uid), {
      email: user.email,
    });
  }

  const searchInput = document.querySelector('#search');
  const tickets = document.querySelector('#tickets');
  const addBtn = document.querySelector('#add');

  data.tickets.forEach((ticket) => {
    const optionElm = document.createElement('option');
    optionElm.value = ticket.issuingCompany;
    optionElm.textContent = ticket.companyName;

    tickets.appendChild(optionElm);
  });

  addBtn.addEventListener('click', async () => {
    const { value } = searchInput;

    const asset = data.tickets.find((t) => t.issuingCompany === value);

    if (!asset) return;

    await updateDoc(userDocRef, {
      tickets: arrayUnion(value),
    });
  });

  ticketsList.addEventListener('click', async (evt) => {
    const ticket = evt.target.dataset.ticket;

    if (!ticket) return;

    await updateDoc(userDocRef, {
      tickets: arrayRemove(ticket),
    });
  });
};

startApp();

signOutBtn.addEventListener('click', async () => {
  await signOut(auth);

  window.location.href = '/';
});
