app.factory('cartService',function($http,$q){
    var promise=function(){
        var defer = $q.defer();
        $http.get('https://jsonp.afeld.me/?url=https://api.myjson.com/bins/19ynm').success(function(result) {
            defer.resolve(result);
        });
        return defer.promise;
    }
    return{
        getResponse:promise
    }
})

