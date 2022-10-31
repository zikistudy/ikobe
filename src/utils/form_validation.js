import { fa } from "element-plus/es/locale"

/**
* type--表单验证的类型
* username--用户名
* password--密码
* telephone--手机号
* code--验证码
 */
function validationName(username){
    var regName = /[\u4e00-\u9fa5\w]{4,16}/
    if (!username) {
        ElMessage({
            showClose: true,
            message: '用户名不能为空',
            type: 'error',
        })
        return false
    }else if (regName.test(username) == false) {
        ElMessage({
            showClose: true,
            message: '用户名为中文，字母，数字，下划线,4-16个字符',
            type: 'error',
        })
        return false
    }else{
        return true
    }
}
function validationPass(password){
    var regPass = /[a-zA-Z_0-9]{6,16}/
    if (!password) {
        ElMessage({
            showClose: true,
            message: '密码不能为空',
            type: 'error',
        })
        return false
    }else if (regPass.test(password) == false) {
        ElMessage({
            showClose: true,
            message: '密码为字母，数字，下划线,6-16个字符',
            type: 'error',
        })
        return false
    }else{
        return true
    }
}
function validationPhone(telephone){
    var regPhone = /^1[3456789]\d{9}$/
    if (!telephone) {
        ElMessage({
            showClose: true,
            message: '手机号不能为空',
            type: 'error',
        })
        return false
    } else if (regPhone.test(telephone) == false) {
        ElMessage({
            showClose: true,
            message: '请输入有效的手机号',
            type: 'error',
        })
        return false
    }else{
        return true
    }
}
function validationCode(code){
    if (!code) {
        ElMessage({
            showClose: true,
            message: '短信验证码不能为空',
            type: 'error',
        })
        return false
    } else{
        return true
    }
}
function validationImgCode(code,value){
    if (!code) {
        ElMessage({
            showClose: true,
            message: '图片验证码不能为空',
            type: 'error',
        })
        return false
    } else if(code.toLowerCase() != value.toLowerCase()){
        ElMessage({
            showClose: true,
            message: '图片验证码错误',
            type: 'error',
        })
        return false
    }else{
        return true
    }
}
export function userHandle(type, username, password, telephone, code,imgcode,value) {
    switch (type) {
        case '1':
            return validationPhone(telephone) == true ? validationPass(password):false
            break;
        case '2':
            if(validationPhone(telephone)){
                return validationImgCode(imgcode,value) == true ? validationCode(code) :false
            }else{
                return false
            }
            break;
        case '3':
            if(validationPhone(telephone)){
                if(validationPass(password)){
                    return validationImgCode(imgcode,value) == true ? validationCode(code) :false
                }else{
                    return false
                }   
            }else{
                return false
            }
            break;
        case '4':
            if(validationPhone(telephone)){
                if(validationPass(password)){
                    return validationImgCode(imgcode,value) == true ? validationCode(code) :false
                }else{
                    return false
                }   
            }else{
                return false
            }
            break;
        default:
            break;
    }
}