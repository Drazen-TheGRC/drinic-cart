const inputFieldEl = document.getElementById('input-field');
const buttonAddEl = document.getElementById('button-add');

buttonAddEl.addEventListener('click', function () {
  if (inputFieldEl.value) {
    const inputFieldValue = inputFieldEl.value;
    console.log(inputFieldValue);
  }
});
