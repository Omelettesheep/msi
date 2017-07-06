$('.main-header>a').on('click',function(){
	 	$(this).hide();
        $('.main-sidebar').show();
        $('.main-header').css('margin-left','230px');
        $('.content').css('margin-left','230px');
       

    })