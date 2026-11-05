
const buttons = document.querySelectorAll(".btn");

const resetbtn = document.getElementById("reset");
const newGamebtn = document.getElementById("newGame");

const winner = document.getElementById("winner");
const status = document.getElementById("status");

const winLine = document.getElementById("win-line");
const board = document.getElementById("board");

let turnO = true;
let count = 0;
let gameOver = false;

// All possible winning combinations
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];

// SVG icons
const xIcon = `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-width="2"
          d="M20 20L4 4m16 0L4 20"/>
</svg>
`;

const oIcon = `
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <circle cx="12" cy="12" r="10"
            fill="none"
            stroke="currentColor"
            stroke-width="2"/>
</svg>
`;

// Handle player turns
buttons.forEach((btn) => {

    btn.addEventListener("click", () => {

        if (gameOver || btn.disabled) return;

        const player = turnO ? "O" : "X";

        // Add SVG icon
        btn.innerHTML = player === "O" ? oIcon : xIcon;

        btn.classList.add(player);
        btn.disabled = true;

        count++;

        // Check winner
        const result = checkWinner();

        if (result) {

            gameOver = true;

            winner.innerText = `PLAYER ${result.player} WINS!`;
            winner.classList.remove("hide");

            status.innerText = "Congratulations!";

            // Highlight winning buttons
            result.pattern.forEach(index => {
                buttons[index].classList.add("winning");
            });

            // Draw winning strike line
            drawWinningLine(result.pattern);

            buttons.forEach(button => {
                button.disabled = true;
            });

            return;
        }

        // Check draw
        if (count === 9) {

            gameOver = true;

            winner.innerText = "IT'S A DRAW!";
            winner.classList.remove("hide");

            status.innerText = "Well played!";

            return;
        }

        // Switch player
        turnO = !turnO;

        status.innerText = `Player ${turnO ? "O" : "X"}'s turn`;

    });

});


// Check winning combinations
function checkWinner() {

    for (const pattern of winPatterns) {

        const [a, b, c] = pattern;

        const val1 = buttons[a].classList.contains("O") ? "O" :
                     buttons[a].classList.contains("X") ? "X" : "";

        const val2 = buttons[b].classList.contains("O") ? "O" :
                     buttons[b].classList.contains("X") ? "X" : "";

        const val3 = buttons[c].classList.contains("O") ? "O" :
                     buttons[c].classList.contains("X") ? "X" : "";

        if (val1 && val1 === val2 && val2 === val3) {

            return {
                player: val1,
                pattern: pattern
            };

        }

    }

    return null;

}


// Draw winning strike line
function drawWinningLine(pattern) {

    const first = buttons[pattern[0]];
    const last = buttons[pattern[2]];

    const boardRect = board.getBoundingClientRect();

    const firstRect = first.getBoundingClientRect();
    const lastRect = last.getBoundingClientRect();

    const x1 = firstRect.left + firstRect.width / 2 - boardRect.left;
    const y1 = firstRect.top + firstRect.height / 2 - boardRect.top;

    const x2 = lastRect.left + lastRect.width / 2 - boardRect.left;
    const y2 = lastRect.top + lastRect.height / 2 - boardRect.top;

    const length = Math.hypot(x2 - x1, y2 - y1);

    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

    winLine.style.left = `${x1}px`;
    winLine.style.top = `${y1}px`;

    winLine.style.transform = `rotate(${angle}deg)`;

    requestAnimationFrame(() => {
        winLine.style.width = `${length}px`;
    });

}


// Reset game
function resetGame() {

    turnO = true;
    count = 0;
    gameOver = false;

    buttons.forEach(btn => {

        btn.innerHTML = "";
        btn.disabled = false;

        btn.className = "btn";

    });

    winner.innerText = "";
    winner.classList.add("hide");

    status.innerText = "Player O's turn";

    winLine.style.width = "0";

}


// Reset button
resetbtn.addEventListener("click", resetGame);

// New Game button
newGamebtn.addEventListener("click", resetGame);
