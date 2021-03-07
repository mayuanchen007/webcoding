const url = '';
$(function() {
    (function() {
        $.ajax({
            url: url + 'getBookList.do',
            type: 'GET',
            success: function(res) {

            }
        });
    })();
});