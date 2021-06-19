/**
 * 获取图片比例
 * @param {string} url
 * @returns
 */
export function getImageScale(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      resolve(img.width / img.height);
    };
  });
}
