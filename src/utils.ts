export const downloadFile = (file: string) => {
  const link = document.createElement('a');
  link.href = file;
  link.download = 'screenshot.png';
  // 将虚拟链接的click事件模拟为点击，从而自动下载图片
  document.body.appendChild(link);
  link.dispatchEvent(new MouseEvent('click'));
  document.body.removeChild(link);
};
