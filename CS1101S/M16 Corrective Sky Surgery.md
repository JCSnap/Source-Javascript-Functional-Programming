// TASK 1

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function my_first_filter(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let y = 0; y < height; y = y + 1) {
        for (let x = 0; x < width; x = x + 1) {
            dest[y][x][0] = y/height * 255;
            dest[y][x][1] = x/width * 255; 
            dest[y][x][2] = (0.5 * (height - y)/height 
            + 0.5 * (width - x)/width) * 255;
            dest[y][x][3] = 255;                
        }
    }
}

install_filter(my_first_filter);
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 2

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function copy(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
           dest[i][j][0] = src[i][j][0];
           dest[i][j][1] = src[i][j][1];
           dest[i][j][2] = src[i][j][2];
           dest[i][j][3] = src[i][j][3];
        }
    }
}

function crosshair(src, dest) {
    copy(src, dest);
    const width = image_width();
    const height = image_height();
    let centreW = math_floor(width/2);
    let centreH = math_floor(height/2);
    const sq = x => x * x;
    const ab = x => x < 0? -x: x;
    function cond(x) {
        //return x>=25&&x<=50 || x>=75&&x<=100 || x>=125&&x<=150 ||
        //x>=175&&x<=200 || x>=225&&x<=250;
        return (math_floor((x/25) % 2) !== 0);
    }
    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            let radius = math_floor(math_sqrt(
                sq(ab(centreW - j)) + sq(ab(centreH - i)))
                );
           if (cond(radius)) {
               dest[i][j][2] = 255;
           }
           
        }
    }
    // red lines
    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
           if (i === height/2 || j === width/2) {
               dest[i][j][0] = 255;
           } 
        }
    }

}

install_filter(copy);
install_filter(crosshair);  // use this filter when crosshair function is ready.
set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 3

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;



function zoom(factor) {
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
}

install_filter(zoom(2));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 4

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function flip_vertically(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[height - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1){
        for (let j = 0; j < width; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }
        }
    }
}


function zoom(factor) {
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
}


function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function stack(filter1, filter2) {
    const temp1 = make_image(WIDTH, HEIGHT);
    const temp2 = make_image(WIDTH, HEIGHT);

    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const half_height = math_floor(height / 2);

        filter1(src, temp1);
        filter2(src, temp2);

        for (let i = 0; i < half_height; i = i + 1) {
            dest[i] = temp1[i * 2];
            dest[i + half_height] = temp2[i * 2];
        }

        // take last row from temp2, if height is odd
        for (let i = half_height * 2; i < height; i = i + 1) {
            dest[i] = temp2[i];
        }
    };
}

function beside(filter1, filter2) {
    const tempA = make_image(WIDTH, HEIGHT);
    const tempB = make_image(WIDTH, HEIGHT);
    return (src, dest) => {
        const width = image_width();
        const height = image_height();
        const half_width = math_floor(width / 2);
        
        filter1(src, tempA);
        filter2(src, tempB);
        for (let i = 0; i < height; i = i + 1) {
            for (let j = 0; j < half_width; j = j + 1) {
            dest[i][j] = tempA[i][j * 2];
            dest[i][j + half_width] = tempB[i][j * 2];
            }
            for (let j = half_width * 2; j < width; j = j + 1) {
            dest[i][j] = tempB[i][j];
            }
        }
        
    };
}
install_filter(stack(beside(flip_vertically, color_invert),
                     beside(copy_image, zoom(2))));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 5

const WIDTH = 400;
const HEIGHT = 300;
const FPS = 15;

function flip_vertically(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1) {
        for (let j = 0; j < width; j = j + 1) {
            for (let k = 0; k < 4; k = k + 1) {
                dest[i][j][k] = src[height - 1 - i][j][k];
            }
        }
    }
}

function color_invert(src, dest) {
    const width = image_width();
    const height = image_height();

    for (let i = 0; i < height; i = i + 1){
        for (let j = 0; j < width; j = j + 1){
            for (let c = 0; c < 4; c = c + 1) {
                dest[i][j][c] = c < 3 ? 255 - src[i][j][c] : src[i][j][c];
            }
        }
    }
}

function make_image(width, height) {
    const img = [];
    for (let i = 0; i < height; i = i + 1) {
        const row = [];
        img[i] = row;
        for (let j = 0; j < width; j = j + 1) {
            const pixel = [];
            row[j] = pixel;
            for (let z = 0; z < 4; z = z + 1) {
                pixel[z] = 255;
            }
        }
    }
    return img;
}

function compose(filter1, filter2) {
    return (src, dest) => {
        const temp = make_image(WIDTH, HEIGHT);
        filter1(src, temp);
        return filter2(temp, dest);
    };
}

install_filter(compose( flip_vertically, color_invert));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
