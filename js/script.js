//Variables 
const sexSwitcher = document.querySelector('.switcher');
//Parametrs inputs
const groupInputs = document.querySelectorAll('input[type="text"]');
//Radio
const radiosGroup = document.querySelector('.radios-group');
//Buttons
const calculateBtn = document.querySelector('.form__submit-button');
const formResetBtn = document.querySelector('.form__reset-button');

const counterResult = document.querySelector('.counter__result');

const coefsActivity = {
    min: 1.2,
    low: 1.375,
    medium: 1.55,
    high: 1.1725,
    max: 1.9,
};

//Functions
const checkAllInputs = (groupInputs) => {
    const paramInputs = 3;
    let filledInputs = 0;
    for(let i = 0; i < groupInputs.length; i++) {
        if(groupInputs[i].value == "" || groupInputs[i] == "0") {
            deactivateCalculateBtn();
        } else {
            activateResetBtn();
            filledInputs++
        }
    }
    if(filledInputs === paramInputs) {
        activateCalculateBtn();
    } else if(filledInputs === 0) {
        deactivateResetBtn();
    }
    else {
        deactivateCalculateBtn();
    }
};

const deactivateResetBtn = () => {
    formResetBtn.disabled = true;
};

const activateResetBtn = () => {
    formResetBtn.disabled = false;
};

const deactivateCalculateBtn = () => {
    calculateBtn.disabled = true;
};

const activateCalculateBtn = () => {
   calculateBtn.disabled = false;
};

const hideCounter = () => {
    counterResult.classList.add('counter__result--hidden');
    deactivateCalculateBtn();
};

const getCoefOfActivity = (userActivity) => {
    return coefsActivity[userActivity];
};

const calculateProgramm = (evt) => { // N = (10 × вес в килограммах) + (6,25 × рост в сантиметрах) − (5 × возраст в годах) − 161
    evt.preventDefault();
    const userSex = sexSwitcher.querySelector('.switcher__item input[type="radio"]:checked').getAttribute('value');
    const userAge = +document.querySelector('#age').value;
    const userHeight = +document.querySelector('#height').value;
    const userWeight = +document.querySelector('#weight').value;
    const userActivity = radiosGroup.querySelector('.radio__wrapper input[type="radio"]:checked').value;
    counterResult.classList.remove('counter__result--hidden');

    const normCalories = document.querySelector('#calories-norm');
    const minCalories = document.querySelector('#calories-minimal');
    const maxCalories = document.querySelector('#calories-maximal');

    const coefActivity = getCoefOfActivity(userActivity);

    //Calculate norm calories
    if(userSex === 'male') {
        const result = `${((10 * userWeight) + (6.25 * userHeight) - (5 * userAge) + 161) * coefActivity}`;
        normCalories.textContent = parseInt(result);
        minCalories.textContent = parseInt(result / 1.15);
        maxCalories.textContent = parseInt(result * 1.15);
    } else {
        const result = `${((10 * userWeight) + (6.25 * userHeight) - (5 * userAge) + 5) * coefActivity}`;
        normCalories.textContent = parseInt(result);
        minCalories.textContent = parseInt(result / 1.15);
        maxCalories.textContent = parseInt(result * 1.15);
    }

    // Calculate min calories

    console.log(userSex,userAge, userActivity, userWeight, userHeight );
};

//Events Listeners
groupInputs.forEach((input) => {
    input.addEventListener('blur', () => {
        checkAllInputs(groupInputs);
    })
})
calculateBtn.addEventListener('click', calculateProgramm);
formResetBtn.addEventListener('click', hideCounter);




