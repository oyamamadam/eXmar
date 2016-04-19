/**
 * Created by madam on 2/17/16.
 */
/**
 * Created by madam on 2/1/16.
 */


$(document).ready(function() {


    var post_token =  window.localStorage["token"];
    var post_userid = window.localStorage["user_id"];


    $.ajax({
        method: "GET",
        url: "http://turismoexmar.com/api/itineraries/index/" + post_userid,
        dataType: "json",
        context: document.body, beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + post_token);}
    }).done(function(result) {

        $("#saveload").css('display','none');
        $("#state").css('display','none');

        window.localStorage["travel_main"]=JSON.stringify(result.data);

        var str="";
        for (var i=0;i<result.data.as_user.length;i++)
        {
            var days=result.data.as_user[i].days;
            var name=result.data.as_user[i].name;

            str+='<a><div class="border_sugg">'+
            '<div class="lineborder-1"></div>'+
            '<div class="tablecell1" >'+
            '<div class="table1">'+ name+ '</div>'+

            '<div class="table2">'+days + " dias"+
            '</div>'+
            '</div>'+
            '<div class="rightside-image">'+
            '<img src="images/rightside.png" style="width: 30px">'+
            '</div>'+
            '</div></a>';
        }
        $('#material-container').append(str);


        var group="";

        for (var i=0;i<result.data.as_group.length;i++)
        {

            var days= result.data.as_group[i].days;
            var group_name=result.data.as_group[i].name;
            group+='<a><div class="border_sugg">'+
            '<div class="lineborder-1"></div>'+
            '<div class="tablecell" >'+
            '<div class="table1">'+ group_name+ '</div>'+
            '<div class="table4">'+days + " dias"+
            '</div>'+
            '</div>'+
            '<div class="rightside-image">'+
            '<img src="images/rightside.png" style="width: 30px">'+
            '</div>'+
            '</div></a>';

        }
        $('#material-container').append(group);

    });
});

