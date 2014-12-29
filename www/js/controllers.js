angular.module('starter.controllers', [])

.controller('homepageCtrl', function($scope) {})

.controller('sortpageCtrl', function($scope) {})

.controller('askpageCtrl01', function($scope, $stateParams) {})

.controller('cartpageCtrl', function($scope) {})
	// 我的购物车 页面控制器
	.controller('mycartCtrl', function($scope, getHttp) {
		$scope.cartdata= [];
		$scope.selectedP=[];
		getHttp.get_data(carturl).then(function(_data) {
			$scope.cartdata = _data;
		});
    	// 处理当选择checkbox时，插入selectPermissions 数组中
		// 当点击checkbox 时 检查selectPermissions 数组是否已经存在了该 id
		// 如果存在 返回-1 ；转换checkbox 的状态 即把该ID 删除id
		// 否则 插入selectPermissions 数组
		    
			$scope.toggleS = function(permission) {
			var index = $scope.selectedP.indexOfObjectWithProperty('id', permission.id);
			if (index > -1) {
				// Is currently selected, so remove it
				$scope.selectedP.splice(index, 1);
				console.log(index);
			} else {
				// Is currently unselected, so add it
				$scope.selectedP.push(permission);
				console.log(permission);
			}
		};
		


	})
	// 我的购物车 编辑页面 控制器
	.controller('cartchangeCtrl', function($scope, getHttp) {
		$scope.cartdatas = [];
		getHttp.get_data(carturl).then(function(_data) {
			$scope.cartdatas = _data;
			console.info($scope.cartdatas);
		});
		$scope.value1 = "";
		// 减少某件商品的数量
		$scope.reduceNum = function(_index) {

				if ($scope.cartdatas[_index].number == 1) {
					$scope.cartdatas[_index].number = 1;
				} else {
					$scope.cartdatas[_index].number -= 1;
					getHttp.post_data(carturl, $scope.cartdatas[_index]).then(function(_data) {
						alert(_data);
					}, function() {
						alert("error");
					})
				}
			}
			// 增加某件商品的数量
		$scope.addNum = function(_index) {
				$scope.cartdatas[_index].number += 1;
			}
			// 处理当选择checkbox时，插入selectPermissions 数组中
			// 当点击checkbox 时 检查selectPermissions 数组是否已经存在了该 id
			// 如果存在 返回-1 ；转换checkbox 的状态 即把该ID 删除id
			// 否则 插入selectPermissions 数组
		$scope.selectedPermissions = [];

		$scope.toggleSelection = function toggleSelection(permission) {
			var index = $scope.selectedPermissions.indexOfObjectWithProperty('id', permission.id);
			if (index > -1) {
				// Is currently selected, so remove it
				$scope.selectedPermissions.splice(index, 1);
				console.log(index);
			} else {
				// Is currently unselected, so add it
				$scope.selectedPermissions.push(permission);
				console.log(permission);
			}
		};
		// 删除购物车的商品函数
		$scope.deleteCartData = function() {
			for (var i = 0, len = $scope.selectedPermissions.length; i < len; i++) {
			for(var j=0,lens=$scope.cartdatas.length;j<lens;j++){
				console.log($scope.cartdatas[j].id);
				if($scope.cartdatas[j].id==$scope.selectedPermissions[i].id){
					$scope.cartdatas.splice(j,1);
					getHttp.post_data(carturl,$scope.selectedPermissions[i]).then(function(_data){
                    
					}, function(){
						alert("del fail");
					})
				}
			}
			}
		}

	})
	.controller('personCtrl', function($scope) {})
	.controller('productpageCtrl', function($scope) {
		$scope.showflage = false;
		$scope.elem = '';
		$scope.showHide = function(_e) {
			$scope.showflage = !$scope.showflage;
			$scope.elem = _e;
		}
	})
	// 登录页面控制器
	.controller('loginCtrl', function($scope) {
		$scope.login = {
			name: '',
			password: ''
		};
		$scope.loginBtnPre = function(_form, _Nisvalid, _Pisvalid) {
			if (!_form) {
				console.log("input can't emty ");
			} else {
				if (!_Nisvalid) {
					console.log("your name is invalid !!!");
				} else if (!_Pisvalid) {
					console.log("your password is invalid !!!");
				} else {
					console.log("your form is ok ");
				}
			}
		}

	})
	.controller('askpageCtrl', function($scope, httpCard) {
		//通过id获取银行卡
		$scope.card_1 = httpCard.getById(1);
		$scope.card_2 = httpCard.getById(2);
		$scope.card_3 = httpCard.getById(3);
		//获取所有的银行卡
		$scope.cards = httpCard.query();
		//更新id为3的银行卡
		$scope.updataCard = function() {
			httpCard.save({
				id: 3,
				name: "工商银行"
			}).then(function(data) {
				$scope.card_3 = data['name']
			})
		};
		//添加id为4的银行卡
		$scope.addCard = function() {
			httpCard.save({
				name: "浦发银行"
			}).then(function(data) {
				$scope.card_4 = data['name']
			});
		};
		//删除id为3的银行卡
		$scope.delCard = function() {
			httpCard.del(3).then(function(data) {
				$scope.card_3 = data
			});
		}
	})