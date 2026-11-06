// 轻提示框
function showToast(text) {
  let toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(0,0,0,0.7);
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 9999;
    font-size: 14px;
  `;
  toast.innerText = text;
  document.body.appendChild(toast);
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 2000);
}

// 价格输入过滤（仅允许数字和小数点）
function priceInputFilter(e) {
  this.value = this.value.replace(/[^0-9.]/g, '');
  if (this.value.indexOf('.') !== this.value.lastIndexOf('.')) {
    this.value = this.value.substring(0, this.value.lastIndexOf('.'));
  }
}
