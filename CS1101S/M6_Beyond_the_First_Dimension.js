// feel free to add helper functions!

function fractal(level, transformation, curve) {
    return level === 1
    ? transformation(curve)
    : fractal(level - 1, transformation, transformation(curve));
}

function levycize(curve) {
    const f = math_sqrt(2) / 2;
    const scaled_curve = (scale(f, f, 1))(curve);
    return connect_rigidly(
        (rotate_around_origin(0, 0, math_PI / 4))(scaled_curve),
        (translate(0.5, 0.5, 0))
            ((rotate_around_origin(0, 0, -math_PI / 4))(scaled_curve)));
}

// Test
draw_connected_full_view_proportional(10000)
    (fractal(11, levycize, unit_line));

// copy your fractal function here


function dragonize(curve) {
    return put_in_standard_position(connect_ends
                   (invert((rotate_around_origin(0, 0, -math_PI / 2))(curve)), (curve)));
}

function fractal(level, transformation, curve) {
    return level === 1
    ? transformation(curve)
    : fractal(level - 1, transformation, transformation(curve));
}


// Test
draw_connected_full_view_proportional(10000)
    (fractal(11, dragonize, unit_line));

function kochize(curve) {
    const up_60 = rotate_around_origin(0, 0, math_PI / 3);
    const down_60 = rotate_around_origin(0, 0, - math_PI / 3);
    return put_in_standard_position(
               connect_ends(curve,
                            connect_ends(up_60(curve),
                                         connect_ends(down_60(curve),
                                                      curve))));
}

function fractal(level, transformation, curve) {
    return level === 1
    ? transformation(curve)
    : fractal(level - 1, transformation, transformation(curve));
}

function snowflake(n) {
    const complexity = fractal(n, kochize, unit_line); // snowflake "branch"
    return rotate_around_origin(0, 0, math_PI/6)
    (iter(6, complexity, complexity));
}

function iter(n, curve, default1) {
        return n === 1
        ? curve
        : connect_ends(
        curve,
        iter(n - 1,   // rotate with reference to default position
        rotate_around_origin(0, 0, (7 - n)*(2*math_PI/6))(default1),
        default1) 
        );
}

draw_connected_full_view_proportional(700000)(snowflake(5));







/* Ignore the functions below as they are not part of the question at all. 
I misread the question and interpreted as snowflake(n) should return a snowflake 
with n sides (or petals/branches) 
Didn't remove it for future reference as I spent a lot of time on it, please
don't mark me down */

function snowflake2(n) {
    return full_snowflake(n, n, petal, petal); // 2md amd 4th argument do not
}                                              // change with recursion

const petal = fractal(5, kochize, unit_line);
function full_snowflake(n, sides, curve, default1) {
    return n === 1
    ? curve
    : connect_ends(
        curve,
        full_snowflake(n - 1, 
        sides,  // each petal is 2pi/sides degree different from the previous one
        rotate_around_origin(0, 0, (sides - n + 1)*(2*math_PI/sides))(default1), default1) 
        );
}

// Test

