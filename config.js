var config_path = overwolf.io.paths.localAppData + "/overwolf/extensions/" + extension_id + "/0.0.1/config.json"

class Category
{
    constructor(name, categoryCollection, level)
    {
        this.name = name;
        this.categoryCollection = categoryCollection;
    }
}
var RageCat = new Category("Rage", null);
var TeamkillsCat = new Category("Teamkill", null);
var SuspiciousCat = new Category("Suspicious", null);
var LuckyShotsCat = new Category("Lucky Shots", null);
var ClutchesCat = new Category("Clutches", null);
var TrollCat = new Category("Troll", null);
var FunnyQuotesCat = new Category("Funny quotes", null);
var NiceRoundsCat = new Category("Nice rounds", null);

var NiklasCat = new Category("Niklas", null);
var CeddiCat = new Category("Ceddi", null);
var KevinCat = new Category("Kevin", null);
var ManuCat = new Category("Manu", null);
var OleCat = new Category("Ole", null);
var WullyCat = new Category("Wully", null);

var CatA = new Category("A", null);
var CatB = new Category("B", null);
var CatC = new Category("C", null);

var SubAA = new Category("AA", null);
var SubAB = new Category("AB", null);

var SubBA = new Category("BA", null);
var SubBB = new Category("BB", null);

var SubCA = new Category("CA", null);
var SubCB = new Category("CB", null);

var CategoryDict = [];

RageCat.categoryCollection =  [NiklasCat, CeddiCat, KevinCat, ManuCat, OleCat, WullyCat];
TeamkillsCat.categoryCollection = [CatA, CatB, CatC];
CatA.categoryCollection = [SubAA, SubAB];
CatB.categoryCollection = [SubBA, SubBB];
CatC.categoryCollection = [SubCA, SubCB];

var rootCategoryCollection = [RageCat, TeamkillsCat, SuspiciousCat, LuckyShotsCat, ClutchesCat, TrollCat, FunnyQuotesCat, NiceRoundsCat];

console.log(rootCategoryCollection);

var config = 
{
  path: "",
  categories: rootCategoryCollection
}

function onConfigWriteCompleted(status)
{
  console.log(status);
}
function setupCategories()
{
    var level = 0;
    console.log(config);
    config.categories.forEach(function(category, index)
        {
            processCategory(category, index, level, category.name);
        });
}
function processCategory(category, index, level, fullCatName)
{

  if(level == 0)
  {
    var buttonHTML = getHTMLForButton(category.name, fullCatName, level);
    $("#"+divIds[level]).append(buttonHTML);
  }
  category.level = level;
  CategoryDict[fullCatName] = category;
  
  if(category.categoryCollection)
  {
    category.categoryCollection.forEach(function(childCategory, index)
      {
          processCategory(childCategory, index, level + 1, fullCatName + "_" + childCategory.name);
      });
  }

}
function onConfigReadCompleted(status)
{
  console.log(status);
  if(status.success)
  {
    config = JSON.parse(status.content)
    setupCategories()
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
      console.log(configStr);
      overwolf.io.writeFileContents(config_path, configStr, "UTF8", false, onConfigWriteCompleted);
    }
    else if (status.status == "success" && status.found)
    {
      overwolf.io.readFileContents(config_path, "UTF8", onConfigReadCompleted);
    }
  });
}