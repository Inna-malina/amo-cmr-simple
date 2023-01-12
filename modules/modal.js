//~ открываем модальное окно
let btnForm = document.querySelector('.header-button');
let modal = document.querySelector('.modal-window__box');
let body = document.querySelector('body');
let closeModal = document.querySelector('.modal-close');
let resetBtn = document.querySelector('.reset');

btnForm.addEventListener('click', function () {
  modal.classList.remove('modal-disactive');
  body.style.overflowY = "hidden";
});

//~ закрываем модальное окно
function toCloseModal() {
  modal.classList.add('modal-disactive');
  body.style.overflowY = "visible";
}
// закрытие по клику на крестик
closeModal.addEventListener('click', toCloseModal);
resetBtn.addEventListener('click', toCloseModal);

// закрытие по клику по прозрачному фону модального окна
modal.addEventListener('click', function (evnt) {
  let action = evnt.target;
  if (action === modal) {
    toCloseModal();
  }
});