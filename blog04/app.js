//引入express
const express = require('express')
//引入fs
const fs = require('fs')
const {success, error} = require('./utils/result')
const user = require('./manage/user')
//const Core = require('@alicloud/pop-core');
const multer = require('multer')
const blog = require('./manage/blog')
let upload = multer({ dest: 'temp/' })//上传后二进制数据文件夹
//const cookieParser = require('cookie-parser');//3
const session = require('express-session');//3  session所需模块
const path =require('path')
//const { default: Todo } = require('wangeditor/dist/menus/todo')

//初始化express
const app = express()
//初始化静态资源文件夹
app.use('/static', express.static(__dirname + '/static'))

//配置session中间件
app.use(session({
  secret: 'sessionuserrecommand 128 bytes random string',
  resave: true,//覆盖
  saveUninitialized:false,//不自动保存
  cookie: {
    maxAge: 10*10000 // （默认值）有效期
  }
}));

//对页面跳转的封装
const read = (url) => {
    return new Promise((resolve, reject) => {
        fs.readFile(url, (err, data) => {
            if(!err) {
                resolve(data)
            } else {
                console.log(err);
                reject(err)
            }
        })
    })
}

//负责页面跳转 get--->pages/*.html
/** ------------------pages s----------------------- */
//跳转首页
app.get('/', async(req, resp) => {
    const data = await read('pages/index.html');
    resp.end(data);
}) 
//跳转到登录
app.get('/goLogin', async(req, resp) => {
    const data = await read('pages/login.html')
    resp.end(data);
}) 
//注册页面
app.get('/register', async(req, resp) => {
    const data = await read('pages/register.html')
    resp.end(data)
})
//跳转传作者中心页面
app.get('/creation', async(req, resp) => {
  if(req.session.uid != undefined){
    const data = await read('pages/creation.html')
    resp.end(data)
  }else{
    const data = await read('pages/unlogin.html')
    resp.end(data)
  }
})
//提示未登录页面
app.get('/unlogin', async(req, resp) => {
  const data = await read('pages/unlogin.html')
  resp.end(data)
})
//addblog富文本页面
app.get('/addblog', async(req, resp) => {
  const data = await read('pages/addblog.html')
  resp.end(data)
})
//博文详情页
app.get('/detail', async(req, resp) => {
  const data = await read('pages/detail.html')
  resp.end(data)
})
//个人中心
app.get('/usercent', async(req, resp) => {
  const data = await read('pages/usercent.html')
  resp.end(data)
})

// app.get('/usercent', async(req, resp) => {
//   if(req.session.uid != undefined){
//     const data = await read('pages/usercent.html')
//     resp.end(data)
//   }else{
//     const data = await read('pages/unlogin.html')
//     resp.end(data)
//   }
// })


/** ------------------pages e----------------------- */

//负责业务逻辑： mysql + ajax + 数据响应与数据处理
/** ------------------service s----------------------- */

// const getCode = (code) => {
//     var client = new Core({
//         accessKeyId: 'LTAI4GBnfBweBmdSaoUaPtaC',
//         accessKeySecret: '3gHMPKqINiCrzIj3nRtrIYyxoIc0fd',
//         endpoint: 'https://dysmsapi.aliyuncs.com',
//         apiVersion: '2017-05-25'
//     });
        
//     var requestOption = {
//         method: 'POST'
//     };
//     var params = {
//         "code": code
//     }
//    return  new Promise((resolve, reject) => {
//     client.request('松松学院', params, requestOption).then((result) => {
//         console.log(JSON.stringify(result));
//         resolve(JSON.stringify(result))
//       }, (ex) => {
//         console.log(ex);
//         reject(ex)
//       })
//    })
// }
  
//获取验证码
app.get('/getCode', async (req, resp) => {
    //生成一个验证码
    let code = Math.floor(Math.random()*9999);
    //调用第三方短信平台接口
    // const rsp = await getCode(code)
    // console.log('rsp:', rsp)
//返回当前验证码给前端页面
    let data = {
        code: 0,
        msg: "获取成功",
        data: code
    }
    resp.send(data)
})

//user 板块
//用户注册
app.post('/registerUser', (req, resp) => {
    let body = ''
    req.on('data', data=> {
        body += data
    })
    req.on('end', () => {//从ajax请求传过来的data
        const usp = new URLSearchParams(body)
        let ruser = {
            phone: usp.get('phone'),
            password: usp.get('password')
        }
        user.getUserByPhone(usp.get('phone'))  //调用user.js模块
        //.then传递 resolve和 reject 方法作为回调
        .then(res => {
            if(res.length > 0) {
                resp.send(error("用户已存在"))
            } else {
                user.insert(ruser)
                .then(result => {
                    if(result.affectedRows > 0) {
                        resp.send(success('注册成功,请登录', null))
                    } else {
                        resp.send(error("注册失败"))
                    }
                })
            }
        })
    })
})

//用户是否存在
app.get('/checkUser', (req, resp) => {
    user.getUserByPhone(req.query.phone)
    .then(results => {
        if(results.length > 0) {
            resp.send(error("用户信息已存在，请直接登录"))
        } else {
            resp.send(success("用户不存在，请重新输入", null))
        }
    })
})
//用户登录
app.post('/login', (req, resp) => {
    let body = ''
    req.on('data', data=> {
        body += data
    })
    req.on('end', () => {
        const usp = new URLSearchParams(body)
        const phone = usp.get('phone')
        const password = usp.get('password')
        user.getUserByPhone(phone)
        .then(results => {
            let u = results.length > 0 ? results[0] : ''   //有返回数据
            console.log('登录成功的user_id:'+u.id)
            req.session.uid=u.id;  //将用户信息存入session
            req.session.uph=u.phone//
            req.session.upas=u.password//
            console.log("session:"+req.session.uid+req.session.uph+req.session.upas)//
            if(u != null && u.password == password) {
                resp.send(success("登录成功", u.id))//返回u，前端无法取值
  
            } else {
                resp.send(error("用户名或密码错误"))
            }
        })
    })
})

/**
 * 根据手机号获取用户信息
 */
// const getUserByPhone = (phone) => {
//     //使用连接池创建：连接池可以创建多个conn对象，可以确保数据库的操作不会进入到阻塞状态
//     const pool = mysql.createPool(dbconfig)
//     pool.getConnection((err, conn) => {
//         if(!err) {
//             let sql = 'select * from t_level'
//             const query = conn.query(sql)
//             let data = []
//             query.on('result', (row, index) => {
//                 console.log("row:", row, "index:",index);
//                 data.push(row)
//             })
//             query.on('end', () => {
//                 console.log("data:", data)
//             })
//         } else {
//             console.log(err);
//         }
//         //释放连接池资源
//         conn.release();
//     })
// }
// app.get('/user', (req, res) => {
//     getUserByPhone()
//     res.end()
// })

/** ------------------service e----------------------- */

//创作者中心写博文封面上传
app.get('/creation', (req, resp) => {//请求页面
  fs.readFile('pages/creation.html', (err, data) => {   //异步读取文件
      resp.write(data);   //将指定data输出
      resp.end();
  })
})
//获取日期字符串
function datato () {
   let data  = new Date()
  let y = data.getFullYear()
  let m = data.getMonth()
  let d = data.getDate()
  return `${y}${m+1}${d}`;
}
//upload/日期/
app.post('/upload', upload.single('file'), (req, resp) => {//处理请求，读取文件
  console.log("req.file:", req.file)   //终端打印文件的信息
  let file  = req.file
  let arr = file.originalname.split('.')//文件信息的文件上传时的文件名从点开始截取后面的字符串
  let type = arr[arr.length -1]
  console.log("type:", type)   //终端打印文件后缀
  fs.readFile(file.path, (err, data) => {//读取文件上传后的二进制地址
      if(!err) {
          let str = datato()
          let path = `static/upload/${str}/`   //定义创建上传的文件夹
          fs.mkdirSync(path, {recursive: true}) //参数为将创建的文件夹，目录权限
          //写入文件
          let filePathname = `${path}${file.filename}.${type}`
          console.log('filePathname:', filePathname)  //终端打印文件地址和文件名
          req.session.blog_pic=filePathname; //存入session
          fs.writeFileSync(filePathname, data);//参数为写入的文件名和内容
          let d  ={
              code: 0,
              msg: '上传成功',
              data: filePathname
          }
          resp.send(d)
      }
  })
})

//创作者中心点击上传，添加数据到数据库
app.post('/upblog', (req, resp) => {
  let body = ''
  req.on('data', data=> {
      body += data
  })
  req.on('end', () => {
    const usp = new URLSearchParams(body)
    let blogg = {
      user_id : usp.get('user_id'),
      blog_title : usp.get('blog_title'),
      blog_type : usp.get('blog_type'),
      blog_pic : req.session.blog_pic,
      foreword : usp.get('foreword'),
      blog_content : usp.get('blog_content')
    }
    blog.insert(blogg)
      .then(result => {
          if(result.affectedRows > 0) {
              resp.send(success('上传成功', blogg))
          } else {
              resp.send(error("上传失败"))
          }
      })
  })
})

//获取博文表中数据返回到首页
app.get('/getblogs', (req, resp) => {
    blog.getBlogJoinUser()
    .then(results => {
      blogs = results.length > 0 ? results : ''
        if(results.length > 0) {
            resp.send(success("请求成功", blogs))
        }
    })
})

//个人中心获取不同类型的博文
app.get('/getblogyc', (req, resp) => {
  console.log(req.query.blog_type)//前端传的值
  blog.getBlogByType(req.query.blog_type)
  .then(results => {
    blogs = results.length > 0 ? results : ''
        if(results.length > 0) {
            resp.send(success("请求成功", blogs))
        } else {
          resp.send(error("没有查询到该类型博文！"))
      }
  })
})

//个人中心博文分页显示
app.get('/getblogpage', (req, resp) => {
  let page = (req.query.index)*5
  console.log(page)
  blog.getBlogPage(page)
  .then(results => {
    blogs = results.length > 0 ? results : ''
        if(results.length > 0) {
            resp.send(success("请求成功", blogs))
        } else {
          resp.send(error("没有查询到数据"))
      }
  })
})

//获取倒序排序的上传时间的博文
app.get('/getblogtimer', (req, resp) => {
  blog.getBlogCreater()
  .then(results => {
    blogs = results.length > 0 ? results : ''
        if(results.length > 0) {
            resp.send(success("请求成功", blogs))
        } else {
          resp.send(error("没有查询到数据"))
        }
})
})

//个人中心点击上传，添加数据到数据库
app.post('/usermsg', (req, resp) => {
  let body = ''
  req.on('data', data=> {
      body += data
  })
  req.on('end', () => {
    const usp = new URLSearchParams(body)
    let usermsg = [{
      nickname : usp.get('nick'),
      head_img : req.session.blog_pic,
      personal_sign : usp.get('sign')
      },
      usp.get('id')
    ]
    user.update(usermsg)
    .then(result => {
        if(result.affectedRows > 0) {
            resp.send(success('上传成功', usermsg))
        } else {
            resp.send(error("上传失败"))
        }
    })
  })
})

//忘记密码板块，更新数据库
app.post('/uppw', (req, resp) => {
  let body = ''
  req.on('data', data=> {
      body += data
  })
  req.on('end', () => {
    const usp = new URLSearchParams(body)
    let userpw = [{
      password : usp.get('password')
      },
      usp.get('phone')
    ]
    user.updatePasswordByPhone(userpw)
    .then(result => {
      if(result.affectedRows > 0) {
          resp.send(success('修改成功！', userpw))
      } else {
          resp.send(error("修改失败！"))
      }
    })
  })
})

//将博文id存入session
// app.get('/goDetail', (req, resp) => {
//   let bid = req.query.blog_id;
//   console.log("blogId="+bid)
//   // req.session.blogId=id; 
// })

//博文详情页显示博文
app.get('/getBlogDe', (req, resp) => {
  let id = req.query.id;
  console.log("cid="+id);
  blog.getBlogJoinUserById(id)
    .then(results => {
      blogs = results.length > 0 ? results : ''
        if(results.length > 0) {
            resp.send(success("请求成功", blogs))
        }
    })
})

//博文详情页搜索博文
app.get('/getBlogDet', (req, resp) => {
  let t = req.query.v;
  console.log("title="+t);
  blog.getBlogJoinUserByTitle(t)
    .then(results => {
      blogs = results.length > 0 ? results : ''
        if(results.length > 0) {
            resp.send(success("请求成功", blogs))
        }else {
          resp.send(error("没有查到！"))
      }
    })
})

//监听服务器端口
app.listen(3000, () => {
    console.log('server is start');
})