export const enforceNumeric = (input) => {
    let decimal = false;
    return parseFloat(
        input.split("").reduce((output, char) => {
            if (char === "-" && output.length < 1) {
                return (output += char);
            } else if (char === "." && !decimal) {
                decimal = !decimal;
                return output + char;
            } else if (!isNaN(char) && char != " ") {
                return output + char;
            } else {
                return output;
            }
        }, "")
    );
};
