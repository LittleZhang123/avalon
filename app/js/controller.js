
define('commonFunc',[],function(){
    var commonFunc = {
        //合并字段成字符串，用于查询的时候字段选择
        selectStr : function(array){
            var selectArray = [];
            for(var i = 0;i < array.length; i++){
                if(array[i].key){
                    selectArray.push(array[i].key);
                }
            }
            return selectArray.join(' ');
        },
        showError:function(el, data) {
            var next = el.nextSibling.nextSibling
            if (!(next && next.className === "error-tip")) {
                next = document.createElement("div")
                next.className = "error-tip"
                el.parentNode.appendChild(next)
            }
            
            next.innerHTML = data.getMessage()
        },
        removeError:function(el) {
            var next = el.nextSibling
            while (next) {
                if (next.className === "error-tip") {
                    el.parentNode.removeChild(next)
                    break
                }
                 next = next.nextSibling
            }
        }
    };
    return commonFunc;
});

define('ctrl',['commonFunc','avalon','mmRequest'],function(commonFunc){
	var ctrl={
		rechargeCtrl:function(){
			if(!avalon.vmodels.recharge){
	            avalon.define({
	                $id: 'recharge',
	                username:conf.username
	            });
	            avalon.scan();
	        }
		},
		detailCtrl:function(){
            if(!avalon.vmodels.cameraTest){
				require(['oniui/camera/avalon.camera'], function () {
                    avalon.define('cameraTest', function (vm) {
                        vm.$opt = {
                            pictures: [
                            'http://placehold.it/600x300/903/fff.jpg&text=img1',
                            'http://placehold.it/600x300/f36/fff.jpg&text=img2',
                            'http://placehold.it/600x300/669/fff.jpg&text=img3',
                            'http://placehold.it/600x300/0cf/fff.jpg&text=img4',
                            'http://placehold.it/600x300/09f/fff.jpg&text=img5',
                            ]
                        }
                        vm.$skipArray = ['camera']
                    })
                    avalon.scan()
                })
            }
		},
        userListCtrl:function(){
            avalon.vmodels.userListCtrl=null;
            require(["oniui/smartgrid/avalon.smartgrid"], function() {
                //表字段
                var gridColumns = [
                    {
                        key : "TheName",
                        name : "竞价推广计划",
                        sortable : true,
                        isLock : true,
                        align: "left",
                        defaultValue: "北上广经济型计划",
                        width: 150
                    }, {
                        key : "Password",
                        name : "预算",
                        sortable : false,
                        align: "right",
                        defaultValue: "￥5800",
                        width: 200,
                        format: "dealMoney" // 定义渲染数据的方法名
                    }, {
                        key : "IsUse",
                        name : "展现",
                        sortable : true,
                        align: "right",
                        width: 98
                    }, {
                        key:"_id",
                        name : "操作",
                        sortable : true,
                        align: "right",
                        width: 115,
                        format: "operate" // 定义渲染数据的方法名
                    }
                ];
                

                var select = commonFunc.selectStr(gridColumns);//选择的字段
                var sortField = {};//字段排序
                var pageSize = 10,
                    pageIndex = 0,
                    dataLength;


                //获取所有数据长度
                var getDataCount = function(cb){
                    avalon.ajax({
                        url: '/user/count',
                        type: 'get',
                    }).done(function(res) {
                        cb(res.count);
                    });
                }
                //获取数据
                var getDatas = function (cb) {
                    avalon.ajax({
                        url: '/user/list',
                        data:{
                            'select':select,
                            'sort':sortField,
                            'pageSize':pageSize,
                            'pageIndex':pageIndex
                        },
                        type: 'get',
                    }).done(function(res) {
                        if(res){
                            cb(res);
                        }else{
                            cb(null,'出错');
                        }
                    });
                }

                getDatas(function(data,err){
                    if(err){
                        avalon.log(err);
                    }
                    //获取数据长度
                    getDataCount(function(count){
                        dataLength = count;
                        var gridData = data;
                        gridBind(gridData);    
                    });
                    
                });

                //数据绑定gird上
                var gridBind = function(data){

                    var deleteOne = function(id,cb){
                        avalon.ajax({
                            url: '/user/deleteOne/'+id,
                            type: 'delete',
                        }).done(function(res) {
                            if(res.isSuccess){
                                cb();
                            }else{
                                console.log(res.cause)
                            }
                        });
                    };

                    

                    var smartgrid = null;
                    avalon.define("userListCtrl", function(vm) {
                        vm.$skipArray = ["smartgrid"] //不需要转为监控属性的属性务必放到$skipArray数组中，减少开销提高性能
                        //数据刷新
                        vm.render = function() {
                            getDatas(function(data,err){
                                if(err){
                                    avalon.log(err);
                                }
                                avalon.vmodels.userSg.render(data)
                                
                            });
                        };
                        vm.dataDelete = function(_id){
                            deleteOne(_id,function(){
                                getDataCount(function(count){
                                    dataLength = count;
                                    vm.render();
                                });
                            });
                        };
                        vm.smartgrid = {
                            // 不希望组件的配置项被smartgrid监控，将其放到$skipArray数组中，添加其他组件同理
                            $skipArray: ["dropdown", "pager"],
                            selectable: {
                                type: "Checkbox" //为表格添加选中行操作框,可以设置为"Checkbox"或者"Radio"
                            },
                            noResult:'暂时没有数据',
                            pager:{
                                totalItems:dataLength,
                                canChangePageSize:true,
                                perPages:pageSize,
                                options:[10,20,30],
                                //分页操作
                                onJump:function(a,b){
                                    var _pageSize = b.perPages;
                                    var _pageIndex = b.currentPage - 1;
                                    pageIndex = _pageIndex;
                                    pageSize = _pageSize;
                                    vm.render();
                                }
                            },
                            //吸顶
                            isAffix: true,
                            htmlHelper: { // 渲染列数据的方法集合
                                dealMoney: function(vmId, field, index, cellValue, rowData) {//所有包装函数都会收到4个参数，分别是smartgrid组件对应vmodel的id，列标志(key)，列索引，列数据值
                                    return "$"+cellValue
                                },
                                operate:function(vmId, field, index, cellValue, rowData) {  
                                    var operateTag = '<a href="#!/user/detail/'+cellValue+'">修改</a><a href="#">详细</a><button type="button" ms-click="dataDelete(\''+cellValue+'\')">删除</button>'
                                    return operateTag
                                }                             
                            },
                            //字段
                            columns: gridColumns,
                            //数据选择回调的方法
                            onRowSelect:function(){
                                console.log(avalon.vmodels.userSg.getRawData())
                            },
                            //绑定时初始回调方法
                            onInit: function(vmodel) {
                                smartgrid = vmodel
                            },
                            //数据排序回调的方法
                            remoteSort:function(field,sortTrend,vmodel){
                                //排序问题
                                sortField[field]=sortTrend;
                                vm.render();
                            },
                            //绑定的数据
                            data: data
                        };

                    })
                    avalon.scan()
                }
            })
        },
        userDetailCtrl:function(id){
            avalon.vmodels.userDetailCtrl=null;
            require(['oniui/dropdown/avalon.dropdown','oniui/validation/avalon.validation'],function(){

                var oldData = {};
                //获取数据
                var getDataOne = function(cb){
                    avalon.ajax({
                        url: '/user/findOne/'+id,
                        type: 'get',
                    }).done(function(res) {
                        cb(res);
                    });
                }
                //数据绑定
                var dataBind = function(){
                    var validationVM;

                    var model = avalon.define('userDetailCtrl',function(vm){
                        vm.user=oldData;
                        vm.$skipArray = ['ddRoleOpt','validation'];
                        
                        //下拉菜单
                        vm.ddRoleOpt={
                        };
                        //下拉菜单

                        vm.validation={
                            onInit: function(v) {
                                validationVM = v
                            },
                            onReset: function() {
                                avalon(this).removeClass("error success")
                            },
                            onError: function(reasons) {
                                reasons.forEach(function(reason) {
                                    avalon(this).removeClass("success").addClass("error")
                                    commonFunc.showError(this, reason)
                                }, this)
                            },
                            onSuccess: function() {
                                avalon(this).removeClass("error").addClass("success")
                                commonFunc.removeError(this)
                            },
                            onValidateAll: function(reasons) {
                                reasons.forEach(function(reason) {
                                    avalon(reason.element).removeClass("success").addClass("error")
                                    commonFunc.showError(reason.element, reason)
                                })
                                if (reasons.length !== 0) {
                                    avalon.log("验证失败！");
                                    return;
                                }

                                avalon.log("全部验证成功！");
                                var user = {
                                    TheName:vm.user.TheName,
                                    Password:vm.user.Password,
                                    Role:vm.user.Role,
                                    RealName:vm.user.RealName,
                                    IsUse:vm.user.IsUse,
                                    IsDelete:vm.user.IsDelete,
                                    Remark:vm.user.Remark
                                };
                                avalon.ajax({
                                    url: '/user/add',
                                    type: 'post',
                                    data:{
                                        user:user
                                    }
                                }).done(function(res) {
                                    if(res.isSuccess){
                                        location.href='#!/user/list';
                                    }else{
                                        
                                    }
                                });
                            }
                        }


                        //异步数据绑定
                        vm.roleDataSource=[];
                        vm.save=function(){
                            //验证表单
                            validationVM.validateAll();
                        };
                    });

                    //下拉菜单
                    model.ddRoleOpt.$source = model.roleDataSource;
                    //下拉菜单

                    avalon.scan();


                    //下拉菜单
                    avalon.ajax({
                        url:'/role/list',
                        type:'get'
                    }).done(function(res){
                        var roleData = [];
                        res.forEach(function(dataOne){
                            var roleOne = {};
                            roleOne.value = dataOne._id;
                            roleOne.label = dataOne.TheName;
                            roleData.push(roleOne);
                        });
                        model.roleDataSource.pushArray(roleData);
                    });
                    //下拉菜单


                };
                //获取数据 更新或者增添
                if(id){
                    getDataOne(function(data){
                        oldData = data;
                        dataBind();
                    });
                }else{
                    oldData={
                        Role:'',
                        IsUse:true,
                        IsDelete:false
                    };
                    dataBind();
                };
                
            });

        },
        roleListCtrl:function(){
            avalon.vmodels.roleListCtrl=null;
            require(["oniui/smartgrid/avalon.smartgrid"], function() {
                //表字段
                var gridColumns = [
                    {
                        key : "TheName",
                        name : "角色",
                        sortable : true,
                        isLock : true,
                        align: "left",
                        width: 150
                    }, {
                        key : "Power",
                        name : "权限",
                        sortable : false,
                        align: "right",
                        width: 200
                    }, {
                        key : "IsUse",
                        name : "展现",
                        sortable : true,
                        align: "right",
                        width: 98
                    }, {
                        key:"_id",
                        name : "操作",
                        sortable : true,
                        align: "right",
                        width: 115,
                        format: "operate" // 定义渲染数据的方法名
                    }
                ];
                

                var select = commonFunc.selectStr(gridColumns);//选择的字段
                var sortField = {};//字段排序
                var pageSize = 10,
                    pageIndex = 0,
                    dataLength;


                //获取所有数据长度
                var getDataCount = function(cb){
                    avalon.ajax({
                        url: '/role/count',
                        type: 'get',
                    }).done(function(res) {
                        cb(res.count);
                    });
                }
                //获取数据
                var getDatas = function (cb) {
                    avalon.ajax({
                        url: '/role/list',
                        data:{
                            'select':select,
                            'sort':sortField,
                            'pageSize':pageSize,
                            'pageIndex':pageIndex
                        },
                        type: 'get',
                    }).done(function(res) {
                        if(res){
                            cb(res);
                        }else{
                            cb(null,'出错');
                        }
                    });
                }

                getDatas(function(data,err){
                    if(err){
                        avalon.log(err);
                    }
                    //获取数据长度
                    getDataCount(function(count){
                        dataLength = count;
                        var gridData = data;
                        gridBind(gridData);    
                    });
                    
                });

                //数据绑定gird上
                var gridBind = function(data){

                    var deleteOne = function(id,cb){
                        avalon.ajax({
                            url: '/role/deleteOne/'+id,
                            type: 'delete',
                        }).done(function(res) {
                            if(res.isSuccess){
                                cb();
                            }else{
                                console.log(res.cause)
                            }
                        });
                    };

                    

                    var smartgrid = null;
                    avalon.define("roleListCtrl", function(vm) {
                        vm.$skipArray = ["smartgrid"] //不需要转为监控属性的属性务必放到$skipArray数组中，减少开销提高性能
                        //数据刷新
                        vm.render = function() {
                            getDatas(function(data,err){
                                if(err){
                                    avalon.log(err);
                                }
                                avalon.vmodels.roleSg.render(data)
                                
                            });
                        };
                        vm.dataDelete = function(_id){
                            deleteOne(_id,function(){
                                getDataCount(function(count){
                                    dataLength = count;
                                    vm.render();
                                });
                            });
                        };
                        vm.smartgrid = {
                            // 不希望组件的配置项被smartgrid监控，将其放到$skipArray数组中，添加其他组件同理
                            $skipArray: ["dropdown", "pager"],
                            selectable: {
                                type: "Checkbox" //为表格添加选中行操作框,可以设置为"Checkbox"或者"Radio"
                            },
                            noResult:'暂时没有数据',
                            pager:{
                                totalItems:dataLength,
                                canChangePageSize:true,
                                perPages:pageSize,
                                options:[10,20,30],
                                //分页操作
                                onJump:function(a,b){
                                    var _pageSize = b.perPages;
                                    var _pageIndex = b.currentPage - 1;
                                    pageIndex = _pageIndex;
                                    pageSize = _pageSize;
                                    vm.render();
                                }
                            },
                            //吸顶
                            isAffix: true,
                            htmlHelper: { // 渲染列数据的方法集合
                                dealMoney: function(vmId, field, index, cellValue, rowData) {//所有包装函数都会收到4个参数，分别是smartgrid组件对应vmodel的id，列标志(key)，列索引，列数据值
                                    return "$"+cellValue
                                },
                                operate:function(vmId, field, index, cellValue, rowData) {  
                                    var operateTag = '<a href="#!/role/detail/'+cellValue+'">修改</a><a href="#">详细</a><button type="button" ms-click="dataDelete(\''+cellValue+'\')">删除</button>'
                                    return operateTag
                                }                             
                            },
                            //字段
                            columns: gridColumns,
                            //数据选择回调的方法
                            onRowSelect:function(){
                                console.log(smartgrid.getRawData())
                            },
                            //绑定时初始回调方法
                            onInit: function(vmodel) {
                                smartgrid = vmodel
                            },
                            //数据排序回调的方法
                            remoteSort:function(field,sortTrend,vmodel){
                                //排序问题
                                sortField[field]=sortTrend;
                                vm.render();
                            },
                            //绑定的数据
                            data: data
                        };

                    })
                    avalon.scan()
                }
            })
        },
        roleDetailCtrl:function(id){
            avalon.vmodels.roleDetailCtrl=null;
            require(['oniui/validation/avalon.validation','oniui/doublelist/avalon.doublelist'],function(){

                var oldData = {};
                //获取数据
                var getDataOne = function(cb){
                    avalon.ajax({
                        url: '/role/findOne/'+id,
                        type: 'get',
                    }).done(function(res) {
                        cb(res);
                    });
                }
                //数据绑定
                var dataBind = function(){
                    var validationVM;

                    var model = avalon.define('roleDetailCtrl',function(vm){
                        vm.role=oldData;
                        vm.$skipArray = ['doublelist','validation'];
                        //多选
                        vm.doublelist = {
                            change: function(newValue, oldValue, vmodel) {
                                vm.role.Power = vmodel.select;
                            }
                        };
                        //多选
                        vm.validation={
                            onInit: function(v) {
                                validationVM = v
                            },
                            onReset: function() {
                                avalon(this).removeClass("error success")
                            },
                            onError: function(reasons) {
                                reasons.forEach(function(reason) {
                                    avalon(this).removeClass("success").addClass("error")
                                    commonFunc.showError(this, reason)
                                }, this)
                            },
                            onSuccess: function() {
                                avalon(this).removeClass("error").addClass("success")
                                commonFunc.removeError(this)
                            },
                            onValidateAll: function(reasons) {
                                reasons.forEach(function(reason) {
                                    avalon(reason.element).removeClass("success").addClass("error")
                                    commonFunc.showError(reason.element, reason)
                                })
                                if (reasons.length !== 0) {
                                    avalon.log("验证失败！");
                                    return;
                                }

                                avalon.log("全部验证成功！");
                                var role = {
                                    TheName:vm.role.TheName,
                                    Power:vm.role.Power,
                                    IsUse:vm.role.IsUse,
                                    IsDelete:vm.role.IsDelete,
                                    Remark:vm.role.Remark
                                };
                                avalon.ajax({
                                    url: '/role/add',
                                    type: 'post',
                                    data:{
                                        role:role
                                    }
                                }).done(function(res) {
                                    if(res.isSuccess){
                                        location.href='#!/role/list';
                                    }else{
                                        
                                    }
                                });
                            }
                        };
                        vm.save=function(){
                            //验证表单
                            validationVM.validateAll();
                        };
                    });
                    avalon.scan();

                    //region多选
                    avalon.ajax({
                        url: '/power/get',
                        type: 'get'
                    }).done(function(res) {
                        avalon.vmodels.roleDl.reset(res,oldData.Power);
                    });
                    //endregion多选

                };
                //获取数据 更新或者增添
                if(id){
                    getDataOne(function(data){
                        oldData = data;
                        dataBind();
                    });
                }else{
                    oldData={
                        IsUse:true,
                        IsDelete:false
                    };
                    dataBind();
                };
                
            });

        },

	};
	return ctrl;
})