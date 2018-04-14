var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var path = request.url
  var query = ''
  if (path.indexOf('?') >= 0) { query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname
  var queryObject = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/


  if (path === '/') {
    var string = fs.readFileSync('./index.html')
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end(string)
  } else if (path === '/build/main.css') {
    var string = fs.readFileSync('./build/main.css')
    response.setHeader('Content-Type', 'text/css')
    response.end(string)
  } else if (path === '/bootstrap/css/bootstrap.min.css') {
    var string = fs.readFileSync('./bootstrap/css/bootstrap.min.css')
    response.setHeader('Content-Type', 'text/css')
    response.end(string)
  } else if (path === '/JS/jquery.min.js') {
    var string = fs.readFileSync('./JS/jquery.min.js')
    response.setHeader('Content-Type', 'application/javascript')
    response.end(string)
  } else if (path === '/bootstrap/js/bootstrap.min.js') {
    var string = fs.readFileSync('./bootstrap/js/bootstrap.min.js')
    response.setHeader('Content-Type', 'application/javascript')
    response.end(string)
  } else if (path === '/JS/main.js') {
    var string = fs.readFileSync('./JS/main.js')
    response.setHeader('Content-Type', 'application/javascript')
    response.end(string)
  } else if (path === '/JS/main.js') {
    var string = fs.readFileSync('./JS/main.js')
    response.setHeader('Content-Type', 'application/javascript')
    response.end(string)
  } else if (path === '/img/22.jpg') {
    var string = fs.readFileSync('./img/22.jpg', "binary")
    response.setHeader('Content-Type', 'image/jpeg')
    response.writeHead(200, "Ok");
    response.write(string, "binary");
    response.end()
  } else if (path === '/img/2233background2.jpg') {
    var string = fs.readFileSync('./img/2233background2.jpg', "binary")
    response.setHeader('Content-Type', 'image/jpeg')
    response.writeHead(200, "Ok");
    response.write(string, "binary");
    response.end()
  } else if (path === '/signUp' && method === 'POST') {
    let data = ''
    request.on('data', (postData) => {
      data += postData.toString()
    })
    request.on('end', () => {
      console.log(data)
      let dbString = fs.readFileSync('./db.json', 'utf-8')
      let dbObject = JSON.parse(dbString)
      dbObject.push(data)
      let dbString2 = JSON.stringify(dbObject)
      fs.writeFileSync('./db.json', dbString2, { encoding: 'utf-8' })
      response.end(JSON.stringify(data))
    })
  } else if (path === '/email' && method === 'POST') {
    let data = ''
    request.on('data', (postData) => {
      data += postData.toString()
    })
    request.on('end', () => {
      if (data === 'findEmail') {
        let dbString = fs.readFileSync('./db.json', 'utf-8')
        let dbObject = JSON.parse(dbString)
        console.log(dbObject)

        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
        let arr = []
        for (let i = 0; i < dbObject.length; i++) {
          if (reg.test(dbObject[i])) {
            arr.push(dbObject[i])
          }
        }
        console.log(arr)
        response.end(JSON.stringify(arr))
      }
    })
  } else if (path === '/login' && method === 'POST') {
    let data = ''
    request.on('data', (postData) => {
      data += postData.toString()
    })
    request.on('end', () => {
      let dbString = fs.readFileSync('./db.json', 'utf-8')
      let dbObject = JSON.parse(dbString)
      let result = search(data, dbObject)
      console.log(result)
      response.end(JSON.stringify(result))

    })
  } else {
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end('找不到对应的路径，需要自行修改index.js')
  }



  /******** 代码结束，下面不要看 ************/
  console.log(method + ' ' + request.url)
})

function search(keyword, dbarray) {
  let database = dbarray
  let result = database.filter(function (item) {
    return item.indexOf(keyword) >= 0
  })
  return result
}

server.listen(port)
console.log('监听 ' + port + ' 成功\n请打开 http://localhost:' + port)


