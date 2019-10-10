import AudioKeys from 'audiokeys';

const ctx = new AudioContext();
let oscMap = {};
// create a keyboard

const  keyboard = new AudioKeys();

keyboard.down( (note) => {
  // do things with the note object
  const osc = ctx.createOscillator();
  osc.frequency.value = note.frequency;
  osc.connect(ctx.destination);
  osc.start();
  oscMap[note.frequency] = osc
});

keyboard.up( (note) => {
    const osc = oscMap[note.frequency];
    osc.stop();
});