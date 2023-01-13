//~ валидация формы
function Validate() {
  let regName = /^[a-zA-Zа-яА-ЯёЁ ,.'-]{3,20}$/;
  let myName = document.querySelector('.name').value;
  let tooltipName = document.querySelector('.name-tooltip');
  let validName = regName.test(myName);
  if (validName == false) {
    tooltipName.classList.remove('tooltip-disactive');
    tooltipName.classList.add('tooltip-active');
    return false;
  }

  let regPhone = /^[\d\+][\d\(\)\ -]{6,10}\d$/;
  let myPhone = document.querySelector('.phone').value;
  let tooltipPhone = document.querySelector('.phone-tooltip');
  let validPhone = regPhone.test(myPhone);
  if (validPhone == false) {
    tooltipPhone.classList.remove('tooltip-disactive');
    tooltipPhone.classList.add('tooltip-active');
    return false;
  }

  if (validPhone === true && validName === true) {
    toGetData();
    return false;
  }

}

//тултипы при неверной валидации
let tooltips = document.querySelectorAll('.tooltip__box');
tooltips.forEach(function (tooltip) {
  tooltip.addEventListener('click', function () {
    tooltip.classList.remove('tooltip-active');
    tooltip.classList.add('tooltip-disactive');
  });
});

let form = document.querySelector('form');
let modalElements = document.querySelector('.modal-elements');
let modalBox = document.querySelector('.modal-window');
let preloader = document.querySelector('.preloader');

//отправка запроса на сервер
function toGetData() {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    //~ запускаем прелоадер
    preloader.classList.remove('preloader-none');
    let request = new XMLHttpRequest();
    request.open('GET', 'https://jsonplaceholder.typicode.com/todos');

    let formData = new FormData(form);
    request.send(formData);

    request.addEventListener('load', function () {
      if (request.status === 200) {
        //~ если ответ положительный, прелоадер отключается
        preloader.classList.add('preloader-none');

        let data = JSON.parse(request.response);
        //~ создаём заголовки таблицы 
        toCreateHeaderTable();
        for (let key in data) {
          if (data[key].userId == 5 && data[key].completed == false) {

            //~ заполняем данными таблицу
            toCreateTable(data[key].userId, data[key].id, data[key].title, data[key].completed);
          }
        }
      } else {
        alert('Что-то пошло не так. Попробуйте позже');
        //~ прелоадер отключается
        preloader.classList.add('preloader-none');
      }
    });
  });

}

//~ создаём заголовки таблицы
function toCreateHeaderTable() {
  modalElements.remove();
  form.remove();
  let objHeader = document.createElement('div');
  objHeader.className = "object__box";
  modalBox.append(objHeader);

  for (let i = 0; i < 4; i++) {
    let div = document.createElement('div');
    div.className = 'object-title-name';
    objHeader.append(div);
  }
  objHeader.childNodes[0].textContent = "userID";
  objHeader.childNodes[1].textContent = "id";
  objHeader.childNodes[2].textContent = "title";
  objHeader.childNodes[3].textContent = "completed";
}

//~ заполняем данными таблицу
function toCreateTable(element1, element2, element3, element4) {
  let objElement = document.createElement('div');
  objElement.className = 'object-element__box';
  modalBox.append(objElement);

  for (let i = 0; i < 4; i++) {
    let div = document.createElement('div');
    div.className = 'object-data-name';
    objElement.append(div);
  }
  objElement.childNodes[0].textContent = `${element1}`;
  objElement.childNodes[1].textContent = `${element2}`;
  objElement.childNodes[2].textContent = `${element3}`;
  objElement.childNodes[3].textContent = `${element4}`;

}
