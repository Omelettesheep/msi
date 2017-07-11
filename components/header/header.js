;
(function($,window,document,undefined){
	var myPluginName = 'headerPlugin';


	var defaults = {
		defaultIcon:'glyphicon glyphicon-tasks',
		userid:93109,
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
		this.settings = $.extend({}, this._defaults, options);
		this.init();
	}

	cotrPlugin.prototype = {
		// 初始化空框架
		init:function(){
			if(window.storage){
				var storage = window.localStorage
			}
			
			this.headerStr = ' <header class="main-header"><div class="title"><h1>'+this.settings.systemName+'</h1></div><div class="user"><div class="dropdown"><div class="dropdown-toggle user-action" id="dropdownMenu1" data-toggle="dropdown"><i class="glyphicon glyphicon-user"></i>'+this.settings.userName+'<span class="caret"></span></div><ul class="dropdown-menu text-right" role="menu" aria-labelledby="dropdownMenu1"><li role="presentation"><a role="menuitem" tabindex="-1" href="../login.html">退出登录</a></li></ul></div></div><ul class="right-nav"><li><div class="back"><a href="home.html"><i class="glyphicon glyphicon-home"></i><span>mis菜单</span></a></div></li><li><div class="back"><i class="glyphicon glyphicon-home"></i><span>员工号:'+this.settings.userid+'</span></a></div></li></ul><div class="clearfix"></div></header>';

			this.appendElement();
		},
		// 添加空框架
		appendElement:function(){
			this.element.before(this.headerStr);
			this.render();
		},
		// 渲染数据
		render:function(){
			this.headerRender();
		},

		
		// 渲染侧边栏
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