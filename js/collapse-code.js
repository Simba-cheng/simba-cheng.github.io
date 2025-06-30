document.addEventListener('DOMContentLoaded', function () {
  var codeFigures = document.querySelectorAll('.markdown-body figure.highlight');
  codeFigures.forEach(function (figure) {
    var codePre = figure.querySelector('td.code > pre');
    if (!codePre) return;
    var lines = codePre.querySelectorAll('span.line').length || codePre.innerText.split('\n').length;
    if (lines > 20) {
      var wrapper = document.createElement('div');
      wrapper.className = 'code-collapse-wrapper collapsed';
      figure.parentNode.insertBefore(wrapper, figure);
      wrapper.appendChild(figure);

      var btn = document.createElement('div');
      btn.className = 'code-collapse-btn';
      btn.innerHTML = '<span class="icon">' +
        '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path></svg>' +
        '</span><span class="btn-text">点击展开代码</span>';
      wrapper.appendChild(btn);

      btn.addEventListener('click', function () {
        var wasExpanded = !wrapper.classList.contains('collapsed');
        wrapper.classList.toggle('collapsed');
        var icon = btn.querySelector('.icon svg');
        var text = btn.querySelector('.btn-text');
        if (wrapper.classList.contains('collapsed')) {
          text.textContent = '点击展开代码';
          icon.innerHTML = '<path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"></path>';
          if (wasExpanded) {
            var rect = wrapper.getBoundingClientRect();
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            window.scrollTo({
              top: rect.top + scrollTop - 24,
              behavior: 'smooth'
            });
          }
        } else {
          text.textContent = '点击收起代码';
          icon.innerHTML = '<path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>';
        }
      });
    }
  });
});