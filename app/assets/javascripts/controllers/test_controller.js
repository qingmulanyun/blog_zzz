(function(){
    APP.controller('MainCtrl',['$scope', '$http' ,function($scope, $http){
        // $http({
        //     method:'GET',
        //     url:'/get_public_posts'
        // }).success(function (data, status, header){
        //     $scope.PublicPosts = data;
        //     console.lig("success...");
        // }).error(function (data, status, header){
        //     console.lig("error...");
        // });


        $http.get('/get_public_posts').then(success).catch(failure);

        function success(response) {
            $scope.PublicPosts = response.data;
            console.log("success...");
            console.log(response);
        }

        function failure(response) {
            window.alert(response);
        }


        $scope.test = "This is a blog based on Rails and AngularJs.";
    }]);
})();