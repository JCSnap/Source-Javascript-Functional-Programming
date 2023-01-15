//The function mirror shows a rune next to its mirror image.

function mirror(rune) {
    return beside(rune, flip_horiz(rune));
}


/*The function more_love takes a rune as
argument and returns a rune that shows
it next to a red heart.*/


function more_love(rune) {
    return beside(rune, red(heart));
}

show(more_love(mirror(sail)));

function mosaic(r1, r2, r3, r4) {
    // your answer here
    return stack(beside(r4, r1), beside(r3, r2));
} 

// Test
show(mosaic(rcross, sail, corner, nova));

function mosaic(r1, r2, r3, r4) {
    return stack(beside(r4, r1), beside(r3, r2));
}

function upside_down_mosaic(r1, r2, r3, r4) {
    return turn_upside_down(mosaic(r1, r2, r3, r4));
}

// Test
show(upside_down_mosaic(rcross, sail, corner, nova)); 

function mosaic(r1, r2, r3, r4) {
    return stack(beside(r4, r1), beside(r3, r2));
}

function transform_mosaic(r1, r2, r3, r4, transform) {
    return transform(mosaic(r1, r2, r3, r4));
}
// Test
show(transform_mosaic(rcross, sail, corner, nova, make_cross));