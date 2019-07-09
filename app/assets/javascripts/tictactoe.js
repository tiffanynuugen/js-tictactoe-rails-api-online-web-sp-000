let currentGameId
var turn = 0
const state = []


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
  $("#save").on("click", function() {
    saveGame()
  })
}

// returns "X" or "O" based on either even/odd turn count
function player() {
  if (turn % 2 === 0 || isNaN(turn)) {
    return "X"
  }
  return "O"
}

function setMessage(string) {
  const messageDiv = document.getElementById('message').innerHTML = string
}

// place "X" or "O" on to clicked square
// BUT cannot place token in a square that is already taken
function updateState(square) {
  // if square is empty, then place "X" or "O" on clicked square.
  if (square.innerHTML === "") {
    square.innerHTML = player()
  } else {
    // if square is NOT empty, then DO NOT allow user to place a token.
    // square.innerHTML != player()
    turn = 0
  }
  // debugger
}

function checkWinner() {
  // create empty array
  const board = []
  // come up with an array of all possible horizontal, vertical, and diagonal winning combos
  const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
  // get all of the X's, O's, or blanks from each of the squares
  document.querySelectorAll("td").forEach(square => {
    board.push(square.innerHTML)
  })

  // iterate over array and get each combo
  // then compare three tokens of each square with each other
  // to see if they match up

  // check if tokens of winning combo is either X or O
  // if three X's or O's, then set either message: "Player X Won!" or "Player O Won!"

  // traditional for loop
  // * returning false OUTSIDE the loop allows ALL arrays to be checked against
  // the condition before it checks for no winning combos—compared to when false
  // was being returned within the loop and ONLY checking the first array against the condition
  // and skipping all the other arrays

  for (let i = 0; i < winningCombos.length; i++) {
      combo = winningCombos[i]
      if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
          if (board[combo[0]] === "X") {
              setMessage("Player X Won!")
            } else if (board[combo[0]] === "O") {
                setMessage("Player O Won!")
              }
              return true
            }
          }
          return false

  // some() method checks if elements in array pass condition and returns boolean value
  // return winningCombos.some(combo => {
    //    return (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]])
    // })

  // for...of loop
  // for (let combo of winningCombos) {
  //     if (board[combo[0]] !== "" && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
  //         return true;
  //       }
  //     }
  //     return false;

  // const indicesOfO = board.reduce((acc, el, i) => (el === "O" ? [...acc, i] : acc), [])
  // const indicesOfX = board.reduce((acc, el, i) => (el === "X" ? [...acc, i] : acc), [])

  // if (indicesOfX.join() === winningCombos[0].join() || indicesOfX.join() === winningCombos[1].join() || indicesOfX.join() === winningCombos[2].join() || indicesOfX.join() === winningCombos[3].join() || indicesOfX.join() === winningCombos[4].join() || indicesOfX.join() === winningCombos[5].join() || indicesOfX.join() === winningCombos[6].join() || indicesOfX.join() === winningCombos[7].join()) {
  //   return true
  // } else if (indicesOfO.join() === winningCombos[0].join() || indicesOfO.join() === winningCombos[1].join() || indicesOfO.join() === winningCombos[2].join() || indicesOfO.join() === winningCombos[3].join() || indicesOfO.join() === winningCombos[4].join() || indicesOfO.join() === winningCombos[5].join() || indicesOfO.join() === winningCombos[6].join() || indicesOfO.join() === winningCombos[7].join()) {
  //   return true
  // } else {
  //   return false
  // }

  // and then push them into the empty array
  // get all of the indices of the token
  // ["X", "X", "X", "", "", "", "O", "O", ""]
  // acc = [], el = "X", i = 0 => [0]
  // acc = 0, el = "X", i = 1 => [0, 1]
  // acc = 1, el = "X", i = 2 => [0, 1, 2]
}

// iterate through squares and clear all tokens
// if game is won, reset board and turn counter
function resetFunction() {
  const squares = document.querySelectorAll("td").forEach(square => {
    square.innerHTML = ""
  })
  turn = 0
}

function doTurn(square) {
  // place token on to clicked square
  updateState(square)
  // then increment by 1
  turn++
  if (checkWinner()) {
    resetFunction()
  } else if (turn === 9) {
    setMessage("Tie game.")
    resetFunction()
  }
}

$(document).ready(function() {
  $("#previous").click(function() {
    $.ajax({
      url: "/games",
      method: "GET"
    })
  })
})

function saveState() {
  document.querySelectorAll("td").forEach(square => {
    state.push(square.innerHTML)
  })
}
function saveGame() {
  saveState()
  if (!currentGameId) {
    $.ajax({
      method: "POST",
      url: "/games",
      success: function(game) {
        currentGameId = game.data.id
      }
    })
  } else {
    $.ajax({
      method: "PATCH",
      url: `/games/${currentGameId}`,
      data: state
    })
  }
}
















// Code your JavaScript / jQuery solution here
