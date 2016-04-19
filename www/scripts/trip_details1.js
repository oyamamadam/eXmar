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


$(document).ready(function() {

    $("#preloader").css('display','block');
    $("#status").css('display','block');

    var post_token =  window.localStorage["token"];
    var destination_id=getParameterByName("destination_id");

    $.ajax({
        method: "GET",
        url: "http://turismoexmar.com/api/itineraries_cities/details/" + destination_id,
        dataType: "json",
        context: document.body, beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + post_token);
        }
    }).done(function (result) {

        $("#saveload").css('display','none');
        $("#state").css('display','none');

        var start_f;
        var departcity;
        var reservation;
        var comments;
        var userslist="";
        var groups="";
        for (var i=0;i<result.data.destination.length;i++)
        {

            start_f=result.data.destination[i].start_date;
            departcity=result.data.destination[i].departure_city_name;
            reservation=result.data.destination[i].reservation;
            comments=result.data.destination[i].comments;
        }

        for (var i=0;i<result.data.users.length;i++)
        {

           var  users=result.data.users[i].user;
            userslist+='<a><div class="tripdetail_cell2">'+users+
            '</div><a>';
        }
        for (var i=0;i<result.data.groups.length;i++)
        {

            var grouplist=result.data.groups[i].user;
            groups+='<a><div class="tripdetail_cell2">'+grouplist+
            '</div><a>';
        }

        var start=getDate(start_f);

        $('#start_date').html(start);
        $('#depart_name').html(departcity);
        $('#reservation').html(reservation);
        $('#comments').html(comments);
        $('#users_list').append(userslist);
        $('#group_list').append(groups);
    });
});
