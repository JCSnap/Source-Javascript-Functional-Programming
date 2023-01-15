// Task 1

function partition(xs, p) {
    const less = list();
    const more = list();
    function helper(lst, list_less, list_more) {
        if (is_null(lst)) {
            return pair(list_less, list_more);
        } else if (head(lst) <= p) {
            return helper(tail(lst), 
                          append(list(head(lst)), list_less), 
                          list_more);
        } else {
            return helper(tail(lst), 
                          list_less, append(list(head(lst)), 
                          list_more));
        }
    }
    return helper(xs, less, more);
}

// Test
 const my_list = list(1, 2, 3, 4, 5, 6);
 partition(my_list, 4);

// Task 2

function partition(xs, p) {
    const less = list();
    const more = list();
    function helper(lst, list_less, list_more) {
        if (is_null(lst)) {
            return pair(list_less, list_more);
        } else if (head(lst) <= p) {
            return helper(tail(lst), 
                          append(list(head(lst)), list_less), 
                          list_more);
        } else {
            return helper(tail(lst), 
                          list_less, append(list(head(lst)), 
                          list_more));
        }
    }
    return helper(xs, less, more);
}

function quicksort(xs) {
    if (is_null(xs)) {
        return xs;
    } else if (is_null(tail(xs))) {
        return xs;
    } else {
        const part = partition(tail(xs), head(xs)); // isolate pivot
        return append( // append (less+mid) + more
            append(quicksort(head(part)), //append less + mid (pivot)
                   list(head(xs))),  // pivot slotted in between
            quicksort(tail(part))
            );
    }
}

// Test
const my_list = list(23, 12, 56, 92, -2, 0);
//const my_list = list(5, 4, 1, 8, 7, 6, 9, 3);
 quicksort(my_list);

