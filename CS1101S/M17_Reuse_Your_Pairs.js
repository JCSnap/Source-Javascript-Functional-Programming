// TASK 1

function d_split_list(xs) {
    const mid = math_floor((length(xs) + 1) / 2);
    let cur1 = xs;
    for (let i = 0; i < mid - 1; i = i + 1) {
        cur1 = tail(cur1);
    }
    const first_half = cur1;
    const second_half = tail(cur1);
    set_tail(cur1, null);
    return pair(xs, second_half);
}
//const my_list1 = list(4, 5, 6, 3, 2, 1);
const my_list2 = list(4, 5, 6, 3, 2);
//d_split_list(my_list1);
 d_split_list(my_list2);

// TASK 2

function d_merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else if (head(xs) < head(ys)) {
        set_tail(xs, d_merge(tail(xs), ys));
        return xs;
    } else {
        set_tail(ys, d_merge(tail(ys), xs));
        return ys;
    }
}

// TEST:
const my_list1 = list(2, 4, 5, 9);
const my_list2 = list(3, 5, 8);
 d_merge(my_list1, my_list2);

// TASK 3

function d_split_list(xs) {
    const mid = math_floor((length(xs) + 1) / 2);
    let cur1 = xs;
    for (let i = 0; i < mid - 1; i = i + 1) {
        cur1 = tail(cur1);
    }
    const first_half = cur1;
    const second_half = tail(cur1);
    set_tail(cur1, null);
    return pair(xs, second_half);
}

function d_merge(xs, ys) {
    if (is_null(xs)) {
        return ys;
    } else if (is_null(ys)) {
        return xs;
    } else if (head(xs) < head(ys)) {
        set_tail(xs, d_merge(tail(xs), ys));
        return xs;
    } else {
        set_tail(ys, d_merge(tail(ys), xs));
        return ys;
    }
}


function d_merge_sort(xs) {
    if (is_null(xs) || is_null(tail(xs))) {
        return xs;
    } else {
        let L_pair = d_split_list(xs);
        return d_merge(d_merge_sort(head(L_pair)), d_merge_sort(tail(L_pair)));
    }
    

}

// TEST:
// const my_list = list(7, 2, 4, 6, 9, 1, 5, 8, 3, 6);
// d_merge_sort(my_list);