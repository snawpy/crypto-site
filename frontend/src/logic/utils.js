export function isEmailValid(email) {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}

export function formatNumberToFixedLocale(number) {
    return (
        number.toLocaleString(
            undefined, 
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
    );
} 