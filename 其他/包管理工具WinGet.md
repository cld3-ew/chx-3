包管理工具CLI又名WinGet

用微软商店安装需注册WinGet：k.163

手动安装，通过GitHub下载

安装成功后可在window终端、命令提示符或命令行工具中使用winget命令，发现、安装、升级、删除和配置选定应用集

安装软件：winget install 软件名称

安装时显示彩虹进度条：winget install 软件名 rainbow

显示软件详细信息：winget show 软件名

搜索特定软件：winget search 软件名

winget search -q 软件名

添加软件源：winget source add  <软件源>

列出当前添加的软件源：winget source list

更新软件源：winget source update

移除当前软件源：winget source remove

hash命令为安装程序SHA256：winget hash [要进行hash运算的文件的路径]

帮助：winget -?        winget --help

显示版本：winget show -v 工具名称





