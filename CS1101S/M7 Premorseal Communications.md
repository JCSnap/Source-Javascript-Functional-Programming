// Task 1

function noise_sound(duration) {
    const wave = t => math_random() * 2 - 1;
    return make_sound(wave, duration);
}

function cut_sound(sound, duration) {
    return make_sound(get_wave(sound), duration);
}

// Play test sound.
play(cut_sound(noise_sound(2), 1));

// Task 2

function sine_sound(freq, duration) {
    const sinwave = t => math_sin(t * 2 * math_PI * freq);
    return make_sound(sinwave, duration);
}

// Play test sound.
play(sine_sound(500, 1));

// Task 3

function sine_sound(freq, duration) {
    const sinwave = t => math_sin(t * 2 * math_PI * freq);
    return make_sound(sinwave, duration);
}

function two_consecutively(s1, s2) {
    function combined_wave(s1, s2) {
        return t => t <= get_duration(s1)
        ? get_wave(s1)(1 / get_duration(s1) * t)
        : get_wave(s2)(2*(t - get_duration(s1)));
    }
    return make_sound(combined_wave(s1, s2),
                      get_duration(s1) + get_duration(s2));
}

const my_sine_1 = sine_sound(500, 1);
const my_sine_2 = sine_sound(750, 2);

// Play test sound.
play(two_consecutively(my_sine_1, my_sine_2));

// Task 4

function sine_sound(freq, duration) {
    const sinwave = t => math_sin(t * 2 * math_PI * freq);
    return make_sound(sinwave, duration);
}

function two_consecutively(s1, s2) {
    function combined_wave(s1, s2) {
        return t => t <= get_duration(s1)
        ? get_wave(s1)(1 / get_duration(s1) * t)
        : get_wave(s2)(2*(t - get_duration(s1)));
    }
    return make_sound(combined_wave(s1, s2),
                      get_duration(s1) + get_duration(s2));
}

function consecutively(list_of_sounds) {
    return is_null(list_of_sounds)
    ? sine_sound(500, 0) // since I can't use a null like pair, this is a dummy sound with 0 seconds
    : two_consecutively(head(list_of_sounds), consecutively(tail(list_of_sounds))); // think of two_consecutively as pair
}

const my_sine_1 = sine_sound(500, 0.5);
const my_sine_2 = sine_sound(750, 1);
const my_sine_3 = sine_sound(625, 0.5);

// Play test sound.
play(consecutively(list(my_sine_1, my_sine_2, my_sine_3)));

// Task 5

function sine_sound(freq, duration) {
    const sinwave = t => math_sin(t * 2 * math_PI * freq);
    return make_sound(sinwave, duration);
}

function two_consecutively(s1, s2) {
    function combined_wave(s1, s2) {
        return t => t <= get_duration(s1)
        ? get_wave(s1)(1 / get_duration(s1) * t)
        : get_wave(s2)(2*(t - get_duration(s1)));
    }
    return make_sound(combined_wave(s1, s2),
                      get_duration(s1) + get_duration(s2));
}

function consecutively(list_of_sounds) {
    return is_null(list_of_sounds)
    ? sine_sound(500, 0) // since I can't use a null like pair, this is a dummy sound with 0 seconds
    : two_consecutively(head(list_of_sounds), consecutively(tail(list_of_sounds))); // think of two_consecutively as pair
}

const dot_duration = 0.125;
const dash_duration = 3 * dot_duration;

// Create dot, dash and pause sounds first.
const dot_sound = sine_sound(800, dot_duration);
const dash_sound = sine_sound(800, dash_duration);
const dot_pause = silence_sound(dot_duration);
const dash_pause = silence_sound(dash_duration);

// Create sounds for each letter.
const S_sound = consecutively(
    list(dot_sound, dot_pause, dot_sound, dot_pause, dot_sound)
    );
const O_sound = consecutively(
    list(dash_sound, dot_pause, dash_sound, dot_pause, dash_sound)
    );

// Build the signal out of letter sounds and pauses.
const distress_signal = consecutively(
    list(S_sound, dash_pause, O_sound, dash_pause, S_sound));

// Play distress signal.
play(distress_signal);