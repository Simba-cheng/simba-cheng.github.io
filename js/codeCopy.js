// clipboard js 代码复制功能
window.addEventListener('DOMContentLoaded', getCodeBlockDoms)

let clipboard = null

// 获取code block dom
function getCodeBlockDoms() {
  const codeBlockDoms = document.querySelectorAll('figure')
  const copyIcon = document.createElement('i')
  copyIcon.classList = 'iconfont icon-copy'
  const copyBtn = document.createElement('span')
  copyBtn.classList = 'pin-copy'
  copyBtn.setAttribute('data-text', 'copy')
  copyBtn.appendChild(copyIcon)
  codeBlockDoms.length && codeBlockDoms.forEach(res => {

    // 创建一个 notranslate div 包裹代码块
    const notranslateDiv = document.createElement('div');
    notranslateDiv.classList = 'notranslate';

    // 将现有的代码块内容移到 notranslate div 中
    res.parentNode.insertBefore(notranslateDiv, res);
    notranslateDiv.appendChild(res);

    res.addEventListener('mouseenter', () => {
      res.setAttribute('id', 'copy-target')
      const copyContent = res.querySelector('table tbody tr .code')
      res.setAttribute('data-clipboard-text', copyContent && copyContent.innerText || '')
      res.appendChild(copyBtn)
      copyBtn.addEventListener('click', copyContentAction)
    })
    res.addEventListener('mouseleave', () => {
      res.setAttribute('id', '')
      res.setAttribute('data-clipboard-text', '')
      copyBtn.removeEventListener('click', copyContentAction)
      copyBtn.setAttribute('data-text', 'copy')
    })
  })
}

// 点击复制
function copyContentAction() {
  if (!clipboard) {
    clipboard = new ClipboardJS('#copy-target')
  }
  const copyBtnDom = document.querySelector('.pin-copy')
  clipboard.on('success', function(e) {
    console.warn('clipboard success', e)
    clipboard.destroy()
    clipboard = null
    copyBtnDom && copyBtnDom.setAttribute('data-text', 'copied')
  })
  clipboard.on('error', function(e) {
    console.warn('clipboard error', e)
    clipboard.destroy()
    clipboard = null
    copyBtnDom && copyBtnDom.setAttribute('data-text', 'fail to copy')
  })
}
