import AudioKeys from 'audiokeys';
import Tone from 'tone';
import {scale} from '@tonaljs/scale'
import {sample} from 'lodash'

const ctx = new AudioContext();
var synth = new Tone.PolySynth(6, Tone.Synth, {
    oscillartor: {
        type: 'square'
    }
}).toMaster();

let scaleType = 'C3 composite blues'
let scaleType2 = 'C4 composite blues'

const {notes: n1} = scale(scaleType);
const {notes: n2} = scale(scaleType2);
let notes = [...n1, ...n2];
// create a keyboard

const  keyboard = new AudioKeys();

keyboard.down( (test) => {
    let note = sample(notes);
    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease(note, '8n')
});

keyboard.up( note => {

});

const makeCoolNosieDown = () => {
  // do things with the note object
  const osc = ctx.createOscillator();
  console.log(note.frequency);
  osc.frequency.value = note.frequency;
  osc.connect(ctx.destination);
  osc.start();
  oscMap[note.frequency] = osc
}

const makeCoolNosieUp = () => {
    const osc = oscMap[note.frequency];
    osc.stop();
}