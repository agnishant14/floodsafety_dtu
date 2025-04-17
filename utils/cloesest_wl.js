export function findClosestNumber(target, numbers) {
    console.log({numbers});
    if (numbers.length === 0) {
        return null;
    }

    let closestNumber = numbers[0];
    let minDifference = Math.abs(target - closestNumber);


    for (let i = 1; i < numbers.length; i++) {
        const currentNumber = numbers[i];
        const currentDifference = Math.abs(target - currentNumber);

        if (currentDifference < minDifference) {
            closestNumber = currentNumber;
            minDifference = currentDifference;
        }
    }

    return closestNumber;
}


