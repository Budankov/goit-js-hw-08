import throttle from 'lodash.throttle';

const refs = {
  form: document.querySelector('form'),
  input: document.querySelector('input'),
  textarea: document.querySelector('textarea'),
};

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

populateTextarea();

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

function onFormSubmit(e) {
  e.preventDefault();
  localStorage.removeItem(STORAGE_KEY);

  if (e.target.email.value === '' || e.target.message.value === '') {
    alert('Заповніть всі поля!');
    return;
  } else {
    e.currentTarget.reset();
    console.log('formData: ', formData);
  }
}

function onTextareaInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function populateTextarea() {
  const savedMessage = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedMessage === null) return;
  refs.input.value = savedMessage['email'] || '';
  refs.textarea.value = savedMessage['message'] || '';
}
