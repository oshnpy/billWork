define(function() {
    var getParams = function() {
        var arr = window.location.search.slice(1).split('&');
        var obj = {};
        arr.forEach(function(item) {
            obj[item.split('=')[0]] = item.split('=')[1];
        })
        return obj;
    }
    return getParams;
})