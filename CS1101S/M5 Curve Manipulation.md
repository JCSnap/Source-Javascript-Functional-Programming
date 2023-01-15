
function reflect_through_y_axis(curve) {
    return t => make_point(-x_of(curve(t)), y_of(curve(t)));
}

// you can define your own helper functions here

function reflect_through_y_axis(curve) {
    return t => make_point(-x_of(curve(t)), y_of(curve(t)));
}

function s_generator(pt) {
    return t => t <= 0.5
    ? make_point(x_of(pt) + math_cos(3/2 * math_PI * 2 * t),
                 1 + y_of(pt) + math_sin(3/2 * math_PI * 2 * t))
    : make_point(x_of(pt) + math_sin(3/2 * math_PI * 2 * (t - 0.5)),
                 -1 + y_of(pt) + math_cos(3/2 * math_PI * 2 * (t - 0.5)));
                           
}

function close(curve) {
    return t => t <= 0.5
    ? curve(2*t)
    : curve(1-(2 * t - 1)); // trace back
}

const my_s_curve = s_generator(make_point(0, 0));

draw_connected_full_view_proportional(200)
    (connect_ends(close(my_s_curve), reflect_through_y_axis(my_s_curve)));