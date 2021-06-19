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
      console.log(img.width, img.height);
      resolve(img.width / img.height);
    };
  });
}
