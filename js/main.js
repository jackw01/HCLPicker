/*
HCLPicker
Copyright (C) 2018 jackw01
This program is distrubuted under the MIT License, see LICENSE for details
*/

function update() {

    var h = parseInt($("#h").val());
    var c = parseInt($("#c").val());
    var l = parseInt($("#l").val());

    var color = chroma.hcl(h, c, l);

    var hex = color.hex();
    var rgb = color.rgb();
    var hsl = color.hsl();
    var hsv = color.hsv();
    var lab = color.lab();

    $("#output-color div").html(`Hex: ${hex}<br>RGB: (${rgb[0]}, ${rgb[1]}, ${rgb[2]})<br>HSL: (${hsl[0].toFixed(0)}, ${hsl[1].toFixed(2)}, ${hsl[2].toFixed(2)})<br>HSV: (${hsv[0].toFixed(0)}, ${hsv[1].toFixed(2)}, ${hsv[2].toFixed(2)})<br>LAB: (${lab[0].toFixed(2)}, ${lab[1].toFixed(2)}, ${lab[2].toFixed(2)})`);

    $("#output-color").css("background", hex);

    if (hsv[2] > 0.5) {
        $("#output-color div").css("color", "#1f2124");
    } else {
        $("#output-color div").css("color", "#cacaca");
    }
}

$(document).ready(function() {

    update();

    $("#h, #c, #l").on("change mousemove touchmove", function() {
        $("#h-number").val(parseInt($("#h").val()));
        $("#c-number").val(parseInt($("#c").val()));
        $("#l-number").val(parseInt($("#l").val()));
        update();
    });

    $("#h-number, #c-number, #l-number").on("change mousemove touchmove mouseup keyup input", function() {
        $("#h").val(parseInt($("#h-number").val()));
        $("#c").val(parseInt($("#c-number").val()));
        $("#l").val(parseInt($("#l-number").val()));
        update();
    });
});
