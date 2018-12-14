export default class Player {
  constructor (userInput) {
    this.userInput = userInput
  }
  answer () {
    return {
      spokeman: 'user',
      msg: this.userInput
    }
  }
}
