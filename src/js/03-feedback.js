import throttle from 'lodash.throttle';

const refs = {
  formEmail: document.querySelector('[name="email"]'),
  formTextArea: document.querySelector('[name="message"]'),
  formSubmit: document.querySelector('.feedback-form'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

populateTextarea();

refs.formSubmit.addEventListener('submit', onFormSubmit);
refs.formSubmit.addEventListener('input', throttle(onTextareaInput), 500);

function onFormSubmit(e) {
  e.preventDefault();

  formData.email = refs.formEmail.value;
  formData.message = refs.formTextArea.value;

  console.log('formData: ', formData);

  refs.formSubmit.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedData = localStorage.getItem(STORAGE_KEY);

  const parsedData = JSON.parse(savedData);
  if (parsedData) {
    refs.formEmail.value = parsedData.email;
    refs.formTextArea.value = parsedData.message;
  }
}
