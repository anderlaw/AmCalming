const fs = require('fs')
const files = fs.readdirSync('./out')
const renameFileAndRecord = (absoluteDirName,preResult) => {
    const files = fs.readdirSync(absoluteDirName)
    files.forEach(name => {
        const stat = fs.lstatSync(absoluteDirName+'/'+name)
        let newName = name
        if(name.indexOf('_') === 0){
            newName = name.slice(1)
            //record
            preResult.push(name)
            //rename
            fs.renameSync(`${absoluteDirName}/${name}`,`${absoluteDirName}/${newName}`)
        }

        if(!stat.isFile()){
            renameFileAndRecord(`${absoluteDirName}/${newName}`,preResult)
        }
    })
}
const renameResult = []
files.forEach(name => {
    /**
     * rename _next to next
     * replace all the `_next` to `next` in html file
     */
    if(name === '_next'){
        const newName = name.slice(1)
        fs.renameSync(`${__dirname}/out/${name}`,`${__dirname}/out/${newName}`)

        renameResult.push(name)
        renameFileAndRecord(`${__dirname}/out/${newName}`,renameResult)
    }
    console.log('需要替换的文件或目录-->',renameResult)
})

files.forEach(name => {
    if(name.indexOf('.html') > -1){
        let htmlContent = fs.readFileSync(`${__dirname}/out/${name}`,{
            encoding:'utf8'
        })
        renameResult.forEach(catchedName => {
            htmlContent = htmlContent.replaceAll(`/${catchedName}`,`/${catchedName.slice(1)}`)
        })
        fs.writeFileSync(`${__dirname}/out/${name}`,htmlContent)
        console.log(`${name} 内容替换成功！`)
    }
})

console.log('运行完毕')


