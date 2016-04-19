/**
 * Created by madam on 2/9/16.
 */

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function getDate(start_date) {

    var first_date = start_date;
    var second_date = first_date.split("-");
    var stringToParse = second_date[0] + "/" + second_date[1] + "/" + second_date[2];
    var dateString = stringToParse.match(/\d{4}\/\d{2}\/\d{2}\s+\d{2}:\d{2}/);
    var dt = new Date(dateString);
    var dr = dt.toString();
    var q = dr.split("GMT")[0];
    var w = q.split(":");
    var e = w[0] + ":" + w[2];
    var r = e.split(" ");
    var list_date = "  " + r[0] + " " + r[2] + " " + r[1] + " " + r[3] + " " + r[4];
    return list_date;
}
function get_typename(typename) {

    if (typename == "Hotel") {
        var type = "fa fa-bed";
    }
    else if (typename == "Restaurante ") {
        var type = "fa fa-cutlery";
    }
    else if (typename == "Atracción") {
        var type = "fa fa-camera-retro"
    }
    return type;
}

$(document).ready(function () {


    var post_token = window.localStorage["token"];

    var itienary_id = getParameterByName("itinerary_id");

    var name = getParameterByName("name");
    var date = getParameterByName("date");


    $('#arrival_city').html(name);
    $('#density_date').html(date);


    $.ajax({
        method: "GET",
        url: "http://turismoexmar.com/api/itineraries/details/" + itienary_id,
        dataType: "json",
        context: document.body, beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + post_token);
        }
    }).done(function (result1) {

        $("#saveload").css('display','none');
        $("#state").css('display','none');


        var list = "";

        for (var i = 0; i < result1.data.destinations.length; i++) {

            var destination_id = result1.data.destinations[i].id;

            var ar = ["fa-plane", "fa-train", "fa-car", "fa-ship", "fa-bus", "fa-rocket"];
            var n = result1.data.destinations[i].type;
            var dev_type = ar[n];

            var departure_date = getDate(result1.data.destinations[i].departure_date);

            var depart_city = result1.data.destinations[i].departure_city_name;

            list += '<a href="trip_details1.html?destination_id=' + destination_id + '"><div class="borderlist">' +
            '<div class="lineborder-1"></div>' +
            '<div class="rightside-image2">' +
            '<i class="imagefont fa ' + dev_type + '"></i>' +
            '</div>' +
            '<div class="listhead1">' +
            '<div>' +
            '<i class="fa fa-calendar"><span class="font1">' + "  " + departure_date + '</span></i>' +
            '</div>' +
            '<div>' +
            '<i class="fa fa-map-marker"><span class="font1">' + "  " + depart_city + '</span></i>' +
            '</div>' +
            '</div>' +
            '</div></a>';

            var arrival_city = result1.data.destinations[i].arrival_city_name;

            var arrival_date = getDate(result1.data.destinations[i].arrival_date);

            if (dev_type == ar[1] || dev_type == ar[2] || dev_type == ar[3] || dev_type == ar[4]) {
                list += '<a href="trip_details2.html?destination_id=' + destination_id + '"><div class="borderlist" id="aa">' +
                '<div class="lineborder-1"></div>' +
                '<div class="rightside-image1">' +
                '<i class="imagefont  fa ' + dev_type + '"></i>' +
                '</div>' +
                '<div class="listhead1">' +
                '<div>' +
                '<i class="fa fa-calendar"><span class="font1" id="a">' + "  " + arrival_date + '</span></i>' +
                '</div>' +
                '<div>' +
                '<i class="fa fa-map-marker"><span class="font1">' + "  " + arrival_city + '</span></i>' +
                '</div>' +
                '</div>' +
                '</div></a>';
            } else if (dev_type == ar[0] || dev_type == ar[5]) {

                list += '<a href="trip_details2.html?destination_id=' + destination_id + '"><div class="borderlist" id="aa">' +
                '<div class="lineborder-1"></div>' +
                '<div class="rightside-image1">' +
                '<i class="imagefont rotate_right fa ' + dev_type + '"></i>' +
                '</div>' +
                '<div class="listhead1">' +
                '<div>' +
                '<i class="fa fa-calendar"><span class="font1" id="a">' + "  " + arrival_date + '</span></i>' +
                '</div>' +
                '<div>' +
                '<i class="fa fa-map-marker"><span class="font1">' + "  " + arrival_city + '</span></i>' +
                '</div>' +
                '</div>' +
                '</div></a>';
            }

        }
        var list1 = "";
        for (var j = 0; j < result1.data.activities.length; j++) {

            var lo_name = result1.data.activities[j].location_name;

            var start_lo = result1.data.activities[j].start;

            var lo_start = getDate(start_lo);

            var typename = result1.data.activities[j].location_type_name;

            var typename1 = get_typename(typename);

            var location_id = result1.data.activities[j].id;


            list1 += '<a href="trip_details3.html?location_id=' + location_id + '"><div class="borderlist">' +
            '<div class="lineborder-1"></div>' +
            '<div class="rightside-image1">' +
            '<i class="imagefont ' + typename1 + '"></i>' +
            '</div>' +
            '<div class="listhead1">' +
            '<div >' +
            '<i class="fa fa-calendar"><span class="font1">' + lo_start + '</span></i>' +
            '</div>' +
            '<div>' +
            '<i class="fa fa-map-marker"><span class="font1">' + "  " + lo_name + '</span></i>' +
            '</div>' +
            '</div>' +
            '</div></a>';
        }

        $('#material-container').append(list);
        $('#material-container').append(list1);

    });
});
