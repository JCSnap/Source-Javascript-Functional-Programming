// Question 1

function generate_list_of_note(letter_name, list_of_interval) {
    const base_MIDI = letter_name_to_midi_note(letter_name);
    function iter(current, list) {
        return is_null(list)
        ? pair(current, null)
        : pair(current, iter(current + head(list), tail(list)));
    }
    return iter(base_MIDI, list_of_interval);
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);

// repeat_pattern from Lecture L2

function repeat_pattern(n, pattern, rune) {
    return n === 0 ? rune : repeat_pattern(n - 1, pattern, pattern(rune));
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    const base_MIDI = letter_name_to_midi_note(note);
    const len = length(list_of_interval);
    function iter(counter) {
            return counter >= n 
            ? null
            : append(list_of_interval, iter(counter + 1));
        }
        
    const new_duration_list = iter(0);
    const new_sound_list = generate_list_of_note(note, new_duration_list);

    function create_each_sound(x) {
        return instrument(x, duration);
    }

    return map(create_each_sound, new_sound_list);
}
//repeated_scale("C4", pentatonic_list_of_interval, 2, 1, cello);
play(consecutively(repeated_scale("C4", pentatonic_list_of_interval,
                                  2, 1, cello)));

// Question 2

function play_matrix(duration, list_of_sounds) {
    function iter_column(counter_c) {
        function iter_row(counter_r) {
            if (counter_r === 16) {
                set_timeout( () => iter_column(counter_c + 1), 1000 * duration);
            } else if (!list_ref(list_ref(get_matrix(), counter_r), counter_c)) {
                return iter_row(counter_r + 1);
            } else {
                play_concurrently(list_ref(list_of_sounds, counter_r));
                return iter_row(counter_r + 1);
            }
        }

        return counter_c === 16
        ? iter_column(0)
        : iter_row(0);
    }

    return iter_column(0);
}
function stop_matrix() {
    return clear_all_timeout();
}

function generate_list_of_note(letter_name, list_of_interval) {
    const base_MIDI = letter_name_to_midi_note(letter_name);
    function iter(current, list) {
        return is_null(list)
        ? pair(current, null)
        : pair(current, iter(current + head(list), tail(list)));
    }
    return iter(base_MIDI, list_of_interval);
}

function repeated_scale(note, list_of_interval, n, duration, instrument) {
    const base_MIDI = letter_name_to_midi_note(note);
    const len = length(list_of_interval);
    function iter(counter) {
            return counter >= n 
            ? null
            : append(list_of_interval, iter(counter + 1));
        }
        
    const new_duration_list = iter(0);
    const new_sound_list = generate_list_of_note(note, new_duration_list);

    function create_each_sound(x) {
        return instrument(x, duration);
    }

    return map(create_each_sound, new_sound_list);
}

const pentatonic_list_of_interval = list(2, 2, 3, 2, 3);


const sounds = repeated_scale("C4", pentatonic_list_of_interval, 3, 0.2, cello);

play_matrix(0.5, sounds);



/*

function play_matrix(duration, list_of_sounds) {
    const matrix = get_matrix();
    const boolean_row = x => list_ref(matrix, x);
    display(list_ref(list_of_sounds, 3));
    function f(row) {
        const lst_row = boolean_row(row);
        display(is_boolean(list_ref(lst_row, 2)));
        function iter(counter) {
            const position_boolean = list_ref(lst_row, counter);
            display(position_boolean);
            return counter >= 16 
            ? null 
            : !position_boolean
            ? iter(counter + 1)
            : position_boolean
            ? pair(consecutively(list(silence_sound(counter * duration), list_ref(list_of_sounds, counter))), iter(counter + 1))
            : null;
        }
        
        return row >= 16
        ? null 
        : iter(0);
    }
    return f(0);
}
*/