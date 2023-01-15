// TASK 1
//mutating array data
function max_flies_to_eat(tile_flies) {
    const lenC = array_length(tile_flies[0]);
    const lenR = array_length(tile_flies);
    const A = tile_flies;
    // return the maximum value of the tiles above or diagonally above
    function max(r1, c1) {
        let above = r1 - 1;
        let left = c1 - 1;
        let right = c1 + 1;
        if (left < 0) {
            return math_max(A[above][c1], A[above][right]);
        } else if (right >= lenC) {
            return math_max(A[above][c1], A[above][left]);
        } else {
            return math_max(A[above][left], A[above][c1], A[above][right]);
        }
    }
    for (let i = 1; i < lenR; i = i + 1) {
        for (let j = 0; j < lenC; j = j + 1) {
            A[i][j] = A[i][j] + max(i, j); // modify current tile to add max
            }
    }
    const last_row = lenR - 1;
    let final_max = 0;
    for (let z = 1; z < lenC; z = z + 1) { // find the permutation with the max flies
        final_max = math_max(A[last_row][z], A[last_row][z-1]);
        A[last_row][z] = final_max;
    }
    return A[last_row][lenC - 1];
}
// without mutating array data (intended solution)
function max_flies_to_eat2(tile_flies) {
    const lenC = array_length(tile_flies[0]);
    const lenR = array_length(tile_flies);
    const A = tile_flies;
    function max(r1, c1) {
        let below = r1 + 1;
        let left = c1 - 1;
        let right = c1 + 1;
        let pos = A[r1][c1];
        if (below === lenR) {
            return pos;
        } else if (left < 0) {
            return pos + math_max(max(below, c1), max(below, right));
        } else if (right >= lenC) {
            
            return pos + math_max(max(below, c1), max(below, left));
        } else {
            return pos + math_max(max(below, left), max(below, c1), max(below, right));
        }
    }
    function max_c(r) {
        function iter(count, max_C) {
            if (count === lenC) {
                return max_C;
            } else {
                let cur = max(r, count);
                let prev = max(r, count - 1);
                if (cur > prev) {
                    return iter(count + 1, cur);
                } else {
                    return iter(count + 1, prev);
                }
            }
        }
        return iter(1, 0);
    }
    return max_c(0);
}
// TEST:
const tile_flies = [[3, 1, 7, 4, 2], [2, 1, 3, 1, 1], [1, 2, 2, 1, 8], [2, 2, 1, 5, 3], [2, 1, 4, 4, 4], [5, 7, 2, 5, 1]];

max_flies_to_eat2(tile_flies); // Expected result: 32

// TASK 2

let mem = [];

function read(n, k) {
    return mem[n] === undefined
           ? undefined
           : mem[n][k];
}

function write(n, k, value) {
    if (mem[n] === undefined) {
        mem[n] = [];
    }
    mem[n][k] = value;
}

function memo_max_flies_to_eat(tile_flies) {
    const lenR = array_length(tile_flies);
    mem = [];
    for (let i = 0; i < lenR; i = i + 1) {
        mem[i] = [];
    }
    
    function max_flies_to_eat2(tile_flies) {
        const lenC = array_length(tile_flies[0]);
        const A = tile_flies;
        function max(r1, c1) {
            if (mem[r1][c1] !== undefined) {
                return mem[r1][c1];
            } else {
                let below = r1 + 1;
                let left = c1 - 1;
                let right = c1 + 1;
                let pos = A[r1][c1];
                if (below === lenR) {
                    mem[r1][c1] = pos;
                    return pos;
                } else if (left < 0) {
                    let result = pos + math_max(max(below, c1), max(below, right));
                    mem[r1][c1] = result;
                    return result;
                } else if (right >= lenC) {
                    let result = pos + math_max(max(below, c1), max(below, left));
                    mem[r1][c1] = result;
                    return result;
                } else {
                    let result = pos + math_max(max(below, left), max(below, c1), max(below, right));
                    mem[r1][c1] = result;
                    return result;
                }
            }
        }
        function max_c(r) {
            function iter(count, max_C) {
                if (count === lenC) {
                    return max_C;
                } else {
                    let cur = max(r, count);
                    //let next = max(r, count + 1);
                    if (cur > max_C) {
                        return iter(count + 1, cur);
                    } else {
                        return iter(count + 1, max_C);
                    }
                }
            }
            return iter(0, 0);
        }
        return max_c(0);
    }
    return max_flies_to_eat2(tile_flies);
}

// TEST:
const tile_flies = [[3, 1, 7, 4, 2],
                    [2, 1, 3, 1, 1],
                    [1, 2, 2, 1, 8],
                    [2, 2, 1, 5, 3],
                    [2, 1, 4, 4, 4],
                    [5, 7, 2, 5, 1]];
memo_max_flies_to_eat(tile_flies); // Expected result: 32