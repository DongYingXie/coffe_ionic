// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:
  // 主页页面
  .state('tab.home', {
      url: '/home',
      views: {
        'homepage': {
          templateUrl: 'templates/homepage.html',
          controller: 'homepageCtrl'
        }
      }
    })
    // 分类页面
    .state('tab.sort', {
      url: '/sort',
      views: {
        'sortpage': {
          templateUrl: 'templates/sortpage.html',
          controller: 'sortpageCtrl'
        }
      }
    })
    //分类详细页面
    .state('tab.sortdetail', {
      url: '/sortdetail',
      views: {
        'sortpage': {
          templateUrl: 'templates/sortdetail.html'
        }
      }

    })
    // 产品细节页面
    .state('production',{
      url:'/production',
      templateUrl:'templates/productpage.html',
      controller:'productpageCtrl'
    })
    // 咨询页面
    .state('tab.ask', {
      url: '/ask',
      views: {
        'askpage': {
          templateUrl: 'templates/askpage.html',
          controller: 'askpageCtrl'
        }
      }
    })
    //购物车页面
    .state('tab.cart', {
      url: '/cart',
      views: {
        'cartpage': {
          templateUrl: 'templates/cartpage.html',
          controller: 'cartpageCtrl'
        }
      }
    })
    // 我的购物车页面
    .state('mycart',{
      url:'/mycart',
      templateUrl:'templates/mycartpage.html'
    })
    // 修改我的购物车页面
    .state('mycartchange',{
      url:'/mycartchange',
      templateUrl:'templates/mycartchange.html'
    })
    //个人中心页面
    .state('tab.person', {
      abstract: true,
      url: '/person',
      views: {
        'personpage': {
          template: '<ion-nav-view></ion-nav-view>'
        }
      }
    })

  .state('tab.person.my', {
      url: '',
      templateUrl: 'templates/personpage.html',
      controller: 'personCtrl'
    })
    //我的订单页面
    .state('order', {
      url: '/order',
      templateUrl: 'templates/orderpage.html',
    })
    //登录页面
    .state('tab.person.login', {
      url: '/login',
      templateUrl: 'templates/loginpage.html'
    })
    //注册页面
    .state('tab.person.register', {
      url: '/register',
      templateUrl: 'templates/registerpage.html'
    })
    //忘记密码页面
    .state('tab.person.forgetpsw', {
      url: '/forgetpsw',
      templateUrl: 'templates/forgetpswpage.html'
    })
    //绑定商店页面
    .state('tab.person.bindstore', {
      url: '/bindstore',
      templateUrl: 'templates/bindstorepage.html'
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});