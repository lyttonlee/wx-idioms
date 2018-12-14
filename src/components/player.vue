<template>
  <div class="user">
    <div class="userMsg">{{msg}}</div>
    <div class="userImg">
      <open-data type="userAvatarUrl"></open-data>
    </div>
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
.user {
  display: flex;
  justify-content: flex-end;
  .userImg {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    border: 1px solid #333;
    overflow: hidden;
  }
  .userMsg {
    max-width: 70%;
    border: 1px solid rgb(4, 99, 59);
    border-radius: 20rpx;
    padding: 20rpx;
    line-height: 60rpx;
    color: rgb(2, 11, 19);
    background-color: rgba(17, 161, 73, 0.479);
    margin-right: 20rpx;
    margin-left: 80rpx; 
    box-sizing: border-box; 
    box-shadow: 0 1px 5px rgb(17, 17, 16);
  }
}
</style>
