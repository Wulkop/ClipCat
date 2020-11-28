function getHTMLForButton(categoryName, categoryId, level)
{
    return "<div><button class=\"" + btnClasses[level] + "\" type=\"button\" id=\"" + categoryId + "\" <span>" + categoryName + "</span></button></div>"
}
function showAllButtons()
{
    $('#Buttons').css('visibility','visible');
    $("#Buttons").children().show();
}
function hideAllButtons()
{
    $('#Buttons').css('visibility','hidden');
    $("#Buttons").children().hide();
}
function moveLatestClip(videoPath, category)
{
  plugin.get().getLatestFileInDirectory(videoPath + "/*", function(status, filename, lastWriteTime)
  {
    if (status)
    {
      currentTimeSecs = Math.floor(Date.now() / 1000);
      if (lastWriteTime > currentTimeSecs)
      {
        console.warn("Check your local time settings. They might be wrong on your computer");
        console.warn("Current TS: " + currentTimeSecs + " FileModified: " + lastWriteTime);
        console.warn("Clip will not be moved");
        return;
      }
      if (currentTimeSecs - lastWriteTime > 60)
      {
        console.warn("Last clip in folder is older than 1 minute. Are make sure your recording program actually recorded something.");
        return;
      }
      plugin.get().moveFile(videoPath, filename, category, function(status, message)
      {
        console.log(message);
      });
    }
    else
    {
      console.log("No file found");
    }
  });
}