'use strict';

//select component by Tianyi

window.jquerySelect = function (arrayList) {
    var $select = $('.select-demo');
    var $input = $("<input type='text'>");
    var $ul = $('<ul></ul>');

    $input.addClass('select_input').attr('placeholder', 'search');
    $ul.addClass('dropdown');
    $select.append($input);

    arrayList.map(function (elem, i) {
        var $li = $('<li><span>' + elem + '</span></li>');
        $li.appendTo($ul);
    });

    $select.on('click', 'ul', function (e) {
        var elem = e.target;
        var parent = document.querySelector('ul.dropdown');
        while (elem.tagName !== 'LI') {
            if (elem === parent) {
                elem = null;
                break;
            }
            elem = elem.parentNode;
        }
        if (elem) {
            $input.val(elem.innerText);
        } else {
            return;
        }
    });

    $select.on('click', function (e) {
        if ($select.find('.dropdown').length === 0) {
            $select.append($ul);
        } else {
            setTimeout(function () {
                $('.dropdown').remove();
            }, 0);
        }
    });

    $input.focus(function () {
        $select.append($ul);
    });

    $input.blur(function () {
        if ($input.val().trim() === '') {
            setTimeout(function () {
                $('.dropdown').remove();
            }, 250);
        }
    });

    $input.on('click', function (e) {
        e.stopPropagation();
    });

    //异步回调数据
    var timer = undefined;
    $input.on('input', function (e) {
        var $input = $(e.currentTarget);
        var value = $input.val().trim();

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(function () {
            search(value).then(function (result) {
                timer = undefined;

                $('ul.dropdown').empty();
                result.map(function (elem, i) {
                    var remain = elem.substr(value.length);
                    var $value = $("<span style='color: red;'>" + value + "</span>");
                    var $span = $('<span>' + remain + '</span>');
                    var $li = $("<li></li>");
                    $li.append($value).append($span);
                    $li.appendTo($ul);
                });
            });
        }, 200);
    });

    function search(keyword) {
        return new Promise(function (resolve, reject) {
            var result = arrayList.filter(function (item) {
                return item.indexOf(keyword) === 0;
            });

            setTimeout(function () {
                resolve(result);
            }, Math.random() * 200 + 100);
        });
    }
};