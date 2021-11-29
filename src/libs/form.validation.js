/**
 * 生成表单验证规则及验证函数的通用函数
 */

/**
 * 生成字段必填规则
 * @param {string} trigger 何时触发验证
 * @returns {Function}
 */
export const required = (trigger) =>
  /**
   * @param {string} message 校验错误时展示消息
   * @returns {Object}
   */
  (message) => ({ required: true, trigger, message })

/**
 * 生成字段必填规则，在表单项失焦时触发验证
 */
export const requiredBlur = required('blur')

/**
 * 生成字段必填规则，在表单项发生变化时触发验证
 */
export const requiredChange = required('change')

/**
 * 端口号校验规则函数
 * @param {*} _
 * @param {*} value 值
 * @param {*} callback 回调函数
 */
export const portValidator = (_, value, callback) => {
  if (value > 0 && value < 65536) {
    callback()
  } else {
    callback(new Error('端口号不合法（取值范围为 [1, 65535]）'))
  }
}

/**
 * interval校验规则函数
 * @param {*} _
 * @param {*} value 值
 * @param {*} callback 回调函数
 */
export const intervalValidator = (_, value, callback) => {
  if (value > 0 && value <= 2147483647) {
    callback()
  } else {
    callback(new Error('时间间隔不合法（取值范围为 [1, 2147483647]）'))
  }
}

/**
 * api校验规则函数
 * @param {*} _
 * @param {*} value 值
 * @param {*} callback 回调函数
 */
export const apiValidator = (_, value, callback) => {
  if (value === '' || value === undefined || value === null) {
    callback()
    return
  }
  value = value.toString()
  if (value.indexOf('/') === 0 && value.indexOf(' ') < 0) {
    callback()
  } else {
    callback(new Error('连接路径不合法（请以"/"开头且不包含空格 或为空）'))
  }
}
