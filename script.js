import Element from './js/element.js';
import keys from './js/keys.js';

const wrapper = new Element('div', 'wrapper', document.body).addElement();
const main = new Element('main', 'main', wrapper).addElement();
new Element('h1', 'title', main).setContent('Virtual keyboard for Windows');
new Element('p', 'keyboard-info', main).setContent('press "CTRL L + ALT L" to change language');
const form = new Element('form', 'form', main).addElement();
const textarea = new Element('textarea', 'textarea', form).addElement();
const keyboard = new Element('div', 'keyboard', main).addElement();

let currentLanguage = (localStorage.getItem('currentLanguage')) ? localStorage.getItem('currentLanguage') : 'RU';
const [
    row1,
    row2,
    row3,
    row4,
    row5
  ] = [
    new Element('div', 'keyboard-row', keyboard).addElement(),
    new Element('div', 'keyboard-row', keyboard).addElement(),
    new Element('div', 'keyboard-row', keyboard).addElement(),
    new Element('div', 'keyboard-row', keyboard).addElement(),
    new Element('div', 'keyboard-row', keyboard).addElement()
];

const allKeys = [].concat(keys[0], keys[1], keys[2], keys[3], keys[4]);
const serviceKeys = ['Backspace', 'Tab', 'Delete', 'ControlLeft', 'ControlRight', 'AltLeft', 'AltRight', 'Lang', 'CapsLock', 'Enter', 'ShiftLeft', 'ShiftRight'];
const rows = [row1, row2, row3, row4, row5];
const allBtns = [];
let isLowerCase = true;
let isCtrl= false;
let isAltLeft = false;
let isShift = false;

for (let i = 0; i < keys.length; i++) {
    keys[i].forEach((item) => {
        let keyBtn;
        if (serviceKeys.includes(item.code)) {
            keyBtn = new Element('button', `key service-key ${item.code}`, rows[i]).setContent(item.key.ru);
            allBtns.push(keyBtn);
        } else {
            keyBtn = new Element('button', `key ${item.code}`, rows[i]).setContent(item.key.ru);
            allBtns.push(keyBtn);
        }
        
        if (currentLanguage === 'EN' && item.key.en) {
            keyBtn.textContent = item.key.en;
        }
    });
}

const swtchLang = (isCtrl = true, isAltLeft = true) => {
    if (isCtrl && isAltLeft && currentLanguage === 'RU') {
        allBtns.forEach((item) => {
            allKeys.forEach((key) => {
                if (item.classList.contains(key.code) && !item.classList.contains('service-key')) {
                    item.textContent = isLowerCase ? key.key.en : key.key.en.toUpperCase();
                }
            });
        });
        currentLanguage = 'EN';
    } else if (isCtrl && isAltLeft && currentLanguage === 'EN') {
        allBtns.forEach((item) => {
            allKeys.forEach((key) => {
                if (item.classList.contains(key.code) && !item.classList.contains('service-key')) {
                    item.textContent = isLowerCase ? key.key.ru : key.key.ru.toUpperCase();
                }
            });
        });
        currentLanguage = 'RU';
    }
}

keyboard.addEventListener('click', (event) => {
    textarea.focus();
    if (event.target.classList.contains('key') && !event.target.classList.contains('service-key')) {
        textarea.setRangeText(event.target.textContent, textarea.selectionStart, textarea.selectionEnd, 'end');
    }
    if (event.target.classList.contains('Backspace') && textarea.selectionStart) {
        textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionStart);
    }
    if (event.target.classList.contains('Delete')) {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionStart + 1);
    }
    if (event.target.classList.contains('Enter')) {
        textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
    }
    if (event.target.classList.contains('Tab')) {
        textarea.setRangeText('   ', textarea.selectionStart, textarea.selectionEnd, 'end');
    }
    if (event.target.classList.contains('CapsLock')) {
        allBtns.forEach((item) => {
            if (!item.classList.contains('service-key')) {
                isLowerCase ? item.textContent = item.textContent.toUpperCase() : item.textContent = item.textContent.toLowerCase();
            }
        });
        isLowerCase = !isLowerCase;
    }
    if (event.target.classList.contains('ControlLeft')) {
        isCtrl = true;
    }
    if (event.target.classList.contains('Lang')) {
        swtchLang();
    }
});

keyboard.addEventListener('mousedown', (event) => {
    if (event.target.classList.contains('ShiftLeft') || event.target.classList.contains('ShiftRight')) {
        allBtns.forEach((item) => {
            if (currentLanguage === 'RU') {
                if (item.classList.contains('key') && !item.classList.contains('service-key')) {
                    allKeys.forEach((key) => {
                        if (item.classList.contains(key.code) && key.shift && key.shift.ru) {
                            item.textContent = key.shift.ru;
                        }
                    });
                }
            } else if (currentLanguage === 'EN') {
                if (item.classList.contains('key') && !item.classList.contains('service-key')) {
                    allKeys.forEach((key) => {
                        if (item.classList.contains(key.code) && key.shift && key.shift.en) {
                            item.textContent = key.shift.en;
                        }
                    });
                }
            }
        });

        if (!isShift) {
            isShift = true;
            allBtns.forEach((item) => {
              if (!item.classList.contains('service-key')) {
                  isLowerCase ? item.textContent = item.textContent.toUpperCase() : item.textContent = item.textContent.toLowerCase();
                }
            });
            isLowerCase = !isLowerCase;
        }
    }
});

keyboard.addEventListener('mouseup', (event) => {
    if (event.target.classList.contains('ShiftLeft') || event.target.classList.contains('ShiftRight')) {
        isShift = false;
        allBtns.forEach((item) => {
            if (currentLanguage === 'RU') {
                if (item.classList.contains('key') && !item.classList.contains('service-key')) {
                    allKeys.forEach((key) => {
                        if (item.classList.contains(key.code) && key.key && key.key.ru) {
                            item.textContent = key.key.ru;
                        }
                    });
                }
            } else if (currentLanguage === 'EN') {
                if (item.classList.contains('key') && !item.classList.contains('service-key')) {
                    allKeys.forEach((key) => {
                        if (item.classList.contains(key.code) && key.key && key.key.en) {
                            item.textContent = key.key.en;
                        }
                    });
                }
            }
        });
        
        allBtns.forEach((item) => {
            if (!item.classList.contains('service-key')) {
                isLowerCase ? item.textContent = item.textContent.toUpperCase() : item.textContent = item.textContent.toLowerCase();
            }
        });

        isLowerCase = !isLowerCase;
    }
});

document.addEventListener('keydown', (event) => {
    if (document.activeElement !== textarea) {
        allBtns.forEach((item) => {
        if (!item.classList.contains('service-key') && item.classList.contains(event.code)) {
            textarea.setRangeText(item.textContent, textarea.selectionStart, textarea.selectionEnd, 'end');
        }
    });
    } else {
        event.preventDefault();
        allBtns.forEach((item) => {
            if (!item.classList.contains('service-key') && item.classList.contains(event.code)) {
                textarea.setRangeText(item.textContent, textarea.selectionStart, textarea.selectionEnd, 'end');
            }
        });
    }

    if (event.code === 'Backspace' && textarea.selectionStart) {
        textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionStart);
    }

    if (event.code === 'Delete') {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionStart + 1);
    }

    if (event.code === 'Enter') {
        textarea.setRangeText('\n', textarea.selectionStart, textarea.selectionEnd, 'end');
    }

    if (event.code === 'Tab') {
        textarea.setRangeText('   ', textarea.selectionStart, textarea.selectionEnd, 'end');
    }

    if (event.code === 'ControlLeft') {
        isCtrl = true;
        swtchLang(isCtrl, isAltLeft);
    }

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        allBtns.forEach((item) => {
            if (currentLanguage === 'RU') {
                if (item.classList.contains('key') && !item.classList.contains('service-key')) {
                    allKeys.forEach((key) => {
                        if (item.classList.contains(key.code) && key.shift && key.shift.ru) {
                            item.textContent = key.shift.ru;
                        }
                    });
                }
            } else if (currentLanguage === 'EN') {
                if (item.classList.contains('key') && !item.classList.contains('service-key')) {
                    allKeys.forEach((key) => {
                        if (item.classList.contains(key.code) && key.shift && key.shift.en) {
                            item.textContent = key.shift.en;
                        }
                    });
                }
            }
        });

        if (!isShift) {
            isShift = true;
            allBtns.forEach((item) => {
            if (!item.classList.contains('service-key')) {
                isLowerCase ? item.textContent = item.textContent.toUpperCase() : item.textContent = item.textContent.toLowerCase();
                }
            });
            isLowerCase = !isLowerCase;
        }
    }
    if (event.code === 'AltLeft') {
        isAltLeft = true;
        swtchLang(isCtrl, isAltLeft);
    }

    if (event.code === 'AltLeft' || event.code === 'AltRight') {
        event.preventDefault();
    }

    if (event.code === 'CapsLock') {
        allBtns.forEach((item) => {
            if (!item.classList.contains('service-key')) {
                isLowerCase ? item.textContent = item.textContent.toUpperCase() : item.textContent = item.textContent.toLowerCase();
            }
        });
        isLowerCase = !isLowerCase;
    }

    allBtns.forEach((item) => {
    if (item.classList.contains(event.code)) {
        item.classList.add('active');
    }
    });
});

document.addEventListener('keyup', (event) => {
    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        isShift = false;
        allBtns.forEach((item) => {
            if (currentLanguage === 'RU') {
                if (item.classList.contains('key') && !item.classList.contains('service-key')) {
                    allKeys.forEach((key) => {
                        if (item.classList.contains(key.code) && key.key && key.key.ru) {
                            item.textContent = key.key.ru;
                        }
                    });
                }
            } else if (currentLanguage === 'EN') {
                if (item.classList.contains('key') && !item.classList.contains('service-key')) {
                    allKeys.forEach((key) => {
                        if (item.classList.contains(key.code) && key.key && key.key.en) {
                            item.textContent = key.key.en;
                        }
                    });
                }
            }
        });

        allBtns.forEach((item) => {
        if (!item.classList.contains('service-key')) {
            isLowerCase ? item.textContent = item.textContent.toUpperCase() : item.textContent = item.textContent.toLowerCase();
            }
        });
        isLowerCase = !isLowerCase;
    }

    if (event.code === 'ControlLeft') {
        isCtrl = false;
    }
    if (event.code === 'AltLeft') {
        isAltLeft = false;
    }

    allBtns.forEach((item) => {
        if (item.classList.contains(event.code)) {
            item.classList.remove('active');
        }
    });
});

window.addEventListener('beforeunload', () => {
  localStorage.setItem('currentLanguage', currentLanguage);
});