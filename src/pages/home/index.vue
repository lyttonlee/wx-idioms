<template>
  <div class="home">
    <div class="avatar">
      <open-data type="userAvatarUrl"></open-data>
    </div>
    <div class="welcome">
      <open-data class="user-name" type="userNickName"></open-data>
      <p class="main-text">是否有兴趣挑战成语达人？</p>
    </div>
    <div class="action">
      <button class="start-brn" @tap="toGame" plain>start</button>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      code: ''
    }
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (res) => {
          console.log(res)
          this.code = res.code
        }
      })
    },
    toGame () {
      wx.navigateTo({url: `../game/main?user=${this.code}`})
    },
    changNavBarTitle (title) {
      wx.setNavigationBarTitle({
        title
      })
    }
  },
  onLoad () {
    this.changNavBarTitle('idioms game')
  },
  created () {
    // 调用应用实例的方法获取全局数据
    this.getUserInfo()
  }
}
</script>

<style lang="less" scoped>
.home {
  background: #03333aa9;
  height: 100vh;
  color: bisque;
  display: flex;
  width: 750rpx;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .avatar {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    overflow: hidden;
    margin: 30px 0;
  }
  .welcome {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
    .user-name {
      font-size: .6rem;
      font-family: sans-serif;
    }
    .main-text {
      font-size: .5rem;
    }
  }
  .action {
    width: 80%;
    .start-btn {
      // width: 80%;
      // color: aliceblue;
    }
  }
}

</style>

