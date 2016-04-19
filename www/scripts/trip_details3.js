/**
 * Created by madam on 2/17/16.
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

function getDate(start_date){

    var first_date=start_date;
    var second_date = first_date.split("-");
    var stringToParse=second_date[0]+"/"+second_date[1]+"/"+second_date[2];
    var dateString    = stringToParse.match(/\d{4}\/\d{2}\/\d{2}\s+\d{2}:\d{2}/);
    var dt  = new Date(dateString);
    var dr = dt.toString();
    var q = dr.split("GMT")[0];
    var w=q.split(":");
    var e=w[0]+":"+w[2];
    var r= e.split(" ");
    var list_date= "  "+r[0]+" "+r[2]+" "+r[1]+" "+r[3]+" "+r[4];
    return list_date;
}
function gethour(start_hours){

    var hour1 = start_hours;
    var hour2 = hour1.split(":");

    var hour = hour2[0] + ":" + hour2[1];
    return hour;
}

var map;
function initialize() {
    var x=parseFloat(lat);
    var y=parseFloat(long);

    var bangalore = { lat:x, lng:y };
    map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 17,
    center: bangalore
    });


 addMarker(bangalore, map);
 }
 function addMarker(location, map) {

 var marker = new google.maps.Marker({
 position: location,
 map: map
 });
 }


$(document).ready(function() {


    var post_token =  window.localStorage["token"];
    var location_id=getParameterByName("location_id");
    $.ajax({
        method: "GET",
        url: "http://turismoexmar.com/api/itineraries_locations/details/" + location_id,
        dataType: "json",
        context: document.body, beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + post_token);
        }
    }).done(function (result) {

        $("#saveload").css('display','none');
        $("#state").css('display','none');

        var date;
        var name;
        var comments;
        var nights;
        var reservation;
        var hour;
        var services="";
        var users="";


        for (var i=0;i<result.data.activities.length;i++)
        {

            var start=(getDate(result.data.activities[i].start));

            var end=getDate(result.data.activities[i].end);

            date = start+" - "+end;

            comments = result.data.activities[i].comments;

            nights = result.data.activities[i].nigths;

            reservation = result.data.activities[i].reservation;

            name=result.data.activities[i].name;

            lat=result.data.activities[i].latitude;
            long=result.data.activities[i].longitude;

            initialize();

            var check_in = gethour(result.data.activities[i].check_in);

            var check_out = gethour(result.data.activities[i].check_out);
            hour = "LUN - VIE: " + check_in + ":" + check_out;


        }


        for (var m=0;m<result.data.location_services.length;m++)
        {
            var services_list=result.data.location_services[m].name;

            services+='<a><div class="tripdetail_cell2">'+services_list+
            '</div><a>';
        }
        for (var k=0;k<result.data.users.length;k++)
        {

            var userlist=result.data.users[k].user;
            users+='<a><div class="tripdetail_cell2">'+userlist+
            '</div><a>';
        }

        $('#date').html(date);
        $('#arrival_name').html(name);
        $('#nights').html(nights + "  noches");
        $('#hour').html(hour);
        $('#reservation').html(reservation);
        $('#comments').html(comments);
        $('#service').append(services);
        $('#users_list').append(users);



    });
});
