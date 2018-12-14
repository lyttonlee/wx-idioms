<template>
  <div class="robot">
    <img class="botAvatar" src="../assets/img/robot.jpg" alt="">
    <div class="botMsg">{{msg}}</div>
  </div>
</template>
<script>
export default {
  props: {
    msg: {
      type: String,
      required: true
    }
  }
}
</script>
<style lang="less" scoped>
.robot {
  display: flex;
  margin: 20rpx 0;
  .botAvatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    border: 1px solid #333;
  }
  .botMsg {
    max-width: 70%;
    border: 1px solid rgb(26, 25, 25);
    border-radius: 20rpx;
    padding: 20rpx;
    color: aliceblue;
    line-height: 60rpx;
    background-color: rgba(21, 50, 53, 0.479);
    margin-left: 20rpx;
    margin-right: 80rpx; 
    box-sizing: border-box; 
    box-shadow: 0 1px 5px rgb(17, 17, 16);
  }
}
</style>
