import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js';
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
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

    clearInputFieldEl();
  }
});

onValue(shoppingListDB, function (snapshot) {
  if (snapshot.val() !== null) {
    let shoppingListArray = Object.entries(snapshot.val());
    clearShoppingListEl();

    for (let i = 0; i < shoppingListArray.length; i++) {
      let currentItem = shoppingListArray[i];
      // let currentItemId = currentItem[0];
      // let currentItemValue = currentItem[1];

      // console.log(currentItem);
      // console.log(currentItemId);
      // console.log(currentItemValue);

      appendItemToShoppingListEl(currentItem);
    }

    // console.log(shoppingListArray);
  } else {
    clearShoppingListEl();
  }
});

function clearShoppingListEl() {
  shoppingListEL.innerHTML = '';
}

function clearInputFieldEl() {
  inputFieldEl.value = '';
}

function appendItemToShoppingListEl(item) {
  let itemId = item[0];
  let itemValue = item[1];

  let newLiEl = document.createElement('li');

  newLiEl.addEventListener('dblclick', function () {
    console.log(itemValue);

    let extractLocationOfTheItemInDb = ref(database, `drinicCart/${itemId}`);
    remove(extractLocationOfTheItemInDb);
  });

  newLiEl.textContent = itemValue;

  shoppingListEL.append(newLiEl);
}
