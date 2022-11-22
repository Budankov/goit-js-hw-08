import throttle from 'lodash.throttle';

const formEmail = document.querySelector('.feedback-form [name="email"]');
const formTextArea = document.querySelector('[name="message"]');
const formSubmit = document.querySelector('.feedback-form');

const STORAGE_FORM = 'feedback-form-state';

const formData = {};

onPageReload();

formSubmit.addEventListener('input', throttle(onFormInput), 500);
formSubmit.addEventListener('submit', onFormSubmit);

function onFormInput(evt) {
  formData[evt.target.name] = evt.target.value;
  localStorage.setItem(STORAGE_FORM, JSON.stringify(formData));
}

function onPageReload() {
  const savedData = localStorage.getItem(STORAGE_FORM);
  const parsedData = JSON.parse(savedData);

  if (parsedData) {
    formEmail.value = parsedData.email;
  }
  if (parsedData) {
    formTextArea.value = parsedData.message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();

  formData.email = formEmail.value;
  formData.message = formTextArea.value;

  console.log('FINAL FORM DATA ', formData);
  formSubmit.reset();
  localStorage.removeItem(STORAGE_FORM);
}
