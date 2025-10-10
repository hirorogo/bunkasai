const players = {
    1: { score: 0, key: null },
    2: { score: 0, key: null }
};

const keys = ['q', 'w', 'e', 'r', 'a', 's', 'd', 'f']; // 使用するキー
let currentPlayer = 1; // 現在のターンのプレイヤー
let currentKey = null; // 現在の指示キー
let gameActive = false;

const instructionEl = document.getElementById('instruction');
const score1El = document.getElementById('score1');
const score2El = document.getElementById('score2');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');

// ランダムなキーを生成
function generateRandomKey() {
    return keys[Math.floor(Math.random() * keys.length)];
}

// 指示を表示
function displayInstruction() {
    currentKey = generateRandomKey();
    instructionEl.textContent = `プレイヤー${currentPlayer}は「${currentKey.toUpperCase()}」キーを押せ！`;
}

// ゲーム開始
function startGame() {
    gameActive = true;
    players[1].score = 0;
    players[2].score = 0;
    updateScores();
    currentPlayer = 1;
    displayInstruction();
    startBtn.disabled = true;
}

// ゲームリセット
function resetGame() {
    gameActive = false;
    players[1].score = 0;
    players[2].score = 0;
    updateScores();
    instructionEl.textContent = 'スタートボタンを押してゲームを開始！';
    startBtn.disabled = false;
}

// スコアを更新
function updateScores() {
    score1El.textContent = players[1].score;
    score2El.textContent = players[2].score;
}

// キー押下イベント
function handleKeyPress(event) {
    if (!gameActive || !currentKey) return;

    const pressedKey = event.key.toLowerCase();
    if (pressedKey === currentKey) {
        // 正解
        players[currentPlayer].score += 10;
        updateScores();
        currentPlayer = currentPlayer === 1 ? 2 : 1; // 次のプレイヤーに交代
        displayInstruction();
    } else {
        // 不正解
        instructionEl.textContent = `プレイヤー${currentPlayer}が間違えた！ゲーム終了！`;
        gameActive = false;
        startBtn.disabled = false;
    }
}

// イベントリスナー
document.addEventListener('keydown', handleKeyPress);
startBtn.addEventListener('click', startGame);
resetBtn.addEventListener('click', resetGame);