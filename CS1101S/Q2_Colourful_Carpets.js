function besiden(n, rune) {
    return n === 1
           ? rune
           : beside_frac(1 / n, rune,
                        besiden(n - 1, rune));
}

// Test
show(besiden(7, heart));

function besiden(n, rune) {
    return n === 1
           ? rune
           : beside_frac(1 / n, rune,
                        besiden(n - 1, rune));
}

// n: column, m: row
function carpet(n, m, rune) {
    return stackn(m, besiden(n, rune));
}
// Test
show(carpet(7, 5, heart));

/*
Enter your answers here
(answer each question in one or two complete sentences):


(a) She will get a 10x10 patchwork with uniform colour (each heart will
have the same colour as others) but every time she runs the programme,
she would get a random colour for the whole set of hearts


(b) Source uses applicative order reduction. Thus the innermost function
is evaluated first and moves outwards. The function "random_color(heart)" 
is thus evaluated first and returns a rune "heart" with a fixed colour. 
This rune of fixed colour would then be used as input for the functions 
besiden and stackn, thus creating a 10x10 patchwork of uniform colour.


(c) A normal order reduction "delay evaluation of procedure function
arguments until the actual argument values are needed." (Source: 
https://sicp.sourceacademy.org/chapters/4.2.1.html)

This entails that when the function carpet is called, it uses the
the function "random_colour(heart)" as input. After which stackn, 
and subsequently besiden function would be evaluated first. The function
"random_colour(heart)" will only be evaluated. Only when the function
besiden calls for random_color(heart) to be added to the row will the
function random_color(heart) be evaluated. Since the functions stackn and
besiden are carried out independently multiple times, the result of the
function random_color(heart) would produce a different result, thus creating
the desired result with each individual heart having a randomly generated 
colour independent of another.
*/

// n = number of columns
// m = number of rows

function randomize_heart(n, rune) {
    return n===1
    ? random_color(rune)
    : beside_frac(1/(n),
    random_color(rune),
    randomize_heart(n-1, rune));
}

function randomly_colored_carpet(n, m, rune) {
    return m===1
    ? randomize_heart(n, rune)
    : stack_frac(1/(m),
    randomize_heart(n, rune),
    randomly_colored_carpet(n, m-1, rune));
}

show(randomly_colored_carpet(10, 10, heart));

