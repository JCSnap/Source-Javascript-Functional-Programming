// TASK 1

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

// Any helper functions and constants go here.

let begin = true;
let red_threshold = 250; // how sensitive in detecting red?
let speed_threshold = 100; // how sensitive in detecting movement?
let color_change_threshold = 100;
let old_min_i = Infinity;
let old_min_j = Infinity;
let old_max_i = 0;
let old_max_j = 0;

function is_red(x) {
    return x >= red_threshold;
}    

function has_moved(cur, prev) {
    let difference = 0;
    let dif_red = math_abs(cur[0] - prev[0]);
    let dif_green = math_abs(cur[1] - prev[1]);
    let dif_blue = math_abs(cur[2] - prev[2]);
    difference = dif_red + dif_blue + dif_green;
    return difference > color_change_threshold;
    
}

function stellar_motion_detector(src, dest) {
    const width = image_width();
    const height = image_height();
    if (begin) {
        copy_image(src, dest);
        begin = false;
    } else {
        let min_i = height;
        let max_i = 0;
        let min_j = width;
        let max_j = 0;
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < width; j = j + 1) {
                let r = src[i][j][0];
                let cond = is_red(r);
                if (cond) {
                    let moved_bool = has_moved(src[i][j], dest[i][j]);
                    if (moved_bool) {
                        if (i < min_i) {min_i = i;}
                        if (i > max_i) {max_i = i;}
                        if (j < min_j) {min_j = j;}
                        if (j > max_j) {max_j = j;}
                    }
                }
            }
        }
        copy_image(src, dest);
        let min_bool = (min_i < height) && (min_j < width);
        let max_bool = (max_i > 0) && (max_j > 0);
        if (min_bool && max_bool) {
            let difference_box = math_abs(min_i - old_min_i) 
            + math_abs(min_j - old_min_j)
            + math_abs(max_i - old_max_i)
            + math_abs(max_j - old_max_j);
            if (difference_box > speed_threshold) {
                for (let i = min_i; i < max_i; i = i + 1) {
                    for (let j = min_j; j < max_j; j = j + 1) {
                        dest[i][j][2] = 255;
                    }
                }
            }
            old_min_i = min_i;
            old_min_j = min_j;
            old_max_i = max_i;
            old_max_j = max_j;
        }
    }
    
}

install_filter(stellar_motion_detector);

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();