const vlayer = {
  install(Vue, options) {
    let defaultSettings = {
      type: 0,
      shade: 0.3,
      fixed: true,
      title: '&#x4FE1;&#x606F;',
      offset: 'auto',
      area: 'auto',
      closeBtn: 1,
      time: 0, // 0表示不自动关闭
      zIndex: 19891014,
      maxWidth: 360,
      anim: 0,
      isOutAnim: true,
      icon: -1,
      moveType: 1,
      resize: true,
      scrollbar: true, // 是否允许浏览器滚动条
      tips: 2
    }

    let vlayerTimes = 0

    Vue.prototype.$vlayer = {
      open: function(settings) {
        settings = Object.assign(defaultSettings, settings || {})

        let vlayerShadeDom = document.createElement('div')
        vlayerShadeDom.className = 'layui-layer-shade'
        vlayerShadeDom.id = 'layui-layer-shade' + vlayerTimes
        vlayerShadeDom.setAttribute('style', 'background-color: rgb(0, 0, 0); opacity: 0.3;')

        let vlayerDOM = document.createElement('div')
        vlayerDOM.className = 'layui-layer layui-layer-dialog'
        vlayerDOM.id = 'layui-layer' + vlayerTimes

        let vlayerTitleDom = document.createElement('div')
        vlayerTitleDom.className = 'layui-layer-title'
        let vlayerTitleText = document.createTextNode('信息')
        vlayerTitleDom.appendChild(vlayerTitleText)
        vlayerDOM.appendChild(vlayerTitleDom)

        let vlayerContentDom = document.createElement('div')
        vlayerContentDom.className = 'layui-layer-content'
        let vlayerContentText = document.createTextNode(settings.content || '')
        vlayerContentDom.appendChild(vlayerContentText)
        vlayerDOM.appendChild(vlayerContentDom)

        let vlayerSetwinDom = document.createElement('span')
        vlayerSetwinDom.className = 'layui-layer-setwin'
        let vlayerSetwinClose = document.createElement('a')
        vlayerSetwinClose.className = 'layui-layer-ico layui-layer-close layui-layer-close1'
        vlayerSetwinClose.setAttribute('href', 'javascript:;')
        vlayerSetwinDom.appendChild(vlayerSetwinClose)
        vlayerDOM.appendChild(vlayerSetwinDom)

        let vlayerBtnsDom = document.createElement('div')
        vlayerBtnsDom.className = 'layui-layer-btn layui-layer-btn-'
        let vlayerBtns0 = document.createElement('a')
        vlayerBtns0.className = 'layui-layer-btn0'
        vlayerBtns0.setAttribute('href', 'javascript:;')
        let vlayerBtns0Text = document.createTextNode('确定')
        vlayerBtns0.appendChild(vlayerBtns0Text)
        vlayerBtnsDom.appendChild(vlayerBtns0)
        vlayerDOM.appendChild(vlayerBtnsDom)

        document.body.appendChild(vlayerShadeDom)
        document.body.appendChild(vlayerDOM)

        // 计算位置
        let winWidth = document.documentElement.clientWidth
        let winHeight = document.documentElement.clientHeight
        let vlayerWidth = vlayerDOM.offsetWidth
        let vlayerHeight = vlayerDOM.offsetHeight
        console.log(winWidth, winHeight)
        console.log(vlayerWidth, vlayerHeight)
        vlayerDOM.style.top = (winHeight - vlayerHeight) / 2 + 'px'
        vlayerDOM.style.left = (winWidth - vlayerWidth) / 2 + 'px'
      }
    }
  }
}

export default vlayer
