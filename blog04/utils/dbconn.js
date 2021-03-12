//导入mysql
const mysql = require('mysql')
//数据库配置
const dbconfig = {
    database: 'blog',
    user:'root',
    password:'root',
    charset: 'utf8mb4'
}
//封装的连接数据库
exports.db = (sql, sqlParams) => {
    return new Promise((resolve, reject) => {   //参数：解析，拒绝
        const pool = mysql.createPool(dbconfig)
        pool.getConnection((err, conn) => {
            if(!err) {
                sqlParams = sqlParams || [] //确保sqlParams有值
                conn.query(sql, sqlParams, (err, results) => {
                    if(!err) {
                        console.log("result:", results)
                        resolve(results)   //该方法转为promise对象
                    } else {
                        console.log(err)
                        reject(err)     //该方法返回一个新的实例，状态为操作失败
                    }
                })
            } else {
                //打印错误日志
                console.log(err);
                reject(err)
            }
            //释放连接池资源
            conn.release();
        })
    });
    
}