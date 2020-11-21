isInEditMode = false;
function onButtonClick(clicked_id)
{
  //Get ref to clicked button
  clickedCat = CategoryDict[clicked_id];
  //If the user clicked on a branch
  if(clickedCat && clickedCat.categoryCollection)
  {
    subMenuLevel = clickedCat.level + 1;
    //Clear all HTMl of submenues from a diffrent parent
    for (i = subMenuLevel; i < maxMenuLevels; ++i)
    {
      $("#"+divIds[i]).html("");
    }
    //Add HTMl of own children to DOM
    clickedCat.categoryCollection.forEach(function(childCategory, index)
    {
      var buttonHTML = getHTMLForButton(childCategory.name, clicked_id + "_" + childCategory.name, subMenuLevel);
      $("#"+divIds[subMenuLevel]).append(buttonHTML);
    });
  }
  //If the user clicked on a leaf node
  else
  {
    setTimeout(function()
    {
      console.log("Classify " + clicked_id);
        //onClipClassified(clicked_id);
    }, 15000);
    hideAllButtons();
  }

  //Special case the user clicked on add category
  if (clicked_id == "Edit")
  {
      return;
  }
}