/**
 * Created by madam on 2/23/16.
 */
/**
 * Created by madam on 2/9/16.
 */


$(document).ready(function () {

    var post_token = window.localStorage["token"];
    var user_id = window.localStorage["user_id"];

    $.ajax({
        method: "GET",
        url: "http://turismoexmar.com/api/users/contact/" + user_id,
        dataType: "json",
        context: document.body, beforeSend: function (xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + post_token);
        }
    }).done(function (result) {

        $("#saveload").css('display','none');
        $("#state").css('display','none');

        var name;
        var second_name;
        var father_name;
        var mother_name;
        var email;
        var telephone;
        for (var i = 0; i < result.data.agent.length; i++) {
            name = result.data.agent[i].name;
            second_name = result.data.agent[i].second_name;
            father_name = result.data.agent[i].father_lastname;
            mother_name = result.data.agent[i].mother_lastname;
            email = result.data.agent[i].email;
            telephone = result.data.agent[i].telephone;
        }
        $("#call").click(function () {
            window.location.href = "tel:" + telephone;
        });

        $('#agente_name').html("Agente: " + name + " " + second_name + " " + father_name + " " + mother_name);
        $('#telenumber').html(telephone);
        $('#email').html("Email:" + email);

        $("#message_button").click(function () {

            var em = document.getElementById("send_email");
            var send_emails = em.options[em.options.selectedIndex].value;
            var title = em.options[em.options.selectedIndex].text;
            var sub_title = title+" app Exmar "+$('#contactEmailField').val();
            var message = $('#contactMessageTextarea').val();


            cordova.plugins.email.open({
                to: send_emails,
                cc:email,
                subject: sub_title,
                body: message,
                isHtml: true
            });


        });
    });

});
