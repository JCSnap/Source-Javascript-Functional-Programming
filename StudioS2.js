function biggie_size(x) {
    return x+4;
}

function unbiggie_size(x) {
    return x-4;
}

function is_biggie_size(x) {
    return x<=4
    ? 1>2
    : 1<2;
}

function combo_price(x) {
    return x%2===0
    ? 1.17*4 +(1.17+0.5)*math_floor(x/5)
    :1.17*(x%4) + 0.5*math_floor(x/5);
}

function empty_order() {
    return 0;
}

function add_to_order(x, y) {
    10*x + y;
}
add_to_order(231, 4);