(function(){
    APP.controller('MainCtrl',['$scope', '$http' ,function($scope, $http){
        $http.get('/get_public_posts.json').then(success).catch(failure);

        function success(response) {
            $scope.PublicPosts = response.data.results;
            console.log("success...");
            console.log(response);
        }

        function failure(response) {
            console.log("error...");
            console.log(response);
        }

        $scope.test = "This is a blog based on Rails and AngularJs.";
    }]);
})();