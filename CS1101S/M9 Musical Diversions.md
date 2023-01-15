const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
    return drum_envelope(make_sound(
        get_wave(noise_sound(duration)),
        duration
        ));
}


function bass_drum(note, duration) {
    const prime = list(79, 83, 89, 97, 101, 103, 107, 
    109, 113, 127, 131, 137, 139, 149);
    function aharmonic(x) {
        
        return make_sound(
            get_wave(sine_sound(x, duration)),
            duration
            );
    }
    
    return simultaneously(map(aharmonic, prime));
}

function mute(note, duration) {
    return silence_sound(duration);
} 

// Test

//play(bass_drum(50, 0.3));

play(consecutively(list(snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2),
                        mute(0, 0.2),
                        snare_drum(50, 0.2), mute(0, 0.2), bass_drum(50, 0.2))));

function generate_list_of_note(letter_name, list_of_interval) {
    const base_MIDI = letter_name_to_midi_note(letter_name);
    function iter(current, list) {
        return is_null(list)
        ? pair(current, null)
        : pair(current, iter(current + head(list), tail(list)));
    }
    return iter(base_MIDI, list_of_interval);
}



const major_scale_interval = list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2);
const c_major_scale = generate_list_of_note("C4", major_scale_interval);

// display(c_major_scale);

function list_to_sound(list_of_midi_note, duration, instrument) {
    function apply_instrument(MIDI_note) {
        return instrument(MIDI_note, duration);
    } 
    return consecutively(map(apply_instrument, list_of_midi_note));
}

const c_major_scale_sound = list_to_sound(c_major_scale, 0.4, cello);
// play(c_major_scale_sound);

const harmonic_minor_scale_interval = list(2, 1, 2, 2, 1, 3, 1, -1, -3, -1, -2, -2, -1, -2);

const melodic_minor_scale_interval = list(2, 1, 2, 2, 2, 2, 1, -2, -2, -1, -2, -2, -1, -2);


const c_harmonic_minor_scale = generate_list_of_note("C4", harmonic_minor_scale_interval);

const c_harmonic_minor_scale_sound = list_to_sound(c_harmonic_minor_scale, 0.4, cello);
play(c_harmonic_minor_scale_sound);

const c_melodic_minor_scale = generate_list_of_note("C4", melodic_minor_scale_interval);
const c_melodic_minor_scale_sound = list_to_sound(c_melodic_minor_scale, 0.4, cello);
play(c_melodic_minor_scale_sound);

generate_list_of_note("C4", list(2, 2, 1, 2, 2, 2, 1, -1, -2, -2, -2, -1, -2, -2));

function generate_list_of_note(letter_name, list_of_interval) {
    const base_MIDI = letter_name_to_midi_note(letter_name);
    function iter(current, list) {
        return is_null(list)
        ? pair(current, null)
        : pair(current, iter(current + head(list), tail(list)));
    }
    return iter(base_MIDI, list_of_interval);
}

function list_to_sound(list_of_midi_note, duration, instrument) {
    function apply_instrument(MIDI_note) {
        return instrument(MIDI_note, duration);
    } 
    return consecutively(map(apply_instrument, list_of_midi_note));
}


const major_arpeggio_interval = list(4, 3, 5, 4, 3, 5);
const minor_arpeggio_interval = list(3, 4, 5, 3, 4, 5);

function generate_arpeggio(letter_name, list_of_interval) {
    return generate_list_of_note(letter_name, list_of_interval);
}

generate_arpeggio("C4", major_arpeggio_interval);


function arpeggiator_up(arpeggio, duration_each, instrument) {
    function apply_instrument(MIDI_note) {
        return instrument(MIDI_note, duration_each);
    }
    function sawtooth(xs) {
        const len = length(xs);
        function tooth(x) {
            return pair(list_ref(xs, x), 
            (pair(list_ref(xs, x+1), 
            (pair(list_ref(xs, x+2),
            (pair
            (list_ref(xs, x+3), null)))))));
        }
        function iter(f, counter) {
            return counter > len - 4
            ? null 
            : append(f(counter), iter(f, counter+1));
        }
        display(iter(tooth, 0));
        return iter(tooth, 0);
    }
    const new_list = sawtooth(arpeggio);
    return consecutively(map(apply_instrument, new_list));
}

// Test
play(arpeggiator_up(generate_arpeggio("C4", major_arpeggio_interval), 0.1, cello));

function simplify_rhythm(rhythm) {
    function simplify_pair(pair, n) {
        return n === 0
        ? null 
        : append(simplify_rhythm(head(rhythm)), simplify_pair(rhythm, n-1));
    }
    if (is_null(rhythm)) {
        return null;
    } else if (is_list(rhythm)) {
        return append(simplify_rhythm(head(rhythm)), simplify_rhythm(tail(rhythm)));
    } else if (is_pair(rhythm)) {
        return simplify_pair(rhythm, tail(rhythm));
    }  else {
        return list(rhythm);
    }
}

// Test
const my_rhythm = pair(list(pair(list(1,2,0,1), 2), list(1,3,0,1,3,1,0,3)), 3);
const my_simple_rhythm = simplify_rhythm(my_rhythm);
display_list(my_simple_rhythm);

const correct_simple_rhythm = list(1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,
        2,0,1,1,3,0,1,3,1,0,3,1,2,0,1,1,2,0,1,1,3,0,1,3,1,0,3);
equal(my_simple_rhythm, correct_simple_rhythm);

const drum_envelope = adsr(0.05, 0.95, 0, 0);

function snare_drum(note, duration) {
    return drum_envelope(make_sound(
        get_wave(noise_sound(duration)),
        duration
        ));
}

function mute(note, duration) {
    return silence_sound(duration);
} 

function simplify_rhythm(rhythm) {
    function simplify_pair(pair, n) {
        return n === 0
        ? null 
        : append(simplify_rhythm(head(rhythm)), simplify_pair(rhythm, n-1));
    }
    if (is_null(rhythm)) {
        return null;
    } else if (is_list(rhythm)) {
        return append(simplify_rhythm(head(rhythm)), simplify_rhythm(tail(rhythm)));
    } else if (is_pair(rhythm)) {
        return simplify_pair(rhythm, tail(rhythm));
    }  else {
        return list(rhythm);
    }
}

function percussions(distance, list_of_sounds, rhythm) {
    const new_rhythm = simplify_rhythm(rhythm);
    const len = length(rhythm);
    const position = x => list_ref(new_rhythm, x);
    return simultaneously(build_list(n =>
        consecutively(
            list(silence_sound(n * distance), 
                 list_ref(list_of_sounds, position(n)))
            ),
            len));
}

// Test
const my_mute_sound = mute(50, 0.7);
const my_snare_drum = snare_drum(50, 0.7);
const my_cello = cello(50, 0.7);
const my_bell = bell(72, 1);
play(percussions(0.5,
         list(my_mute_sound,
              my_snare_drum,
              my_cello,
              my_bell),
         list(1,2,1,0,3,1,0)));