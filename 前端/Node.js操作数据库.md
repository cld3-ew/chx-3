# Node.Js操作数据库

### 安装MySQL数据库环境

- 打开https://dev.mysql.com/downloads/windows/installer/8.0.html下载MySQL安装程序，点击Archiver可选择版本，MSI为微软格式安装包，zip为压缩包安装方式
- 使用命令行登录，打开cmd或命令提示符，输入mysql -uroot -p,再输入密码或直接<Enter>，显示welcome登录成功，则说明安装成功
- 连接本地mysql时出现2003-Can't connect to MySql server on 'localhost'(10061)错误,解决方法：win+r,输入services.msc，启动mysql服务，如果没有mysql服务，打开cmd,输入mysqlld.exe --install，再启动mysql服务
- 登录mysql时，错误：ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: NO)，可能是没有输入密码
- 安装MySQL可视化工具navicat，Navicat Premium为全功能版
- 错误 1251 - Client does not support authentication protocol requested by server，解决方法：以管理员的身份运行命令提示符，cd进入mysql安装目录，默认为C:\Program Files\MySQL\MySQL Server 8.0\bin，进入mysql控制台：mysql -uroot -p,输入如下命令：
  alter user 'root'@'localhost' identified with mysql_native_password by '123456';
  //123456为自己的登录密码
  flush privileges;

 - 报错：mysql Unknown column '' in 'field list'，解决方法：sql语句中char型要加''符号(单双引号都可以）
 - 基本的sql命令，模糊查询，？：匹配单个字符。%匹配多个字符
 - 使用npm添加模块：
  npm install xxx
    会把X包安装到node_modules目录中
    不会修改package.json
    之后运行npm install命令时，不会自动安装X

-g
全局安装

-S， --save
会把X包安装到node_modules目录中
会在package.json的dependencies属性下添加X
之后运行npm install命令时，会自动安装X到node_modules目录中
  
- 当一个路径有多个匹配规则时，使用app.use，否则使用相应的app.method(get、post)
- Ajax何时用get和post：
  GET的目的就如同其名字一样是用于获取信息的。它旨在显示出页面上你要阅读的信息。浏览器会缓冲GET请求的执行结果，如果同样的GET请求再次发出，浏览器就会显示缓冲的结果而不是重新运行整个请求。重新请求相同数据会得到相同结果。

  POST方法应该用于你需要调用要更改保存在服务器上的数据
 
- nodejs mysql query 方法：query(第一个参数是一个sql,第二个参数可以是一个数组,第三个是一个回调方法(回调的第一个参数是错误执行错误的时候有值,第二个参数是成功时的返回值))
  
create_time:2021.01.25
update_time:2021.01.25

