import keys from './key-layouts.js';

export default class Keyboard {
  constructor() {
    this.textarea = null;
    this.main = null;
    this.keyContainer = null;
    this.lang = localStorage.getItem('lang') || 'en';
    this.pressCaps = false;
    this.pressShift = false;
    this.init();
  }

  init() {
    const currentLang = this.lang;
    const hiddenLang = this.lang === 'en' ? 'ru' : 'en';

    this.main = document.createElement('div');
    this.main.classList.add('container');

    const title = document.createElement('h1');
    title.classList.add('title');
    title.innerHTML = 'RSS Virtual keyboard';
    this.main.append(title);

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('text-area');
    this.textarea.setAttribute('id', 'textarea');
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
      currentLangSpan.insertAdjacentHTML('afterBegin', `<span class="caseDown">${element.small}</span>`);
      currentLangSpan.insertAdjacentHTML('beforeEnd', `<span class="caseUp hidden">${element.shift}</span>`);
      currentLangSpan.insertAdjacentHTML('beforeEnd', `<span class="caps hidden">${element.shift}</span>`);
      currentLangSpan.insertAdjacentHTML('beforeEnd', `<span class="shiftCaps hidden">${element.small}</span>`);

      // Слои клавиши второго языка. Обращаюсь к основному
      // объекту, так как forEach крутится на одном списке клавиш
      const hiddenLangSpan = document.createElement('span');
      hiddenLangSpan.classList.add(hiddenLang, 'hidden');
      hiddenLangSpan.insertAdjacentHTML('afterBegin', `<span class="caseDown hidden">${keys[hiddenLang][index].small}</span>`);
      hiddenLangSpan.insertAdjacentHTML('beforeEnd', `<span class="caseUp hidden">${keys[hiddenLang][index].shift}</span>`);
      hiddenLangSpan.insertAdjacentHTML('beforeEnd', `<span class="caps hidden">${keys[hiddenLang][index].shift}</span>`);
      hiddenLangSpan.insertAdjacentHTML('beforeEnd', `<span class="shiftCaps hidden">${keys[hiddenLang][index].small}</span>`);

      newKey.append(hiddenLangSpan);
      newKey.append(currentLangSpan);

      if (element.value) {
        newKey.innerHTML = element.small;
        newKey.classList.add(element.value);
        newKey.classList.add('control');
      }

      this.keyContainer.append(newKey);
    });

    keyboard.append(this.keyContainer);
    this.main.append(keyboard);

    const descriptionText = document.createElement('p');
    descriptionText.classList.add('description');
    descriptionText.innerHTML = 'Keyboard made in Windows';
    descriptionText.append(document.createElement('br'));
    descriptionText.append('To switch the language, use the Ctrl + Alt combination');
    this.main.append(descriptionText);

    this.saveLangToLocalStorage();
    document.addEventListener('keyup', this.keyUp.bind(this));
    document.addEventListener('keydown', this.keyDown.bind(this));
    document.addEventListener('mouseup', this.mouseUp.bind(this));
    this.main.addEventListener('mousedown', this.mouseDown.bind(this));

    return this.main;
  }

  saveLangToLocalStorage() {
    localStorage.setItem('lang', this.lang);
  }

  toggleLang() {
    const keyboardKeys = document.querySelectorAll('.keyboard__key');
    keyboardKeys.forEach((el) => {
      if (!el.classList.contains('control')) {
        const currentLangSpan = el.querySelector(`.${this.lang}`);
        const hiddenLangSpan = el.querySelector(`.${this.lang === 'en' ? 'ru' : 'en'}`);
        currentLangSpan.classList.toggle('hidden');
        if (this.pressCaps) {
          currentLangSpan.children[2].classList.toggle('hidden');
        } else {
          currentLangSpan.children[0].classList.toggle('hidden');
        }
        hiddenLangSpan.classList.toggle('hidden');
        if (this.pressCaps) {
          hiddenLangSpan.children[2].classList.toggle('hidden');
        } else {
          hiddenLangSpan.children[0].classList.toggle('hidden');
        }
      }
    });
  }

  toggleCase() {
    const elements = document.querySelectorAll(`div>.${this.lang}`);
    const capsShift = this.pressCaps && this.pressShift ? 1 : 0;
    elements.forEach((el) => {
      const [caseDown, caseUp, caps, shiftCaps] = el.querySelectorAll('span');
      caseDown.classList.add('hidden');
      caseUp.classList.add('hidden');
      caps.classList.add('hidden');
      shiftCaps.classList.add('hidden');
      if (capsShift === 1) {
        shiftCaps.classList.remove('hidden');
        return;
      }
      if (this.pressCaps) {
        caps.classList.remove('hidden');
        return;
      }
      if (this.pressShift) {
        caseUp.classList.remove('hidden');
        return;
      }
      caseDown.classList.remove('hidden');
    });
  }

  outKey(key) {
    const index = this.textarea.selectionStart;
    const taVal = this.textarea.value;
    this.textarea.focus();
    if (key.classList.contains('control')) {
      switch (key.innerHTML) {
        case 'Enter':
          this.textarea.value = `${taVal.slice(0, index)}\n${taVal.slice(index)}`;
          this.textarea.setSelectionRange(index + 1, index + 1);
          break;
        case 'Backspace':
          if (index > 0) {
            this.textarea.value = `${taVal.slice(0, index - 1)}${taVal.slice(index)}`;
            this.textarea.setSelectionRange(index - 1, index - 1);
          }
          break;
        case 'Delete':
          this.textarea.value = `${taVal.slice(0, index)}${taVal.slice(index + 1)}`;
          this.textarea.setSelectionRange(index, index);
          break;
        case ' ':
          this.textarea.value = `${taVal.slice(0, index)} ${taVal.slice(index)}`;
          this.textarea.setSelectionRange(index + 1, index + 1);
          break;
        case 'Tab':
          this.textarea.value = `${taVal.slice(0, index)}    ${taVal.slice(index)}`;
          this.textarea.setSelectionRange(index + 4, index + 4);
          break;
        case '↓':
          this.textarea.value += '↓';
          break;
        case '↑':
          this.textarea.value += '↑';
          break;
        case '←':
          this.textarea.value += '←';
          break;
        case '→':
          this.textarea.value += '→';
          break;

        default:
          break;
      }
    } else {
      const elements = key.querySelectorAll(':not(.hidden)');
      const symbol = elements.length === 2 ? elements[1].innerHTML : key.innerHTML;
      this.textarea.value += symbol;
    }
  }

  keyDown(event) {
    event.preventDefault();
    const key = document.querySelector(`.${event.code}`);
    if (key) {
      key.classList.add('active');
      this.outKey(key);
      if (key.classList.contains('CapsLock')) {
        this.pressCaps = !this.pressCaps;
        this.toggleCase();
      }
      if (event.shiftKey && !this.pressShift) {
        this.pressShift = true;
        this.toggleCase();
      }
      if (event.ctrlKey && event.altKey) {
        localStorage.setItem('lang', localStorage.getItem('lang') === 'en' ? 'ru' : 'en');
        this.lang = localStorage.getItem('lang');
        this.toggleLang();
      }
    }
  }

  keyUp(event) {
    const key = document.querySelector(`.${event.code}`);
    if (key) {
      if (key.classList.contains('CapsLock')) {
        if (this.pressCaps) {
          key.classList.add('active');
        } else {
          key.classList.remove('active');
        }
      } else {
        key.classList.remove('active');
      }
      if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        this.pressShift = false;
        this.toggleCase();
      }
    }
  }

  mouseDown(event) {
    const key = event.target.closest('.keyboard__key');
    if (key) {
      key.classList.add('active');
      this.outKey(key);
      if (key.classList.contains('CapsLock')) {
        this.pressCaps = !this.pressCaps;
        this.toggleCase();
      }
      if (key.innerHTML === 'Shift' && !this.pressShift) {
        this.pressShift = true;
        this.toggleCase();
      }
    }
  }

  mouseUp(event) {
    this.textarea.focus();
    const activeKeys = document.querySelectorAll('.active');
    activeKeys.forEach((key) => {
      if (key.innerHTML !== 'CapsLock' && key.innerHTML !== 'Shift') key.classList.remove('active');
    });
    const key = event.target.closest('.keyboard__key');
    if (key) {
      if (key.classList.contains('CapsLock')) {
        if (this.pressCaps) {
          key.classList.add('active');
        } else {
          key.classList.remove('active');
        }
      } else {
        key.classList.remove('active');
      }
      if (key.innerHTML === 'Shift') {
        this.pressShift = false;
        this.toggleCase();
      }
    }
  }
}
