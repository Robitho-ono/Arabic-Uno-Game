const COLORS = ["Red", "Blue", "Green", "Yellow"];
const NUMBERS = ["٠","١","٢","٣","٤","٥","٦","٧","٨","٩"];
const LETTERS_BASIC = ["ا","ب","ت","ث","ج"];
const LETTERS_EXTENDED = ["ا","ب","ت","ث","ج","ح","خ","د","ذ","ر","ز","س","ش","ص","ض","ط","ظ","ع","غ","ف","ق","ك","ل","م","ن","ه","و","ي"];

function generateDeck(level) {
  let values = [];
  if (level === 1) values = NUMBERS;
  if (level === 2) values = [...NUMBERS, ...LETTERS_BASIC];
  if (level === 3) values = [...NUMBERS, ...LETTERS_EXTENDED];

  const deck = [];
  COLORS.forEach(color => {
    values.forEach(val => {
      deck.push({ color, value: val });
    });
  });
  shuffle(deck);
  return deck;
}
