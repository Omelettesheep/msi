;
(function($, window, document, undefined) {
    console.log(1);
    var user = {};
    var li_str = ""
    $.getJSON("../mockdata/userInfo.json", function(data) {
        user = data;
        $('#username').html(user.username);
        $('#userimage').attr('src', user.images);
        console.log(user);
    })


    $.getJSON("../mockdata/homedata.json", function(data) {
        $.each(data, function(index, item) {
            li_str += '<li class="msi-box col-md-3">' +
                '<div class="thumbnail">' +
                '<img src="' + item.image + '" alt="...">' +
                '<div class="caption">' +
                '<h3>' + item.name + '</h3>' +
                '<p>' + item.info + '</p>' +
                '<p><a href="javascript:;" class="btn btn-primary entry" role="button">进入mis</a>' +
                '<a href="javascript:;" class="btn btn-default edit" role="button" >编辑简介</a>' +
                '</p>' +
                '</div>' +
                '</div>' +
                '</li>';

        })
        $('#box').html($(li_str));
    })

    $('#box').on('click','.entry',function(){
       var dst = $(this).parent().parent().children('h3').html().toLocaleLowerCase()
       window.location.href = dst+'-mis.html';
        

    })
})(jQuery, window, document)