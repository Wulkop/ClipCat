var activeCategory = null;
var inWiggleMode = false;
class Category
{
    constructor(name, categoryCollection, level)
    {
        this.name = name;
        this.categoryCollection = categoryCollection;
        this.level = level;
        this.btn = null;
    }
    setupHTML(fullName)
    {
      var button = document.getElementById(fullName);
      button.addEventListener("pointerdown", this.onMouseDown.bind(this));
      button.addEventListener("pointerup", this.onMouseUp.bind(this));

      this.btn = button;
    }
    onMouseDown()
    {
      console.log("Mouse down on btn: " + this.name);
      self.timerId = setTimeout(this.activateWiggle.bind(this), 1000)
    }
    onMouseUp()
    {
      console.log("Mouse up on btn: " + this.name);
      if(self.timerId)
      {
        clearTimeout(timerId);
        this.onButtonClick();
      }
    }
    activateWiggle()
    {
      console.log("Start wiggle");
      self.timerId = null; 

      var buttons = document.getElementsByClassName("btn");
      for(let button of buttons)
      {
        button.style.animationPlayState = "running";
      };

      inWiggleMode = true;
    }
    clearAllSubMenus()
    {
        var subMenuLevel = this.level + 1;
        //Clear all HTMl of submenues from a diffrent parent
        for (let i = subMenuLevel; i < maxMenuLevels; ++i)
        {
            $("#"+divIds[i]).html("");
        }
    }
    showSubMenus()
    {
        var subMenuLevel = this.level + 1;
        //Add HTMl of own children to DOM
        this.categoryCollection.forEach(function(childCategory, index)
        {
            var buttonHTML = getHTMLForButton(childCategory.name, this.btn.id + "_" + childCategory.name, subMenuLevel);
            $("#"+divIds[subMenuLevel]).append(buttonHTML);
            Object.setPrototypeOf(childCategory, Category.prototype);
            childCategory.setupHTML(this.btn.id + "_" + childCategory.name);
        }.bind(this));
    }
    onButtonClick()
    {
        if(inWiggleMode)
        {
            activeCategory = this;
            this.clearAllSubMenus();
            if(this.categoryCollection)
            {
                this.showSubMenus();
            }
            return;
        }

        if(this.categoryCollection)
        {
            this.clearAllSubMenus();
            this.showSubMenus();
        }
        //If the user clicked on a leaf node
        else
        {
            setTimeout(function()
            {
                console.log("Classify " + this.name);
                //onClipClassified(clicked_id);
            }, 15000);
            hideAllButtons();
        }
    }
}