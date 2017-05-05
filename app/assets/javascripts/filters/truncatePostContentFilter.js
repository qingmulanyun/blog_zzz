angular.module('ngTruncate',[]).filter('truncate', function (){
    return function (text, length, end) {
        if(!text) {
            return;
        }
        if(isNaN(length)){
            length = 140;

        }
        end = end || "..."
        if (text.length <= length || text.length - end.length <= length){
            return text;
        } else {
            console.log(text.length);
            return String(text).substring(0, length - end.length) + end;
        }

    };
});