import EventEmitter from './EventEmitter'

export default class Resources extends EventEmitter{

  constructor(sources){
    super()

    //Options
    this.sources = sources
    console.log(this.sources)
  }
}