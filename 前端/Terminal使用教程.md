# Terminal使用教程

### 安装:
直接在 Windows 10 的 应用商店 里面安装
github下载后解压，右键点击 Install.ps1，选择使用 PowerShell 运行

### 设定缺省shell
即打开新窗口时，打开其他如cmd或WSL命令界面，先找到 “profiles” 配置项，看里面 cmd.exe 对应的 guid 是什么，拷贝 cmd.exe 对应的 guid 到 “defaultProfile” 中

### 设置选中复制
修改 “copyOnSelect” 选项的值为 true

### 设定配色
找到“schemes” 配置项数组，修改

  "cursorColor": "#FFFFFF",  //光标
  "selectionBackground": "#ffffff",  //选中
  "background": "#063d3a",  //背景
  "foreground": "#ece4e4",  //字体颜色

### 设定字体
找到profile配置：
 "fontFace" : "Consolas",    //字体
 "fontSize" : 12,      //大小

 ### 微软官方文档：
 https://docs.microsoft.com/zh-cn/windows/terminal/
 或者搜索Windows Terminal可查看其他博客教程

 create_time:2021.01.26
 upeate_time:2021.01.26

---

- 终端配置文件地址：
   C:\Users\dell\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState
- 添加主题：
  ```
  在schemes数组内添加相应主题
  主题推荐：https://github.com/mbadolato/iTerm2-Color-Schemes/tree/master/windowsterminal  直接复制json格式文本即可
  也可自行配置，格式如下：
   {
      "name": "Atom",
      "black": "#000000",
      "red": "#fd5ff1",
      "green": "#87c38a",
      "yellow": "#ffd7b1",
      "blue": "#85befd",
      "purple": "#b9b6fc",
      "cyan": "#85befd",
      "white": "#e0e0e0",
      "brightBlack": "#000000",
      "brightRed": "#fd5ff1",
      "brightGreen": "#94fa36",
      "brightYellow": "#f5ffa8",
      "brightBlue": "#96cbfe",
      "brightPurple": "#b9b6fc",
      "brightCyan": "#85befd",
      "brightWhite": "#e0e0e0",
      "background": "#161719",
      "foreground": "#c5c8c6"
    }
  ```

- 使用主题：
  ```
  在profiles数组对应项中添加一行colorScheme，其值为添加主题的name字段值
  没有指定主题name时，默认第一个；指定name后覆盖第一个
  "profiles": [
    {
        "guid": "{XXX}",
        "name": "Windows PowerShell",
        "commandline": "powershell.exe",
        "hidden": false,
        "colorScheme": "Builtin Solarized Light"
    }
  ]
  ```

- 设置背景图片：
  ```
   {
    // Make changes here to the powershell.exe profile.
    "guid": "{61c54bbd-c2c6-5271-96e7-009a87ff44bf}",   #唯一值，不可复制
    "name": "Windows PowerShell",
    "commandline": "powershell.exe",
    "hidden": false,
    "fontFace" : "Sarasa Term SC",   #字体样式：更纱等距黑体
    "fontSize" : 12,   #字体大小
    "acrylicOpacity" : 0.3,
    "background" : "#000000",  #背景
    "backgroundImage" : "E:/图片/minimalism/4vpz7l.jpg",   #图片地址，也可以是gif
    "backgroundImageStretchMode": "uniformToFill",   #设置背景图片伸缩模式为按比例放大
    "backgroundImageOpacity" : 0.6,   #不透明度
    "closeOnExit" : true,
    "cursorColor" : "#FFFFFF",   #光标颜色
    "cursorShape" : "vintage",   #光标样式
    "historySize" : 9001,
    "icon" : "ms-appx:///E:/图片/icon/powershell.png",   #选项卡图标
    "padding" : "0, 0, 0, 0",
    "snapOnInput" : true,
    "startingDirectory" : "%USERPROFILE%",
    "tabTitle" : "Powershell",   #定义选项卡标题
    "useAcrylic" : false,   #毛玻璃特效关，设置背景时
    "colorScheme": "Atom"   #配置主题
   }
  ```

---

### windows默认powershell和cmd美化

- 设置字体：
  GitHub下载更纱等距黑体的字体压缩包，解压后双击安装，安装后terminal也可设置
  打开window默认power shell或命令提示符，右键顶部菜单栏 > 属性 > 可设置光标|字体|颜色，选择「等距更纱黑体 T SC」或「Sarasa Mono T SC」
- 设置颜色：
  设用包管理工具scoop下载配色工具color tool：-> scoop install colortool
  查看工具默认主题，输入：colortool -s   //-s 代表 schemes
   campbell-legacy.ini                                                              
   campbell.ini                                                                     
   cmd-legacy.ini                                                                   
   deuteranopia.itermcolors                                                         
   OneHalfDark.itermcolors                                                          
   OneHalfLight.itermcolors                                                         
   solarized_dark.itermcolors                                                       
   solarized_light.itermcolors
  设置默认主题：colortool <主题名称>   =>   右键顶部菜单栏>属性>确认
  ```
  推荐iTerm主题：https://iterm2colorschemes.com/   =>   ctrl+s保存下载
  powershell设置iTerm主题：
    cd c: path ocolortool   //进入保存主题的文件夹
    colortool <主题名称>   =>   右键顶部菜单栏>属性>确认
  cmd设置iTerm主题：
    cd c: path ocolortool   =>   E:   //cmd进入其他盘是先输入路径，在输入盘符
    colortool <主题名称>   =>   右键顶部菜单栏>属性>确认
  ```
  terminal也可使用iTerm主题

  
