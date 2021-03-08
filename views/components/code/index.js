/**
 * 验证码组件
 */
const CODE = (function () {
  /**
   * 验证码倒计时功能
   * @param {Number} initialTime 倒计时秒数
   */
  function countDown(initialTime = 60) {
    $countDown = $('.time-count-down')
    let timer = setInterval(() => {
      initialTime = initialTime - 1
      $countDown.text(`(${initialTime}s)`)
      if (initialTime === -1) {
        $countDown.text('')
        clearInterval(timer)
      }
    }, 1000)
  }

  // 初始化验证码组件: 绑定录入、删除事件
  function initCode(selector, path) {
    const $codeList = $(`.code-container${selector} li`)
    // 监听粘贴事件
    window.addEventListener('paste', function (event) {
      var clipboardData = event.clipboardData || event.originalEvent.clipboardData
      var code = clipboardData.getData('Text')
      if (code.length === 4 && !isNaN(code)) {
        Array.from($codeList).forEach((item, index) => {
          $(item).children().val(code[index])
        })
        $($codeList[$codeList.length - 1])
          .children()
          .focus()
      }
    })

    /**
     *  1. 检测当前是否录入数据, 如果录入自动跳转到下一个输入框
     *  2. 去除不合法的数据
     */
    $(`.code-container${selector} li input`).on('input', function (e) {
      const value = e.target.value.replace(/[^\d]/g, '')
      $(this).val(value)
      if (value.length !== 0) {
        $(this).parent().next().children().focus()
        let code = ''
        Array.from($codeList).forEach((item, index) => {
          code = code + $(item).children().val()
        })
        if (code === '1111') {
          location.href = path
        } else {
          // 提示验证码校验失败
        }
      }
    })

    //- 当然输入框没有数据并且点击了删除, 需要删除上一个并且聚焦上一个输入框
    $(`.code-container${selector} li input`).on('keydown', function (e) {
      if (e && e.keyCode === 8 && !e.target.value) {
        const $prveInput = $(this).parent().prev().children()
        $prveInput.val()
        $prveInput.focus()
      }
    })
  }
  return { countDown, initCode }
})()
