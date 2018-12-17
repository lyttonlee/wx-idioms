import Vue from 'vue'
import Vuex from 'vuex'
import Robot from './utils/robot'
import Player from './utils/player'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    // state
    runingIdiom: '',
    charLists: []
  },
  mutations: {
    getInitChars (state, data) {
      // console.log(data)
      state.charLists = data
    },
    changeRuningIdiom (state, data) {
      state.runingIdiom = data
    },
    addUserChar (state, data) {
      state.charLists = [...state.charLists, data]
    },
    addRobotChar (state, data) {
      state.charLists = state.charLists.concat(data)
    }
  },
  actions: {
    // 页面初始化时获取机器人出题
    initChar ({commit}) {
      const InitRobot = new Robot().initChar()
      const InitCharLists = InitRobot.initRobotChar
      const InitRuningIdiom = InitRobot.initRuningIdiom
      commit('getInitChars', InitCharLists)
      commit('changeRuningIdiom', InitRuningIdiom)
    },
    // 用户答题
    userSubmit ({commit, state}, data) {
      return new Promise((resolve) => {
        // 添加用户回答道聊天列表
        const userChar = new Player(data).answer()
        commit('addUserChar', userChar)
        // 机器人接成语....
        const RobotChar = new Robot(data, state.runingIdiom).answerUser()
        if (RobotChar.newRuningIdiom) {
          commit('changeRuningIdiom', RobotChar.newRuningIdiom)
          commit('addRobotChar', RobotChar)
          resolve({done: true})
        } else {
          commit('addRobotChar', RobotChar)
          resolve({done: true})
        }
      })
    }
  }
})
export default store
