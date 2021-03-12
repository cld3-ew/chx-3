- open jdk安装方式
  下载后解压并配置环境变量，具体：https://blog.csdn.net/jianzero/article/details/98483083

- 在cmd中运行Java文件
  1.用记事本编写Java程序
  2.cmd中将.java文件编译为.class文件：  javac C:\Users\kkkh1\Desktop\01.java   
  3.进入.class文件所在路径：  cd C:\Users\kkkh1\Desktop
  4.运行.class文件：  java Hello

- 在用javac编译.java文件时报错出现中文乱码
  解决方案：进入需编译的文件所在路径后输入：  javac -encoding utf-8 Hello.java

- jdk等安装后配置环境变量为该电脑的环境，配置用户变量则为当前用户的环境

- IDEA在创建类时自动添加文档注释设置教程和注释模板设置教程：https://www.cnblogs.com/godtrue/p/8644121.html
IDEA设置类的文档注释和方法注释教程和模板教程：https://blog.csdn.net/qq_40563761/article/details/90023679