<template>
  <div class="user">
    <input class="input" confirm-type="确定" maxlength=4 type="text" @confirm="submit" placeholder="成语接龙" v-model="inputValue"/>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
export default {
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    ...mapActions(['userSubmit']),
    submit (e) {
      // console.log(e)
      // console.log(this.inputValue[0])
      this.userSubmit(this.inputValue)
      this.inputValue = ''
      console.log(this)
    }
  }
}
</script>
<style lang="less" scoped>
.user {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 30rpx 30rpx 40rpx 30rpx;
  background: #023744;
  height: 9vh;
  box-sizing: border-box;
  .input {
    // color: #434;
    border-bottom: 1px solid rgb(230, 225, 222);
    &:focus {
      border-bottom: 2px solid rgb(141, 33, 33);
    }
  }
}
</style>
