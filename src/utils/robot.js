import idioms from '../../idiomsCrawler/data/idioms.json'
import { createRandomInt } from './index'

/**
 * @export
 * @class Robot
 */
export default class Robot {
  /**
   *Creates an instance of Robot.
   * @param {string} userSendIdiom
   * @memberof Robot
   */
  constructor (userSendIdiom, runingIdiom) {
    this.userSendIdiom = userSendIdiom
    this.runingIdiom = runingIdiom
  }
  // 目前等待被用户接龙的成语
  // 机器人初始出题给用户
  initChar () {
    // 从所有成语中随机选择一个
    // 计算成语数组长度
    const idiomsLenth = idioms.length
    // 生成一个范围内的随机数
    const random = createRandomInt(idiomsLenth)
    // console.log(random)
    // this.runingIdiom = idioms[random]
    return {
      initRobotChar: [
        {
          spokeman: 'robot',
          msg: '又来一个送死的,看我不打得你满地找牙!准备接招吧！！！'
        },
        {
          spokeman: 'robot',
          msg: idioms[random]
        }
      ],
      initRuningIdiom: idioms[random]
    }
  }
  // 成语是否是中文
  isChinese (str) {
    const reg = new RegExp('[\\u4E00-\\u9FFF]+$', 'g')
    return reg.test(str)
  }
  // 成语长度是否为4
  isFourLength (str) {
    return str.length === 4
  }
  // 用户输入的是否是成语
  isIdiom (str) {
    const res = idioms.find((idiom) => {
      return idiom === str
    })
    // console.log(res)
    return res
  }
  // 是否符合成语接龙的规则
  isConformIdiomRule (str) {
    // 第一个字必须是被接龙成语的第四个字
    // console.log(str[0])
    // console.log(this.runingIdiom)
    // console.log(this.runingIdiom[3])
    return str[0] === this.runingIdiom[3]
  }
  answerUser () {
    // ...
    if (!this.isChinese(this.userSendIdiom)) {
      return {
        spokeman: 'robot',
        msg: '你是来卖萌的吗？求你先学会说中文再来！'
      }
    } else if (!this.isFourLength(this.userSendIdiom)) {
      return {
        spokeman: 'robot',
        msg: '别在这丢脸了，你告诉我成语应该是几个字？'
      }
    } else if (!this.isIdiom(this.userSendIdiom)) {
      return {
        spokeman: 'robot',
        msg: '我虽然书读得少，但也知道你这不是成语！！！'
      }
    } else if (!this.isConformIdiomRule(this.userSendIdiom)) {
      return {
        spokeman: 'robot',
        msg: `你是来搞笑的？你必须得接以${this.runingIdiom[3]}开头的成语，如果接不上就投降，免得丢脸！！！`
      }
    } else {
      const filtered = idioms.filter((idiom) => {
        return idiom[0] === this.userSendIdiom[3]
      })
      if (filtered.length === 0) {
        return {
          spokeman: 'robot',
          msg: '你真厉害，我认输了！！！'
        }
      } else {
        const random = createRandomInt(filtered.length)
        return {
          spokeman: 'robot',
          msg: filtered[random],
          newRuningIdiom: filtered[random]
        }
      }
    }
  }
}
