const fs = require('fs')
const files = fs.readdirSync('./out')
files.forEach(name => {
    /**
     * rename _next to next
     * replace all the `_next` to `next` in html file
     */
    if(name === '_next'){
        fs.renameSync(`${__dirname}/out/${name}`,`${__dirname}/out/${'next'}`)
        console.log('重命名 _next 为 next')
    }
    if(name.indexOf('.html') > -1){
        const htmlContent = fs.readFileSync(`${__dirname}/out/${name}`,{
            encoding:'utf8'
        })
        let newHtmlContent = htmlContent.replaceAll('./_next','./next')
        fs.writeFileSync(`${__dirname}/out/${name}`,newHtmlContent)
        console.log(`${name} 内容替换成功！`)
    }
    console.log('运行完毕')
})