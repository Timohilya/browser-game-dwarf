const Game = {
    $play: document.querySelector('#play'),
    $chests: document.querySelectorAll('.game .list div'),
    chest: false,
    $gamesLength: document.querySelector('#gamesLength'),
    $gamesToBuy: document.querySelector('#gamesToBuy'),
    $gamesCost: document.querySelector('#gamesCost'),
    $buy: document.querySelector('#buy'),
    init: function() {
        this.play()
        this.dwarf()
        this.dashboard()
    },
    play: function() {
        this.$chests.forEach(el => {
            el.addEventListener('click', () => {
                this.chestHandler(el)
            })
        })
        this.$play.addEventListener('click', () => {
            if ( this.$gamesLength.innerHTML == 0 ) {
                this.setMessage('Нужно закупиться играми')
                return
            }
            this.$gamesLength.innerHTML = this.int(this.$gamesLength.innerHTML) - 1
            this.playBtnDisable()
            this.chestsAvaiable()
        })
    },
    chestHandler: function(chest) {
        const selector = this.chest ? 'treasure' : 'empty'
        if ( this.chest ) {
            this.setMessage('Сокровище!')
            document.querySelector('.m-message .title').innerHTML = 'Поздравляем! Вы выиграли'
        } else {
            this.setMessage('Повезёт в другой раз')
            document.querySelector('.m-message .title').innerHTML = 'Не повезло! Попробуйте еще раз'
        }
        window.openPopup('message')
        this.chest = !this.chest
        this.chestAnimation(chest, selector)
        this.chestsDisable()
        this.playBtnAvaiable()
    },
    playBtnDisable: function() {
        this.$play.style.pointerEvents = 'none'
    },
    playBtnAvaiable: function() {
        this.$play.style.pointerEvents = 'auto'
    },
    chestsDisable: function() {
        this.$chests.forEach(el => {
            el.style.pointerEvents = 'none'
            el.style.cursor = 'auto'
        })
    },
    chestsAvaiable: function() {
        this.setMessage('Выбирай сундук!')
        this.$chests.forEach(el => {
            el.style.pointerEvents = 'auto'
            el.style.cursor = 'pointer'
            el.style.backgroundColor = 'rgba(255,255,255,0.1)'
            setTimeout(() => {
                el.style.backgroundColor = 'rgba(255,255,255,0)'
            }, 300)
        })
    },
    chestAnimation: function(chest, selector) {
        this.$play.style.pointerEvents = 'none'
        chest.classList.add(selector)
        setTimeout(() => {
            chest.classList.add(`${selector}_done`)
        }, 100)
        setTimeout(() => {
            chest.classList.remove(`${selector}_done`)
        }, 400)
        setTimeout(() => {
            chest.classList.remove(selector)
            this.$play.style.pointerEvents = 'auto'
        }, 500)
    },
    dashboard: function() {
        document.querySelector('.arrows .top').addEventListener('click', () => { this.gamePlus() })
        document.querySelector('.arrows .bottom').addEventListener('click', () => { this.gameMinus() })
        this.$buy.addEventListener('click', () => { this.gamesLenUpdate() })
    },
    gamePlus: function() {
        this.$gamesToBuy.innerHTML = this.int(this.$gamesToBuy.innerHTML) + 1
        this.$gamesCost.innerHTML = this.int(this.$gamesToBuy.innerHTML) * 5
    },
    gameMinus: function() {
        if ( this.$gamesToBuy.innerHTML == 0 ) return
        this.$gamesToBuy.innerHTML = this.int(this.$gamesToBuy.innerHTML) - 1
        this.$gamesCost.innerHTML = this.int(this.$gamesToBuy.innerHTML) * 5
    },
    gamesLenUpdate: function() {
        this.int(this.$gamesToBuy.innerHTML) > 0 ? this.setMessage('Отличная покупка!<br>Пора играть!') : this.setMessage('Нужно выбрать количество игр для покупки.')
        this.$gamesLength.innerHTML = this.int(this.$gamesLength.innerHTML) + this.int(this.$gamesToBuy.innerHTML)
        this.$gamesToBuy.innerHTML = this.$gamesCost.innerHTML = 0
    },
    dwarf: function() {
        setInterval(() => { this.dwarfAnimation() }, 10000)
    },
    dwarfAnimation: function() {
        const dwarf = document.querySelector('.dwarf img')
        const time = 300
        dwarf.setAttribute('src', './assets/dwarf.png')
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf2.png') }, 1 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf.png') }, 1.5 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf2.png') }, 2.5 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf.png') }, 3 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf3.png') }, 4 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf.png') }, 4.5 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf3.png') }, 5.5 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf.png') }, 6 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf2.png') }, 7 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf.png') }, 7.5 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf2.png') }, 8.5 * time)
        setTimeout(() => { dwarf.setAttribute('src', './assets/dwarf.png') }, 9 * time)
    },
    setMessage: function(msg) {
        document.querySelector('.message p').innerHTML = msg
    },
    int: function(str) {
        return +str
    },
}

export default Game