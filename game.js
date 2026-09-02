// Game State
let gameState = {
    homeScore: 0,
    awayScore: 0,
    matchTime: 0,
    possession: 'home', // 'home' or 'away'
    possessionPercent: 50,
    ballX: 50,
    ballY: 50,
    gameActive: true,
    matchDuration: 90, // minutes
    currentPlayer: 'p9', // Starting with home striker
    events: []
};

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    updateDisplay();
    startMatch();
});

function startMatch() {
    const matchInterval = setInterval(() => {
        if (!gameState.gameActive) {
            clearInterval(matchInterval);
            return;
        }

        gameState.matchTime++;
        updateDisplay();

        // End match at 90 minutes
        if (gameState.matchTime >= gameState.matchDuration) {
            endMatch();
            clearInterval(matchInterval);
        }

        // CPU AI - random actions
        if (gameState.matchTime % 4 === 0 && gameState.possession === 'away') {
            cpuPlay();
        }
    }, 1000);
}

function updateDisplay() {
    document.getElementById('homeScore').textContent = gameState.homeScore;
    document.getElementById('awayScore').textContent = gameState.awayScore;
    document.getElementById('matchTime').textContent = gameState.matchTime;
    document.getElementById('possession').textContent = gameState.possessionPercent;
    
    // Update ball position
    const ball = document.getElementById('ball');
    ball.style.left = gameState.ballX + '%';
    ball.style.top = gameState.ballY + '%';

    // Update active player
    updateActivePlayer();
}

function updateActivePlayer() {
    const players = document.querySelectorAll('.player');
    players.forEach(p => p.classList.remove('active'));

    if (gameState.currentPlayer) {
        const activePlayer = document.getElementById(gameState.currentPlayer);
        if (activePlayer) {
            activePlayer.classList.add('active');
        }
    }
}

function passPlay() {
    if (!gameState.gameActive || gameState.possession !== 'home') {
        addEvent('❌ Not your possession!');
        return;
    }

    const success = Math.random() > 0.2; // 80% success rate
    
    if (success) {
        // Pass successful
        switchPlayer('home');
        moveBall(10, 15);
        gameState.possessionPercent = Math.max(gameState.possessionPercent - 2, 45);
        addEvent('✅ Successful Pass!');
    } else {
        // Pass intercepted
        gameState.possession = 'away';
        gameState.possessionPercent = Math.max(gameState.possessionPercent - 5, 40);
        switchPlayer('away');
        addEvent('⚠️ Pass Intercepted!');
    }
    
    updateDisplay();
}

function shootPlay() {
    if (!gameState.gameActive || gameState.possession !== 'home') {
        addEvent('❌ Not your possession!');
        return;
    }

    const homeGoalDistance = 100 - gameState.ballX;
    const shotsOnTarget = homeGoalDistance < 25;

    if (shotsOnTarget) {
        const goalChance = Math.random();
        
        if (goalChance > 0.3) { // 70% goal rate when in position
            gameState.homeScore++;
            gameState.ballX = 50;
            gameState.ballY = 50;
            gameState.possession = 'away';
            const ball = document.getElementById('ball');
            ball.classList.add('goal-animation');
            setTimeout(() => ball.classList.remove('goal-animation'), 1000);
            addEvent('⚽ GOOOAAAALLLL!!! HOME TEAM SCORES! 🎉');
        } else {
            gameState.possession = 'away';
            addEvent('😢 Shot blocked or saved!');
        }
    } else {
        gameState.possession = 'away';
        addEvent('📍 Shot from too far! Ball lost.');
    }
    
    gameState.possessionPercent = 50;
    switchPlayer('away');
    updateDisplay();
}

function dribblePlay() {
    if (!gameState.gameActive || gameState.possession !== 'home') {
        addEvent('❌ Not your possession!');
        return;
    }

    const success = Math.random() > 0.3; // 70% success rate
    
    if (success) {
        // Dribble successful - move forward
        gameState.ballX = Math.min(gameState.ballX + 8, 95);
        gameState.ballY += (Math.random() - 0.5) * 10;
        gameState.ballY = Math.max(10, Math.min(gameState.ballY, 90));
        addEvent('🏃 Successful Dribble! Moving forward...');
        gameState.possessionPercent = Math.min(gameState.possessionPercent + 2, 70);
    } else {
        // Dribble failed
        gameState.possession = 'away';
        gameState.possessionPercent = Math.max(gameState.possessionPercent - 8, 30);
        switchPlayer('away');
        addEvent('❌ Dribble failed! Ball lost!');
    }
    
    updateDisplay();
}

function defendPlay() {
    if (!gameState.gameActive) {
        addEvent('❌ Not your possession!');
        return;
    }

    if (gameState.possession === 'away') {
        const defenseSuccess = Math.random() > 0.35; // 65% success rate
        
        if (defenseSuccess) {
            gameState.possession = 'home';
            gameState.possessionPercent = Math.min(gameState.possessionPercent + 5, 70);
            switchPlayer('home');
            gameState.ballX = Math.max(gameState.ballX - 15, 10);
            addEvent('🛡️ Tackle successful! Ball recovered!');
        } else {
            gameState.possessionPercent = Math.max(gameState.possessionPercent - 3, 30);
            addEvent('⚠️ Tackle failed! They keep possession.');
        }
    } else {
        addEvent('ℹ️ You already have possession!');
    }
    
    updateDisplay();
}

function switchPlayer(team) {
    const playerIds = team === 'home' 
        ? ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8', 'p9']
        : ['p10', 'p11', 'p12', 'p13', 'p14', 'p15', 'p16', 'p17', 'p18'];
    
    gameState.currentPlayer = playerIds[Math.floor(Math.random() * playerIds.length)];
}

function moveBall(xChange, yChange) {
    gameState.ballX = Math.max(5, Math.min(gameState.ballX + (Math.random() - 0.5) * xChange, 95));
    gameState.ballY = Math.max(5, Math.min(gameState.ballY + (Math.random() - 0.5) * yChange, 95));
}

function cpuPlay() {
    if (!gameState.gameActive) return;

    const actions = [
        () => {
            // CPU Pass
            const success = Math.random() > 0.15;
            if (success) {
                switchPlayer('away');
                moveBall(-10, 15);
                gameState.possessionPercent = Math.min(gameState.possessionPercent + 2, 60);
                addEvent('🤖 CPU: Successful Pass');
            } else {
                gameState.possession = 'home';
                gameState.possessionPercent = Math.max(gameState.possessionPercent - 5, 40);
                switchPlayer('home');
                addEvent('🤖 CPU: Pass intercepted!');
            }
        },
        () => {
            // CPU Dribble
            const success = Math.random() > 0.25;
            if (success) {
                gameState.ballX = Math.max(gameState.ballX - 8, 5);
                addEvent('🤖 CPU: Dribbling forward');
                gameState.possessionPercent = Math.min(gameState.possessionPercent + 3, 65);
            } else {
                gameState.possession = 'home';
                switchPlayer('home');
                addEvent('🤖 CPU: Lost the ball!');
            }
        },
        () => {
            // CPU Shoot
            const awayGoalDistance = gameState.ballX;
            if (awayGoalDistance < 25) {
                const goalChance = Math.random();
                if (goalChance > 0.35) { // 65% goal rate when in position
                    gameState.awayScore++;
                    gameState.ballX = 50;
                    gameState.ballY = 50;
                    gameState.possession = 'home';
                    const ball = document.getElementById('ball');
                    ball.classList.add('goal-animation');
                    setTimeout(() => ball.classList.remove('goal-animation'), 1000);
                    addEvent('⚽ CPU GOAL!!! Away team scores! 😱');
                } else {
                    gameState.possession = 'home';
                    addEvent('🤖 CPU: Shot saved!');
                }
            } else {
                gameState.possession = 'home';
                addEvent('🤖 CPU: Shot from too far.');
            }
            gameState.possessionPercent = 50;
            switchPlayer('home');
        }
    ];

    const randomAction = actions[Math.floor(Math.random() * actions.length)];
    randomAction();
    updateDisplay();
}

function addEvent(message) {
    const eventsList = document.getElementById('matchEvents');
    
    // Create new event element
    const eventElement = document.createElement('p');
    eventElement.textContent = `${gameState.matchTime}' - ${message}`;
    
    // Add to top of events list
    eventsList.insertBefore(eventElement, eventsList.querySelector('h3').nextSibling);
    
    // Keep only last 8 events
    const events = eventsList.querySelectorAll('p');
    if (events.length > 8) {
        events[events.length - 1].remove();
    }
}

function endMatch() {
    gameState.gameActive = false;

    let title, message;
    
    if (gameState.homeScore > gameState.awayScore) {
        title = '🎉 You Won!';
        message = `Final Score: ${gameState.homeScore} - ${gameState.awayScore}. Congratulations!`;
    } else if (gameState.awayScore > gameState.homeScore) {
        title = '😢 You Lost!';
        message = `Final Score: ${gameState.homeScore} - ${gameState.awayScore}. Better luck next time!`;
    } else {
        title = '🤝 Draw!';
        message = `Final Score: ${gameState.homeScore} - ${gameState.awayScore}. It was a close match!`;
    }

    document.getElementById('gameOverTitle').textContent = title;
    document.getElementById('gameOverMessage').textContent = message;
    document.getElementById('gameOver').style.display = 'flex';
    
    addEvent(`⏰ Match Ended! ${title}`);
}

function restartGame() {
    // Reset game state
    gameState = {
        homeScore: 0,
        awayScore: 0,
        matchTime: 0,
        possession: 'home',
        possessionPercent: 50,
        ballX: 50,
        ballY: 50,
        gameActive: true,
        matchDuration: 90,
        currentPlayer: 'p9',
        events: []
    };

    // Hide game over modal
    document.getElementById('gameOver').style.display = 'none';

    // Clear events
    const eventsList = document.getElementById('matchEvents');
    eventsList.innerHTML = '<h3>Match Events</h3><p>Match started! Press buttons to play.</p>';

    updateDisplay();
    startMatch();
}

// Keyboard shortcuts (optional)
document.addEventListener('keydown', function(e) {
    if (!gameState.gameActive) return;

    switch(e.key.toLowerCase()) {
        case 'p':
            passPlay();
            break;
        case 's':
            shootPlay();
            break;
        case 'd':
            dribblePlay();
            break;
        case 'f':
            defendPlay();
            break;
    }
});