/**
 * Created by madam on 2/1/16.
 */
/**
 * Created by madam on 1/22/16.
 */

$(document).ready(function() {

    $( "#birthday" ).datepicker({
        dateFormat: 'dd/mm/yy',
        showOn: "button",
        buttonImage: "images/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date"

    }).val();
    $( "#passport1" ).datepicker({
        dateFormat: 'dd/mm/yy',
        showOn: "button",
        buttonImage: "images/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date"
    });
    $( "#passport2" ).datepicker({
        dateFormat: 'dd/mm/yy',
        showOn: "button",
        buttonImage: "images/calendar.gif",
        buttonImageOnly: true,
        buttonText: "Select date"
    });

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

        $("#saveload").css('display','none');
        $("#state").css('display','none');

        $('#nameborder').html(result.data.name + ' ' + result.data.second_name);

        $('#profile-headname').html(result.data.name + ' ' + result.data.second_name);

        $('#profile-parentname').html(result.data.father_lastname + ' ' + result.data.mother_lastname);
        //name
        $('#profile-name').val(result.data.name);
        //second_name
        $('#profile-secondname').val(result.data.second_name);
        //father_name
        $('#profile-fathername').val(result.data.father_lastname);
        //mother_name
        $('#profile-mothername').val(result.data.mother_lastname);


        $('#notes').val(result.data.notes);
        //sender

        if(result.data.gender == 'M')
        {
            $('#profile-gender').val('Male');
        }
        else if(result.data.gender == 'F')
        {
            $('#profile-gender').val('Female');
        }
        //email
        $('#profile-email').val(result.data.email);

        //password
        var password = window.localStorage["password"];
        $('#profile-password').val(password);

        //Birthday
        if(!result.data.birthday){
            $('#birthday').val('');
        }else
        {
            var birthday1 =result.data.birthday.split('T')[0];
            var birthday2 = birthday1.split('-');
            $('#birthday').val(birthday2[2] + '/' + birthday2[1] + '/' + birthday2[0]);
        }

        //profiel-passport1
        $('#profile-passport1').val(result.data.passport);
        if(!result.data.passport_expire){
            $('#passport1').val('');
        }else{
            var res_1 =result.data.passport_expire.split('T')[0];
            var res1 = res_1.split('-');
            $('#passport1').val(res1[2]+'/'+res1[1]+'/'+res1[0]);
        }

          //profile-passport2
        $('#profile-passport2').val(result.data.passport2);
        if(!result.data.passport_expire2){
            $('#passport2').val('');
        }else{
            var res_2 = result.data.passport_expire2.split('T')[0];
            var res2 = res_2.split('-');
            $('#passport2').val(res2[2]+'/'+res2[1]+'/'+res2[0]);

        }



        var p=result.data.file;
        if(result.data.file=='')
        {
            $('#profile-photo-url').val('');

        }else
        {
            $('#profile-photo-url').val(p);

        }
        $('#photouser').css('background-image','url('+p+')');
        $('#profile-photoimage').css('background-image','url('+p+')');

        });

    $("#save_button").click(function () {
        $("#saveload").css('display','block');
        $("#state").css('display','block');

        var profile_name = $('#profile-name').val();

        var profile_secondname = $('#profile-secondname').val();

        var profile_fathername = $('#profile-fathername').val();

        var profile_mothername = $('#profile-mothername').val();


        var profile_sendgender = $('#profile-gender').val();

        var profile_gender;
        if(profile_sendgender=='Male') {
            profile_gender = 'M';
        }
        else
        {
                profile_gender = 'F';
        }

        var profile_email = $('#profile-email').val();

        var profile_password = $('#profile-password').val();

        var profile_birthday1 = $('#birthday').val().split('/');
        var profile_birthday = profile_birthday1[2] + '-' + profile_birthday1[1] + '-' + profile_birthday1[0];

        var profile_passport1 = $('#profile-passport1').val();


        var profile_passportdate1 = $('#passport1').val().split('/');
        var passportdate1;
        if(profile_passportdate1=='')
        {
            passportdate1="";
        }
        else{
            passportdate1 = profile_passportdate1[2] + '-' + profile_passportdate1[1] + '-' + profile_passportdate1[0];
        }

        var profile_passport2 = $('#profile-passport2').val();

        var profile_passportdate2 = $('#passport2').val().split('/');
        var passportdate2;
        if(profile_passportdate2=='')
        {
            passportdate2="";
        }
        else{
         passportdate2 = profile_passportdate2[2] + '-' + profile_passportdate2[1] + '-' + profile_passportdate2[0];
        }

        var profile_photo_url = $('#profile-photo-url').val();

        var notes = $('#notes').val();
        $.ajax({
            method: "PUT",
            url: "http://turismoexmar.com/api/users/" + post_userid,
            dataType: "json",
            context: document.body, beforeSend: function (xhr) {
                xhr.setRequestHeader("Authorization", "Bearer " + post_token)
            },
            data: {
                id: post_userid,
                name: profile_name,
                second_name: profile_secondname,
                father_lastname: profile_fathername,
                mother_lastname: profile_mothername,
                gender: profile_gender,
                email: profile_email,
                password: profile_password,
                birthday: profile_birthday,
                passport: profile_passport1,
                passport_expire: passportdate1,
                passport2: profile_passport2,
                passport_expire2: passportdate2,
                file: profile_photo_url,
                notes:notes
            }
        }).done(function(result2) {

            navigator.notification.alert('Tus datos han sido guardados!',null,'Gurardar éxito','bueno');

            $("#saveload").css('display','none');
            $("#state").css('display','none');
        });
    });

});


