import createElement from './src/create-element.js';

export default class Key {
  constructor({ small, shift, code }) {
    this.code = code;
    this.small = small;
    this.shift = shift;
    this.modifierKey = Boolean(small.match(/back|tab|del|enter|caps|shift|ctrl|arr|alt|win/));

    this.letter = createElement(this.small, this.shift, this.code)
  }
}


if (shift && shift.match(/[^a-zA-Zа-яА-ЯёЁ0-9]/)) {
  this.sub = create('div', 'sub', this.shift);
} else {
  this.sub = create('div', 'sub', '');
}

this.letter = create('div', 'letter', small);
this.div = create('div', 'keyboard__key', [this.sub, this.letter], null, ['code', this.code],
  this.modifierKey ? ['fn', 'true'] : ['fn', 'false']); // мы забыли этот атрибут добавить )) он нужен, чтобы в разметке стилизовать функциональные клавиши отдельно