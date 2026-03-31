// script.js

let password = document.getElementById("password");
let power = document.getElementById("power-point");
let strengthText = document.getElementById("strength-text"); // optional

password.addEventListener("input", function () {

    let value = password.value;
    let point = 0;

    // Strength levels
    let widthPower = ["0%", "25%", "50%", "75%", "100%"];
    let colorPower = ["#D73F40", "#DC6551", "#F2B84F", "#BDE952", "#3ba62f"];
    let textPower = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];

    // ✅ Rule 1: any input
    if (value.length > 0) {
        point++;
    }

    // ✅ Rule 2: length >= 6
    if (value.length >= 6) {
        point++;
    }

    // ✅ Rule 3: contains number
    if (/[0-9]/.test(value)) {
        point++;
    }

    // ✅ Rule 4: contains both lowercase & uppercase
    if (/[a-z]/.test(value) && /[A-Z]/.test(value)) {
        point++;
    }

    // ✅ Rule 5: contains special character
    if (/[^0-9a-zA-Z]/.test(value)) {
        point++;
    }

    // Limit to max index (0–4)
    point = Math.min(point, 4);

    // Apply styles
    power.style.width = widthPower[point];
    power.style.backgroundColor = colorPower[point];

    // Optional: show strength text
    if (strengthText) {
        strengthText.textContent = textPower[point];
        strengthText.style.color = colorPower[point];
    }
});