# select-jquery

### 自制select组件(使用jquery)

- 组件包含lib/js文件夹下的select-jquery.js和lib/css文件夹下的select-jquery.css文件
- 基本功能等同于浏览器的下拉框组件，支持直接输入功能；在输入时匹配前缀（英文匹配暂时区分大小写）
- 在输入时使用promise异步加载数据

### 使用说明

- 在浏览器引入js和css文件
- 在想要引入的div上添加class='select-demo',div添加input子元素

~~~html
<div class='select-demo'>
    <input type="text">
</div>
~~~

- 在js中使用jquerySelect方法调用组件，参数为数组，显示在select的下拉框中

~~~javascript
$(function(){
  	var array = [...]
	jquerySelect(array)
})
~~~

- 可以使用jquery取当前选中的值

~~~javascript
$('.select-demo > input').val()
~~~

### demo使用方法

- 从github上download或clone项目
- 打开命令行，进入项目目录: cd select-jquery-master
- 输入命令运行本地服务器: npm start 或node server.js 8888
- 按照提示打开: <http://localhost:8888/>
- 说明: 展示页面，db.json为模拟的db数据库，可以通过前台写入字符串到json文件，下拉框组件展示所以json文件中数据，支持搜索功能





