function add(numbers) {
    if (!numbers) {
        return 0;
    }

    let splitNumber = ",";

    if (numbers.startsWith("//")) {
        [splitNumber, numbers] = numberParser(numbers);
    }

    numbers = numbers.replace(/\n/g, splitNumber);
    
    const numberList = numbers.split(splitNumber);

    return sumNumbers(numberList);
}

function numberParser(numbers) {
    const lineIndex = numbers.indexOf("\n");
    const splittedNumber = numbers.substring(2, lineIndex);
    numbers = numbers.substring(lineIndex + 1); 
    return [splittedNumber, numbers];
}

function sumNumbers(numberList) {
    let total = 0;
    const negatives = [];

    for (let number of numberList) {
        const num = parseInt(number, 10);
        if (num < 0) {
            negatives.push(num);
        }
        total += num;
    }

    if (negatives.length > 0) {
        throw new Error(`negative numbers not allowed: ${negatives.join(', ')}`);
    }

    return total;
}

// Testing the functions
console.log(add("")); // 0
console.log(add("1")); // 1
console.log(add("1,5")); // 6
console.log(add("1\n2,3")); // 6
console.log(add("//;\n1;2")); // 3

try {
    console.log(add("1,-2,3")); // This will throw an error
} catch (e) {
    console.log(e.message); // "negative numbers not allowed: -2"
}