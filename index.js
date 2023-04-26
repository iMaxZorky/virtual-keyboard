const Keyboard = {
  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  properties: {
    value: '',
    capsLock: false,
  },

  init() {
    // Создаю начальные элементы
    this.elements.main = document.createElement('div');
    this.elements.keysContainer = document.createElement('div');

    this.elements.main.classList.add('keyboard');
    this.elements.keysContainer.classList.add('keyboard__keys');

    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);
  },

  createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '+',
      'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'Caps Lock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', 'Enter', 'Shift',
      'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '\\', '↑', 'Shift', 'Ctrl', 'Win', 'Alt',
      'space', 'Alt', 'Ctrl', '←', '↓', '→'];

    keyLayout.forEach((el) => {
      const keyElement = document.createElement('button');
      keyElement.setAttribute('type', 'button');
      keyElement.classList.add('keyboard__key');
      keyElement.innerHTML = el;
      switch (el) {
        case 'Caps Lock':
          keyElement.classList.add('caps-key', 'caps-key_active');
          break;
          
        }
        
      });
  },

  toggleCapsLock() {
    console.log('Caps Lock Toggled!');
  },

};

// window.addEventListener('DOMContentLoaded', () => {
//   Keyboard.init();
// });
