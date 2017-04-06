(function(){
    var app = angular.module('blogzzz', []);
    // app.controller('MainCtrl', function($scope) {
    //     $scope.test = "This is a blog based on Rails and AngularJs.";
    // });

    app .controller('MainCtrl',['$scope',function($scope){
        $scope.test = "This is a blog based on Rails and AngularJs.";
    }]);
})();