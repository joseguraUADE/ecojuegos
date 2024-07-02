const menuBtn = document.getElementById('menuBtn');
const menu = document.getElementsByClassName('mainMenu')[0];

menuBtn.addEventListener("click", function(event){
    event.stopPropagation(); 
    if(menu.classList.contains('displayYes')){
        menu.classList.remove('displayYes');
        menuBtn.setAttribute('src', './src/icons/menuIcon.svg')
    } else {
        menu.classList.add('displayYes');
        menuBtn.setAttribute('src', './src/icons/cancel.svg')
    }
});

document.addEventListener("click", function(){
    if(menu.classList.contains('displayYes')){
        menu.classList.remove('displayYes');
        menuBtn.setAttribute('src', './src/icons/menuIcon.svg')
    }
});

