window.onload = () => {
  attachListeners()
}

function attachListeners() {
// listens to when a square is clicked
  const squares = document.querySelectorAll("td").forEach(square => {
    square.addEventListener("click", () => {
        doTurn(square)
    })
  })

  // const body = document.querySelector("tbody").addEventListener("click", () => {
  //   const x = event.target.dataset.x
  //   const y = event.target.dataset.y
  //   const square = document.querySelector(`[data-x="${x}"][data-y="${y}"]`)
  // })

}

// global variable
var turn = 0

// returns "X" or "O" based on either even/odd turn count
function player() {
  if (turn % 2 === 0 || isNaN(turn)) {
    return "X"
  } else {
    return "O"
  }
}

// adds "X" or "O" on to clicked square
function updateState(square) {
  square.innerHTML = player()
}

function setMessage() {
  const string = "Player X Won!" || "Player O Won!"
  const messageDiv = document.getElementById('message').innerHTML = string
}

// determine the exact position and then get the token of each square
// if player gets either token in three consecutive squares horizontally,
// vertically, or diagonally, then player wins.
function checkWinner() {
  const squares = document.querySelectorAll("td")
  console.log(squares);
}

function doTurn(square) {
  updateState(square)
  turn++
  checkWinner()
  setMessage()
}










// Code your JavaScript / jQuery solution here
