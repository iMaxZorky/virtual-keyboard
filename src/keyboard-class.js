import createButton from './create-button.js';
import keys from './key-layouts.js';


export default class Keyboard {
  constructor() {
      this.textarea = null;
      this.main = null;
      this.keyContainer = null;
      this.lang = localStorage.getItem('lang') || 'en';
      this.pressCaps = false;
      this.pressShift = false;
    }
  

  init() {
    const currentLang = this.lang;
    const hiddenLang = this.lang === 'en' ? 'ru' : 'en';

    this.main = document.createElement('div');
    this.main.classList.add('container');

    const title = document.createElement('h1');
    title.classList.add('title');
    title.innerHTML = 'RSS Виртуальная клавиатура';
    this.main.append(title);

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('textarea');
    this.textarea.setAttribute('id', 'textarea');
    this.textarea.setAttribute('rows', '10');
    this.textarea.setAttribute('cols', '100');
    this.main.append(this.textarea);



    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');
    keyboard.setAttribute('id', 'keyboard');

    this.keyContainer = document.createElement('div');
    this.keyContainer.classList.add('keyboard__keys');


    this.keyBase = keys[currentLang];

    this.keyBase.forEach((element, index) => {
        // Слои клавиши первого языка
        const newKey = document.createElement('div');
        newKey.classList.add('keyboard__key', keys.en[index].code);

        const currentLangSpan = document.createElement('span');
        currentLangSpan.classList.add(currentLang);
        currentLangSpan.insertAdjacentHTML(
          'afterBegin',
          `<span class="caseDown">${element.small}</span>`,
        );
        currentLangSpan.insertAdjacentHTML(
          'beforeEnd',
          `<span class="caseUp hidden">${element.shift}</span>`,
        );
        currentLangSpan.insertAdjacentHTML(
          'beforeEnd',
          `<span class="caps hidden">${element.shift}</span>`,
        );
        currentLangSpan.insertAdjacentHTML(
          'beforeEnd',
          `<span class="shiftCaps hidden">${element.small}</span>`,
        );
        
        // Слои клавиши второго языка. Обращаюсь к основному объекту, так как forEach крутится на одном списке клавиш
        const hiddenLangSpan = document.createElement('span');
        hiddenLangSpan.classList.add(hiddenLang, 'hidden');
        hiddenLangSpan.insertAdjacentHTML(
          'afterBegin',
          `<span class="caseDown hidden">${keys[hiddenLang][index].small}</span>`,
        );
        hiddenLangSpan.insertAdjacentHTML(
          'beforeEnd',
          `<span class="caseUp hidden">${keys[hiddenLang][index].shift}</span>`,
        );
        hiddenLangSpan.insertAdjacentHTML(
          'beforeEnd',
          `<span class="caps hidden">${keys[hiddenLang][index].shift}</span>`,
        );
        hiddenLangSpan.insertAdjacentHTML(
          'beforeEnd',
          `<span class="shiftCaps hidden">${keys[hiddenLang][index].small}</span>`,
        );

        newKey.append(hiddenLangSpan);
        newKey.append(currentLangSpan);

        if (element.value) {
          newKey.innerHTML = element.small;
          newKey.classList.add(element.value);
          newKey.classList.add('control');
        }
        
        // const newKey = createButton(element.small, element.shift, element.code);
        this.keyContainer.append(newKey);
    });

    keyboard.append(this.keyContainer);

    return keyboard
  }

}

