/* takes n as argument to control the depth of
individual runes later on */
function isolate(n, rune) {
    return overlay_frac(n, blank, rune);
}

function steps(r1, r2, r3, r4){
    return beside(
        stack(isolate(0, r4), isolate(1/4, r3)),
        stack(isolate(3/4, r1), isolate(2/4, r2))
        );
}


// Tests
show(steps(rcross, triangle, corner, nova));
hollusion(steps(rcross, triangle, corner, nova));

// top down 

function pic(n, rune, counter) {
    return n===counter
    ? overlay(rune, blank)
    : overlay_frac(
        1/(n-counter+1), // relative depth
        scale(counter/n, rune), // absolute scale
        pic(n, rune, counter+1)
        );
}

function cone(n, rune) {
    return pic(n, rune, 1);
}

// Tests
show(cone(4, circle));
//hollusion(cone(15, circle));