angular.module('starter.controllers', [])

.controller('homepageCtrl', function($scope) {})

.controller('sortpageCtrl', function($scope, Friends) {})

.controller('askpageCtrl01', function($scope, $stateParams, Friends) {
	$scope.friend = Friends.get($stateParams.friendId);
})

.controller('cartpageCtrl', function($scope) {})
// 我的购物车 页面控制器
.controller('mycartCtrl',function($scope,getHttp){

         getHttp.get_data(carturl).then(function(_data) {
         alert(_data[0].detail);
        });	



})
// 我的购物车 编辑页面 控制器
.controller('cartchangeCtrl',function($scope){


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
				}else{
					console.log("your form is ok ");
				}
			}
		}

	})
	.controller('askpageCtrl',function($scope,httpCard){
    //通过id获取银行卡
    $scope.card_1 = httpCard.getById(1);
    $scope.card_2 = httpCard.getById(2);
    $scope.card_3 = httpCard.getById(3);
    //获取所有的银行卡
    $scope.cards = httpCard.query();
    //更新id为3的银行卡
    $scope.updataCard = function(){httpCard.save({id:3,name:"工商银行"}).then(function(data){$scope.card_3 = data['name']})};
    //添加id为4的银行卡
    $scope.addCard = function(){httpCard.save({name:"浦发银行"}).then(function(data){$scope.card_4 = data['name']});};
    //删除id为3的银行卡
    $scope.delCard = function(){httpCard.del(3).then(function(data){$scope.card_3 = data});}
})