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
var plugin_dll_filename = "simple-io-plugin";
var extension_id = "anoahjhemlbnmhkljlgbmnfflpnhgjpmfjnhdfoe";
var btnClasses=["btn blue", "btn blue lighten-1 sub1", "btn blue lighten-2 sub2"];
var divIds = ["LeftRowContent", "MiddleRowContent", "RightRowContent"];
var maxMenuLevels = 3;