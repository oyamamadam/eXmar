/**
 * Created by madam on 2/3/16.
 */
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
        url: "http://turismoexmar.com/api/users/" + post_userid,
        dataType: "json",
        context: document.body, beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + post_token);
        }
    }).done(function(result) {

        $('#nameborder').html(result.data.name + ' ' + result.data.second_name);

        var p=result.data.file;
        $('#profile-photoimage').css('background-image','url('+p+')');

    });

});


