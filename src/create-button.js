export default function createButton(small, shift, code) {
  // let element = null;
  
  const keyElement = document.createElement('button');
  keyElement.setAttribute('type', 'button');
  keyElement.classList.add('keyboard__key');
  keyElement.innerHTML = small;
  switch (code) {
    case 'capsLock':
      keyElement.classList.add('caps-key');

      keyElement.addEventListener('click', () => {
            // this.toggleCapsLock();
            keyElement.classList.toggle('caps-key_active')
          });
      break;

    case 'backSpace':
      keyElement.addEventListener('click', () => {
        console.log('backSpace');
      })
      break;
    
    case 'space':
      keyElement.classList.add('space-key');

      break;

    case 'shiftLeft':
      keyElement.classList.add('shift-key');

      break;

    case 'shiftRight':
      keyElement.addEventListener('click', () => {
        console.log('Right shift');
      })

      break;

    case 'enter':
      keyElement.classList.add('enter-key');

      break;

    default:     
      keyElement.addEventListener('click', () => {
        console.log('default');
      })
          
      break;
  }

  return keyElement;
}
