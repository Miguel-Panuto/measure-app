export const max = (numbers: [number]) => {
    let max = 0;
    numbers.forEach(el => {
        if(el > max) {
            max = el;
        }
    });

    return max;
}

export const min = (numbers: [number]) => {
    let min = max(numbers);
    numbers.forEach(el => {
        if(el < min)
            min = el;
    });

    return min;
}

export const average = (numbers: [number]) => {
    let avg = 0;
    numbers.forEach(el => {
        avg += (el/numbers.length);
    });

    return avg;
}