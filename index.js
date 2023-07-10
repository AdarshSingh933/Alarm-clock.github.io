function updateClock() {
    var currentTime = new Date();
    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    let formattedHours = hours % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours;
  
    // Add leading zeros to single-digit numbers
    formattedHours = (formattedHours < 10 ? "0" : "") + formattedHours;
    minutes = (minutes < 10 ? "0" : "") + minutes;
    seconds = (seconds < 10 ? "0" : "") + seconds;
    

    // Determine the AM/PM suffix
    const suffixString = hours >= 12 ? "PM" : "AM";

    // Create the formatted time string
    const formattedTimeString = `${formattedHours}:${minutes}:${seconds}`;
  
    // var timeString = hours + ":" + minutes + ":" + seconds;
    document.getElementById("time").textContent = formattedTimeString;
    document.getElementById('suffix').textContent =suffixString;
  }
  
  // Update the clock every second
  setInterval(updateClock, 1000);
  updateDate();
  function updateDate() {
    var currentDate = new Date();
    var date = currentDate.getDate();
    var day =currentDate.getDay();
    var daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    var trimDay = daysOfWeek[day];
    var month = currentDate.getMonth();
    var monthsOfYear = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var trimMonth = monthsOfYear[month];
    var year=currentDate.getFullYear();
  
    var dateString = trimDay + " - " + trimMonth + " " + date + " " + year;
    document.getElementById("date").textContent = dateString;

    // Calculate time remaining until midnight
  var currentTime = currentDate.getTime();
  var midnight = new Date();
  midnight.setHours(24, 0, 0, 0);
  var timeUntilMidnight = midnight.getTime() - currentTime;

  // Update the date at midnight
  setTimeout(updateDate, timeUntilMidnight);
  }
 
  const setAlarmButton = document.getElementById('set-alarm');
  const editAlarmPopup = document.getElementById('editAlarmPopup');
  const displayElement = document.getElementById('display');
  const popupCloseButton = document.getElementById('close-button');
  const cancelButton=document.getElementById('cancel');
  const saveButton=document.getElementById('save');
  const alarmPopup=document.getElementById('alarm');
  const stopAlarm=document.getElementById('stop-alarm');
  
  setAlarmButton.addEventListener('click', () => {
    editAlarmPopup.classList.add('show');
    displayElement.classList.add('hide-elements');
  });
   // Close the popup when clicking the "X" button or outside the popup
  popupCloseButton.addEventListener('click', () => {
    closePopup();
  });
  
  document.addEventListener('click', (event) => {
    if (
      !editAlarmPopup.contains(event.target) &&
      event.target !== setAlarmButton
    ) {
      closePopup();
    }
  });
  
  // Function to close the popup
  function closePopup() {
    editAlarmPopup.classList.remove('show');
    displayElement.classList.remove('hide-elements');
  }
  // function to handle alarmPopup
  cancelButton.addEventListener('click',()=>{
      closePopup();
  });
  
  // function to handle savebutton

  var alarmHours;
  var alarmMinutes;
  var soundOption;
  saveButton.addEventListener('click',()=>{
     alarmHours = document.getElementById('hours').value;
     alarmMinutes = document.getElementById('minutes').value;
     soundOption = document.getElementById('sound-option').value;
     console.log(soundOption);
    const title = document.getElementById('title').value;
    
    var currentTime=new Date();
    var remainingHours=alarmHours-currentTime.getHours();
    var remainingMinutes=alarmMinutes-currentTime.getMinutes();
    var remainingSeconds=59-currentTime.getSeconds(); 

    if (remainingMinutes < 0) {
      remainingMinutes += 60;
      remainingHours--;
    }
    if (remainingHours < 0) {
      remainingHours += 24;
    }
    const timerString=remainingHours+":"+remainingMinutes+":"+remainingSeconds;
    document.getElementById('timer').textContent=timerString;

    let formattedHours = alarmHours % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours;

    formattedHours = (formattedHours < 10 ? "0" : "") + formattedHours;
    alarmMinutes = (alarmMinutes < 10 ? "0" : "") + alarmMinutes;

     // Determine the AM/PM suffix

     const suffixString = alarmHours >= 12 ? "PM" : "AM";

    var timeString = formattedHours + ":" + alarmMinutes;
    document.getElementById("alarm-time").textContent = timeString;
    document.getElementById("alarm-suffix").textContent=suffixString;
    document.getElementById('alarm-title').textContent=title;

    alarmPopup.classList.add('alarm-popup-show');
    setAlarmButton.classList.add('hide-elements');
    closePopup();
  });
  
  //to update timer 

  setInterval(()=>{
  var currentTime=new Date();
  var remainingHours=alarmHours-currentTime.getHours();
  var remainingMinutes=alarmMinutes-currentTime.getMinutes()-1;
  var remainingSeconds=59-currentTime.getSeconds();
  
  if(remainingHours===0 && remainingMinutes===0 && remainingSeconds===0){
    playAlarm(soundOption);
  }

  if (remainingMinutes < 0) {
    remainingMinutes += 60;
    remainingHours--;
  }
  if (remainingHours < 0) {
    remainingHours += 24;
  }
  remainingHours = (remainingHours < 10 ? "0" : "") + remainingHours;
  remainingMinutes = (remainingMinutes < 10 ? "0" : "") + remainingMinutes;
  remainingSeconds = (remainingSeconds < 10 ? "0" : "") + remainingSeconds;

  const timerString=remainingHours+":"+remainingMinutes+":"+remainingSeconds;
  document.getElementById('timer').textContent=timerString;
  },1000);

   // to play Alarm clock

  var interval;

  function playAlarm(soundOption){
      console.log(soundOption);
      audioPlay(soundOption);
        const repeatSound = document.getElementById('repeat-sound');
        console.log(repeatSound.checked);
        console.log(audio.paused);
        if (repeatSound.checked && !audio.paused) {
          interval=setInterval(()=>audioPlay(soundOption),10000);
        }
   }

  //functionality which will perform after pressing stop button of Alarm
 
  stopAlarm.addEventListener('click',()=>{
    setAlarmButton.classList.remove('hide-elements');
    alarmPopup.classList.remove('alarm-popup-show');
    if(audio){
    audioPause();
    clearInterval(interval);
    }
  });

   // select music for alarm
  const audioPlayButton = document.getElementById('audio-play-btn');
  const playIcon=document.getElementById('audio-play-icon');
  const pauseIcon=document.getElementById('audio-pause-icon');

  playIcon.addEventListener('click',()=>{
    const soundOptionSelect = document.getElementById('sound-option').value;
    audioPlay(soundOptionSelect);
    playIcon.classList.add('play-icon-hide');
    pauseIcon.classList.add('pause-icon-show');
  });
  pauseIcon.addEventListener('click',()=>{
    audioPause();
    playIcon.classList.remove('play-icon-hide');
    pauseIcon.classList.remove('pause-icon-show');
  })
  let audio;
  function audioPlay(soundOptionSelect){
    console.log(soundOptionSelect);
    if(soundOptionSelect=="one"){
       audio=document.getElementById('audio1');
    }else if(soundOptionSelect=="two"){
      audio=document.getElementById('audio2');
    }else if(soundOptionSelect=="three"){
      audio=document.getElementById('audio3');
    }else if(soundOptionSelect=="four"){
      audio=document.getElementById('audio4');
    }else if(soundOptionSelect=="five"){
      audio=document.getElementById('audio5');
    }else if(soundOptionSelect=="six"){
      audio=document.getElementById('audio6');
    }else{
      audio=document.getElementById('audio7');
    }
      console.log(audio);
    audio.play();
  }
  function audioPause(){
    audio.pause();
  }

  const  inputFile=document.getElementById('input-file');
  const  audioElement=document.getElementById('audio7');

  inputFile.addEventListener('change',()=>{
    const selectedFile=inputFile.files[0];

    const option=document.createElement("option");
    const soundOptionSelect=document.getElementById('sound-option');
    option.text=selectedFile.name;
    soundOptionSelect.add(option);

    const audioURL=URL.createObjectURL(selectedFile);
    audioElement.src=audioURL;
  });
  
 
 
