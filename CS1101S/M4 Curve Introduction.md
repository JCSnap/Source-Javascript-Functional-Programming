// Part 1
// unit_line_at: 


// Part 2
function vertical_line(pt, length) {
    function meter(t) {
        return t <= length
        ? make_point(x_of(pt), y_of(pt) + t)
        : make_point(x_of(pt), y_of(pt));
    }
    return meter;
}


draw_connected(200)(vertical_line(make_point(0.5, 0.25), 0.5));

// Part 3
// your answer here (keep your answer commented)


// Part 4
// your answer here

function three_quarters(pt) {
    return t => make_point(-1 + x_of(pt) + math_cos(3/2 * math_PI * t),
                           y_of(pt) + math_sin(3/2 * math_PI * t));
}




//draw_connected_full_view_proportional(200)(three_quarters);
// Test
draw_connected(200)(three_quarters(make_point(0.5, 0.1)));

/*

DRAFT: NOT PART OF ANSWER!

function first_half(pt) {
    return make_point(x_of(pt) + math_cos(3/2 * math_PI * 2 * t),
                           -1 + y_of(pt) - math_sin(3/2 * math_PI * 2 * t));
}

function second_half(pt) {
    return make_point(x_of(pt) + math_sin(3/2 * math_PI * 2 * t),
                           -1 + y_of(pt) + math_cos(3/2 * math_PI * 2 * t));
}

function connect(curve1, curve2, pt) {
    return t => t<=0.5
    ? curve1(pt)
    : curve2(pt);
}
 */ 
function s_generator(pt) {
    return t => t <= 0.5
    ? make_point(x_of(pt) + math_cos(3/2 * math_PI * 2 * t),
                 1 + y_of(pt) + math_sin(3/2 * math_PI * 2 * t))
    : make_point(x_of(pt) + math_sin(3/2 * math_PI * 2 * (t - 0.5)),
                 -1 + y_of(pt) + math_cos(3/2 * math_PI * 2 * (t - 0.5)));
                           
}
// Test
draw_connected_full_view_proportional(200)(s_generator(make_point(0.5, 0))); 