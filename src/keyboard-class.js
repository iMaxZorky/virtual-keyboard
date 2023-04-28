import createButton from './create-button.js';
import language from './key-layouts.js';


export default class Keyboard {
  constructor() {
      this.main = null;
      this.keyContainer = null;
    }
  

  init(langCode) {
    this.main = document.createElement('div');
    this.main.classList.add('keyboard');
    this.keyContainer = document.createElement('div');
    this.keyContainer.classList.add('keyboard__keys');


    this.keyBase = language[langCode];

    this.keyBase.forEach(element => {
        const newKey = createButton(element.small, element.shift, element.code);
        this.keyContainer.append(newKey);
    });
    this.main.append(this.keyContainer);

    return this.main
  }

}

