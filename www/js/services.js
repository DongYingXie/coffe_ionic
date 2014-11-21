var BaseUrl = "http://192.168.0.114:3000/"
var carturl = "http://192.168.0.114:3000/cart/user/123"
angular.module('starter.services', ['ngResource'])

// 向服务器请求数据
// 定义了服务 getHttp
// getHttp.get_data 得到数据
// 
.factory('getHttp', function($q, $http) {
    return {
      get_data: function(_url) {
        var deferred = $q.defer();
        $http.get(_url).success(function(data) {
          deferred.resolve(data);
        }).error(function() {
          deferred.reject();
        });
        return deferred.promise;
      },
      post_data: function(_url, _data) {
        var deferred = $q.defer();
        $http({
          method: 'post',
          url: _url,
          data: _data
        }).success(function(data) {
          deferred.resolve(data);
        }).error(function() {
          /* Act on the event */
          deferred.reject();
        });
        return deferred.promise;
      }
    }
  })
  // 我的购物车 产品的服务    注入gethttp 服务
  // CartProduct.allProduction  返回购物车的 所有的产品
  // CartProduct.getProduction   返回购物车的某个产品
  // CartProduct.setProduction   添加购物车产品
  // CartProduct.removeProduciton 删除购物车的某个产品
  .factory('CartProduct', function(getHttp, $q) {
    var mycartPros;
    var deferred = $q.defer();
    getHttp.get_data(carturl).then(function(_data) {
      deferred.resolve(_data);
    }, function() {
      deferred.reject();
    });
    mycartPros = deferred.promise;
    return {
      allProduction: function() {
        return mycartPros;
      },
      getProduction: function(_ProId) {
        return mycartPros[_ProId];
      },
      setProduction: function(_ProData) {
        mycartPros.unshift(_ProData);
      },
      removeProduciton: function(_index) {
        mycartPros.splice(_index, 1);
      }
    }
  })
  .factory('httpCard', function($http, $q) {
    var baseUrl = 'http://192.168.0.114:3000/card/user/123';
    return {
      //获取用户123的指定id的卡
      getById: function(id) {
        var defer = $q.defer();
        $http({
          method: 'get',
          url: baseUrl + '/' + id
        }).success(function(data) {
          defer.resolve(data);
        }).error(function(data) {
          defer.reject(data);
        });
        return defer.promise
      },
      //获取用户123的所有卡
      query: function() {
        var defer = $q.defer();
        $http({
          method: 'get',
          url: baseUrl
        }).success(function(data) {
          defer.resolve(data);
        }).error(function(data) {
          defer.reject(data);
        });
        return defer.promise
      },
      //保存一张卡,如果原来就有id,那就是更新这张卡,如果原来没有这张卡,那就是新建这张卡,
      //新建路径就是baseUrl,更新路径就是baseUrl+id
      save: function(card) {
        var defer = $q.defer();
        var url = card.id ? baseUrl + '/' + card.id : baseUrl;
        $http({
          method: 'post',
          url: url,
          data: card
        }).success(function(data) {
          defer.resolve(data);
        }).error(function(data) {
          defer.reject(data);
        });
        return defer.promise
      },
      //删除用户123的指定id的卡
      del: function(id) {
        var defer = $q.defer();
        $http({
          method: 'delete',
          url: baseUrl + '/' + id
        }).success(function(data) {
          defer.resolve(data)
        }).error(function(data) {
          defer.reject(data)
        });
        return defer.promise
      }
    }
  })
/**
 * Searches an array for an object with a specified property.
 * 
 * Example usage:
 * <code>var index = myArray.indexOfObjectWithProperty('id', 123);</code>
 * 
 * @param propertyName the name of the property to inspect
 * @param propertyValue the value to match
 * @returns the (zero-based) index at which the object was found, or -1 if no
 * such object was found
 */
Array.prototype.indexOfObjectWithProperty = function(propertyName, propertyValue)
{
  for (var i = 0, len = this.length; i < len; i++)
  {
    if (this[i][propertyName] === propertyValue) return i;
  }

  return -1;
};


/**
 * Test if an array of objects contains an object with a specified property.
 * 
 * Example usage:
 * <code>var isPresent = myArray.containsObjectWithProperty('id', 123);</code>
 * 
 * @param propertyName the name of the property to inspect
 * @param propertyValue the value to match
 * @returns true if an object was found, false otherwise
 */
Array.prototype.containsObjectWithProperty = function(propertyName, propertyValue)
{
  return this.indexOfObjectWithProperty(propertyName, propertyValue) != -1;
};