$(function () { 
    var arrayList = [
        "test1",
        "test2",
        "test3"
    ]

    var $select = $('.select-demo')
    var $input = $("<input type='text'>")
    var $ul = $('<ul></ul>')
    
    $input.addClass('select_input').attr('placeholder', 'search')
    $ul.addClass('dropdown')
    $select.append($input)

    arrayList.map(function(elem, i){
        var $li = $('<li>' + elem + '</li>')
        $li.appendTo($ul)
        console.log($li)
    })
    
})
