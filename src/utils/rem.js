/*
 * @Author: REFUSE_C
 * @Date: 2019-11-15 14:25:16
 * @LastEditors: refuse_c
 * @LastEditTime: 2019-11-18 09:32:09
 * @Description: 
 */
function resetWidth() {
    // 兼容ie浏览器 document.body.clientWidth
    var baseWidth = document.documentElement.clientWidth || document.body.clientWidth;
    // console.log(baseWidth);
    // 默认的设置是375px(ip6)的根元素设为100px, 其他的手机都相对这个进行调整
    document.documentElement.style.fontSize = baseWidth / 375 * 100 + 'px'
    // console.log(baseWidth / 375 * 100)
}
resetWidth();
window.addEventListener('resize', function () {
    resetWidth();
})     