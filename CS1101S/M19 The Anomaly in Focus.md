// TASK 1
// with streamp_map
function red_rectangle_stream(s) {
    function f(cur) {
        let min_r = HEIGHT;
        let min_c = WIDTH;
        let max_r = 0;
        let max_c = 0;
        function is_red(x) {
            return (x[0] === 255) && (x[1] === 0) && (x[2] === 0);
        }
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                let val = cur[i][j];
                if (is_red(val)) {
                    if (i > max_r) {
                        max_r = i;
                    } 
                    if (i < min_r) {
                        min_r = i;
                    }
                    if (j > max_c) {
                        max_c = j;
                    } 
                    if (j < min_c) {
                        min_c = j;
                    }
                }
            }
        }
        let upL_r = min_r;
        let upL_c = min_c;
        let loR_r = max_r;
        let loR_c = max_c;
        return pair(pair(upL_r, upL_c), pair(loR_r, loR_c));
    }
    return stream_map(f, s);
}
// without stream_map
function red_rectangle_stream2(s) {
    function helper(next) {
        let cur = head(next);
        let min_r = HEIGHT;
        let min_c = WIDTH;
        let max_r = 0;
        let max_c = 0;
        function is_red(x) {
            return (x[0] === 255) && (x[1] === 0) && (x[2] === 0);
        }
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                let val = cur[i][j];
                if (is_red(val)) {
                    if (i > max_r) {
                        max_r = i;
                    } 
                    if (i < min_r) {
                        min_r = i;
                    }
                    if (j > max_c) {
                        max_c = j;
                    } 
                    if (j < min_c) {
                        min_c = j;
                    }
                }
            }
        }
        let upL_r = min_r;
        let upL_c = min_c;
        let loR_r = max_r;
        let loR_c = max_c;
        return pair(pair(pair(upL_r, upL_c), pair(loR_r, loR_c)),
                                    () => helper(stream_tail(next)));
    }
    return helper(s);

}

 head(red_rectangle_stream(anomaly_stream));
// should evaluate to: [[141, 191], [159, 209]]

// TASK 2
 import { alpha_of, blue_of, compose_filter, copy_image, get_video_time, green_of, image_height, image_width, install_filter, keep_aspect_ratio, pause_at, red_of, reset_filter, set_dimensions, set_fps, set_loop_count, set_rgba, set_volume, start, use_image_url, use_local_file } from "pix_n_flix";
// for troubleshooting purposes
function stream_to_filter(s) {
    const len = array_length(s);
    const width = image_width();
    const height = image_height();
    return (src, dest) => {
        if (is_null(stream_tail(s))) {
            dest = head(s);
        } else {
            copy_image(head(s), dest);
            install_filter(stream_to_filter(stream_tail(s)));
        }
    };
}
function red_rectangle_stream(s) {
    function f(cur) {
        let min_r = HEIGHT;
        let min_c = WIDTH;
        let max_r = 0;
        let max_c = 0;
        function is_red(x) {
            return (x[0] === 255) && (x[1] === 0) && (x[2] === 0);
        }
        for (let i = 0; i < HEIGHT; i = i + 1) {
            for (let j = 0; j < WIDTH; j = j + 1) {
                let val = cur[i][j];
                if (is_red(val)) {
                    if (i > max_r) {
                        max_r = i;
                    } 
                    if (i < min_r) {
                        min_r = i;
                    }
                    if (j > max_c) {
                        max_c = j;
                    } 
                    if (j < min_c) {
                        min_c = j;
                    }
                }
            }
        }
        let upL_r = min_r;
        let upL_c = min_c;
        let loR_r = max_r;
        let loR_c = max_c;
        return pair(pair(upL_r, upL_c), pair(loR_r, loR_c));
    }
    return stream_map(f, s);
}


function stream_combine(f, s1, s2) {
    let min_r = HEIGHT;
    let min_c = WIDTH;
    let cur1 = head(s1);
    let cur2 = head(s2);
    return pair(f(cur1, cur2), () => stream_combine(f, stream_tail(s1), stream_tail(s2)));
}


// Trim the given image using the given rectangle.
// Returns an image that includes all purely red
// pixels of the given image.

function trim(image, rectangle) {
    const trimmed = [];
    const i_min = head(head(rectangle));
    const j_min = tail(head(rectangle));
    const i_max = head(tail(rectangle));
    const j_max = tail(tail(rectangle));

    for (let i = i_min; i <= i_max; i = i + 1) {
        const new_i = i - i_min;
        trimmed[new_i] = [];
        for (let j = j_min; j <= j_max; j = j + 1) {
            const new_j = j - j_min;
            trimmed[new_i][new_j] = image[i][j];
        }
    }
    return trimmed;
}

// Example:

const focused_stream = stream_combine(
                           trim,
                           anomaly_stream,
                           red_rectangle_stream(anomaly_stream));

head(focused_stream);
install_filter(stream_to_filter(focused_stream)); // comment all the lines below this (inclusive of this line) to see the head
set_dimensions(19, 19);
keep_aspect_ratio(true);
set_fps(1);
start();
//Should return a close-up of the anomaly, a 19x19 image of black,
// red and white pixels.

// Use your solutions of the previous tasks and
// write other functions HERE that might be helpful
// to answer the questions in this task.
/*function zoom(factor) {
    function helper(src, dest) {
        const width = image_width();
        const height = image_height();
        let centreW = math_floor(width/2);
        let centreH = math_floor(height/2);
        let startH = centreH - math_floor(height/(2*factor));
        let startW = centreW - math_floor(width/(2*factor));
        function transform(x, dim) {
            if (dim === 1) {
                return startH + math_floor(x/factor);
            } else {
                return startW + math_floor(x/factor);
            }
        }
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
                let newi = transform(i, 1);
                let newj = transform(j, 2);
                dest[i][j][0] = src[newi][newj][0];
                dest[i][j][1] = src[newi][newj][1];
                dest[i][j][2] = src[newi][newj][2];
                dest[i][j][3] = src[newi][newj][3];
            }
        }
    }
    return helper;
}*/

/*
Q1: What color it might absorb?
ANS: It might absorb green. Even though the shielf of the anomaly appear 
white to the naked eye, after zooming in we can see some whittish yellow 
for a brief moment. If it is yellow, it means that it is reflecting green 
and red, and reflecting less blue. This means that it is absorbing a large 
proportion of the blue.


Q2: What color of laser beam would you use?
ANS: I would use blue. Since it is not reflecting a lot of blue, it is 
absorbing a lot of blue. This means that it is abosorbing the electromagnetic
radiation of blue lightwaves. Thus by using a blue laser, we can transfer a
large amount of energy to the shield without it being reflected away. This will
cause maximum damage to the shield due to the larger amount of energy absorbed.


Q3: Which part of the shield would you target?
ANS: I would target the centre of the shield. This is where it appears to be more
"yellowish", while the rest of the shield appear white. Thus if I target any point
away from the centre, there is a large likelyhood that the laser would not be 
effective as white implies that it reflects red blue and green, and would reflect
the blue laser. The centre is the vulnerable part due to it absorbing blue.


Q4: How did you find the answer?
ANS: I found it by applying the zoom function into the anomaly result, by doing
so, I thus noticed the yellow portion of the shield that would otherwise appear 
white to the naked eye.

*/