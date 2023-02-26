const paw = from_url("https://i.imgur.com/GJg95B8.png");

// left right centre borders
function border1(rune, count) {
    return quarter_turn_right(stackn(count, quarter_turn_left(rune)));
}

// top and down borders
function border2(rune, count) {
    return stackn(count-2, rune);
}

function turn_upside_down(rune) {
    return quarter_turn_right(quarter_turn_right(rune));
}

// big centre patterns
function centre_top(rune) {
    return beside(quarter_turn_right(rune), turn_upside_down(rune));
}
function centre(rune) {
    return stack(centre_top(rune), turn_upside_down(centre_top(rune)));
}

// no top bottom borders
function mid(rune, count) {
    return beside_frac((count-1)/count,
    beside_frac(1/(count-1), border2(rune, count), centre(rune)),
    border2(rune, count));
}

function persian(rune, count) {
    return stack_frac((count-1)/count,
    stack_frac(1/(count-1), // stitch top border with mid
        border1(rune, count),
        mid(rune, count)),
    border1(rune, count)); 
}
show(persian(paw, 5));
/*
show(persian(heart, 7));
show(persian(make_cross(rcross), 5));
const paw = from_url("https://i.imgur.com/GJg95B8.png");
show(persian(paw, 5));
*/