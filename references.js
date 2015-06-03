var answer_button = $("#show-editor-button>input");
if (answer_button.length) {
    answer_button.on("click", reference);
} else {
    reference();
}

function reference() {
    var spacer2 = $("#wmd-spacer2");
    $("<li class='wmd-button' id='wmd-reference-button' title='References'><span></span></li>").insertBefore(spacer2);
    var index_spacer2 = spacer2.index();
    var pos_left = (index_spacer2 - 1) * 25;
    var reference_button = $("#wmd-reference-button");
    reference_button.css({
        "left": String(pos_left) + "px"
    });
    var reference_span = $("#wmd-reference-button>span");
    reference_span.css({
        "background-image": "url(http://i.imgur.com/QWgycXJ.png)",
        "margin-top": "2px",
        "margin-left": "2px"
    });
    reference_span.on("mouseover", function() {
        reference_span.css({
            "background-image": "url(http://i.imgur.com/so4eC8R.png)"
        });
    });
    reference_span.on("mouseout", function() {
        reference_span.css({
            "background-image": "url(http://i.imgur.com/QWgycXJ.png)"
        });
    });
    $("#wmd-olist-button").css({
        'left': String(pos_left + 35) + "px"
    });
    $("#wmd-ulist-button").css({
        'left': String(pos_left + 60) + "px"
    });
    $("#wmd-heading-button").css({
        'left': String(pos_left + 85) + "px"
    });
    $("#wmd-hr-button").css({
        'left': String(pos_left + 110) + "px"
    });

    function insertAtCaret(areaId, text) {
        var txtarea = document.getElementById(areaId);
        var scrollPos = txtarea.scrollTop;
        var strPos = 0;
        var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false));
        if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart('character', -txtarea.value.length);
            strPos = range.text.length;
        } else if (br == "ff") strPos = txtarea.selectionStart;
        var front = (txtarea.value).substring(0, strPos);
        var back = (txtarea.value).substring(strPos, txtarea.value.length);
        txtarea.value = front + text + back;
        strPos = strPos + text.length;
        if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart('character', -txtarea.value.length);
            range.moveStart('character', strPos);
            range.moveEnd('character', 0);
            range.select();
        } else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
        }
        txtarea.scrollTop = scrollPos;
    }
    var reference_number = 1
    reference_button.on("click", function() {
        var caretPos = document.getElementById("wmd-input").selectionStart;
        var textAreaTxt = $("#wmd-input").val();
        var txtToAdd = "<sup>[" + String(reference_number) + "]</sup>";
        $("#txt").val(textAreaTxt.substring(0, caretPos) + txtToAdd + textAreaTxt.substring(caretPos));
        reference_link = prompt("Reference Link: ");
        reference_name = prompt("Reference Name: ");
        insertAtCaret("wmd-input", "<sup>[" + String(reference_number) + "]</sup>\n\n")
        $('#wmd-input').val($('#wmd-input').val() + "<sup>[" + reference_number + ": " + reference_name + "][" + reference_number + "]</sup>\n\n");
        $("#wmd-input").val($('#wmd-input').val() + "  [" + reference_number + "]: " + reference_link + "\n\n");
        reference_number++;
    });
}