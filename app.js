document.getElementById('results').style.display = 'none';
document.getElementById('loading').style.display = 'none';


document.getElementById('loan-form').addEventListener('submit', function(e) {

    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateLoan, 3000);

    e.preventDefault();

});

function calculateLoan() {

    console.log('Calculating...')

    const amount = document.getElementById('loan-amount');
    const interest = document.getElementById('loan-interest');
    const years = document.getElementById('years-to-repay');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

    document.getElementById('results').style.display = 'block';
    document.getElementById('loading').style.display = 'none';

    } else {
        showError('Check your numbers')
    }
}


function showError(alertText) {

    document.getElementById('results').style.display = 'none';
    document.getElementById('loading').style.display = 'none';

    const loanAmountForm = document.getElementById('loan-amount-form');
    const loanLabel = document.getElementById('loan-amount-label');

    const errorDiv = document.createElement('div');
    errorDiv.className = '.alert'
    errorDiv.appendChild(document.createTextNode(alertText))

    loanAmountForm.insertBefore(errorDiv, loanLabel);

    setTimeout(clearAlert, 2000)
}

function clearAlert() {
    document.querySelector('.alert').style.display = 'none'
}