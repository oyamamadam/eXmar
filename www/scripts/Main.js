/**
 * Created by madam on 1/22/16.
 */


$(document).ready(function() {
    $("#saveload").css('display','none');
    $("#state").css('display','none');

   // $('#username').val(window.localStorage["user_email"]);
   // $('#password').val(window.localStorage["password"]);

    $("#login_button").click(function () {
        $("#saveload").css('display','block');
        $("#state").css('display','block');
        var userid=$('#username').val();
        var password=$('#password').val();

        $.ajax({
            method: "POST",
            url: "http://turismoexmar.com/api/users/token",
            data:{"email": userid,"password": password},
            dataType:"json"
        }).done(function(result) {

            $("#saveload").css('display','block');
            $("#state").css('display','block');


            window.localStorage["token"]= result.data.token;
            window.localStorage["user_id"]= result.data.user_id;


            window.localStorage["username"]= userid;
            window.localStorage["password"]= password;

            //$('#username').val(window.localStorage["user_email"]);
            //$('#password').val(window.localStorage["password"]);


            location.href="travel_main.html";

    }).fail(function(result){

            $("#saveload").css('display','none');
            $("#state").css('display','none');
        navigator.notification.alert('Nombre de usuario o contraseña no válidos',null,'error','bueno');
    });
    });
});

