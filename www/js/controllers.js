angular.module('starter.controllers', [])

.controller('homepageCtrl', function($scope) {
})

.controller('sortpageCtrl', function($scope, Friends) {
})

.controller('askpageCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('cartpageCtrl', function($scope) {
})
.controller('personCtrl', function($scope) {
})
