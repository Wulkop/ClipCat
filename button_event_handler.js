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

    if (clicked_id == "Rage")
    {
        $('#NameSelect').css('visibility','visible');
        $("#NameSelect").children().show();
        mode = "Rage"
        return;
    }

    if (clicked_id == "Add category")
    {
        return;
    }
    onClipClassified(clicked_id);
    hideButtons();
}
function onNameButtonClick(clicked_id)
{
    console.log(clicked_id)
    $('#NameSelect').css('visibility','hidden');
    $("#NameSelect").children().hide();

    onClipClassified(mode + "_" + clicked_id);
}