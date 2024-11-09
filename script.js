document.getElementById("rootForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const expressionInput = document.getElementById("expression").value;
    const decimalPlaces = parseInt(document.getElementById("decimalPlaces").value);
    const resultElement = document.getElementById("result");

    try {
        // Wrap function in 'math.js' to handle user input parsing
        const math = window.math;
        const f = math.compile(expressionInput);
        const df = math.derivative(expressionInput, 'x');
        
        let x = 1; // Starting guess
        let iterationLimit = 100;
        let tolerance = Math.pow(10, -decimalPlaces);

        // Newton-Raphson method for root finding
        for (let i = 0; i < iterationLimit; i++) {
            const fx = f.evaluate({ x });
            const fpx = df.evaluate({ x });

            if (Math.abs(fx) < tolerance) {
                resultElement.innerHTML = `Root: ${x.toFixed(decimalPlaces)}`;
                return;
            }

            x = x - fx / fpx;
        }

        resultElement.innerHTML = "Could not find root within iteration limit";
    } catch (error) {
        resultElement.innerHTML = "Invalid input. Please enter a correct function.";
    }
});
