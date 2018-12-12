<template>
  <div class="game">
    <div class="time">
      <text>已持续{{last}}</text>
    </div>
    <div class="content">
      <text>dsa</text>
    </div>
    <div class="answer">
      
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      duration: 0,
      last: ''
    }
  },
  computed: {
    // ...
  },
  methods: {
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
    }
  },
  onLoad (o) {
    // console.log(o)
    this.changNavBarTitle('game')
  },
  // mounted 获取不到 url params
  mounted () {
    // ....
  },
  onShow () {
    this.timer = setInterval(() => {
      this.duration += 1
      this.last = this.formatDuration(this.duration)
    }, 1000)
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>
<style lang="less" scoped>
.game {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  height: 100vh;
  background: #03333aa9;
  .time {
    font-size: .4rem;
    color: aquamarine;
    margin-top: 20px; 
  }
  .content {
    width: 80%;
    background: #f1f1f1a9;
    border-radius: 20px;
    box-shadow: 0 3px 5px rgb(3, 41, 46);
    margin: 30px 0;
    padding: 20px;
  }
}
</style>
