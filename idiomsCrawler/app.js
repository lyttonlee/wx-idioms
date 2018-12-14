const cheerio = require('cheerio')
const superagent = require('superagent')
const HttpRequest = require('superagent-charset')(superagent)
const fs = require('fs')
const path = require('path')

// 要爬去的目标网络地址
// const idiomsUrl = 'https://chengyu.911cha.com/zishu_4.html'

// 请求函数
const Request = (url, charset) => {
  return new Promise((resolve, reject) => {
    HttpRequest.get(url).charset(charset).then(res => {
      const data = res.text
      // console.log(data)
      const $ = cheerio.load(data)
      // console.log($)
      resolve($)
    }).catch(err => {
      if (err) {
        reject(err)
      }
    })
  })
}
// 爬取四字成语
// https://chengyu.911cha.com/zishu_4_p2.html
// http://chengyu.teachercn.com/b1/index_{{index}}.html

let idioms = []
// 获取四字成语
for (let index = 1; index < 26; index++) {
  for (let page = 1; page < 28; page++) {
    let idiomsUrl
    if (page === 1) {
      idiomsUrl = `http://chengyu.teachercn.com/b${index}/index.html`
    } else {
      idiomsUrl = `http://chengyu.teachercn.com/b${index}/index_${page}.html`
    }
    // console.log(idiomsUrl)
    Request(idiomsUrl, 'gb2312').then(res => {
      if (res) {
        const $ = res
        console.log(idiomsUrl)
        $('#container #content menu li').each((i, el) => {
          const idiom = $(el).find('a').attr('title')
          // console.log(idiom)
          const newidiom = idiom.replace(/,/, '')
          if (newidiom.length === 4) {
            console.log(newidiom)
            idioms.push(newidiom)
          }
        })
        console.log(idioms.length)
        if (fs.existsSync(path.join(__dirname, './data/idioms.json'))) {
          fs.unlinkSync(path.join(__dirname, './data/idioms.json'))
        }
        fs.writeFileSync(path.join(__dirname, './data/idioms.json'), JSON.stringify(idioms, '', 2), err => {
          if (err) console.log(err)
        })
      }
    }).catch(err => {
      if (err) {
        console.log('err')
      }
    })
  }
}

// 获取四字成语
// for (let index = 1; index < 21; index++) {
//   let idiomsUrl
//   if (index === 1) {
//     idiomsUrl = 'https://chengyu.911cha.com/zishu_4.html'
//   } else {
//     idiomsUrl = `https://chengyu.911cha.com/zishu_4_p${index}.html`
//   }
//   Request(idiomsUrl, 'utf-8').then(res => {
//     // console.log(res)
//     const $ = res
//     $('.leftbox .mcon .f14 li').each((i, el) => {
//       const idiom = $(el).find('a').text()
//       // console.log(idiom)
//       idioms.push(idiom)
//     })
//     // console.log(idioms)
//     // 存成语
//     if (fs.existsSync(path.join(__dirname, './data/idioms.json'))) {
//       fs.unlinkSync(path.join(__dirname, './data/idioms.json'))
//     }
//     fs.writeFileSync(path.join(__dirname, './data/idioms.json'), JSON.stringify(idioms, '', 2), err => {
//       if (err) console.log(err)
//     })
//   }).catch(err => {
//     console.log(err)
//   })
// }
