//~ подсвечиваем шапку при скролле страницы

let header = document.querySelector('header');

window.addEventListener('scroll', function(){
  if(window.pageYOffset > 500){
    header.style.background = "rgb(0 0 0 / 63%)";
  }
  else{
    header.style.background = "rgb(255 255 255 / 0)";
  }
});