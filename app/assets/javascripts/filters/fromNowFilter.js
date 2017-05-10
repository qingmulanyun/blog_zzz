angular.module('ngFromNow',[]).filter('fromNow',function(){
    return function(date){
        return moment(date).fromNow();
    }
});