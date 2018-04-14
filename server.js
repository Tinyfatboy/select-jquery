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
  } else if (path === '/lib/css/main.css') {
    var string = fs.readFileSync('./lib/css/main.css')
    response.setHeader('Content-Type', 'text/css')
    response.end(string)
  } else if (path === '/lib/css/select-jquery.css') {
    var string = fs.readFileSync('./lib/css/select-jquery.css')
    response.setHeader('Content-Type', 'text/css')
    response.end(string)
  } else if (path === '/lib/js/jquery.min.js') {
    var string = fs.readFileSync('./src/js/jquery.min.js')
    response.setHeader('Content-Type', 'application/javascript')
    response.end(string)
  } else if (path === '/lib/js/main.js') {
    var string = fs.readFileSync('./src/js/main.js')
    response.setHeader('Content-Type', 'application/javascript')
    response.end(string)
  } else if (path === '/lib/js/select-jquery.js') {
    var string = fs.readFileSync('./lib/js/select-jquery.js')
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
  } else if (path === '/wirteDB' && method === 'POST') {
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
  } else if (path === '/getData' && method === 'GET') {
    var string = fs.readFileSync('./db.json')
    response.setHeader('Content-Type', 'application/json')
    response.writeHead(200, "Ok");
    response.end(string)
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


