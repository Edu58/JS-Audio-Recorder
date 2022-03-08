const btnStart = document.getElementById('start');
const btnStop = document.getElementById('stop');

// Start recording
btnStart.addEventListener('click', () => {
  navigator.mediaDevices.getUserMedia({
  audio: true
})
    .then((stream) => {
      const audioRecorder = new MediaRecorder(stream);
      audioRecorder.start();
      console.log("Recording started");

      const audioChunks = [];

      audioRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      // stop recording
      btnStop.addEventListener('click', () => {
        audioRecorder.stop();
        console.log("Recording stopped")

        // Process recorded audio
        audioRecorder.addEventListener('stop', () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);

          // Play the audio
          const audio = new Audio(audioUrl)
          audio.play();
          console.log("Audio playing")
        })
      });
    });
});