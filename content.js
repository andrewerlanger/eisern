var linkHelper = {
  init: function () {
    chrome.storage.sync.get("running", result => {
      if (result.running != false) {
        this.checkPage();
      }
    });
  },
  checkPage: function () {
    var regex = /.*union-zeughaus\.de\/union-berlin\/spticket/g;
    if (regex.test(window.location.href)) {
      this.searchMap();
    }
  },
  searchMap: function () {
    var map = document.querySelector("map[name='spmap']");
    var areas = this.getAreas(map);
    areas.length > 0 ? this.selectArea(areas) : this.refreshPage();
  },
  getAreas: function (map) {
    if (!map) {
      return [];
    }

    return map.querySelectorAll("area[shape='polygon'], area[shape='rectangle']");
  },
  selectArea: async function (areas) {
    areas[0].click();
    await this.sleep();
    this.selectTicket();
  },
  selectTicket: function () {
    var ticketContainer = document.querySelector(".KartentypZeile");
    ticketContainer.querySelectorAll("div.BGNr").forEach(ticket => {
      ticket.innerText == "1" && ticket.click();
    });
    this.checkOut();
  },
  checkOut: function () {
    var checkoutLink = document.getElementById("ZurKasseUrl").value;
    window.open(checkoutLink, "_blank");
    this.injectAudio();
    this.setRunningState(false);
  },
  injectAudio: function () {
    var audio = document.createElement("audio");
    audio.id = "audioAlert";
    audio.preload = "auto";
    audio.src = audioSource;

    document.body.appendChild(audio);
    audio.play();
  },
  setRunningState: function (runningState) {
    chrome.storage.sync.set({
      running: runningState
    })
  },
  refreshPage: async function () {
    await this.sleep();
    location.reload();
  },
  sleep: function () {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }
};

var audioSource = "https://notificationsounds.com/soundfiles/08b255a5d42b89b0585260b6f2360bdd/file-sounds-1137-eventually.mp3";
linkHelper.init();