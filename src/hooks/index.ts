/**
 * @description: 设置登录背景色的hooks
 * @param {any} el: canvas的类选择器元素
 * @return {*} Function 渲染调用的函数
 */
export function useRender(el:any){
    const cvs: any = document.querySelector(el)
    const ctx: any = cvs?.getContext("2d")
    const { clientWidth:width, clientHeight:height } = document.documentElement
    cvs.width = window.innerWidth
    cvs.height = window.innerHeight - 5
    // cvs.width = width
    // cvs.height = height - 5
    ctx.fillStyle = '#ffffff'
    const bgColors = Array.from(new Array(400)).map(v => {
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        step: Math.random() * 2.5 + 0.5
      }
    })
    const render = ():void => {
      ctx.clearRect(0,0,width,height)
      ctx.beginPath()
      bgColors.forEach(v => {
        v.y = v.y > height ? 0 : (v.y + v.step)
        ctx.rect(v.x,v.y,3,3)
        // ctx.fillRect(v.x,v.y,3,3)
      })
      ctx.fill()
      requestAnimationFrame(render)
    }
    return {
      render
    }
}

export function useRraw(el:any){
  let cvs: any = document.querySelector(el)
  let ctx: any = cvs.getContext("2d");
  let h: number = window.innerHeight
  let w: number = window.innerWidth
  cvs.width = w
  cvs.height = h
  let num: number = 220
  let snows: any[] = []
  for(let i =0; i< num; i++){
    snows.push({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 5,
    })
  }
  let draw = (): void => {
    ctx.clearRect(0,0,w,h)
    ctx.beginPath()
    ctx.fillStyle = 'rgb(255,255,255)'
    ctx.shadowColor = 'rgb(255,255,255)'
    ctx.shadowBlur = 10
    for(let i =0; i< num; i++){
      let snow = snows[i]
      ctx.moveTo(snow.x,snow.y)
      ctx.arc(snow.x,snow.y,snow.r,0,Math.PI * 2)
    }
    ctx.fill()
    ctx.closePath()
    for(let i =0; i< num; i++){
      let snow = snows[i]
      snow.x += Math.random()*2.5
      snow.y += Math.random()*2.5
      if(snow.x > w) snow.x = 0
      if(snow.y > h) snow.y = 0
    }
    requestAnimationFrame(draw)
  }
  return {
    draw
  }
}