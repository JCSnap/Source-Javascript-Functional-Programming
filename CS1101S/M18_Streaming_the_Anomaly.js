// TASK 1

function array_to_stream(a) {
    const len = array_length(a);
    function iter(count) {
        if (count >= len) {
            return null;
        } else {
            return pair(a[count], () => iter(count + 1));
        }
    }
    return iter(0);
}


display(array_length(anomaly_data) === stream_length(array_to_stream(anomaly_data)));
display(anomaly_data[7] === stream_ref(array_to_stream(anomaly_data), 7));


// TASK 2

const FPS = 10;

function array_to_stream(a) {
    const len = array_length(a);
    function iter(count) {
        if (count >= len) {
            return null;
        } else {
            return pair(a[count], () => iter(count + 1));
        }
    }
    return iter(0);
}

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


install_filter(stream_to_filter(array_to_stream(anomaly_data)));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 3

const FPS = 10;

function array_to_stream(a) {
    const len = array_length(a);
    function iter(count) {
        if (count >= len) {
            return null;
        } else {
            return pair(a[count], () => iter(count + 1));
        }
    }
    return iter(0);
}

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

function loop(s) {
    function helper(original, next) {
        if (is_null(next)) {
            return helper(original, original);
        } else {
            return pair(head(next), () => helper(original, stream_tail(next)));
        }
    }
    return helper(s, s);
}


install_filter(
    stream_to_filter(
        loop(array_to_stream(anomaly_data))));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();

// TASK 4

const FPS = 10;

function array_to_stream(a) {
    const len = array_length(a);
    function iter(count) {
        if (count >= len) {
            return null;
        } else {
            return pair(a[count], () => iter(count + 1));
        }
    }
    return iter(0);
}

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

function loop(s) {
    function helper(original, next) {
        if (is_null(next)) {
            return helper(original, original);
        } else {
            return pair(head(next), () => helper(original, stream_tail(next)));
        }
    }
    return helper(s, s);
}

function time_lapse(s, n) {
    function helper(next, count) {
        if (count%n === 0) {
            return pair(head(next), 
                        () => helper(stream_tail(next), count + 1));
        } else {
            return helper(stream_tail(next), count + 1);
        }
    }
    return helper(s, 0);

}

install_filter(
    stream_to_filter(
        time_lapse(loop(array_to_stream(anomaly_data)),
                   3)));

set_dimensions(WIDTH, HEIGHT);
keep_aspect_ratio(true);
set_fps(FPS);
start();
