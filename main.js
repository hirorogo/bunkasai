document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game-area');
    const target = document.getElementById('target');
    const scoreElement = document.getElementById('score');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-button');
    const gameInfo = document.querySelector('.game-info');

    let score = 0;
    let timeLeft = 30;
    let gameInterval;
    let isGameRunning = false;
    let targetKey = '';
    let startTime;

    const possibleKeys = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

    function getRandomKey() {
        const randomIndex = Math.floor(Math.random() * possibleKeys.length);
        return possibleKeys[randomIndex];
    }

    function startReactionTest() {
        targetKey = getRandomKey();
        gameInfo.textContent = `「${targetKey.toUpperCase()}」キーを押してください！`;
        startTime = performance.now();
    }

    function checkKeyPress(event) {
        if (!isGameRunning) return;

        if (event.key === targetKey) {
            const reactionTime = performance.now() - startTime;
            score += Math.max(0, Math.floor(1000 - reactionTime)); // 反応時間に応じてスコア加算
            scoreElement.textContent = score;
            startReactionTest(); // 次のキーを表示
        }
    }

    function startGame() {
        if (isGameRunning) return;

        isGameRunning = true;
        score = 0;
        timeLeft = 30;
        scoreElement.textContent = score;
        timerElement.textContent = timeLeft;
        startButton.disabled = true;

        startReactionTest();

        gameInterval = setInterval(() => {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        isGameRunning = false;
        clearInterval(gameInterval);
        startButton.disabled = false;
        gameInfo.textContent = 'ゲーム終了！';
        alert(`ゲーム終了！\nあなたのスコア: ${score}`);
    }

    document.addEventListener('keydown', checkKeyPress);
    startButton.addEventListener('click', startGame);
});