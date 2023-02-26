function fractal(pic, n) {
    return n===1
    ? pic
    : beside_frac(1/2, pic, fractal(stack(pic, pic), n-1));
}

// Test
show(fractal(make_cross(rcross), 7));

function hook(frac) {
    return stack(square, beside_frac(1-frac, blank, square));
}

// Test
show(hook(1/5));

// blank "creates" the protrusion of the hook
function hook(thickness) {
    return stack(square, beside_frac(1-thickness, blank, square));
}

function spiral(thickness, depth) {
    return depth === 0
    ? blank // If depth = 1, bottom half is blank 
    : stack_frac(thickness, hook(thickness/2), quarter_turn_right(spiral(thickness, depth-1)));
} 

show(spiral(1/5, 20));
