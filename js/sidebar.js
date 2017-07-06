    var menuInitStr = '';
    menuInitStr+='<li class="header">MAIN NAVIGATION</li>'
    $('.sidebar-menu').append(menuInitStr);
    var menudata = [
        {
            "menu-name":"表单",
            "menu-icon":"glyphicon glyphicon-pencil",
            "children":[
                {
                    "menu-sub-name":"输入框",
                    "url":"../pages/input.html"
                }

            ]

        },
        {
            "menu-name":"表格",
            "menu-icon":"glyphicon glyphicon-th",
            "children":[
                {
                    "menu-sub-name":"普通表格",
                    "url":"../pages/normalTable.html"
                }

            ]

        }
    ]

    $.each(menudata,function(index,item){
        //一级菜单
        menuInitStr = '';
        menuInitStr+='<li class="treeview">'+
                        '<a href="javascript:void(0);">'+
                            '<i class="sidebar-icon '+item["menu-icon"]+'"></i>'+
                                '<span>'+item['menu-name']+'</span>'+
                                    '<i class="right-icon glyphicon glyphicon-menu-right" ></i>'+
                                        '</a></li>';
        $('.sidebar-menu').append(menuInitStr);
        //二级菜单
        if(item.children.length){
            var menusubStr = '';
            $.each(item.children,function(index,item){
                menusubStr += '<li class="treeview-sub">'+'<a href="'+item['url']+'">'+'<span>'+item['menu-sub-name']+'</span>'+'</a></li>'
            })
            $('.sidebar-menu .treeview:eq('+index+')').append(menusubStr);
        }
    })
    
    var close = true;
    $('.sidebar-menu').on('click','.treeview a',function(index,item){
        $(this).parent().find('.treeview-sub').toggle();
        console.log(close);
        if(close) {
            // console.log("close")
            $(this).find('.right-icon').removeClass('glyphicon-menu-right');
            $(this).find('.right-icon').addClass('glyphicon-menu-down');
        }
        else {
            // console.log('no-close');
            $(this).find('.right-icon').removeClass('glyphicon-menu-down');
            $(this).find('.right-icon').addClass('glyphicon-menu-right');
        }
        close = !close;
        
    })

    $('.sidebar-head').on('click',function(){
        $('.main-sidebar').hide();
        $('.main-header>a').show();
    })