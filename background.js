function maintainState() {
  var runningState = getRunningState();
  setRunningState(runningState);
}

function getRunningState() {
  chrome.storage.sync.get("running", result => {
    result.running;
  });
}

function setRunningState(runningState) {
  chrome.storage.sync.set({
    running: runningState
  })
}

// function playAudio() {
//   var audio = new Audio("assets/alert.mp3");
//   audio.play();
// }

chrome.tabs.onUpdated.addListener(maintainState);