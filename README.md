# select-jquery

### 自制select组件(使用jquery)

- 组件包含lib/js文件夹下的select-jquery.js和lib/css文件夹下的select-jquery.css文件
- 基本功能等同于浏览器的下拉框组件，支持直接输入功能；在输入时匹配前缀（英文匹配暂时区分大小写）
- 在输入时使用promise异步加载数据

### 使用说明

- 在浏览器引入js和css文件
- 在想要引入的div上添加class='select-demo'

~~~html
<div class='select-demo'>
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







