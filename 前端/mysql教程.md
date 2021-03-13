1. cmd或命令提示符中使用命令登录MySQL：
     不需要进入MySQL安装目录
     mysql -uroot -p
     输入密码或直接按enter

2. 查看所有数据库
     show databases;

3. 切换到某个库
      use databasename(数据库名);

4. 查看数据库表：
     切换某个库之后
     show tables;

5. 启动MySQL服务：
   cmd中输入：services.msc
   或：停止命令：net stop MYSQL80(服务器名)
      启动命令：net start mysql
      
6. 查看表结构：
   desc 表名;

7. 查看当前所在库：select database();
   查看当前mysql支持的存储引擎：SHOW ENGINES;
   查看系统变量及其值：SHOW VARIABLES;
   查看某个系统变量：SHOW VARIABLES like '变量名';

8. 创建用户：
   create user 用户名[@主机名] [identified by '密码'];
   1.主机名默认值为%，表示这个用户可以从任何主机连接mysql服务器
   2.密码可以省略，表示无密码登录
   ```
    1.
    create user test1;
    create user 'test2'@'localhost' identified by '123';
    说明：test2的主机为localhost表示本机，此用户只能登陆本机的mysql
    create user 'test3'@% identified by '123';
    说明：test3可以从任何机器连接到mysql服务器
    create user 'test4'@'192.168.11.%' identified by '123';
    说明：test4可以从192.168.11段的机器连接mysql

    2.创建用户后，可用该用户进行登录：
    mysql -utest1(-u用户名)

    3.查看mysql中所有用户：
    use mysql;  //切换到mysql表
    select user,host from user;  //查找用户
  ```

9. 修改密码：
    ```
    方式1：通过管理员修改密码
    SET PASSWORD FOR '用户名'@'主机' = PASSWORD('密码');
    方式2：在创建用户后修改
    create user 用户名[@主机名] [identified by '密码'];
    set password = password('密码');
    方式3：通过修改mysql.user表修改密码
    use mysql;
    update user set authentication_string = password('321') where user = 'test1' and host = '%';
    flush privileges;
    注意：
    通过表的方式修改之后，需要执行flush privileges;才能对用户生效。
    mysql5.7中user表中的authentication_string字段表示密码，老的一些版本中密码字段是password。

    ```

10. 给用户授权：
     语法：grant privileges ON database.table TO 'username'[@'host'] [with grant option]
     •	priveleges (权限列表)，可以是all，表示所有权限，也可以是select、update等权限，多个权限之间用逗号分开。
     •	ON 用来指定权限针对哪些库和表，格式为数据库.表名 ，点号前面用来指定数据库名，点号后面用来指定表名，*.* 表示所有数据库所有表。
     •	TO 表示将权限赋予某个用户, 格式为username@host，@前面为用户名，@后面接限制的主机，可以是IP、IP段、域名以及%，%表示任何地方。
     •	WITH GRANT OPTION 这个选项表示该用户可以将自己拥有的权限授权给别人。注意：经常有人在创建操作用户的时候不指定WITH GRANT OPTION选项导致后来该用户不能使用GRANT命令创建用户或者给其它用户授权。 备注：可以使用GRANT重复给用户添加权限，权限叠加，比如你先给用户添加一个select权限，然后又给用户添加一个insert权限，那么该用户就同时拥有了select和insert权限。
   ```
     grant all on *.* to 'test1'@‘%’;
     说明：给test1授权可以操作所有库所有权限，相当于dba
     grant select on seata.* to 'test1'@'%';
     说明：test1可以对seata库中所有的表执行select
     grant select,update on seata.* to 'test1'@'%';
     说明：test1可以对seata库中所有的表执行select、update
     grant select(user,host) on mysql.user to 'test1'@'localhost';
     说明：test1用户只能查询mysql.user表的user,host字段
   ```

11. 查看用户权限：
     语法：show grants for '用户名'[@'主机']
     show grants for 'test1'@'localhost';
     查看当前用户权限：show grants;

12. 撤销用户权限：
     语法：revoke privileges ON database.table FROM '用户名'[@'主机'];
     revoke select(host) on mysql.user from test1@localhost;
 
13. 删除用户：
     1.drop user '用户名'[@‘主机’]
     drop user test1@localhost;
     2.delete from user where user='用户名' and host='主机';
     flush privileges;  //刷新权限信息

14. 查询数据库表所有数据
     select * from 表名;    (*:表示查询所有列)
     select name, age from 表名;
     select * from 表名 where id='';     (where条件查询)
     select * from 表名 where age > 30 and name like '张?';
     (模糊查询使用like关键字 | % | ?     ？:匹配单个字符 %:匹配多个字符)
15. 创建数据库：create database databasename;
16. 创建数据库表：create table tablename;
17. insert into tablename(字段名) value(值)；
18. update tablename set 字段名=修改的值 where 字段=值；
19. delete form tablename where 字段=值
   （update 和delete 必须更上where条件）

---

mysql图形化工具导入sql脚本错误：#1046 - No database selected
错误原因：选择导入的目标数据库
解决方案：在创建对应的数据库之后，右键该数据库，运行sql文件


	
