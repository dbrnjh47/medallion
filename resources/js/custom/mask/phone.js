function maskPhone(input) {
  const fmt = v => {
    let d = v.replace(/\D/g, '').replace(/^[78]/, '').slice(0, 10);
    if (!d) return '';
    let r = '+7';
    if (d.length) r += ' (' + d.slice(0, 3);
    if (d.length >= 3) r += ')';
    if (d.length > 3) r += ' ' + d.slice(3, 6);
    if (d.length > 6) r += '-' + d.slice(6, 8);
    if (d.length > 8) r += '-' + d.slice(8, 10);
    return r;
  };

  // сколько цифр (без ведущей 7/8) находится ДО позиции pos
  const digitsBefore = (str, pos) => {
    return str.slice(0, pos).replace(/\D/g, '').replace(/^[78]/, '').length;
  };

  // позиция в отформатированной строке после N цифр
  const posAfterDigits = (str, n) => {
    if (n === 0) return str.startsWith('+7') ? 2 : 0;
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (/\d/.test(str[i])) {
        if (str[i - 1] === '+' && i === 1) continue; // пропускаем 7 у +7
        if (++count === n) return i + 1;
      }
    }
    return str.length;
  };

  const update = () => {
    const pos = input.selectionStart;
    const old = input.value;
    const digits = digitsBefore(old, pos);
    input.value = fmt(old);
    const newPos = posAfterDigits(input.value, digits);
    input.setSelectionRange(newPos, newPos);
  };

  input.addEventListener('input', update);
  if (input.value) input.value = fmt(input.value);
}

function initPhoneMasks() {
  document.querySelectorAll('input[type=tel]').forEach(maskPhone);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPhoneMasks);
} else {
  initPhoneMasks();
}