
let signUpForm = $('form[name=signUp]')
signUpForm.on('submit', (e) => {
    e.preventDefault()

    let string = signUpForm.find('[name=storedata]').val()
    console.log(string)

    $.ajax({
        url: signUpForm.attr('action'),
        method: signUpForm.attr('method'),
        data: string,
        success: function (response) {
            alert('保存成功') 
            console.log(response)
        },
        error: function (xhr) {
            let errors = xhr.responseText
            console.log(JSON.parse(errors))
        }
    })
})

let emailForm = $('form[name=email]')
emailForm.on('submit', (e) => {
    e.preventDefault()
    remove()

    $.ajax({
        url: emailForm.attr('action'),
        method: emailForm.attr('method'),
        data: "findEmail",
        success: function (response) {
            let postData = JSON.parse(response)
            addData(postData)
        },
        error: function (xhr) {
            let errors = xhr.responseText
            console.log(JSON.parse(errors))
        }
    })
})

let loginForm = $('form[name=login]')
loginForm.on('submit', (e) => {
    e.preventDefault()
    remove()

    let string = loginForm.find('[name=searchdata]').val()
    $.ajax({
        url: loginForm.attr('action'),
        method: loginForm.attr('method'),
        data: string,
        success: function (response) {
            let postData = JSON.parse(response)
            addData(postData)
        },
        error: function (xhr) {
            let errors = xhr.responseText
            console.log(JSON.parse(errors))
        }
    })
})

function addData(postData){
    var $div = $(".slide")
    var $title = $('<div></div>')
    var $ul = $('<ul></ul>')
    $title.addClass('listTitle').text("搜索结果如下").appendTo($div)
    
    for(let i=0; i<postData.length; i++){
        var dbObject = postData[i]
        $ul.append("<li>" + dbObject + "</li>")
    }

    $ul.appendTo($div)
}

function remove(){
    var $div = $(".slide")
    $div.empty()
}