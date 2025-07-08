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
        // Name input handling
        document.getElementById('nameInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addName();
            }
        });
        
        document.getElementById('addNameBtn').addEventListener('click', () => {
            this.addName();
        });
        
        // Spin button
        document.getElementById('spinBtn').addEventListener('click', () => {
            this.spin();
        });
        
        // Result modal buttons
        document.getElementById('spinAgainBtn').addEventListener('click', () => {
            this.hideResult();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });
        
        // Canvas click for mobile
        this.canvas.addEventListener('click', () => {
            const availableNames = this.names.filter(n => n && !n.isWinner);
            if (!this.isSpinning && this.names.length >= 2 && availableNames.length > 0) {
                this.spin();
            }
        });
        
        // Game management event listeners
        document.getElementById('saveGameBtn').addEventListener('click', () => {
            this.saveGame();
        });
        
        document.getElementById('gameLoadSelect').addEventListener('change', (e) => {
            this.loadGame(e.target.value);
        });
        
        document.getElementById('deleteGameBtn').addEventListener('click', () => {
            this.deleteGame();
        });
        
        // Toggle winners visibility
        const toggleWinnersBtn = document.getElementById('toggleWinnersBtn');
        if (toggleWinnersBtn) {
            toggleWinnersBtn.addEventListener('click', () => {
                this.toggleWinnersVisibility();
            });
        }
    }
    
    addName() {
        const input = document.getElementById('nameInput');
        const name = input.value.trim();
        
        if (!name) {
            this.showError('Please enter a name');
            return;
        }
        
        if (this.names.length >= 40) {
            this.showError('Maximum 40 names allowed');
            return;
        }
        
        if (this.names.some(n => n && n.name && n.name.toLowerCase() === name.toLowerCase())) {
            this.showError('Name already exists');
            return;
        }
        
        this.names.push({
            name: name,
            isWinner: false,
            id: Date.now() + Math.random()
        });
        
        input.value = '';
        this.updateDisplay();
        this.drawWheel();
        
        // Success feedback
        input.style.borderColor = '#28a745';
        setTimeout(() => {
            input.style.borderColor = '#e0e0e0';
        }, 1000);
    }
    
    removeName(id) {
        this.names = this.names.filter(n => n.id !== id);
        this.updateDisplay();
        this.drawWheel();
    }
    
    updateDisplay() {
        // Update name count
        document.getElementById('nameCount').textContent = this.names.length;
        
        // Update names list
        const namesList = document.getElementById('namesList');
        if (this.names.length === 0) {
            namesList.innerHTML = '<p style="text-align: center; color: #6c757d; font-style: italic;">No names added yet</p>';
        } else {
            namesList.innerHTML = this.names.map(person => `
                <div class="name-item">
                    <span class="name-text">${person.name}</span>
                    <div>
                        <button class="remove-btn" onclick="wheel.removeName(${person.id})">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
        
        // Update spin button
        const spinBtn = document.getElementById('spinBtn');
        
        if (this.names.length < 2) {
            spinBtn.disabled = true;
            spinBtn.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Need 2+ Names</span>';
        } else if (this.isSpinning) {
            spinBtn.disabled = true;
            spinBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>SPINNING</span>';
        } else {
            spinBtn.disabled = false;
            spinBtn.innerHTML = '<i class="fas fa-play"></i><span>SPIN</span>';
        }
        
        // Update winners list
        this.updateWinnersList();
    }
    
    updateWinnersList() {
        const winnersList = document.getElementById('winnersList');
        const winners = this.names.filter(n => n && n.isWinner);
        
        if (winners.length === 0) {
            winnersList.innerHTML = '<p class="no-winners">No winners yet!</p>';
        } else {
            winnersList.innerHTML = winners.map((winner, index) => `
                <div class="winner-item">
                    <div>#${index + 1}</div>
                    <div>${winner.name}</div>
                </div>
            `).join('');
        }
    }
    
    drawWheel() {
        // Update canvas size based on CSS dimensions
        const rect = this.canvas.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
        
        if (this.names.length === 0) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#f8f9fa';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.fillStyle = '#6c757d';
            this.ctx.font = '18px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('Add names to see the wheel', this.canvas.width / 2, this.canvas.height / 2);
            return;
        }
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;
        const anglePerSegment = (2 * Math.PI) / this.names.length;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw wheel segments
        this.names.forEach((person, index) => {
            const startAngle = index * anglePerSegment + this.currentRotation;
            const endAngle = startAngle + anglePerSegment;
            
            // Segment background
            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            this.ctx.lineTo(centerX, centerY);
            this.ctx.closePath();
            
            // Always use normal colors regardless of winner status
            this.ctx.fillStyle = this.colors[index % this.colors.length];
            this.ctx.fill();
            
            // Segment border
            this.ctx.strokeStyle = '#fff';
            this.ctx.lineWidth = 3;
            this.ctx.stroke();
            
            // Text - render vertically along radius direction
            const textAngle = startAngle + anglePerSegment / 2;
            const textRadius = radius * 0.7;
            const textX = centerX + Math.cos(textAngle) * textRadius;
            const textY = centerY + Math.sin(textAngle) * textRadius;
            
            this.ctx.save();
            this.ctx.translate(textX, textY);
            
            // Rotate text to be perpendicular to the radius (pointing outward)
            let rotationAngle = textAngle;
            
            // Adjust rotation for readability (flip text if it would be upside down)
            if (textAngle > Math.PI / 2 && textAngle < 3 * Math.PI / 2) {
                rotationAngle += Math.PI;
            }
            
            this.ctx.rotate(rotationAngle);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.font = 'bold 14px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.textBaseline = 'middle';
            
            // Allow longer names since they're rendered vertically
            let displayName = person.name;
            if (displayName.length > 20) {
                displayName = displayName.substring(0, 18) + '...';
            }
            
            this.ctx.fillText(displayName, 0, 0);
            
            this.ctx.restore();
        });
        
        // Center circle
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#fff';
        this.ctx.fill();
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
    }
    
    lightenColor(color, percent) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = Math.round(2.55 * percent * 100);
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
            (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
            (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
    
    spin() {
        if (this.isSpinning) return;
        
        const availableNames = this.names.filter(n => n && !n.isWinner);
        
        // Auto-reset when all names have been selected
        if (availableNames.length === 0 && this.names.length >= 2) {
            this.resetGame();
            return;
        }
        
        if (this.names.length < 2) return;
        
        this.isSpinning = true;
        const spinBtn = document.getElementById('spinBtn');
        spinBtn.classList.add('spinning');
        spinBtn.disabled = true;
        
        // Pre-select a winner from available names ONLY
        const selectedWinner = availableNames[Math.floor(Math.random() * availableNames.length)];
        const winnerIndex = this.names.findIndex(n => n.id === selectedWinner.id);
        
        // Store the pre-selected winner for later use
        this.preSelectedWinner = selectedWinner;
        
        // Calculate where the winner segment needs to be positioned
        const anglePerSegment = (2 * Math.PI) / this.names.length;
        
        // Random spin parameters for multiple rotations
        const minSpins = 4;
        const maxSpins = 7;
        const spinAmount = minSpins + Math.random() * (maxSpins - minSpins);
        const baseRotation = spinAmount * 2 * Math.PI;
        
        // To make the winner segment CENTER land at the pointer:
        // The pointer detection uses: (3π/2 - currentRotation) / anglePerSegment = segmentIndex (segment start)
        // We want the segment CENTER to align with the pointer
        // So we need: finalRotation = 3π/2 - (winnerIndex * anglePerSegment + anglePerSegment/2)
        
        const winnerSegmentCenter = winnerIndex * anglePerSegment + (anglePerSegment / 2);
        const targetRotationPosition = (3 * Math.PI / 2) - winnerSegmentCenter;
        
        // Add multiple full rotations for the spinning effect
        let finalRotation = this.currentRotation + baseRotation;
        
        // Adjust to land on the exact target position
        const currentEndPosition = finalRotation % (2 * Math.PI);
        let adjustment = targetRotationPosition - currentEndPosition;
        
        // Normalize adjustment to be positive and within one full rotation
        while (adjustment <= 0) adjustment += 2 * Math.PI;
        while (adjustment > 2 * Math.PI) adjustment -= 2 * Math.PI;
        
        finalRotation += adjustment;
        
        // Animation parameters
        const duration = 3000 + Math.random() * 2000; // 3-5 seconds
        const startTime = Date.now();
        const startRotation = this.currentRotation;
        
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for realistic deceleration
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            this.currentRotation = startRotation + (finalRotation - startRotation) * easeOut;
            this.drawWheel();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                this.finishSpin();
            }
        };
        
        animate();
        
        // Play spinning sound effect (visual feedback)
        this.canvas.style.transform = 'scale(1.02)';
        setTimeout(() => {
            this.canvas.style.transform = 'scale(1)';
        }, 200);
    }
    
    finishSpin() {
        this.isSpinning = false;
        const spinBtn = document.getElementById('spinBtn');
        spinBtn.classList.remove('spinning');
        
        // Use the pre-selected winner (guaranteed to be from available names)
        if (this.preSelectedWinner && !this.preSelectedWinner.isWinner) {
            this.preSelectedWinner.isWinner = true;
            this.showWinner(this.preSelectedWinner.name);
            this.updateDisplay();
            this.drawWheel();
        } else {
            // Fallback - should never happen with the new logic
            console.error('No pre-selected winner found');
            this.updateDisplay();
        }
        
        // Clear the pre-selected winner
        this.preSelectedWinner = null;
    }
    
    getWinnerAtPointer() {
        if (this.names.length === 0) return null;
        
        // The pointer is at the top (12 o'clock position)
        // We need to find which segment is at that position
        const anglePerSegment = (2 * Math.PI) / this.names.length;
        
        // Normalize rotation to 0-2π
        let normalizedRotation = this.currentRotation % (2 * Math.PI);
        if (normalizedRotation < 0) normalizedRotation += 2 * Math.PI;
        
        // Calculate which segment is at the pointer (top)
        // The pointer points downward, so we need to adjust
        const pointerAngle = (3 * Math.PI / 2 - normalizedRotation) % (2 * Math.PI);
        let segmentIndex = Math.floor(pointerAngle / anglePerSegment);
        
        // Ensure segmentIndex is within bounds
        segmentIndex = Math.max(0, Math.min(segmentIndex, this.names.length - 1));
        
        // Find the actual name at this position
        let selectedName = this.names[segmentIndex];
        
        // If the selected name is undefined, try to get the first available name
        if (!selectedName) {
            const availableNames = this.names.filter(n => n && !n.isWinner);
            if (availableNames.length > 0) {
                selectedName = availableNames[0];
            }
        }
        
        return selectedName;
    }
    
    showWinner(name) {
        document.getElementById('winnerName').textContent = name;
        document.getElementById('resultSection').classList.add('show');
        
        // Confetti effect
        this.createConfetti();
    }
    
    hideResult() {
        document.getElementById('resultSection').classList.remove('show');
    }
    
    createConfetti() {
        // Simple confetti effect using CSS animations
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        const confettiContainer = document.createElement('div');
        confettiContainer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
        `;
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: absolute;
                width: 10px;
                height: 10px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                animation: confetti-fall ${2 + Math.random() * 3}s linear forwards;
                opacity: ${0.7 + Math.random() * 0.3};
                transform: rotate(${Math.random() * 360}deg);
            `;
            confettiContainer.appendChild(confetti);
        }
        
        // Add confetti animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes confetti-fall {
                0% {
                    transform: translateY(-100vh) rotate(0deg);
                }
                100% {
                    transform: translateY(100vh) rotate(720deg);
                }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(confettiContainer);
        
        setTimeout(() => {
            document.body.removeChild(confettiContainer);
            document.head.removeChild(style);
        }, 5000);
    }
    
    resetGame() {
        this.names.forEach(person => person.isWinner = false);
        this.currentRotation = 0;
        this.isSpinning = false;
        this.preSelectedWinner = null;
        this.hideResult();
        this.updateDisplay();
        this.drawWheel();
    }
    
    showError(message) {
        const input = document.getElementById('nameInput');
        input.style.borderColor = '#dc3545';
        input.placeholder = message;
        
        setTimeout(() => {
            input.style.borderColor = '#e0e0e0';
            input.placeholder = 'Enter a name (2-40 names total)';
        }, 3000);
    }
    
    // Game Management Methods
    saveGame() {
        const gameNameInput = document.getElementById('gameNameInput');
        const gameName = gameNameInput.value.trim();
        
        if (!gameName) {
            this.showGameError('Please enter a game name');
            return;
        }
        
        const gameState = {
            names: this.names,
            currentRotation: this.currentRotation,
            savedAt: new Date().toISOString()
        };
        
        try {
            const savedGames = JSON.parse(localStorage.getItem('spinWheelGames') || '{}');
            savedGames[gameName] = gameState;
            localStorage.setItem('spinWheelGames', JSON.stringify(savedGames));
            
            gameNameInput.value = '';
            this.loadSavedGames();
            this.showGameSuccess(`Game "${gameName}" saved successfully!`);
        } catch (error) {
            this.showGameError('Failed to save game');
        }
    }
    
    loadGame(gameName) {
        if (!gameName) {
            document.getElementById('deleteGameBtn').disabled = true;
            return;
        }
        
        try {
            const savedGames = JSON.parse(localStorage.getItem('spinWheelGames') || '{}');
            const gameState = savedGames[gameName];
            
            if (!gameState) {
                this.showGameError('Game not found');
                return;
            }
            
            // Load game state
            this.names = gameState.names || [];
            this.currentRotation = gameState.currentRotation || 0;
            this.isSpinning = false;
            this.preSelectedWinner = null;
            
            // Update UI
            this.hideResult();
            this.updateDisplay();
            this.drawWheel();
            
            // Enable delete button
            document.getElementById('deleteGameBtn').disabled = false;
            
            this.showGameSuccess(`Game "${gameName}" loaded successfully!`);
        } catch (error) {
            this.showGameError('Failed to load game');
        }
    }
    
    deleteGame() {
        const gameLoadSelect = document.getElementById('gameLoadSelect');
        const gameName = gameLoadSelect.value;
        
        if (!gameName) return;
        
        if (confirm(`Are you sure you want to delete the game "${gameName}"?`)) {
            try {
                const savedGames = JSON.parse(localStorage.getItem('spinWheelGames') || '{}');
                delete savedGames[gameName];
                localStorage.setItem('spinWheelGames', JSON.stringify(savedGames));
                
                gameLoadSelect.value = '';
                document.getElementById('deleteGameBtn').disabled = true;
                this.loadSavedGames();
                this.showGameSuccess(`Game "${gameName}" deleted successfully!`);
            } catch (error) {
                this.showGameError('Failed to delete game');
            }
        }
    }
    
    loadSavedGames() {
        const gameLoadSelect = document.getElementById('gameLoadSelect');
        
        try {
            const savedGames = JSON.parse(localStorage.getItem('spinWheelGames') || '{}');
            const gameNames = Object.keys(savedGames).sort();
            
            // Clear existing options except the first one
            gameLoadSelect.innerHTML = '<option value="">Load a saved game...</option>';
            
            gameNames.forEach(gameName => {
                const option = document.createElement('option');
                option.value = gameName;
                option.textContent = gameName;
                gameLoadSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Failed to load saved games:', error);
        }
    }
    
    showGameError(message) {
        const gameNameInput = document.getElementById('gameNameInput');
        gameNameInput.style.borderColor = '#dc3545';
        gameNameInput.placeholder = message;
        
        setTimeout(() => {
            gameNameInput.style.borderColor = '#e0e0e0';
            gameNameInput.placeholder = 'Enter game name';
        }, 3000);
    }
    
    showGameSuccess(message) {
        const gameNameInput = document.getElementById('gameNameInput');
        gameNameInput.style.borderColor = '#28a745';
        gameNameInput.placeholder = message;
        
        setTimeout(() => {
            gameNameInput.style.borderColor = '#e0e0e0';
            gameNameInput.placeholder = 'Enter game name';
        }, 3000);
    }
    
    // Toggle winners visibility
    toggleWinnersVisibility() {
        const winnersSection = document.querySelector('.winners-section');
        const toggleBtn = document.getElementById('toggleWinnersBtn');
        const icon = toggleBtn.querySelector('i');
        
        if (winnersSection.classList.contains('hidden')) {
            // Show winners section
            winnersSection.classList.remove('hidden');
            icon.className = 'fas fa-eye-slash';
        } else {
            // Hide winners section
            winnersSection.classList.add('hidden');
            icon.className = 'fas fa-eye';
        }
    }
}

// Initialize the wheel when page loads
let wheel;
document.addEventListener('DOMContentLoaded', () => {
    wheel = new SpinWheel();
    
    // Initial wheel draw
    wheel.drawWheel();
    
    // Handle window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            wheel.drawWheel();
        }, 250);
    });
});

// Service Worker for offline functionality (optional enhancement)
// Commented out to avoid 404 errors
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/sw.js').catch(() => {
//             // Service worker registration failed, but app still works
//         });
//     });
// }
