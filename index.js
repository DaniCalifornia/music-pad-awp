//create a synth and connect it to the main output (your speakers)
const kickDrum = new Tone.MembraneSynth({
  pitchDecay : 0.05 ,
  octaves : 5 ,
  oscillator : {
  type : 'sine'
  } ,
  envelope : {
  attack : 0.006 ,
  decay : 0.4 ,
  sustain : 0.08 ,
  release : 1.4 ,
  attackCurve : 'exponential'
}
}).toDestination()

const synth = new Tone.Synth().toDestination();
const metalSynth = new Tone.MetalSynth({
    frequency : 100 ,
    envelope : {
    attack : 0.001 ,
    decay : 1.4 ,
    release : 0.2
    } ,
    harmonicity : 5.1 ,
    modulationIndex : 30 ,
    resonance : 4000 ,
    octaves : 2.0
}).toDestination();
const sawToothSynth = new Tone.Synth({
  oscillator : {
    type : "sawtooth"
  }
}).toDestination();

// snare
const lowPass = new Tone.Filter({
  frequency: 8000,
}).toDestination();

const snareDrum = new Tone.NoiseSynth({
  volume: 3,
  noise: {
    type: 'white',
    playbackRate: 3,
  },
  envelope: {
    attack: 0.01,
    decay: 0.10,
    sustain: 0.01,
    release: 0.09,
  },
}).connect(lowPass);

//bass
const bass = new Tone.Synth({
  oscillator : {
    type : 'sine'
    } ,
    envelope : {
    attack : 0.005 ,
    decay : 1.4,
    sustain : 0.1 ,
    release : 1
    }
}).toDestination();

const loopKick = new Tone.Loop((time) => {
  kickDrum.triggerAttackRelease("C2", "8n", time)
}, "8n")

const loopC5 = new Tone.Loop((time) => {
  metalSynth.triggerAttackRelease("C2", "8n", time);
}, "8n")

const loopBass = new Tone.Loop((time) => {
  bass.triggerAttackRelease("F0", "8n", time);
}, "8n")

const loopSnare = new Tone.Loop((time) => {
  snareDrum.triggerAttackRelease("4n", time);
}, "8n")

const loopC3 = new Tone.Loop((time) => {
  synth.triggerAttackRelease("C3", "8n", time);
}, "8n")

const loopSawTooth = new Tone.Loop((time) => {
  sawToothSynth.triggerAttackRelease("C5", "8n", time);
}, "4n")

console.log('BPM', Tone.Transport.bpm)

const pads = document.getElementById('container');
pads.addEventListener('click', async(evt) => {
  const pad = evt.target
  if (pad.classList.contains('pad')) {
    pad.classList.toggle('playing')
    await Tone.start();

    if (pad.classList.contains('kick')) {
      loopKick.state === 'stopped' ? loopKick.start(0) : loopKick.stop(0)
    }
    else if (pad.classList.contains('C5')) {
      loopC5.state === 'stopped' ? loopC5.start(0) : loopC5.stop(0)
    }
    else if (pad.classList.contains('bass')) {
      loopBass.state === 'stopped' ? loopBass.start(0) : loopBass.stop(0)
    }
    else if (pad.classList.contains('snare')) {
      loopSnare.state === 'stopped' ? loopSnare.start(0) : loopSnare.stop(0)
    }
    else if (pad.classList.contains('C3')) {
      loopC3.state === 'stopped' ? loopC3.start(0) : loopC3.stop(0)
    }
    else if (pad.classList.contains('B')) {
      loopSawTooth.state === 'stopped' ? loopSawTooth.start(0) : loopSawTooth.stop(0)
    }
    // const loop = new Tone.Loop((time) => {
    //   console.log('in loop')
    //   kickDrum.triggerAttackRelease("C2", "8n", time)
    // }, "8n");

    // function onRepeat(time) {
    //   kickDrum.triggerAttackRelease("C2", "8n", time)
    // }
    Tone.Transport.start();

    // console.log('LOOP', loopTune)


    console.log('after start')

    //play a note every quarter-note

    // play a note with the synth we setup
    // player.start()
  }
})

