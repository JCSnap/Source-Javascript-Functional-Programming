function backward(sound) {
    return make_sound( t => 
                      get_wave(sound)(1 - t),
                      get_duration(sound)
                      );
}

//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(backward(my_voice()));          // step 3 in REPL

function repeat(n, sound) {
    return n === 0
    ? silence_sound(0)  // put this line just in case but seems like its already automatically accounted for
    : make_sound(t =>
                 get_wave(sound)(t % get_duration(sound)),
                 n * get_duration(sound)
                 );
}



// Test
const my_sound = consecutively(
    list(sine_sound(400, 1), sine_sound(800, 1)));
const my_repeated = repeat(0, my_sound);
play(my_repeated);

function fast_forward(n, sound) {
    return make_sound(t => 
                      get_wave(sound)(t * n),
                      get_duration(sound) / n
                      );
}


//                                      // step 0: press "Run"

// init_record();                       // step 1 in REPL

// const my_voice = record_for(2, 0.2); // step 2 in REPL

// play(fast_forward(2, my_voice()));   // step 3 in REPL

function echo(n, d, sound) {
    function wave_helper(t, wave, count) {
        return count > n
        ? 0
        : t >= d * count
          ? (1/math_pow(2, count))*(wave(t - d * count)) 
          + wave_helper(t, wave, count + 1)
          : 0;
    }
return make_sound(t =>
                  get_wave(sound)(t) + wave_helper(t, get_wave(sound), 1),
                  get_duration(sound) + d * n
                  );
}


// Test
const test_sound = sine_sound(800, 0.2);
play(echo(2, 1, test_sound)); 

function backward(sound) {
    return make_sound( t => 
                      get_wave(sound)(1 - t),
                      get_duration(sound)
                      );
}

function repeat(n, sound) {
    return n === 0
    ? silence_sound(0)  // put this line just in case but seems like its already automatically accounted for
    : make_sound(t =>
                 get_wave(sound)(t % get_duration(sound)),
                 n * get_duration(sound)
                 );
}

function fast_forward(n, sound) {
    return make_sound(t => 
                      get_wave(sound)(t * n),
                      get_duration(sound) / n
                      );
}

function echo(n, d, sound) {
    function wave_helper(t, wave, count) {
        return count > n
        ? 0
        : t >= d * count
          ? (1/math_pow(2, count))*(wave(t - d * count)) 
          + wave_helper(t, wave, count + 1)
          : 0;
    }
return make_sound(t =>
                  get_wave(sound)(t) + wave_helper(t, get_wave(sound), 1),
                  get_duration(sound) + d * n
                  );
}

function make_alien_jukebox(sound) {
    const s_original = sound;
    const s_backward = backward(sound);
    const s_half = fast_forward(1 / 2, sound);
    const s_twice = repeat(3, fast_forward(2, sound));
    const s_backward_delay = echo(4, 0.3, backward(sound));
    
    const sound_list = list(
                            s_original,
                            s_backward,
                            s_half,
                            s_twice,
                            s_backward_delay
                            );

  return n => play(list_ref(sound_list, n));
}

const j = make_alien_jukebox(sine_sound(500, 0.5));

j(3);
// Press "Run"

// Then test in REPL:

// init_record();

// const erksh_voice = record_for(1, 0.2);

// const j = make_alien_jukebox(erksh_voice());

// j(0);  // plays original recording

// j(1);  // plays it backward

// j(2);  // plays it at half speed

// j(3);  // plays it at double speed, three times in a row

// j(4);  // plays it backward with 4-times echo,
//        //     with 0.3 seconds echo delay