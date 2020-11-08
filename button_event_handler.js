mode = "Undef"

function showButtons()
{
    $('#Buttons').css('visibility','visible');
    $("#Buttons").children().show();
}
function hideButtons()
{
    $('#Buttons').css('visibility','hidden');
    $("#Buttons").children().hide();
}

function onButtonClick(clicked_id)
{
    console.log(clicked_id)
    switch(clicked_id)
    {
        case "Rage":
            $('#NameSelect').css('visibility','visible');
            $("#NameSelect").children().show();

            mode = "Rage"
            break;
        case "Teamkills":
            onClipClassified("Teamkills")
            hideButtons()
            break;
        case "Suspicious":
            onClipClassified("Suspicious")
            hideButtons()
            break;
        case "Lucky Shots":
            onClipClassified("Lucky Shots")
            hideButtons()
            break;
        case "Clutches":
            onClipClassified("Clutches")
            hideButtons()
            break;
        case "Troll":
            onClipClassified("Troll")
            hideButtons()
            break;
        case "Spruche":
            onClipClassified("Spruche")
            hideButtons()
            break;
        case "Runden":
            onClipClassified("Runden")
            hideButtons()
            break;
    }
}
function onNameButtonClick(clicked_id)
{
    console.log(clicked_id)
    $('#NameSelect').css('visibility','hidden');
    $("#NameSelect").children().hide();

    onClipClassified(mode + "_" + clicked_id);
}