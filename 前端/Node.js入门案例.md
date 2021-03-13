# Node.js入门模块

### nodejs中打印到控制台数据

前端页面中console.log()打印到浏览器控制台
document.write()打印到浏览器页面

js文件中写nodejs模块，console.log()则打印到终端控制台
js文件写nodejs模块，resp.send(data)表示响应到ajax请求success接收的参数

annotation：该文档主要记录nodejs通过模块编写案例入门，并记录常用知识点
create_time:2021.01.27
update_time:2021.01.27

---

### 解构赋值

定义：一种针对数组或者对象进行模式匹配，然后对其中的变量进行赋值

解构赋值：左右结构必须一样，使用左边定义的值，快速的取出数据中对应的数据值

理解：左边通过嵌套、忽略等方式，将属性/值从右边对象/数组中取出

### 原生http创建服务端

- 初始化项目，引入http模块，createServer创建服务器，请求url为初始页面时，打印输出流为登录页面
- 输入账号密码，点击提交，发送ajax请求login，传入数据data为账号密码
- url请求为login时，截取url传过来的账号和密码，判断是否正确，返回请求的响应数组
- ajax请求成功success接收响应，是成功数据则跳转到首页

### 文件上传

#### express_upload
- 新建一个前端文件上传页面，点击提交时，发送action请求fileUpload
- 服务端引入文件上传的模块express、fs、multer，读取静态页面的文件夹，初始化保存上传的二进制数据的文件夹
- post方法处理该请求，将上传文件的二进制文件保存到tmp
  
#### fileupload
- 新建一个前端文件上传的页面，引入jq，获取上传的文件的file对象，new一个formData对象进行异步上传二进制文件，将file对象压入formData对象，发送ajax请求，传入data为formData对象
- js文件处理请求，需要引入express、fs、multer模块，设置上传文件的保存目录，初始化express模块，处理前端页面跳转请求，处理前端上传请求，读取传过来的file对象的信息，截取文件后缀，读取文件上传后的二进制地址，创建文件夹，写入文件，上传成功后，返回前端一个响应数组
- 将图片上传到数据库，上传图片的相对路径(upload)，即上传该案例中的filePathname

```
单个文件上传：<input id="file" type="file" name="file"/> 
多选文件上传：<input type="file" name="file" multiple="multiple"/>
```

### 在Node.js中使用Async和Await函数
- 可简化在使用 Promise 或 callbacks时的逻辑步骤
- .then方法可取的上一步方法的返回值，可多层嵌套
  ```
  案例：
  function executeAsyncTask () {
    return functionA()
    .then((valueA) => {
      return functionB(valueA)
      .then((valueB) => {  
      return functionC(valueA, valueB)
      })
    })
  }
  ```





