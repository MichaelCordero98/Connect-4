var turn = "red";
var col_div = document.getElementsByClassName("col");
var moveturn_div = document.getElementById("move-turn");
var button_div = document.getElementById("button");
var button_clone = button_div.cloneNode(true);
var board = construct_board();
var event_board = construct_board();
var hover_board_color = construct_board();
var hover_board_white = construct_board();
const immutable_board = construct_board();
const leftedge = 0;
const topedge = 0;
const rightedge = 6;
const bottomedge = 5;

function construct_board() {
    let board_return = [
        ["0", "1", "2", "3", "4", "5", "6"],
        ["7", "8", "9", "10", "11", "12", "13"],
        ["14", "15", "16", "17", "18", "19", "20"],
        ["21", "22", "23", "24", "25", "26", "27"],
        ["28", "29", "30", "31", "32", "33", "34"],
        ["35", "36", "37", "38", "39", "40", "41"]
    ];
    return board_return;
}

function print_board(board) {
    for (let i = 0; i < board.length; i++) {
        let row = " ";
        for (let j = 0; j < board[i].length; j++) {
            row = row + board[i][j] + " ";
        }
        console.log(row);
    }
    console.log(" ");
}

function clear_board() {
    board = construct_board();

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            let position = "col" + board[i][j];
            const position_div = document.getElementById(position);
            position_div.style.border = "30px solid white";
        }
    }
}

function append_new_element(type, className, idName, innerHTML) {
    var newElement = document.createElement(type);
    newElement.setAttribute('class', className);
    newElement.setAttribute('id', idName);
    newElement.innerHTML = "Play Again";
    document.body.appendChild(newElement);
}

function up_left(color, row, col, count) {
    if (col < leftedge || row < topedge || board[row][col] != color) {
        return count;
    }
    if (board[row][col] == color) {
        count = up_left(color, row - 1, col - 1, count + 1);
        return count;
    }
}

function up_right(color, row, col, count) {
    if (col > rightedge || row < topedge || board[row][col] != color) {
        return count;
    }
    if (board[row][col] == color) {
        count = up_right(color, row - 1, col + 1, count + 1);
        return count;
    }
}

function bottom_right(color, row, col, count) {
    if (col > rightedge || row > bottomedge || board[row][col] != color) {
        return count;
    }
    if (board[row][col] == color) {
        count = bottom_right(color, row + 1, col + 1, count + 1);
        return count;
    }
}

function bottom_left(color, row, col, count) {
    if (col < leftedge || row > bottomedge || board[row][col] != color) {
        return count;
    }
    if (board[row][col] == color) {
        count = bottom_left(color, row + 1, col - 1, count + 1);
        return count;
    }
}

function left(color, row, col, count) {
    if (col < leftedge || board[row][col] != color) {
        return count;
    }
    if (board[row][col] == color) {
        count = left(color, row, col - 1, count + 1);
        return count;
    }
}

function right(color, row, col, count) {
    if (col > rightedge || board[row][col] != color) {
        return count;
    }
    if (board[row][col] == color) {
        count = right(color, row, col + 1, count + 1);
        return count;
    }
}

function down(color, row, col, count) {
    if (row > bottomedge || board[row][col] != color) {
        return count;
    }
    if (board[row][col] == color) {
        count = down(color, row + 1, col, count + 1);
        return count;
    }
}

function left_diagonal_win(color, row, col) {
    let count = 1;
    count = up_left(color, row - 1, col - 1, count);
    count = bottom_right(color, row + 1, col + 1, count);
    if (count >= 4) {
        return "win";
    }
}

function right_diagonal_win(color, row, col) {
    let count = 1;
    count = up_right(color, row - 1, col + 1, count);
    count = bottom_left(color, row + 1, col - 1, count);
    if (count >= 4) {
        return "win";
    }
}

function horizontal_win(color, row, col) {
    let count = 1;
    count = left(color, row, col - 1, count);
    count = right(color, row, col + 1, count);
    if (count >= 4) {
        return "win";
    } 
}

function vertical_win(color, row, col) {
    let count = 1;
    count = down(color, row + 1, col, count);
    if (count >= 4) {
        return "win";
    } 
}

function check_winner(color, row, col) {
    if (left_diagonal_win(color, row, col) == "win") {
        return true;
    } else if (right_diagonal_win(color, row, col) == "win") {
        return true;
    } else if (horizontal_win(color, row, col) == "win") {
        return true;
    } else if (vertical_win(color, row, col) == "win") {
        return true;
    }
    return false;
}

function check_valid_move(row, col) {
    if (row + 1 > bottomedge) {
        return true;
    }
    if (board[row + 1][col] != "red" && board[row + 1][col] != "yellow") {
        return false;
    } else {
        return true;
    }
}

function change_turns() {
    if (turn === "red") {
        turn = "yellow";
        moveturn_div.innerHTML = "It's Yellow's turn to move";
    } else {
        turn = "red";
        moveturn_div.innerHTML = "It's Red's turn to move";
    }
}

function restart() {
    append_new_element("div", "button", "button", "Play Again");
    document.getElementById("button").style.width = "160px";
    button_div = document.getElementById("button");
    turn = "red";
    start();
}

function add_event(row, col) {
    if (row - 1 < topedge) {
        return;
    }
    const position = "col" + board[row - 1][col];
    const position_div = document.getElementById(position);
    handler = function () {
        make_move(position_div, row - 1, col);
    }
    event_board[row - 1][col] = handler;
    position_div.addEventListener('click', event_board[row - 1][col], true);
    set_hover_position(position_div, row - 1, col);
}

function make_move(position_div, row, col) {
    if (turn === "red") {
        position_div.style.border = "30px solid red";
        board[row][col] = "red";
        if (check_winner(turn, row, col) == true) {
            moveturn_div.innerHTML = "Red wins!";
            event_handler_remove();
            restart();
            return;
        }
    }
    else {
        position_div.style.border = "30px solid yellow";
        board[row][col] = "yellow";
        if (check_winner(turn, row, col) == true) {
            moveturn_div.innerHTML = "Yellow wins!";
            event_handler_remove();
            restart();
            return;
        }
    }

    print_board(board);
    position_div.removeEventListener('click', event_board[row][col], true);
    position_div.removeEventListener("mouseover", hover_board_color[row][col], true);
    position_div.removeEventListener("mouseout", hover_board_white[row][col], true);
    add_event(row, col);
    change_turns();
}

function event_handler_remove() {
    for (let i = 0; i < immutable_board.length; i++) {
        for (let j = 0; j < immutable_board[i].length; j++) {
            let position = "col" + immutable_board[i][j];
            let position_div = document.getElementById(position);
            if (typeof event_board[i][j] === 'function') {
                position_div.removeEventListener('click', event_board[i][j], true);
                position_div.removeEventListener("mouseover", hover_board_color[i][j], true);
                position_div.removeEventListener("mouseout", hover_board_white[i][j], true);
            }
        }
    }
}

function event_handler() {
    moveturn_div.innerHTML = "It's Red's turn to move";
    button_div.remove();

    for (let j = 0; j < board[5].length; j++) {
        let position = "col" + board[5][j];
        const position_div = document.getElementById(position);
        handler = function () {
            make_move(position_div, 5, j);
        }
        event_board[5][j] = handler;

        position_div.addEventListener('click', event_board[5][j], true);
        set_hover_position(position_div, 5, j);
    }
}

function set_hover_position(position_div, row, col) {
    color_handler = function () {
        change_color(position_div);
    }
    white_handler = function () {
        change_white(position_div);
    }
    hover_board_color[row][col] = color_handler;
    hover_board_white[row][col] = white_handler;
    position_div.addEventListener("mouseover", hover_board_color[row][col], true);
    position_div.addEventListener("mouseout", hover_board_white[row][col], true);
}

function change_color(position_div) {
    if (turn == "red") {
        position_div.style.border = "30px solid red";
    } else {
        position_div.style.border = "30px solid yellow";
    }
}

function change_white(position_div) {
    position_div.style.border = "30px solid white";
}

function start() {
    button_div.addEventListener('click', function () {
        clear_board();
        event_handler();
    })
}

function connect_4() {
    start();
}

connect_4();
