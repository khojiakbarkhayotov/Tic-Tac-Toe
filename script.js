"use strict";

let listX = ["", "", "", "", "", "", "", "", ""];
let listY = ["", "", "", "", "", "", "", "", ""];
let count = 1;
const items = document.getElementsByClassName("item");
const restart = document.querySelector(".reset");
const message = document.querySelector(".msg");

// function Factory in action
const controlItems = function () {
  const checkWinner = function (list) {
    let winner = false;
    [
      list.slice(0, 3),
      list.slice(3, 6),
      list.slice(6, 9),
      [list[2], list[5], list[8]],
      [list[0], list[3], list[6]],
      [list[1], list[4], list[7]],
      [list[0], list[4], list[8]],
      [list[2], list[4], list[6]],
    ].forEach((item) => {
      if ((item[0] == true) & (item[1] == true) & (item[2] == true)) {
        winner = true;
      }
    });

    return winner;
  };

  const removeListener = function (item) {
    item.parentNode.replaceChild(item.cloneNode(true), item);
  };

  const setContent = function (item) {
    const id = item.dataset.num - 1;
    if (count % 2 === 1) {
      item.textContent = "x";
      listX[id] = true;
    } else {
      item.textContent = "o";
      listY[id] = true;
    }
    removeListener(item);
    const checkX = checkWinner(listX);
    const checkO = checkWinner(listY);
    if (checkX || checkO) {
      message.style.color = "#a3e635";
      message.textContent = `Player ${checkO ? "O" : "X"} has won!`;
      [...items].forEach((item) => {
        removeListener(item);
      });
      return;
    }
    message.textContent = `Player ${count % 2 === 1 ? "O" : "X"}'s Turn`;
    count++;
  };

  const setlisteners = function () {
    [...items].forEach((item) => {
      item.addEventListener("click", setContent.bind(this, item));
    });
  };

  const restart = function () {
    [...items].forEach((item) => {
      item.textContent = "";
      removeListener(item);
    });
    setlisteners();
    message.style.color = "black";
    message.textContent = "Player X's Turn";
    listX = ["", "", "", "", "", "", "", "", ""];
    listY = ["", "", "", "", "", "", "", "", ""];
    count = 1;
  };

  return { setlisteners, restart };
};

const controller = controlItems();

controller.setlisteners();

restart.addEventListener("click", controller.restart);
