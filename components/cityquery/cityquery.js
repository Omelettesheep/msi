;
(function($,window,document,undefined){
    var myPluginName = 'cityQueryPlugin';
    var fieldName = {
        province:{
            textField:'name',
            valueField:'name'
        },
        city:{
            textField:'name',
            valueField:'name',
        },
        area:{
            textField:'name',
            valueField:'name'
        }
    }


    var defaults = {
        data:[],
        url:'../mockdata/city.json',
        fieldName:fieldName,
        callback:function(provinceId,provinceName,cityId,cityName,areaId,areaName){
            console.log('province = ',provinceId,provinceName);
            console.log('city = ',cityId,cityName);
            console.log('area = ',areaId,areaName);
        }


    }

    
    var cotrPlugin = function(element, options) {
        this.element = element;
        this._defaults = defaults;
        this.cityStr = '';
        this.settings = $.extend({}, this._defaults, options);
        this.result = '';
        this.init();
    }

    cotrPlugin.prototype = {
        // 初始化空框架
        init:function(){
            if(window.storage){
                var storage = window.localStorage
            }
            var _this = this;
            $.getJSON(_this.settings.url, function(data) {
                _this.settings.data = data;
                _this.cityStr+='<div class="city"><label for="province">省</label><input id="province" name="province" /><label for="city">市</label><input id="city" name="city" /><label for="area">区</label><input id="area" name="area" /></div>'    
                _this.appendElement();
            })
            console.log(this.settings.data);
            
        },
        // 添加空框架
        appendElement:function(){
            this.element.append(this.cityStr);
            // $('#area').combobox('disable');
            
            this.render();
        },
        // 渲染数据
        render:function(){
            var data1 = this.settings.data;
            var fieldName = this.settings.fieldName;
            var result = this.result;
            var _this = this;
            
            $('#province').combobox({
                width:100,
                valueField: fieldName.province.valueField,
                textField:  fieldName.province.textField,
                data:data1,

                onSelect:function(province){
                    // console.log($('#province').combobox('getValue').fieldName.province.valueField);
                    $('#city').combobox('clear');
                    $('#area').combobox('clear');
                    $('#city').combobox('loadData', province.city);
                    $('#city').combobox('enable');
                    $('#area').combobox({disabled:true});
                }
            });

            $('#city').combobox({
                width:100,
                valueField: fieldName.city.valueField,
                textField:  fieldName.city.textField,
                onSelect:function(city){
                    $('#area').combobox('clear');
                    $('#area').combobox('loadData', city.area);
                    console.log(city);
                    $('#area').combobox('enable');
                }
            });

            $('#area').combobox({
                width:100,
                valueField: fieldName.area.valueField,
                textField:  fieldName.area.textField,
                onSelect:function(area){
                    var provinceId = $('#province').val();
                    var provinceName = $('#province').combobox('getText')
                    var cityId = $('#city').val();
                    var cityName = $('#city').combobox('getText')
                    var areaId = area[fieldName.area.valueField]
                    var areaName = area[fieldName.area.textField]
                  
                    _this.settings.callback(provinceId,provinceName,cityId,cityName,areaId,areaName);
                    
                }
            });

            $('#area').combobox({disabled:true});
            $('#city').combobox({disabled:true});
        },

    }


    $.fn[myPluginName] = function(options) {
        var obj = new cotrPlugin(this, options);
    }
    
})(jQuery,window,document)


 // 省 <input id="sheng" style="width: 200px" class="easyui-combobox"
 //                            data-options="missingMessage:'请选择省份',
 //                            data:data1,
 //                            valueField:'province',
 //                            textField:'province',
 //                            onSelect:function(area){
 //                                console.log(area)
 //                                $('#shi').combobox('clear');
 //                                $('#qu').combobox('clear');
 //                                console.log(area.children)
 //                                $('#shi').combobox('loadData', area.children);
 //                            }"/>

 //                        市 <input id="shi" style="width: 200px" class="easyui-combobox"
 //                            data-options="missingMessage:'请选择城市',
                            
 //                            valueField:'shi',
 //                            textField:'shi',
 //                            onSelect:function(area){
 //                                $('#qu').combobox('clear');
 //                                $('#qu').combobox('loadData',area.children)
 //                            }"/>

 //                        区 <input id="qu" style="width: 200px" class="easyui-combobox"
 //                            data-options="missingMessage:'请选择区县',
 //                            valueField:'qu',
 //                            textField:'qu',
 //                            onSelect:function(area){
 //                                console.log($('#sheng').val()+','+$('#shi').val()+','+area.qu+',')
 //                            }"/>