function squareCalc (x1, y1, x2, y2) {

    let width = Math.abs(x1 - x2);
    let height = Math.abs(y1 - y2);

    let square = width * height

    console.log('Площадь прямоугольника равна', square)

}

function fractionalPart (a, b, n) {

    let fractA = Math.floor((a % 1) * Math.pow(10, n));
    let fractB = Math.floor((b % 1) * Math.pow(10, n)); 

    console.log('Сравнение чисел после запятой:')
    console.log(fractA > fractB);
    console.log(fractA < fractB);
    console.log(fractA >= fractB);
    console.log(fractA <= fractB);
    console.log(fractA === fractB);
    console.log(fractA != fractB);

}

function rand (n, m) {
    
    let range = m - n;
    if (n > m) {
        range = n - m
    }
    
    let first = Math.round(Math.random() * range);
    let second = Math.round(Math.random() * range);
    let min = Math.min(m, n);
    
    let a = min + first;
    let b = min + second;

    console.log('сравнение рандомных чисел:')
    console.log(a, b);
    console.log(a > b);
    console.log(a < b);
    console.log(a >= b);
    console.log(a <= b);
    console.log(a === b);
    console.log(a != b);
    
}

//Площадь
squareCalc(8, 1, 5, 1);

//Сравнение чисел после запятой
fractionalPart(13.123456789, 2.123, 5);

//Сравнение рандомных чисел
rand(-3, -10)