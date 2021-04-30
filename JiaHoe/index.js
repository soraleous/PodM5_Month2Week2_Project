const fromCurrency = document.querySelector('#fromCurrency');
const toCurrency = document.querySelector('#toCurrency');
const fromAmount = document.querySelector('#fromAmount');
const toAmount = document.querySelector('#toAmount');
const exchange = document.querySelector('#exchange');
const rate = document.querySelector('#rate');

fromCurrency.addEventListener('change', calculate);
toCurrency.addEventListener('change', calculate);
fromAmount.addEventListener('input', calculate);
toAmount.addEventListener('input', calculate);

exchange.addEventListener('click', ()=>{
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value= temp;
    calculate();
});

function calculate(){
    const input_currency1 = fromCurrency.value;
    const output_currency1 = toCurrency.value;

    fetch(`https://api.exchangerate-api.com/v4/latest/${input_currency1}`)
    .then(res => res.json())
    .then(res => {
        const new_rate = res.rates[output_currency1];
        const new_date = res.date;
        rate.innerText = `1 ${input_currency1} = ${new_rate} ${output_currency1}`
        rateDate.innerText = `Data updated on ${new_date}`
        toAmount.value = (fromAmount.value * new_rate).toFixed(2);
    })
}

calculate();