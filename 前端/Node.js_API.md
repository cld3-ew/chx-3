# Node.js API

### Buffer(缓冲区)
JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

编码字符：使用显示字符编码即可再buffer实例和js字符串间转换

    ascii - 仅支持 7 位 ASCII 数据。如果设置去掉高位的话，这种编码是非常快的。

    utf8 - 多字节编码的 Unicode 字符。许多网页和其他文档格式都使用 UTF-8 。

    utf16le - 2 或 4 个字节，小字节序编码的 Unicode 字符。支持代理对（U+10000 至 U+10FFFF）。

    ucs2 - utf16le 的别名。

    base64 - Base64 编码。

    latin1 - 一种把 Buffer 编码成一字节编码的字符串的方式。

    binary - latin1 的别名。

    hex - 将每个字节编码为两个十六进制字符。

创建buffer类(API)：

    Buffer.alloc(size[, fill[, encoding]])： 返回一个指定大小的 Buffer 实例，如果没有设置 fill，则默认填满 0
    Buffer.allocUnsafe(size)： 返回一个指定大小的 Buffer 实例，但是它不会被初始化，所以它可能包含敏感的数据
    Buffer.allocUnsafeSlow(size)
    Buffer.from(array)： 返回一个被 array 的值初始化的新的 Buffer 实例（传入的 array 的元素只能是数字，不然就会自动被 0 覆盖）
    Buffer.from(arrayBuffer[, byteOffset[, length]])： 返回一个新建的与给定的 ArrayBuffer 共享同一内存的 Buffer。
    Buffer.from(buffer)： 复制传入的 Buffer 实例的数据，并返回一个新的 Buffer 实例
    Buffer.from(string[, encoding])： 返回一个被 string 的值初始化的新的 Buffer 实例

写入缓冲区：buf.write(string[, offset[, length]][, encoding])
    
    参数：
    string - 写入缓冲区的字符串。

    offset - 缓冲区开始写入的索引值，默认为 0 。

    length - 写入的字节数，默认为 buffer.length

    encoding - 使用的编码。默认为 'utf8' 。

从缓冲区读取数据：buf.toString([encoding[, start[, end]]])

    参数：
    encoding - 使用的编码。默认为 'utf8' 。

    start - 指定开始读取的索引位置，默认为 0。

    end - 结束位置，默认为缓冲区的末尾。


### console(控制台)

- Console 类，包含 console.log()、 console.error() 和 console.warn() 等方法，可用于写入任何 Node.js 流。
- 全局的 console 实例，配置为写入 process.stdout 和 process.stderr。 使用时无需调用 require('console')


### crypto(加密)

crypto 模块提供了加密功能，实现了包括对 OpenSSL 的哈希、HMAC、加密、解密、签名、以及验证功能的一整套封装

Hash 类是用于创建数据哈希值的工具类。

查看 crypto 模块支持的 hash 函数：crypto.getHashes()

案例：hash函数中的SHA-256算法，使用 hash.update() 方法将要计算的数据以流（stream）的方式写入，流输入结束后，使用 hash.digest() 方法计算数据的 hash 值

```
const crypto = require('crypto');
// 创建哈希函数 sha256
const hash = crypto.createHash('sha256'); 

// 输入流编码：utf8、ascii、binary（默认）
hash.update('some data to hash', 'utf8');
// 输出编码：hex、binary、base64
console.log(hash.digest('hex'));

// 输出
// 6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50
```


### Express框架

创建各种 Web 应用，提供了 HTTP 工具，是对node.js中http模块的封装

    特性：
    可以设置中间件来响应 HTTP 请求。

    定义了路由表用于执行不同的 HTTP 请求动作。

    可以通过向模板传递参数来动态渲染 HTML 页面

Express 应用使用回调函数的参数： request 和 response 对象来处理请求和响应的数据

Request 对象 - request 对象表示 HTTP 请求，包含了请求查询字符串，参数，内容，HTTP 头部等属性

    req.app：当callback为外部文件时，用req.app访问express的实例
    req.baseUrl：获取路由当前安装的URL路径
    req.body / req.cookies：获得「请求主体」/ Cookies
    req.fresh / req.stale：判断请求是否还「新鲜」
    req.hostname / req.ip：获取主机名和IP地址
    req.originalUrl：获取原始请求URL
    req.params：获取路由的parameters
    req.path：获取请求路径
    req.protocol：获取协议类型
    req.query：获取URL的查询参数串
    req.route：获取当前匹配的路由
    req.subdomains：获取子域名
    req.accepts()：检查可接受的请求的文档类型
    req.acceptsCharsets / req.acceptsEncodings / req.acceptsLanguages：返回指定字符集的第一个可接受字符编码
    req.get()：获取指定的HTTP请求头
    req.is()：判断请求头Content-Type的MIME类型

Response 对象 - response 对象表示 HTTP 响应，即在接收到请求时向客户端发送的 HTTP 响应数据。常见属性有：

    res.app：同req.app一样
    res.append()：追加指定HTTP头
    res.set()在res.append()后将重置之前设置的头
    res.cookie(name，value [，option])：设置Cookie
    opition: domain / expires / httpOnly / maxAge / path / secure / signed
    res.clearCookie()：清除Cookie
    res.download()：传送指定路径的文件
    res.get()：返回指定的HTTP头
    res.json()：传送JSON响应
    res.jsonp()：传送JSONP响应
    res.location()：只设置响应的Location HTTP头，不设置状态码或者close response
    res.redirect()：设置响应的Location HTTP头，并且设置状态码302
    res.render(view,[locals],callback)：渲染一个view，同时向callback传递渲染后的字符串，如果在渲染过程中有错误发生next(err)将会被自动调用。callback将会被传入一个可能发生的错误以及渲染后的页面，这样就不会自动输出了。
    res.send()：传送HTTP响应
    res.sendFile(path [，options] [，fn])：传送指定路径的文件 -会自动根据文件extension设定Content-Type
    res.set()：设置HTTP头，传入object可以一次设置多个头
    res.status()：设置HTTP状态码
    res.type()：设置Content-Type的MIME类型

- 路由决定了由谁(指定脚本)去响应客户端请求，对应的页面响应对应的请求
- 在 Express 中，路由指的是客户端的请求与服务器处理函数之间的映射关系
- Express 中的路由分 3 部分组成，分别是请求的类型、请求的 URL 地址、处理函数
  
  ```
    express 路由:
    语法：app.methods(path,callback)

    app 是 express 实例对象
    methods 是请求方法 get | post | put | update | delete |...
    path 就是路径（url定值的 pathname ），必须以'/'开头
    callback 回调函数，路由的处理函数
      req
      res （这里的 req res 就是原生nodejs中的 req res。但比原生中要多一些属性方法，是express加上去的）
      next 是一个方法，调用这个方法会让路由继续匹配下一个能匹配上的
  ```
  
```
案例：
var express = require('express');
var app = express();
 
//  主页输出 "Hello World"
app.get('/', function (req, res) {
   console.log("主页 GET 请求");
   res.send('Hello GET');
})
 
 
//  POST 请求
app.post('/', function (req, res) {
   console.log("主页 POST 请求");
   res.send('Hello POST');
})
 
//  /del_user 页面响应
app.get('/del_user', function (req, res) {
   console.log("/del_user 响应 DELETE 请求");
   res.send('删除页面');
})
 
//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
   console.log("/list_user GET 请求");
   res.send('用户列表页面');
})
 
// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd', function(req, res) {   
   console.log("/ab*cd GET 请求");
   res.send('正则匹配');
})
 
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})
```

- Express 提供了内置的中间件 express.static 来设置静态文件如：图片， CSS, JavaScript 等，可以使用 express.static 中间件来设置静态文件路径：
```
app.use('/public', express.static('public'));
```
在public目录下放入静态文件，运行该脚本，通过浏览器访问该地址，可访问该静态文件

- 在html文件中用get方法提交一个地址，在js文件中可通过get路由来接受数据并处理

- Express 的中间件，本质上就是一个 function 处理函数
- 作用：可以在上游 的中间件中，统一为 req 或 res 对象添加自定义的属性和方法，供下游的中间件或路由进行使用

```
中间件其实是一个携带req、res、next这三个参数的函数，在请求与响应之间做一些中间处理的代码

中间件函数，在做完事情之后，必须调用 next() 否则程序不会往下走

中间件函数的调用必须放在需要使用的函数的前面

由app.use()定义的为全局生效的中间件，app.get()为局部生效的中间件

注意事项：
  一定要在路由之前注册中间件
  不要客户端发送过来的请求，可以连续调用多个中间件进行处理
  执行完中间件的业务代码之后，忘记调用 next() 函数
  为了防止代码逻辑混乱，调用 next() 函数后不要再写额外的代码
  连续调用多个中间件时，多个中间件之间，共享 req 和 res 对象

中间件分类：
  应用级别
  路由级别
  错误级别
  内置级别
  第三方

```

- fs.readFileSyne('文件路径'); //读出来的是buffer 会下载
1. 转字符串 toString res.set('Content-Type','text/html; charset=utf-8'); //设置响应头使浏览器输出HTML
2. 直接使用 res.sendFile('需要渲染的页面路径[绝对路径]'); path.resolve(__dirname,'');
   
```
server.get('/',(req,res) => {
    let data = fs.readFileSync('./index/index.html');
    console.log(data.toString());
    res.set('Content-Type','text/html;charset=utf-8');

    // res.sendFile(path.resolve(__dirname,'./index/index.html'));
});
```

- 配置静态资源托管的文件夹
  
```
//http://localhost:3000/
 app.use(express.static(path.resolve(__dirname,'./public')));  //app为express实例 use使用中间件
 //这时可将public文件看成web服务的根目录 ./
 //http://localhost:3000/css/style.css
 ```

- 可通过设置来修改静态资源托管的根路径 app.use

```
//http://localhost:3000/static
 app.use('/static',express.static(path.resolve(__dirname,'./public')));
```

- __dirname 总是指向被执行 js 文件的绝对路径
- ./ 会返回你执行 node 命令的路径，例如你的工作路径(运行脚本路径)

create_time:2021.01.26
update_time:2021.01.26

---

### Multer

- Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件
- Multer 会添加一个 body 对象 以及 file 或 files 对象 到 express 的 request 对象中。 body 对象包含表单的文本域信息，file 或 files 对象包含对象表单上传的文件信息

### session 
 
- 作用：
  1. 第一次访问服务器，保存登录信息
  2. 访问其他页面，判断登录状态
  3. 保存常用信息，需要时不用查询数据库
  4. 持久化操作

- 工作流程：
  1. 当浏览器访问服务器并发送第一次请求时(这时前端跳转到某个页面)，服务器端会创建一个session对象，生成一个类似于key,value的键值对，然后将key(cookie)返回到浏览器(客户)端
  2. 浏览器下次再访问时，发送请求，携带key(cookie)，找到对应的session(value)。客户的信息都保存在session中
- 参考：https://github.com/alsotang/node-lessons/tree/master/lesson16

#### session实现页面拦截，存取数据

- 导入模块express、express-session
~~若导入cookie-parser //app.use(cookieParser(secret, options))传入签名~~
~~若导入session-file-store   //配置中间件时设置本地存储session文件夹~~
初始化模块:var app = express();

- 配置中间件（cookie的配置）
```
  app.use(session({
    name: identityKey,  //cookie中键key的名称，默认connect.sid
    secret: 'chyingp', //随机字符串，存在cookie中，下次访问服务器靠这个键找到对应session
    store: new FileStore(), // 本地存储session（文本文件，也可以选择其他store，比如redis的）
    saveUninitialized: false, // 是否自动保存未初始化的会话，建议false
    resave: false, // 是否每次都重新保存会话，建议false，表示是否覆盖
    cookie: {
    maxAge: 10 * 1000 // 有效期，单位是毫秒
    }
  }));
```

- 登录时将用户信息存入session
```
    //设置session里面的内容
    app.get("/add",function(req,res){
      //往session里存储数据
      req.session.loginok=true;			//loginok:可以是任意内容，可以为true或false
      res.send("添加成功")
    })
```

- 路由页面跳转时判断是否存在，存在则可以跳转，否则提示未登录
```
  router.get('/', function(req, res, next) {//router路由
    if(req.session.user){
        var user=req.session.user;//请求session中的信息
        var name=user.name;
        res.send('你好'+name+'，欢迎来到我的家园。');
    }else{
        res.send('你还没有登录，先登录下再试试！');
    }
  });
```

- 需要用户登录信息时通过请求获取
```
    //读取session
    app.get("/select",function(req,res){
      //查看session
      console.log(req.session)
      res.send("查询成功")
    })
```

- 退出登录时，注销session
```
    app.get("/out",function(req,res){
      //注销session
      req.session.destroy()
      res.redirect("/see")		//重定向定位到指定内容
    })
```

- 跳转或请求数据
```
//验证用户身份(用户登录时,使用ajax请求这个接口即可)
app.get("/api/login",(req,res)=>{
    //1)校验客户端传递来的用户名与密码和数据库里面的是否一致
    //2)给客户端种cookie,并且同时服务端留一份session
    req.session.azrael = "userId"    
    //3)后端种完cookie后，就可以给前端返回数据
    res.send({
        err:0,
        msg:"恭喜您,登录成功了！",
        data:{
            username:"张三"
        }
    })
})

//自动登录功能
app.get("/api/user",(req,res)=>{
    //读cookie对比session
    //如果前端传递来的cookie是有效的，那么req.session.nz1906的值就是“userId"
    //如果前端传递来的cookie失效了，那么req.session.nz1906的值就是undefined
    let pass = req.session.azrael //如果用户登录了，那么pass="userId"，如果用户cookie失效或者没有，那么返回null
    if(pass){
        //说明用户身份一直存在的，取库数据，并且返回
        res.send({
            erro:0,
            data:"/api/user的数据！！！"
        })
    }else{
        res.send({
            err:1,
            data:"用户未登录...或者登录过期了.."
        })
    }
    res.end()
})


//注销登录
app.get("/api/logout",(req,res)=>{

    //删除服务端session和客户端的cookie
    req.session.nz1906 = undefined
    res.end()
})
```
错误问题：Cannot read property 'user' of undefined
解决方案：路由跳转应该放在在session中间件配置的后面

cookie有效期：
- 如果maxAge属性为正数，则表示该Cookie会在maxAge秒之后自动失效。浏览器会将maxAge为正数的Cookie持久化，即写到对应的Cookie文件中。无论客户关闭了浏览器还是电脑，只要还在maxAge秒之前，登录网站时该Cookie仍然有效
- 如果maxAge为负数，则表示该Cookie仅在本浏览器窗口以及本窗口打开的子窗口内有效，关闭窗口后该Cookie即失效。maxAge为负数的Cookie，为临时性Cookie，不会被持久化，不会被写到Cookie文件中；默认的maxAge值为-1
- 如果maxAge为0，则表示删除该Cookie。Cookie机制没有提供删除Cookie的方法，因此通过设置该Cookie即时失效实现删除Cookie的效果。失效的Cookie会被浏览器从Cookie文件或者内存中删除
  ```
  //response对象提供的Cookie操作方法只有一个添加操作add(Cookie cookie)。要想修改Cookie只能使用一个同名的Cookie来覆盖原来的Cookie，达到修改的目的。删除时只需要把maxAge修改为0即可
  Cookie cookie = new Cookie("username", "helloweenvsfei");  
  cookie.setMaxAge(0);   //新建cookie                         
  response.addCookie(cookie); //覆盖
  ```

### fs

  fs.stat 检测是文件还是目录
  fs.mkdir 创建目录
  fs.writeFile 创建写入文件
  fs.appendFile 追加文件
  fs.readFile 读取文件
  fs.readdir 读取目录
  fs.rename 重命名
  fs.rmdir 删除目录
  fs.unlink 删除文件
  fs.createReadStream 从文件流中读取数据
  fs.createWriteStream 写入文件