<template>
  <div class="game">
    <!-- <div class="time">
      <text>已持续{{last}}</text>
    </div> -->
    <!-- <UserInput /> -->
    <div class="user" :style="{bottom: isFoucsed ? keyBoardHeight + 'px' : 0}">
      <input class="input" confirm-type="确定" maxlength=20 type="text" @confirm="submit" focus="true" :adjust-position="isFullScreen" placeholder="成语接龙" @focus="onFoucs" @blur="onBlur" v-model="inputValue"/>
    </div>
    <Idiom
    />
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import Idiom from '@/components/idiom'
// import UserInput from '@/components/input'
export default {
  components: {
    Idiom
    // UserInput
  },
  data () {
    return {
      duration: 0,
      inputValue: '',
      screenHeight: 0,
      isFoucsed: false,
      keyBoardHeight: 0
    }
  },
  computed: {
    // ...
    isFullScreen () {
      if (this.screenHeight > 400) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapActions(['userSubmit', 'initChar']),
    changNavBarTitle (title) {
      wx.setNavigationBarTitle({
        title
      })
    },
    formatDuration (duration) {
      if (duration === 0) {
        return `00 : 00`
      } else {
        const minutes = parseInt(this.duration / 60)
        const mm = minutes >= 10 ? minutes : `0${minutes}`
        const seconds = this.duration % 60
        const ss = seconds >= 10 ? seconds : `0${seconds}`
        return `${mm} : ${ss}`
      }
    },
    scrollToBottom () {
      // wx.createSelectorQuery().selcet('.content').boundingClientRect((rect) => {
      //   console.log(rect)
      // })
      const query = wx.createSelectorQuery()
      // console.log(query)
      query.select('.game').boundingClientRect((rect) => {
        // console.log(rect.height)
        const height = rect.height
        this.screenHeight = height
        // console.log(height)
        if (height > 400) {
          wx.pageScrollTo({
            scrollTop: height
          })
        }
      }).exec()
    },
    // setBackgroundColor () {
    //   wx.setBackgroundColor({
    //     backgroundColor: '#445b5f',
    //     complete () {
    //       console.log('#445b5f')
    //     }
    //   })
    // },
    submit (e) {
      // console.log(e)
      // console.log(this.inputValue[0])
      if (this.inputValue.length === 0) return
      this.userSubmit(this.inputValue).then(res => {
        if (res.done) {
          this.inputValue = ''
          this.scrollToBottom()
        }
      })
    },
    onFoucs (e) {
      // console.log(e)
      this.isFoucsed = true
      if (this.screenHeight > 300) {
        this.keyBoardHeight = 0
      } else {
        this.keyBoardHeight = e.mp.detail.height
      }
    },
    onBlur (e) {
      this.isFoucsed = false
      this.keyBoardHeight = 0
    }
  },
  onLoad (o) {
    // this.setBackgroundColor()
    this.changNavBarTitle('成语接龙')
    this.scrollToBottom()
  },
  // mounted 获取不到 url params
  mounted () {
    // ....
    // console.log(this)
  },
  onShow () {
    // this.timer = setInterval(() => {
    //   this.duration += 1
    //   this.last = this.formatDuration(this.duration)
    // }, 1000)
    this.initChar()
    this.scrollToBottom()
  },
  beforeDestroy () {
    // if (this.timer) {
    //   clearInterval(this.timer)
    // }
  }
}
</script>
<style lang="less" scoped>
// ::-webkit-scrollbar {
//   display: none;
// }
.game {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  // min-height: 100vh;
  // background-color: #445b5f;
  // .time {
  //   font-size: .4rem;
  //   color: aquamarine;
  //   margin-top: 10px; 
  // }
  .user {
    position: fixed;
    // bottom: 0;
    width: 100%;
    padding: 30rpx 30rpx 40rpx 30rpx;
    background: #023744;
    height: 9vh;
    box-sizing: border-box;
    .input {
      // color: #434;
      border-bottom: 1px solid rgb(105, 103, 102);
      // &:focus {
      //   border-bottom: 2px solid rgb(141, 33, 33);
      // }
    }
  }
}
</style>
