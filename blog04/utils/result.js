module.exports = {//当前文件中module对象的exports属性是一个对外的接口，可通过require方法引入
  //该模块封装为：query方法操作数据库后对返回的result数组对象经过判断，要返回前端页面ajax请求的自定义的json数组，使用：在js文件中直接使用键即可
    success: (msg, data) => {
        return {code: 0, msg, data}
    },
    error: (code, msg) => {
        console.log(code, msg)
        if(typeof code === 'string') {
            msg = code
            code = 10001
        }
        return {code, msg}
    }
}