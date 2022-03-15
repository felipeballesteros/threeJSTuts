import Sizes from "../Utils/Sizes"

export default class Experience {
    constructor( canvas ) {
        // Global Access
        window.experience = this

        // Options
        this.canvas = canvas
  
        // Setup
        this.sizes = new Sizes()

        // Listen to resize
        this.sizes.on('resize', () => {
            console.log('I heard a resize')
        })
    }
}