import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
} from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-database.js';

const firebaseConfig = {
  databaseURL:
    'https://cart-b1483-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const shoppingListDB = ref(database, 'drinicCart');

const inputFieldEl = document.getElementById('input-field');
const buttonAddEl = document.getElementById('button-add');
const shoppingListEL = document.getElementById('shopping-list');

buttonAddEl.addEventListener('click', function () {
  if (inputFieldEl.value) {
    const inputFieldValue = inputFieldEl.value;

    push(shoppingListDB, inputFieldValue);

    console.log(inputFieldValue);

    shoppingListEL.innerHTML += `<li>${inputFieldValue}</li>`;
    inputFieldEl.value = '';
  }
});
