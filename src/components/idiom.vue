<template>
  <div class="content" id="idiomsList">
    <template v-for="(char, index) in charLists">
      <Robot 
        :key="index"
        v-if="char.spokeman === 'robot'"
        :msg="char.msg"
      />
      <Player 
        :key="index"
        v-if="char.spokeman === 'user'"
        :msg="char.msg"
      />
    </template>
  </div>
</template>
<script>
import Robot from './robot'
import Player from './player'
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  components: {
    Robot,
    Player
  },
  data () {
    return {
      // charLists: [
      //   {
      //     spokeman: 'robot',
      //     msg: '又来一个送死的,看我不打得你满地找牙齿,你就乖乖的认输不好吗？'
      //   },
      //   {
      //     spokeman: 'user',
      //     msg: '我就是来挑战你的！'
      //   }
      // ]
    }
  },
  computed: {
    ...mapState(['charLists'])
  },
  methods: {
    ...mapActions(['initChar'])
    // init () {}
  },
  mounted () {
    this.initChar()
  }
}
</script>
<style lang="less" scoped>
.content {
    // width: 95%;
    // min-height: 85vh;
    // background: #ffffff23;
    // border-radius: 20px;
    // box-shadow: 0 3px 5px rgb(3, 41, 46);
    margin: 10px 0;
    padding: 20px 10px;
    padding-bottom: 13vh; 
    box-sizing: border-box;
    // overflow-y: scroll;
  }
</style>
