- 安装：
  ```
    1.要求是power shell 5版本：
    Get-Host | Select-Object Version  //查看版本
    2.在 PowerShell 中输入下面内容，保证允许本地脚本的执行：
    set-executionpolicy remotesigned -scope currentuser
    3.然后执行下面的命令安装 Scoop：
    iex (new-object net.webclient).downloadstring('https://get.scoop.sh')
    4.测试：
    scoop help
  ```
- 报错> iex : 使用“1”个参数调用“DownloadString”时发生异常:“基础连接已经关闭: 连接被意外关闭。”
  解决方案：新建两个ps1文件，科学上网后，运该文件，具体参考：https://blog.csdn.net/weixin_43870822/article/details/109162738
- 基础语法：「scoop + 动作 + 对象」
  scoop search 软件名  //搜索软件
  scoop install 软件名  //安装软件
  scoop update 软件名  //更新软件
  scoop status 软件名  //查看软件状态
  scoop uninstall 软件名  //卸载软件
  scoop info 软件名  //查看软件详情
  scoop home 软件名  //打开软件主页

- 安装位置：
  默认为C:\Users\dell\scoop
  自定义安装路径：
 ```
 [environment]::setEnvironmentVariable('SCOOP_GLOBAL','D:\Applications\Scoop\globalApps','Machine')
 $env:SCOOP_GLOBAL='D:\Applications\Scoop\globalApps'
 ```
- 卸载该软件：
  scoop uninstall scoop

- 查看官方存储桶列表：
  scoop bucket known

- 添加额外的存储库：
  需要有 git 环境支撑，安装git： scoop install git
  添加：scoop bucket add <仓库名>

- 命令：
  scoop help   #查看帮助
  scoop help <command>  #查看特定帮助
  scoop list            #查看当前已安装软件
  scoop info app        #查看软件信息
  scoop update *        #更新安装的软件和scoop
  scoop config proxy 127.0.0.1:4412   # 设置代理(http)
  scoop hold app   #禁止更新
  scoop config proxy currentuser@default   # 使用当前用户的默认代理
  scoop config rm proxy   # 移除代理
  scoop checkup   #检查问题
  scoop reset *   #重置
