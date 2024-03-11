
const input = document.querySelector('input');

let sudoku = '  6     2 81 4293 25   34  4 8 1  76  2   8  17  6 3 9  35   94 9732 51 5     7  ';

input.addEventListener('change', (e) => {
    sudoku = e.target.value;
    sudokuArray = sudoku.split('');
    init();
});

const compute = document.querySelector('.solve');

let sudokuArray = sudoku.split('');

const move = (i, k) => {
    let row = Math.floor(i / 9);

    for (let m = row * 9; m< (row + 1) * 9; m++) {
        if (sudokuArray[m] === k && i!=m) {
            return false;
        }
    }

    for (let l = i - 9; l >= 0; l -= 9) {
        if (sudokuArray[l] === k) {
            return false;
        }
    }

    for (let l = i + 9; l <81; l += 9) {
        if (sudokuArray[l] === k) {
            return false;
        }
    } 

    let up = Math.floor(row / 3) * 3,
        left = Math.floor((i - row * 9) / 3) * 3;

    for (let x = up; x < up + 3; x++) {
        for (let y = left; y < left + 3; y++) {
            if (sudokuArray[x * 9 + y] === k && x*9+y!=i) return false;
        }
    }

    return true;
};

const rec = (i) => {
    if (i === 81) return true;

    if (sudokuArray[i] === ' ') {
        for (let j = 1; j <= 9; j++) {
            let k = j.toString();
            if (move(i, k)) {
                sudokuArray[i] = k;
                if (rec(i + 1)) {
                    return true;
                } else {
                    sudokuArray[i] = ' ';
                }
            }
        }
        return false;
    } else {
        return rec(i + 1);
    }
};

const solve = () => {
    rec(0);
    init();
};

compute.addEventListener('click', solve);

const board = document.querySelector('.board');

let t=0;

const init = () => {
    board.innerHTML = '';
    sudokuArray.forEach((value) => {
        var newDiv = document.createElement('div');
        newDiv.classList.add('box');
        newDiv.textContent = value;
        if(t%9==0||t%9==3||t%9==6)
        newDiv.style.borderLeft="3px solid";
        if((Math.floor(t/9))%3==0)
        newDiv.style.borderTop="3px solid";
        if(t%9==8)
        newDiv.style.borderRight="3px solid";
        if((Math.floor(t/9))==8)
        newDiv.style.borderBottom="3px solid";
        t++;
        board.appendChild(newDiv);
    });
};

init();

