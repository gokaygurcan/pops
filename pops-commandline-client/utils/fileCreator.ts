import * as fs from 'fs'
import * as path from 'path'
import * as chalk from 'chalk'
import * as mkdirp from 'mkdirp'

function updateImport(dir: string, type: string, name: string, ext: string): void {
    let importStatement: string = ''
    let file: string = path.join(dir, `${type}.${ext}`)

    if (ext === 'scss' || ext === 'less') {
        importStatement = `\n@import '${name}/styles/${name}.${ext}';`
    } else if (ext === 'js') {
        importStatement = `\nmodule.exports.${name.replace(' ', '-')} = require('${name}/scripts/${name}.${ext}');`
    }

    if (fs.existsSync(file)) {
        console.log(importStatement)
        fs.appendFileSync(file, importStatement)
    } else {
        fs.writeFileSync(file, importStatement)
    }
}

export function fileCreator(dir: string, type: string, name: string, files: any[]): void {
    let target: string = path.join(dir, name)

    if (fs.existsSync(target)) {
        let msg: string = `${chalk.red.bold('Error')}: The ${chalk.yellow(type)} ${chalk.cyan(name)} already exists at: ${chalk.red(target)}`

        console.error(msg)
    } else {
        files.map((file) => {
            let fileName: string = path.basename(file.path)
            let folder: string = file.path.replace(fileName, '')

            mkdirp.sync(folder, (err) => err ? console.error(err) : null)

            fs.writeFileSync(file.path, file.content)

            if (type === 'component' || type === 'pattern') {
                let fileType: string = fileName.split('.').pop();
                if (fileType === 'scss' || fileType === 'less' || fileType === 'js') {
                    if (fileName !== 'index.js') {
                        updateImport(dir, type, name, fileType)
                    }
                }
            }
        })

        let msg: string = `${chalk.green.bold('Success')}: The ${chalk.yellow(type)} ${chalk.cyan(name)} was created at: ${chalk.green(target)}`

        console.log(msg)
    }
}