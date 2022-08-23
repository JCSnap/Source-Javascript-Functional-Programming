import {circle, show, beside, beside_frac, stack, stack_frac,
square, ribbon, blank} from "rune";

function moony_2(n) {
    return n===1
    ? circle
    : beside(
        stack(circle, square),
        stack(blank, moony_2(n-1)));
}

function moony(n) {
    return n===1
    ?circle
    :beside_frac(
        1/n,
        stack_frac(1/n, circle, square),
        stack_frac(1/n, blank, moony(n-1)));
}

show(moony_2(5));
show(moony(5));
