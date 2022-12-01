import Modal from './components/modal'
import Game from './components/game'
import './components/fire'

const scripts = function() {
    try {
        Modal.init()
    } catch (e) {
        console.log(`Error Modal: ${e}`)
    }
    try {
        Game.init()
    } catch (e) {
        console.log(`Error Game: ${e}`)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    scripts()
})