document.addEventListener("DOMContentLoaded", () => {

  let dailyCalorieIntake = 0;

  const form = document.getElementById("calorieForm");
  const dailyResult = document.getElementById("dailyResult");
  const bmiResult = document.getElementById("bmiResult");
  const macroResults = document.getElementById("macroResults");
  const darkToggle = document.getElementById("darkToggle");

  /* ---------------- DARK MODE ---------------- */
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  /* ---------------- CALCULATE ---------------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const age = +document.getElementById("age").value;
    const weight = +document.getElementById("weight").value;
    const height = +document.getElementById("heightCm").value;
    const genderInput = document.querySelector('input[name="gender"]:checked');

    if (!genderInput) {
      alert("Please select gender");
      return;
    }

    const gender = genderInput.value;
    const activity = document.getElementById("activity").value;

    /* ---- BMR Formula (Mifflin-St Jeor) ---- */
    const bmr = gender === "male"
      ? (10 * weight + 6.25 * height - 5 * age + 5)
      : (10 * weight + 6.25 * height - 5 * age - 161);

    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      very_active: 1.9
    };

    dailyCalorieIntake = Math.round(bmr * multipliers[activity]);

    dailyResult.innerHTML =
      `Daily Calorie Goal: <strong>${dailyCalorieIntake} kcal</strong>`;

    /* ---- BMI ---- */
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 24.9) category = "Normal";
    else if (bmi < 29.9) category = "Overweight";
    else category = "Obese";

    bmiResult.innerHTML =
      `BMI: <strong>${bmi}</strong> (${category})`;

    calculateMacros();
  });

  /* ---------------- MACRO BREAKDOWN ---------------- */
  function calculateMacros() {

    if (!dailyCalorieIntake) return;
    
    const carbs = Math.round((dailyCalorieIntake * 0.5) / 4);
    const protein = Math.round((dailyCalorieIntake * 0.25) / 4);
    const fats = Math.round((dailyCalorieIntake * 0.25) / 9);

    macroResults.innerHTML = `
      Carbs: ${carbs}g (50%) |
      Protein: ${protein}g (25%) |
      Fats: ${fats}g (25%)
    `;

    document.getElementById("carbBar").style.width = "50%";
    document.getElementById("carbBar").textContent = "Carbs 50%";

    document.getElementById("proteinBar").style.width = "25%";
    document.getElementById("proteinBar").textContent = "Protein 25%";

    document.getElementById("fatBar").style.width = "25%";
    document.getElementById("fatBar").textContent = "Fats 25%";
  }

  /* ---------------- WORKOUT BURN CALCULATOR ---------------- */
  document.getElementById("calculateBurn").addEventListener("click", () => {

    const rate = +document.getElementById("workoutType").value;
    const minutes = +document.getElementById("workoutMinutes").value;

    if (!minutes || minutes <= 0) {
      alert("Enter valid workout duration");
      return;
    }

    const burned = rate * minutes;

    document.getElementById("burnResult").innerHTML =
      `You burned approximately <strong>${burned} kcal</strong>`;
  });

});
