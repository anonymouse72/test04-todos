Page({
  data: {
    // 文本框的数据模型
    input: '',
    // 任务清单数据模型
    todos: [
      { name: 'Learning WEAPP', completed: false },
      { name: 'Learning JavaScript', completed: true },
      { name: 'Learning HTML', completed: false }
    ],
    leftCount: 2,
    allCompleted: false
  },
  inputChangeHandle: function (e) {
    this.setData({ input: e.detail.value })
  },
  addTodoHandle: function () {
    // 当添加按钮点击事件发生时执行的函数
    if (!this.data.input) return
    var todos = this.data.todos
    todos.push({
      name: this.data.input,
      completed: false
    })
    // 必须显式的通过setData去改变数据，这样界面上才会得到变化
    this.setData({
      todos: todos,
      input: '',
      leftCount: this.data.leftCount + 1
    })
  },
  toggleTodoHandle (e) {
    // 切换当前点中的item的完成状态
    // console.log(e.currentTarget)
    var item = this.data.todos[e.currentTarget.dataset.index]
    item.completed = !item.completed
    // 根据当前任务的完成状态决定增加一个或者减少一个
    var leftCount = this.data.leftCount + (item.completed ? -1 : 1)
    this.setData({ todos: this.data.todos, leftCount: leftCount })
  },
  // 需要注意冒泡的问题
  removeTodoHandle (e) {
    var todos = this.data.todos
    // item 就是splice方法中移除掉的元素
    var item = todos.splice(e.currentTarget.dataset.index, 1)[0]
    // todos 中会移除掉 index 所指向的元素
    var leftCount = this.data.leftCount - (item.completed ? 0 : 1)
    this.setData({ todos: todos, leftCount: leftCount })
  },
  toggleAllHandle () {
    // this 在这里永远指向的是当前页面对象
    this.data.allCompleted = !this.data.allCompleted
    var todos = this.data.todos
    var that = this
    todos.forEach(function (item) {
      item.completed = that.data.allCompleted
    })
    var leftCount = this.data.allCompleted ? 0 : this.data.todos.length
    this.setData({ todos: todos, leftCount: leftCount })
  },
  clearHandle () {
    var todos = this.data.todos.filter(function (item) {
      return !item.completed
    })
    // todos => 新的未完成的任务列
    this.setData({ todos: todos })
  }
})
