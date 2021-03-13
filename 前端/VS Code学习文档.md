VS Code学习文档

1. user installer 单用户安装
 system installer  多用户安装
.zip解压可直接使用

2. 设置中文界面：安装插件Chinese或json页面设置为zh-cn

~~打开josn页面：打开设置，点击右上角[打开设置]图标~~

禁用更新：设置，搜索update mode设置为none

~~代码提示：设置，搜索prevent，取消勾选~~

~~安装插件：左下角插件图标，搜索所需要的插件~~

~~开启本地服务：解决无法在浏览器中运行~~

~~配置python开发语言：工具和语言，点击python，电脑需提前安装了python~~

~~新建文件，保存到桌面，选择保存格式~~

界面美化：搜索颜色主题，ctrl+shift+减号组合快捷键调节字体大小，设置背景图，点击右下角图标

3. 设置字体：github上下载FiraCode的zip包直接解压即可安装，打开vscode设置settings.json，搜索font，添加如下：
"editor.fontFamily": "'Fira Code',Menlo, Monaco, 'Courier New', monospace", // 设置字体显示
"editor.fontLigatures": false,//控制是否启用字体连字，true启用，false不启用

4. 自动保存：设置中搜索Files:AutoSave，修改为onFocusChange

5. 设置背景图片：
   1.安装background-cover插件，可设置背景图片路径，可设置多张图片自动切换
   2.安装background插件，在settings.json文件中添加对background插件的配置的代码，可在右下角局部显示图片，可在多个页面显示不同背景，可使用默认背景
   3.引入的图片可用在线抠图网站转换为背景为透明的样式(.png格式背景为透明)
   4.引入图片也可为gif动图
   ```
    "background.customImages": [
        "file:///F:/Picture/Yukino/vs_background.png",  //图片路径
        "file:///F:/Picture/Yukino/vs_background123.png"
    ],
    "background.styles": [
        {
            "content":"''",
            "pointer-events":"none",
            "position":"absolute",  //定位
            "width":"100%",
            "height":"100%",
            "z-index":"99999",
            "background.repeat":"no-repeat",
            "background-size":"20%,20%",  //图片大小
            "opacity":0.1  //透明度
        },
        {
            "content":"''",
            "pointer-events":"none",
            "position":"absolute",
            "width":"100%",
            "height":"100%",
            "z-index":"99999",
            "background.repeat":"no-repeat",
            "background-size":"30%,30%",
            "opacity":0.1
        }
    ],
    "background.useFront": true,
    "background.useDefault": false,  //是否使用该插件默认图片
   ```
   