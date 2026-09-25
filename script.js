const buttons = document.querySelectorAll(".btn");
let turnO=true;
let count = 0;
const resetbtn = document.getElementById("reset");
const newGamebtn = document.getElementById("newGame");
const winner = document.getElementById("winner");

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
];
const isWinner = () => {
  
  for(let pattern of winPatterns){
    let pos1val = buttons[pattern[0]].innerText;
    let pos2val = buttons[pattern[1]].innerText;
    let pos3val = buttons[pattern[2]].innerText;
    if(pos1val !== "" && pos2val !== "" && pos3val !== ""){
    if(pos1val === pos2val && pos2val === pos3val){
      return pos1val;
    }
  }
}
return "";
};
 
buttons.forEach(function(btn){
btn.addEventListener("click", function(){
    if(turnO){
  this.innerText = "O";
  turnO = false;
}
  else{
    this.innerText = "X";
    turnO = true;
  }
  this.disabled = true;
  count++;
  let winPlayer = isWinner();
  if(winPlayer !== ""){ 
  winner.innerText = `the winner is ${winPlayer}`;
  winner.classList.remove("hide");
  buttons.forEach(function(btn){
    btn.disabled = true;
  });
    }
    if(count === 9 && winPlayer === ""){
winner.innerText = "It's a tie";
winner.classList.remove("hide");
buttons.forEach(function(btn){
btn.disabled = true;
});
}
});
  });
  

resetbtn.addEventListener("click", function(){
  location.reload();});
newGamebtn.addEventListener("click", function(){
  location.reload();});
