var popupManager = {
  init: function () {
    this.startButton = document.getElementById("startButton");
    this.loadingButton = document.getElementById("loadingButton");
    this.stopButton = document.getElementById("stopButton");
    this.getRunningState();
    this.addStartListener();
    this.addStopListener();
  },
  addStartListener: function () {
    this.startButton.addEventListener("click", () => {
      this.setRunningState(true);
      this.toggleButtonDisplay();
      this.executeScript();
    });
  },
  addStopListener: function () {
    this.stopButton.addEventListener("click", () => {
      this.setRunningState(false);
      this.toggleButtonDisplay();
    });
  },
  toggleButtonDisplay: function () {
    this.startButton.classList.toggle("hidden");
    this.loadingButton.classList.toggle("hidden");
    this.stopButton.classList.toggle("hidden");
  },
  getRunningState: function () {
    var self = this;
    chrome.storage.sync.get("running", result => {
      result.running && self.toggleButtonDisplay();
    });
  },
  setRunningState: function (state) {
    chrome.storage.sync.set({
      running: state
    })
  },
  executeScript: function () {
    chrome.tabs.executeScript({
      file: "/content.js"
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  popupManager.init();
});