function biggie_size(x) {
    return x+4;
}

function unbiggie_size(x) {
    return x-4;
}

function is_biggie_size(x) {
    return x>=4;
}

function combo_price(x) {
    return x%4===0 //the case where x==4 or x==8 
    ? 1.17*4 +(0.5)*math_floor(x/5) // if x is 4, this whole thing = 0, else 0.5
    :1.17*(x%4) + 0.5*math_floor(x/5);
}

function empty_order() {
    return 0;
}

function add_to_order(x, y) {
    return 10*x + y;
}

function last_combo(x) {
    return x%10;
}

function other_combo(x) {
    return (math_floor(x/10)); /* divide x by 10 turns last digit
    into a decimal number, which is then "floored" to be converted
    into an integer so as to remove last digit */
}

combo_price(8);