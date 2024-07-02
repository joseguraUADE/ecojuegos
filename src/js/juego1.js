

/* El evento hace que se cargue primero el html para luego ejecutar el js */
document.addEventListener('DOMContentLoaded', () => {

/* residueElement: el elemento que muestra el residuo actual.
buttons: todos los botones de opción (para seleccionar el contenedor adecuado).
message: el elemento que muestra el mensaje de resultado (correcto/incorrecto). */
const residueElement = document.getElementById('residue');
const buttons = document.querySelectorAll('.option');
const message = document.getElementById('message');
    
  
      
const residues = [
  { type: 'paper', name: 'Papel' },
  { type: 'plastic', name: 'Botella de gaseosa' },
  { type: 'glass', name: 'Botella de vino' },
  { type: 'organic', name: 'Cáscara de banana' },
  { type: 'paper', name: 'Caja de cartón' },
  { type: 'plastic', name: 'Envase de yogurt' },
  { type: 'glass', name: 'Frasco de mermelada' },
  { type: 'organic', name: 'Cáscara de huevo' },
  { type: 'paper', name: 'Revista vieja' },
  { type: 'plastic', name: 'Bolsa de plástico' },
  { type: 'glass', name: 'Botella de cerveza' },
  { type: 'organic', name: 'Restos de comida' }
];
    
let currentResidue = getRandomResidue();
    
buttons.forEach(button => {
  button.addEventListener('click', (event) => {
    const selectedType = event.target.getAttribute('data-type');
    checkAnswer(selectedType);
  });
});
    
function getRandomResidue() {
  const randomIndex = Math.floor(Math.random() * residues.length);
  const residue = residues[randomIndex];
  residueElement.textContent = residue.name;
  return residue;
}
    
function checkAnswer(selectedType) {
  if (selectedType === currentResidue.type) {
    message.textContent = '¡Correcto!';
    message.style.color = 'green';
  } else {
    message.textContent = 'Inténtalo de nuevo.';
    message.style.color = 'red';
  }
  currentResidue = getRandomResidue();
}
});
    