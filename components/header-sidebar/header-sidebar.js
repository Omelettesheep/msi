;
(function($,window,document,undefined){
	var myPluginName = 'headerSidebar';

	var menudata = [
        {
            "menu-name":"表单",
            "menu-icon":"glyphicon glyphicon-pencil",
            "url":"www.baidu.com",
            "children":[
                {
                    "menu-sub-name":"基础表单",
                    "url":"../pages/autoReport-mis.html"
                }

            ]

        },
        {
            "menu-name":"表格",
            "menu-icon":"glyphicon glyphicon-th",
            "children":[
                {
                    "menu-name":"基础表格",
                    "children":[{
                    	"url":"../pages/normalTable.html",
                    	"menu-name":"基础表格1"

                    }]
                }

            ]

        },
        {
            "menu-name":"数据网格",
            "menu-icon":"glyphicon glyphicon-equalizer",
            "children":[
                {
                    "menu-name":"Datagrid",
                    "url":"../pages/datagrid.html"
                }

            ]

        },
        {
            "menu-name":"树形控件",
            "menu-icon":"glyphicon glyphicon-tree-conifer",
            "children":[
                {
                    "menu-name":"Tree",
                    "url":"../pages/tree.html"
                }

            ]

        },
        {
            "menu-name":"charts图形",
            "menu-icon":"glyphicon glyphicon-leaf",
            "children":[
                {
                    "menu-name":"charts图形库",
                    "url":"../pages/chart-mis.html"
                }

            ]

        },
        {
            "menu-name":"tab选项卡",
            "url":"../pages/tabs.html"
            // "menu-icon":"glyphicon glyphicon-leaf",

        }
    ]

    var navlist = [
    	{
	    	name:'home',
	    	action:function(){
	    		window.location.href = '../pages/home.html'
	    	}
	    }
    ]

	var defaults = {
		menu:menudata,
		defaultIcon:'glyphicon glyphicon-tasks',
		userName:(function(){
			if(window.localStorage){
				return window.localStorage.getItem('misUserName')||'未登录'
			}
			else{
				return 'unknown user'
			}
		})(),
		systemName:(function(){
			if(window.localStorage){
				return window.localStorage.getItem('misSystemName')||'Mis System'
			}
			else{
				return 'Mis System' 
			}
		})()
	}

	
	var cotrPlugin = function(element, options) {
		this.element = element;
		this._defaults = defaults;
		this.menuStr = '';
		console.log(options)
		this.settings = $.extend({}, this._defaults, options);
		console.log(this.settings)
		this.init();
	}

	cotrPlugin.prototype = {
		// 初始化空框架
		init:function(){
			if(window.storage){
				var storage = window.localStorage
			}
			this.sidebarStr = '<aside class="main-sidebar"><div class="sidebar-head"><a href="#"><i class="glyphicon glyphicon-menu-left"></i></a></div><ul class="sidebar-menu"></ul></aside>';
			
			this.headerStr = ' <header class="main-header"><a href="#"><i class="glyphicon glyphicon-menu-hamburger"></i></a><div class="title"><h1>'+this.settings.systemName+'</h1></div><div class="user"><div class="dropdown"><div class="dropdown-toggle user-action" id="dropdownMenu1" data-toggle="dropdown"><i class="glyphicon glyphicon-user"></i>'+this.settings.userName+'<span class="caret"></span></div><ul class="dropdown-menu text-right" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="../login.html">退出登录</a></li></ul></div></div><ul class="right-nav"><li><div class="back"><a href="home.html"><i class="glyphicon glyphicon-home"></i><span>mis菜单</span></a></div></li></ul><div class="clearfix"></div></header>';

			this.appendElement();
		},
		// 添加空框架
		appendElement:function(){
			this.element.before(this.sidebarStr);
			this.element.before(this.headerStr);
			this.render();
		},
		// 渲染数据
		render:function(){
			this.sidebarRender();
			this.headerRender();
		},

		getMenu:function(menuarr,father,floor){
			var _this = this;
			var fatherPrefix = father.attr('name')||1; 
			$.each(menuarr,function(index,item){
				var itemPrefix = fatherPrefix+'-'+index;
				_this.menuStr = '';
				_this.menuStr+='<li class="treeview" name="'+itemPrefix+'"><a href="javascript:void(0);"><i class="sidebar-icon '+(item["menu-icon"]?item["menu-icon"]:_this.settings.defaultIcon)+'"></i><span>'+(item['menu-name']?item['menu-name']:item['menu-sub-name'] )+'</span><i class="right-icon glyphicon glyphicon-menu-right" ></i></a></li>'
				father.append(_this.menuStr);
				$('.treeview[name="'+itemPrefix+'"]').addClass('floor-'+floor);
				if(item.url){
					$('.treeview[name="'+itemPrefix+'"] a').attr('href',item.url);
					$('.treeview[name="'+itemPrefix+'"] .right-icon').css('display','none');
					$('.treeview[name="'+itemPrefix+'"]').addClass('node');
					return;
				}
				else{
					$('.treeview[name="'+itemPrefix+'"] a').addClass('f-node');
					_this.getMenu(item.children,$('.treeview[name="'+itemPrefix+'"]'),floor+1);
				}
			})
		},
		// 渲染侧边栏
		sidebarRender:function(){
			var menuHeader = '<li class="header">MAIN NAVIGATION</li>'
			$('.sidebar-menu').append(menuHeader)
			this.getMenu(this.settings.menu,$('.sidebar-menu'),1);

			$('.sidebar-head').on('click',function(){
		        $('.content').css('margin-left','0px');
		        $('.main-sidebar').hide();
		        $('.main-header>a').show();
		        $('.main-header').css('margin-left','0px');

		    })

		    $('.sidebar-menu').on('click','.f-node',function(){
		    	if($(this).find('.right-icon').hasClass('glyphicon-menu-right')){
		    		$(this).find('.right-icon').removeClass('glyphicon-menu-right').addClass('glyphicon-menu-down');
		    		$(this).parent().find('>.treeview').css('display','block');

		    	}
		    	else{
		    		$(this).find('.right-icon').removeClass('glyphicon-menu-down').addClass('glyphicon-menu-right');
		    		$(this).parent().find('>.treeview').css('display','none');
		    	}

		    })

		},
		headerRender:function(){
			$('.main-header>a').on('click',function(){
		 		$(this).hide();
	        	$('.main-sidebar').show();
	        	$('.main-header').css('margin-left','230px');
	        	$('.content').css('margin-left','230px');
       

    		})
		}
	}


	$.fn[myPluginName] = function(options) {
		var obj = new cotrPlugin(this, options);
	}
	
})(jQuery,window,document)