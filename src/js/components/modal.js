const Modal = {
    $modalButtons: document.querySelectorAll('[data-popupbtn]'),
    $modals: document.querySelectorAll('[data-popup]'),
    init: function() {
        window.modalsData = {};
        if(this.$modals.length) {
            this.$modals.forEach(popup => {
                let name = popup.getAttribute('data-popup');
                window.modalsData[name] = {};
                window.modalsData[name].isOpen = false;
            });
        }
        if(this.$modalButtons.length) {
            this.$modalButtons.forEach(popupbtn => {
                let name = popupbtn.getAttribute('data-popupbtn');
                popupbtn.addEventListener('click', () => {
                    document.dispatchEvent(new Event(name + 'Opened'));
                    window.openPopup(name);
                    window.modalsData[name].isOpen = true;
                });
            });
        }
        if(this.$modals.length) {
            this.$modals.forEach(popup => {
                let name = popup.getAttribute('data-popup');
                popup.addEventListener('click', e => {
                    if(e.target.classList.contains('modal__content') || e.target.classList.contains('modal__close') || e.target.classList.contains('modal-close') ) {
                        document.dispatchEvent(new Event(name + 'Closed'));
                        window.closePopup(name);
                        window.modalsData[name].isOpen = false;
                    }
                });
            });
        }

        window.activePopups = [];

        window.openPopup = function(name) {
            if ( !window.activePopups.length ) {
                window.pageScrollLock();
            }
            window.activePopups.push(name);
            document.querySelector(`[data-popup=${name}]`).classList.add('show');
            document.querySelector(`[data-popup=${name}]`).classList.add('fade-in');
        };

        window.closePopup = function(name) {
            window.activePopups = window.activePopups.filter(function(e) { return e !== name })
            if ( !window.activePopups.length ) {
                window.pageScrollAvailable();
            }
            document.querySelector(`[data-popup=${name}]`).classList.add('fade-out');
            setTimeout(() => {
                document.querySelector(`[data-popup=${name}]`).classList.remove('show');
                document.querySelector(`[data-popup=${name}]`).classList.remove('fade-in');
                document.querySelector(`[data-popup=${name}]`).classList.remove('fade-out');
            }, 300)
        };

        window.pageScrollLock = function() {
            let scrollWidth = document.querySelector('body').offsetWidth - document.querySelector('body').offsetWidth + 'px';
            document.body.style.paddingRight = scrollWidth;
            document.body.classList.add('scrollock');
        };

        window.pageScrollAvailable = function() {
            document.body.style.paddingRight = 0;
            document.body.classList.remove('scrollock');
        };
    },
}

export default Modal