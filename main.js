// this a subset of the features that Tom Clancy's Rainbow Six: Siege events provides - however,
// when writing an app that consumes events - it is best if you request
// only those features that you want to handle.
//
// NOTE: in the future we'll have a wildcard option to allow retrieving all
// features
var g_interestedInFeatures = [
  'game_info',
  'match',
  'roster',
  'kill',
  'death',
  'match_info'
];
//var dealer = new JSMQ.Dealer();
var plugin = new OverwolfPlugin("simple-io-plugin", true);
//var config_path = "D:/Development/events-sample-apps-master/rainbow-six-sample-app/config.json";
var extension_id = "anoahjhemlbnmhkljlgbmnfflpnhgjpmfjnhdfoe"
var config_path = overwolf.io.paths.localAppData + "/overwolf/extensions/" + extension_id + "/0.0.1/config.json"
var config = 
{
  path: "D:/ShadowPlayTest/Tom Clancy's Rainbow Six  Siege"
}

function registerEvents() {
  // general events errors
  overwolf.games.events.onError.addListener(function(info) {
    console.log("Error: " + JSON.stringify(info));
  });

  // "static" data changed
  // This will also be triggered the first time we register
  // for events and will contain all the current information
  overwolf.games.events.onInfoUpdates2.addListener(function(info) {
    console.log("Info UPDATE: " + JSON.stringify(info));
    send(JSON.stringify(info));
  });

  // an event triggerd
  overwolf.games.events.onNewEvents.addListener(function(info) {
    console.log("EVENT FIRED: " + JSON.stringify(info));
    send(JSON.stringify(info));
  });


}

function gameLaunched(gameInfoResult) {
  if (!gameInfoResult) {
    return false;
  }

  if (!gameInfoResult.gameInfo) {
    return false;
  }

  if (!gameInfoResult.runningChanged && !gameInfoResult.gameChanged) {
    return false;
  }

  if (!gameInfoResult.gameInfo.isRunning) {
    return false;
  }

  // NOTE: we divide by 10 to get the game class id without it's sequence number
  if (Math.floor(gameInfoResult.gameInfo.id/10) != 10826) {
    return false;
  }

  console.log("Tom Clancy's Rainbow Six: Siege Launched");
  return true;

}

function gameRunning(gameInfo) {

  if (!gameInfo) {
    return false;
  }

  if (!gameInfo.isRunning) {
    return false;
  }

  // NOTE: we divide by 10 to get the game class id without it's sequence number
  if (Math.floor(gameInfo.id/10) != 10826) {
    return false;
  }

  console.log("Running");
  return true;

}


function setFeatures() {
  overwolf.games.events.setRequiredFeatures(g_interestedInFeatures, function(info) {
    if (info.status == "error")
    {
      //console.log("Could not set required features: " + info.reason);
      //console.log("Trying in 2 seconds");
      window.setTimeout(setFeatures, 2000);
      return;
    }

    console.log("Set required features:");
    console.log(JSON.stringify(info));
  });
}
function send(msgString) {
  var message = new JSMQ.Message();
  message.addString(msgString);
  //dealer.send(message);
}
function onClipClassified(classification)
{
  if(config == null)
  {
    return;
  }

  var videoPath = config.path; // no extension filtering
  moveLatestClip(videoPath, classification)
}
function onConfigWriteCompleted(status)
{
  console.log(status);
}
function onConfigReadCompleted(status)
{
  console.log(status);
  if(status.success)
  {
    config = JSON.parse(status.content)
  }
  else
  {
    console.warn("Cannot parse config content");
    config = null;
  }
}
function readConfig()
{
  overwolf.io.fileExists(config_path, function(status)
  {
    if(status.status == "error")
    {
      console.warn(status.found);
    }
    if(!status.found)
    {
      console.log("Config file does not exist");
      config.path = window.prompt("Please enter the path to your video recordings", "D:/ShadowPlayTest/Tom Clancy's Rainbow Six  Siege");
     
      configStr = JSON.stringify(config);
      overwolf.io.writeFileContents(config_path, configStr, "UTF8", false, onConfigWriteCompleted);
    }
    else if (status.status == "success" && status.found)
    {
      overwolf.io.readFileContents(config_path, "UTF8", onConfigReadCompleted);
    }
  });
}

function main(status)
{

  if (status == false)
  {
    console.log("Plugin couldn't be loaded??");
    return;
  }

  readConfig();

  // Start here
  overwolf.games.onGameInfoUpdated.addListener(function (res) {
    if (gameLaunched(res)) {
      registerEvents();
      setTimeout(setFeatures, 1000);
    }
    console.log("onGameInfoUpdated: " + JSON.stringify(res));
  });
  overwolf.settings.hotkeys.onPressed.addListener(function(info)
  {
    console.log("On Pressed");
    showButtons();
  });
  overwolf.games.getRunningGameInfo(function (res) {
    if (gameRunning(res)) {

      console.log("Create JSMQ connection")
      //dealer.connect("ws://127.0.0.1:86");


      registerEvents();
      setTimeout(setFeatures, 1000);
    }
    send("getRunningGameInfo: " + JSON.stringify(res));
    console.log("getRunningGameInfo: " + JSON.stringify(res));
  });
}
plugin.initialize(main)
console.log("Test");
showButtons();






