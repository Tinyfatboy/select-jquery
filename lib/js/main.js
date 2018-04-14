'use strict';

$(function () {

    var wirteDBForm = $('form[name=writeDB]');
    wirteDBForm.on('submit', function (e) {
        e.preventDefault();

        var string = wirteDBForm.find('[name=storedata]').val();
        if (string) {
            $.ajax({
                url: wirteDBForm.attr('action'),
                method: wirteDBForm.attr('method'),
                data: string,
                success: function success(response) {
                    alert('保存成功');
                    console.log(response);
                    $.ajax(params).then(function (data) {
                        if (data instanceof Array) {
                            jquerySelect(data);
                        } else {
                            alart('数据库出错');
                        }
                    });
                },
                error: function error(xhr) {
                    var errors = xhr.responseText;
                    console.log(JSON.parse(errors));
                }
            });
        } else {
            alert('保存数据不能为空');
        }
    });

    var params = {
        url: '/getData',
        method: 'get'
    };

    $.ajax(params).then(function (data) {
        if (data instanceof Array) {
            jquerySelect(data);
        } else {
            alart('数据库出错');
        }
    });
});