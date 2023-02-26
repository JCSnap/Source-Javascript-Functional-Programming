// Task 1

// Function type: Number -> pair_of_numbers
// where input is between 0 - 15 inclusive.
// where 0 - 9 represent the digits
// 10 represents *, 11 represents #,
// and 12 - 15 represent the letters A-D.

function get_dtmf_frequencies(number) {
    const hor = list(1209, 1336, 1477, 1633);
    const ver = list(697, 770, 852, 941);
    
    const dtmf_coords = list( // head: hor, tail: ver
        pair(1, 3),
        pair(0, 0),
        pair(1, 0),
        pair(2, 0),
        pair(0, 1),
        pair(1, 1),
        pair(2, 1),
        pair(0, 2),
        pair(1, 2),
        pair(2, 2),
        pair(0, 3),
        pair(2, 3),
        pair(3, 0),
        pair(3, 1),
        pair(3, 2),
        pair(3, 3)
        );
    
    const hor_coord = head(list_ref(dtmf_coords, number));
    const ver_coord = tail(list_ref(dtmf_coords, number));
    
    return pair(
        list_ref(ver, ver_coord),
        list_ref(hor, hor_coord)
        );
}

get_dtmf_frequencies(13);

// Task 2
function get_dtmf_frequencies(number) {
    const hor = list(1209, 1336, 1477, 1633);
    const ver = list(697, 770, 852, 941);
    
    const dtmf_coords = list( // head: hor, tail: ver
        pair(1, 3),
        pair(0, 0),
        pair(1, 0),
        pair(2, 0),
        pair(0, 1),
        pair(1, 1),
        pair(2, 1),
        pair(0, 2),
        pair(1, 2),
        pair(2, 2),
        pair(0, 3),
        pair(2, 3),
        pair(3, 0),
        pair(3, 1),
        pair(3, 2),
        pair(3, 3)
        );
    
    const hor_coord = head(list_ref(dtmf_coords, number));
    const ver_coord = tail(list_ref(dtmf_coords, number));
    
    return pair(
        list_ref(ver, ver_coord),
        list_ref(hor, hor_coord)
        );
}

function make_dtmf_tone(frequency_pair) {
    const time = 0.5;
    const sound_list = list(
        sine_sound(head(frequency_pair), time),
        sine_sound(tail(frequency_pair), time)
        );
    return simultaneously(sound_list);
}

play(make_dtmf_tone(pair(770, 1336)));

// Task 3

function get_dtmf_frequencies(number) {
    const hor = list(1209, 1336, 1477, 1633);
    const ver = list(697, 770, 852, 941);
    
    const dtmf_coords = list( // head: hor, tail: ver
        pair(1, 3),
        pair(0, 0),
        pair(1, 0),
        pair(2, 0),
        pair(0, 1),
        pair(1, 1),
        pair(2, 1),
        pair(0, 2),
        pair(1, 2),
        pair(2, 2),
        pair(0, 3),
        pair(2, 3),
        pair(3, 0),
        pair(3, 1),
        pair(3, 2),
        pair(3, 3)
        );
    
    const hor_coord = head(list_ref(dtmf_coords, number));
    const ver_coord = tail(list_ref(dtmf_coords, number));
    
    return pair(
        list_ref(ver, ver_coord),
        list_ref(hor, hor_coord)
        );
}

function make_dtmf_tone(frequency_pair) {
    const time = 0.5;
    const sound_list = list(
        sine_sound(head(frequency_pair), time),
        sine_sound(tail(frequency_pair), time)
        );
    return simultaneously(sound_list);
}

function dial(list_of_digits) {
    function tone(digit) {
        return consecutively(
            list(
                make_dtmf_tone(get_dtmf_frequencies(digit)), 
                silence_sound(0.1)
                )
            );
    }
    return consecutively(map(tone, list_of_digits));
}

// Test
play(dial(list(6,2,3,5,8,5,7,7)));

// Task 4

function get_dtmf_frequencies(number) {
    const hor = list(1209, 1336, 1477, 1633);
    const ver = list(697, 770, 852, 941);
    
    const dtmf_coords = list( // head: hor, tail: ver
        pair(1, 3),
        pair(0, 0),
        pair(1, 0),
        pair(2, 0),
        pair(0, 1),
        pair(1, 1),
        pair(2, 1),
        pair(0, 2),
        pair(1, 2),
        pair(2, 2),
        pair(0, 3),
        pair(2, 3),
        pair(3, 0),
        pair(3, 1),
        pair(3, 2),
        pair(3, 3)
        );
    
    const hor_coord = head(list_ref(dtmf_coords, number));
    const ver_coord = tail(list_ref(dtmf_coords, number));
    
    return pair(
        list_ref(ver, ver_coord),
        list_ref(hor, hor_coord)
        );
}

function make_dtmf_tone(frequency_pair) {
    const time = 0.5;
    const sound_list = list(
        sine_sound(head(frequency_pair), time),
        sine_sound(tail(frequency_pair), time)
        );
    return simultaneously(sound_list);
}

function dial(list_of_digits) {
    function tone(digit) {
        return consecutively(
            list(
                make_dtmf_tone(get_dtmf_frequencies(digit)), 
                silence_sound(0.1)
                )
            );
    }
    return consecutively(map(tone, list_of_digits));
}

function dial_all(list_of_numbers) {
    const safe_xs = filter(x => 
    list_to_string(x) !== "[1,[8,[0,[0,[5,[2,[1,[1,[9,[8,[0,null]]]]]]]]]]]",
    list_of_numbers); // same list but without dangerous number
    function dial_POTS(list_of_digits) {
        return consecutively(
        list(
            dial(list_of_digits), 
            make_dtmf_tone(get_dtmf_frequencies(11)), 
            silence_sound(0.1)
            ) 
        ); // return sound with # 
    }
    //return dial_POTS(list(1,8,0,0,5,2,1,1,9,8,0));
    return consecutively(map(dial_POTS, safe_xs));
}


// Test
play(dial_all(
  list(
      list(1,8,0,0,5,2,1,1,9,8,0),  // not played!!!
      list(6,2,3,5,8,5,7,7),
      list(0,0,8,6,1,3,7,7,0,9,5,0,0,6,1))
  )); 
  
