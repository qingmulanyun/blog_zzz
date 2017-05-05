(function(){
    APP.controller('MainCtrl',['$scope', '$http', 'PagerService', function($scope, $http, PagerService){

        $http.get('/get_public_posts.json').then(success).catch(failure);

        function success(response) {
            var vm = this;

            vm.dummyItems = response.data;
            vm.pager = {};
            vm.setPage = setPage;

            initController();

            function initController() {
                // initialize to page 1
                vm.setPage(1);
            }

            function setPage(page) {
                if (page < 1 || page > vm.pager.totalPages) {
                    return;
                }

                // get pager object from service
                vm.pager = PagerService.GetPager(vm.dummyItems.length, page);

                // get current page of items
                vm.items = vm.dummyItems.slice(vm.pager.startIndex, vm.pager.endIndex + 1);
            }
            $scope.vm = vm;
            console.log("success...");
        }

        function failure(response) {
            console.log("error...");
            console.log(response);
        }

    }]);
})();