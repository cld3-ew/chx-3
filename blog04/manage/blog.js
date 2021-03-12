//对数据库中博文表的crud操作的封装

const {db} = require('../utils/dbconn')
module.exports = {
    //根据id查询博文
    getBlogById: async (id) => {//直接传入参数，调用dbconn模块的方法操作数据库
        let sql = 'select * from t_blog where id = ?'
        let sqlParams = [id]
        return await db(sql, sqlParams)
    },
    //获取所有博文
    getAll: async () => {
        let sql = 'select * from t_blog where is_del = 0 and status = 0'
        return await db(sql)
    }, 
    //获取不同类型的博文
    getBlogByType: async (blog_type) => {//传入参数为博文类型
      let sql = 'select * from t_blog where blog_type = ?'
      let sqlParams = [blog_type]
      return await db(sql, sqlParams)
    }, 
    //博文分页
    getBlogPage: async (page) => {
      let sql = 'select * from t_blog order by id desc limit 5 offset ? '
      let sqlParams = [page]
      return await db(sql, sqlParams)
    }, 
    //根据发布时间查询博文
    getBlogJoinUser: async () => {
      let sql = 'select * from t_blog b INNER JOIN t_user u ON b.user_id = u.id '
      return await db(sql)
    }, 
    //博文详情页通过blog_id查询博文数据
    getBlogJoinUserById: async (id) => {
      let sql = 'select * from t_blog b INNER JOIN t_user u ON b.user_id = u.id where b.id = ? '
      let sqlParams = [id]
      return await db(sql, sqlParams)
    }, 
  //博文详情页通过blog_title查询博文数据
  getBlogJoinUserByTitle: async (title) => {
    let sql = 'select * from t_blog b INNER JOIN t_user u ON b.user_id = u.id where b.blog_title = ? '
    let sqlParams = [title]
    return await db(sql, sqlParams)
  }, 
     //根据发布时间查询博文
     getBlogCreater: async () => {
      let sql = 'select * from t_blog order by create_time desc '
      return await db(sql)
    }, 
    //添加博文
    insert: async (blog) => {
        let sql = 'insert into t_blog set ?'
        return await db(sql, blog)
    },
    //更新博文
    update: async (arr) => {
        //[{}, id]
        let sql = 'update t_blog set ? where id=?'
        return await db(sql, arr)
    },
    //删除博文
    del: async(id) => {
        arr = [{is_del: 1}, id]
        this.update(arr);
    }
}