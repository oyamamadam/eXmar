/**
 * Created by madam on 2/1/16.
 */
/**
 * Created by madam on 1/22/16.
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
       // alert(JSON.stringify(result.data.as_user.length));
        for (var i=0;i<result.data.as_user.length;i++)
        {
            var itinerary_id=result.data.as_user[i].id;
            var name=result.data.as_user[i].name;


            var res1 =result.data.as_user[i].start.split('-');
            var res2 =result.data.as_user[i].end.split('-');
            var res3=res1[2]+"/"+res1[1]+"/"+res1[0] + ' - ' + res2[2]+"/"+res2[1]+"/"+res2[0];


            str+='<a href="travel_list.html?itinerary_id='+itinerary_id+'&&name='+name+'&&date='+res3+'"><div class="border1">'+
        '<div class="lineborder-1"></div>'+
            '<div class="tablecell" >'+
            '<div class="table1">'+ result.data.as_user[i].name+ '</div>'+
            '<div class="table2">'+res3+
            '</div>'+
            '<div class="table3">'+result.data.as_user[i].days + "dias"+
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
            //alert(JSON.stringify(result.data.as_group.length));
            var itinerary_id= result.data.as_group[i].id;
            var group_name=result.data.as_group[i].name;
            var group1 =result.data.as_group[i].start.split('-');
            var group2 =result.data.as_group[i].end.split('-');
            var group3=group1[0]+"/"+group1[1]+"/"+group1[2] + ' - ' + group2[0]+"/"+group2[1]+"/"+group2[2];

            group+='<a href="travel_list.html?itinerary_id='+itinerary_id+'&&name='+group_name+'&&date='+group3+'"><div class="border1">'+
            '<div class="lineborder-1"></div>'+
            '<div class="tablecell" >'+
            '<div class="table1">'+ result.data.as_group[i].name+ '</div>'+
            '<div class="table2">'+group3+
            '</div>'+
            '<div class="table3">'+result.data.as_group[i].days + "dias"+
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

