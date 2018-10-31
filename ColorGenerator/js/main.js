/*
HCLPicker
Copyright (C) 2018 jackw01
This program is distrubuted under the MIT License, see LICENSE for details
*/

var colors = [];
var currentColor = 0;

function update() {

    var h = parseInt($("#h").val());
    var c = parseInt($("#c").val());
    var l = parseInt($("#l").val());

    for (var i = 0; i < 8; i++) {
        colors[i][1] = c;
        colors[i][2] = l;
    }

    colors[currentColor] = [h, c, l];
    color = chroma.hcl(colors[currentColor]);

    var hex = color.hex();
    var rgb = color.rgb();
    var hsl = color.hsl();
    var hsv = color.hsv();
    var lab = color.lab();

    $("#output-color div").html(`Hex: ${hex}<br>RGB: (${rgb[0]}, ${rgb[1]}, ${rgb[2]})<br>HSL: (${hsl[0].toFixed(0)}, ${hsl[1].toFixed(2)}, ${hsl[2].toFixed(2)})<br>HSV: (${hsv[0].toFixed(0)}, ${hsv[1].toFixed(2)}, ${hsv[2].toFixed(2)})<br>LAB: (${lab[0].toFixed(2)}, ${lab[1].toFixed(2)}, ${lab[2].toFixed(2)})`);

    $("#output-color").css("background", hex);

    for (var i = 0; i < 8; i++) {
        $(`#${i}`).css("background", chroma.hcl(colors[i]).hex());
    }

    if (hsv[2] > 0.5) {
        $("#output-color div").css("color", "#1f2124");
    } else {
        $("#output-color div").css("color", "#cacaca");
    }
}

function getColors() {

    for (var i = 0; i < 8; i++) {
        var hsl = chroma.hcl(colors[i]).hsl();
        console.log(`${hsl[0].toFixed(0)}, ${hsl[1].toFixed(2) * 100.0}%, ${hsl[2].toFixed(2) * 100.0}%`);
    }
}

$(document).ready(function() {

    //new Math()

    for (var i = 0; i < 8; i++) {
        colors.push([202, 32, 58]);
    }

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

    $(".output-small").on("click", function() {
        currentColor = parseInt(this.id);
        $("#h").val(colors[currentColor][0]);
        $("#c").val(colors[currentColor][1]);
        $("#l").val(colors[currentColor][2]);
        $("#h-number").val(colors[currentColor][0]);
        $("#c-number").val(colors[currentColor][1]);
        $("#l-number").val(colors[currentColor][2]);
        update();
    });
});
