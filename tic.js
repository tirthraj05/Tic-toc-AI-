let gameState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const popup = document.getElementById("congratsPopup");
const winnerMessage = document.getElementById("winnerMessage");

// Winning combinations
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Check winner
function checkWinner() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            highlightWinningLine(condition); // Highlight the winning line
            return gameState[a];
        }
    }
    return gameState.includes("") ? null : "Draw";
}

// Highlight winning line
function highlightWinningLine(condition) {
    condition.forEach(index => {
        const cell = document.getElementById(`b${index + 1}`);
        cell.style.backgroundColor = "lightgreen"; // Highlight with a color
    });
}

// Show popup
function showPopup(winner) {
    winnerMessage.textContent = winner === "Draw" ? "It's a Draw!" : `🎉 Player ${winner} Wins! 🎉`;
    popup.style.display = "flex";
}

// Close popup
function closePopup() {
    popup.style.display = "none";
}

// Make a move
function makeMove(cell, index) {
    if (gameState[index] || !gameActive) return;

    gameState[index] = currentPlayer;
    cell.value = currentPlayer;

    const result = checkWinner();

    if (result) {
        gameActive = false;
        showPopup(result);
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (currentPlayer === "O") {
        setTimeout(aiMove, 500); // Delay AI move for better UX
    }
}

// AI Move (random)
function aiMove() {
    const emptyCells = gameState.map((cell, index) => (cell === "" ? index : null)).filter(index => index !== null);
    if (emptyCells.length > 0) {
        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const aiCell = document.getElementById(`b${randomIndex + 1}`);
        makeMove(aiCell, randomIndex);
    }
}

// Reset the game
function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    document.getElementById("print").textContent = "";
    for (let i = 1; i <= 9; i++) {
        const cell = document.getElementById(`b${i}`);
        cell.value = "";
        cell.style.backgroundColor = ""; // Remove highlighting
    }
    closePopup();
}
