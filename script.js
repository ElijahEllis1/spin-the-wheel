class SpinWheel {
    constructor() {
        this.names = [];
        this.winners = [];
        this.canvas = document.getElementById('wheelCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.isSpinning = false;
        this.currentRotation = 0;
        this.preSelectedWinner = null;

        this.colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
            '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
            '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
            '#A3E4D7', '#F9E79F', '#FADBD8', '#D5DBDB', '#AED6F1'
        ];

        this.initEventListeners();
        this.loadSavedGames();
        this.updateDisplay();
    }

    initEventListeners() {
        document.getElementById('nameInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addName();
            }
        });

        document.getElementById('addNameBtn').addEventListener('click', () => {
            this.addName();
        });

        document.getElementById('spinBtn').addEventListener('click', () => {
            this.spin();
        });

        document.getElementById('spinAgainBtn').addEventListener('click', () => {
            this.hideResult();
        });

        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });

        this.canvas.addEventListener('click', () => {
            const availableNames = this.names.filter(n => n && !n.isWinner);
            if (!this.isSpinning && this.names.length >= 2 && availableNames.length > 0) {
                this.spin();
            }
        });

        document.getElementById('saveGameBtn').addEventListener('click', () => {
            this.saveGame();
        });

        document.getElementById('gameLoadSelect').addEventListener('change', (e) => {
            this.loadGame(e.target.value);
        });

        document.getElementById('deleteGameBtn').addEventListener('click', () => {
            this.deleteGame();
        });

        const toggleWinnersBtn = document.getElementById('toggleWinnersBtn');
        if (toggleWinnersBtn) {
            toggleWinnersBtn.addEventListener('click', () => {
                this.toggleWinnersVisibility();
            });
        }
    }

    // ... (rest of the unchanged methods stay here)

    toggleWinnersVisibility() {
        const winnersContainer = document.getElementById('winnersContainer');
        const toggleBtn = document.getElementById('toggleWinnersBtn');
        const icon = toggleBtn.querySelector('i');

        if (winnersContainer.classList.contains('hidden')) {
            winnersContainer.classList.remove('hidden');
            icon.className = 'fas fa-eye-slash';
        } else {
            winnersContainer.classList.add('hidden');
            icon.className = 'fas fa-eye';
        }
    }
}

let wheel;
document.addEventListener('DOMContentLoaded', () => {
    wheel = new SpinWheel();
    wheel.drawWheel();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            wheel.drawWheel();
        }, 250);
    });
});

// Service Worker (optional)
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js').catch(() => {});
//     });
// }
