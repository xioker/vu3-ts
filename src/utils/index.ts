/**
 * @description: bolb流下载文件方法
 * @param {*} data 下载的数据
 * @param {*} fileName 文件下载名称
 */
 export function downloadFile(data:any, fileName:string = '下载文件') {
  let blob = new Blob([data], {
    type: `application/vnd.ms-excel;charset=utf-8`,
    // type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8`,
  }); 
  let downloadElement = document.createElement("a");
  let href = window.URL.createObjectURL(blob);
  downloadElement.href = href; 
  downloadElement.download = fileName;  // 下载后文件名 点击下载
  document.body.appendChild(downloadElement); 
  downloadElement.click(); 
  document.body.removeChild(downloadElement);   // 下载完成移除元素 释放掉blob对象
  window.URL.revokeObjectURL(href);
}

/**
 * @description: 防抖函数
 * @param {Function} func: 需要防抖的函数
 * @param {number} wait:  延迟时间毫秒
 * @param {boolean} immdeiate: 是否立即执行
 */
export function debuounce(func:Function, wait:number = 500, immdeiate:boolean = false){
  let timeout:any;
  return function(){
    if(timeout) clearTimeout(timeout)
    // 立即执行
    if(immdeiate){
      let rightNow = !timeout
      timeout = setTimeout(() => {
        timeout = null
      }, wait);
      if(rightNow) func()
    }else{
      timeout = setTimeout(() => {
        func()
      }, wait)
    }
  }
}

/**
 * @description: 节流函数
 * @param {*} fn: 需要节流的函数
 * @param {*} wait: 节流的延迟时间
 */
 export function throttle(fn:Function, wait:number = 200){
  let last:number, timer:any
  return function(this:any, ...args:any[]){
    const now = +new Date()
    if(last && now - last < wait){
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      })
    }else{
      last = now
      fn.apply(this, args)
    }
  }
}