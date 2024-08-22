const buttonOptions = document.querySelectorAll(".button-option");
const restartButton = document.querySelector("#restart");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
];


let turn0 = true; 
let count = 0;

const enableBoxes = () => {
    buttonOptions.forEach(button => {
        button.disabled = false;
        button.innerText = "";
    });
};

const checkWin = () => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (buttonOptions[a].innerText && 
            buttonOptions[a].innerText === buttonOptions[b].innerText &&
            buttonOptions[a].innerText === buttonOptions[c].innerText) {
            return buttonOptions[a].innerText;
        }
    }
    return null;
};


const checkTie = () => {
    return count === 9 && !checkWin();
};


const makeComputerMove = () => {
    let availableMoves = [];
    buttonOptions.forEach((button, index) => {
        if (button.innerText === "") {
            availableMoves.push(index);
        }
    });

 
    if (availableMoves.length > 0) {
        const move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        buttonOptions[move].innerText = "X";
        turn0 = true; 
        count++;
    }
};

const resetGame = () => {
    turn0 = true; 
    count = 0;
    enableBoxes();
    
    const msgContainer = document.querySelector(".msgContainer");
    if (msgContainer) {
        msgContainer.classList.add("hide");
    }
};


buttonOptions.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (button.innerText === "" && turn0) {
            button.innerText = "O";
            turn0 = false; 
            count++;
            const winner = checkWin();
            if (winner) {
                alert(winner + " wins!");
                enableBoxes();
                return;
            }
            if (checkTie()) {
                alert("It's a tie!");
                enableBoxes();
                return;
            }

            
            setTimeout(makeComputerMove, 500); 

            
            setTimeout(() => {
                const winner = checkWin();
                if (winner) {
                    alert(winner + " wins!");
                    enableBoxes();
                    return;
                }
                if (checkTie()) {
                    alert("It's a tie!");
                    enableBoxes();
                }
            }, 500);
        }
    });
});

restartButton.addEventListener("click", resetGame);
