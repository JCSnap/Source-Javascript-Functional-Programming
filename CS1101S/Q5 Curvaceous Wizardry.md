const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack(c1, c2) {
    const upper_half = translate(0, 0.5, 0)(scale(1, 0.5, 1)(c1));
    const lower_half = scale(1, 0.5, 1)(c2);
    return connect_rigidly(upper_half, lower_half);
}

draw_points(10000)(stack(test_curve, test_curve));

const test_curve =
    t => make_point(t, 0.5 + (math_sin(4 * (math_PI * t)) / 2));

function stack_frac(frac, c1, c2) {
    const upper_half = translate(0, 1 - frac, 0)(scale(1, frac, 1)(c1));
    const lower_half = scale(1, 1 - frac, 1)(c2);
    return connect_rigidly(upper_half, lower_half);
}


// Test
draw_points(10000)
    (stack_frac(1 / 5,
                test_curve,
                stack_frac(1 / 2, test_curve, test_curve)));