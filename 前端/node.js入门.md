### Node.js环境
- 下载node并安装，自动配置环境变量，并顺带安装npm包管理工具
- 打开cmd命令行工具，输入：node -v  //查看node版本，输入npm -v  //查看npm版本
- 安装yarn:npm install -g yarn  //全局安装另一个包管理工具（可选）
- 校验：yarn -v
- 本地磁盘新建一个文件夹，文件夹内新建一个项目文件夹，文件夹地址框输入cmd,打开cmd，输入npm init，一路enter,生成package.json文件
- 该项目文件夹为nodejs环境，用vscode打开
### Node.js入门
- 运行js
  1. 终端 > 新终端 > 输入：node app.js
  2. 右键需运行文件 > 在文件资源管理器中显示 > 文件地址栏输入cmd > 输入：node app.js
  3. 浏览器输入地址：http://localhost:3000  对应端口号
- 引入其他模块
  1. 在终端输入：yarn add 模块名    或者npm install 模块名
  2. 方式二：在cmd输入：yarn add 模块名    或者npm install 模块名
- 错误：Error listen EADDRINUSE :::3000     //端口号被其他应用程序占用
  1. netstat -o -n -a | findstr :3000      //查看端口
  2. taskkill /F /PID 115148         //终止PID为115148的端口，这里需输入当前对应的PID
  3. 其他：	netstat -lntp    //显示协议统计信息和当前 TCP/IP 网络连接(帮助)
- process对象
  1. 简介：process对象是Node的一个全局对象，提供当前Node进程的信息。它可以在脚本的任意位置使用，不必通过require命令加载。该对象部署了EventEmitter接口
  2. 退出码：0，正常退出
            1，发生未捕获错误
            5，V8执行错误
            8，不正确的参数
            128 + 信号值，如果Node接受到退出信号（比如SIGKILL或SIGHUP），它的退出码就是128加上信号值。由于128的二进制形式是10000000, 所以退出码的后七位就是信号值
  3. 属性
  4. 方法
  5. 事件

---

- package.json文件详解：
    name：项目名称
    deecription：应用项目描述
    version 版本号
    config：应用的配置项
    author：作者
    respository：资源仓库地址
    licenses：授权方式
    directories：目录
    main：应用入口文件
    bin：命令行文件
    dependencries：项目应用运行依赖模块
    devDependencies：项目应用开发环境依赖
    engines：运行引擎，指明node.js运行所需要的版本
    script：脚本

- 修改localhost为自己指定的域名：
  一般在windows电脑中localhost的配置一般都在电脑的C:\Windows\System32\drivers\etc这个路径下，用编辑器打开该路径下的hosts文件，在最后一行添加（注意没有#）
  127.0.0.1   自定义域名   

- 结束在gitbush、终端中运行nodejs:
  ctrl+C