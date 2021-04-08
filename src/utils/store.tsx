class Store {
  name: string
  data: any
  subscriptions: Array<Function>
  constructor (name: string = 'cn.chper.irbl') {
    this.name = name
    this.data = {}
    this.subscriptions = []
    let storage = window.localStorage.getItem(this.name)
    if (storage) {
      try {
        this.data = JSON.parse(storage)
      } catch (error) {
        this.data = {}
      }
    }
  }
  broadcast () {
    for (let subscription of this.subscriptions) {
      subscription(this.data)
    }
  }
  save () {
    window.localStorage.setItem(this.name, JSON.stringify(this.data))
  }
  set (key: string, value: any) {
    this.data[key] = value
    this.save()
    this.broadcast()
  }
  get (key: string) {
    return this.data[key]
  }
  clear () {
    this.data = {}
    this.broadcast()
    this.save()
  }
  remove (key: string) {
    if (this.data[key] === undefined) return
    delete this.data[key]
    this.save()
    this.broadcast()
  }
  subscribe (callback: Function) {
    this.subscriptions.push(callback)
    callback(this.data)
    return () => {
      let index = this.subscriptions.indexOf(callback)
      if (index > -1) {
        this.subscriptions.splice(index, 1)
      }
    }
  }
}

const store = new Store()

export default store
