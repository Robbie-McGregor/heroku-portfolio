//Grab form input elements

const houseValue = document.getElementById("houseValue");
const deposit = document.getElementById("deposit");
const depositPercent = document.getElementById("depositPercent");
const interestRate = document.getElementById("interestRate");
const term = document.getElementById("term");

//Grab Graph axies
const houseValueColumn = document.getElementById("houseValueColumn");
const interestAxis = document.getElementById("interestAxis");

const houseValueFeedback = document.getElementById("houseValueFeedback");
const depositFeedback = document.getElementById("depositFeedback");
const interestRateFeedback = document.getElementById("interestRateFeedback");
const loanTermFeedback = document.getElementById("loanTermFeedback");


depositPercent.addEventListener('keyup', updateDeposit);
depositPercent.addEventListener('keyup', checksAndCrosses);

interestRate.addEventListener('keyup', checksAndCrosses);

term.addEventListener('keyup', checksAndCrosses);

houseValue.addEventListener("keyup", updateInput);
houseValue.addEventListener("keyup", checksAndCrosses);

deposit.addEventListener('keyup', updateDepositPercent);
deposit.addEventListener('keyup', checksAndCrosses);

 
function updateInput(){
  if(houseValue.value == ""){
    return;
  } 

  var num = houseValue.value;
  num = num.replace(/[\D\s\._\-]+/g, "");
  num = num ? parseInt( num, 10 ) : 0;
  num = formatNumber(num);
  houseValue.value = num;

  if (depositPercent.value > 0){
    deposit.value = toString(depositPercent.value * toNumber(houseValue.value) / 100);
  }

}

function updateDeposit(){
if (depositPercent.value > 0){
    var hV = houseValue.value;
    hV = toNumber(hV);
    var dP = (Number(depositPercent.value) / 100 * hV);
    dP = toString(dP);
    deposit.value = dP;
  }

  else if (depositPercent.value == "0"){
    deposit.value = "0"
  }
  else {
    deposit.value = ""
  }
  calculate();
}

function updateDepositPercent(){
  if (deposit.value == "" || deposit.value == null || deposit.value == "0"){
    depositPercent.value = 0;
    deposit.value = '0';
    return;
  }


  if (deposit.value == 'undefined'){
    deposit.value = ""
    return;
  }

  var dep = deposit.value;
  dep = toNumber(dep);

  hV = toNumber(houseValue.value);
  depositPercent.value = (dep / hV * 100).toFixed(2);

  dep = toString(dep);
  deposit.value = dep;

}

function checksAndCrosses(){

  hV = toNumber(houseValue.value);
  dep = toNumber(deposit.value)

  if (hV > 0 && houseValue.checkValidity() === true){
    houseValueFeedback.innerHTML = '<span class="check"><i class="fas fa-check"></i></span>';
  }
  else if (houseValue.checkValidity() ===  false || hV < 0 || hV == 0 && hV != ""){
    houseValueFeedback.innerHTML = '<span class="times"><i class="fas fa-times"></i></span>';
  }
  else{
    houseValueFeedback.innerHTML = '';
  }

  if (dep > 0 && deposit.checkValidity() == true && dep < hV || dep == "0" && (depositPercent.value == "0" || deposit.value == '0')){
    depositFeedback.innerHTML = '<span class="check"><i class="fas fa-check"></i></span>';
  } 
  else 
  if (deposit.checkValidity() ===  false || dep < 0 || Number(dep) >= Number(hV) && hV != ""){
    depositFeedback.innerHTML = '<span class="times"><i class="fas fa-times"></i></span>';
  } 
  else {
    depositFeedback.innerHTML = '';
  }

  if (interestRate.value > 0 && interestRate.checkValidity() == true){
    interestRateFeedback.innerHTML = '<span class="check"><i class="fas fa-check"></i></span>';
  } else if (interestRate.checkValidity() ===  false || interestRate.value <= 0  && interestRate.value != ""){
    interestRateFeedback.innerHTML = '<span class="times"><i class="fas fa-times"></i></span>';
  } else {
    interestRateFeedback.innerHTML = '';
  }

  if (term.value > 0 && term.checkValidity() == true){
    loanTermFeedback.innerHTML = '<span class="check"><i class="fas fa-check"></i></span>';
  } else if (term.checkValidity() ===  false || term.value <= 0  && term.value != ""){
    loanTermFeedback.innerHTML = '<span class="times"><i class="fas fa-times"></i></span>';
  } else{
    loanTermFeedback.innerHTML = '';
  }
  calculate();
}


// Determine is weekly, fortnightly or monthly 

//Weekly/Fortnightly/Monthly Frequency Buttons
const weekly = document.getElementById("weeklyRepayments"); 
const fortnightly = document.getElementById("fortnightlyRepayments");
const monthly = document.getElementById("monthlyRepayments");
let frequency = 26;
let frequencyText = 'Fortnightly'

weekly.addEventListener('click', function(){
  frequency = 52;
  weekly.classList.add("frequencyButtonActive");
  fortnightly.classList.remove("frequencyButtonActive");
  monthly.classList.remove("frequencyButtonActive");
  frequencyText = 'Weekly'
  calculate();
});

fortnightly.addEventListener('click', function(){
  frequency = 26;
  weekly.classList.remove("frequencyButtonActive");
  fortnightly.classList.add("frequencyButtonActive");
  monthly.classList.remove("frequencyButtonActive");
  frequencyText = 'Fortnightly'
  calculate();
});

monthly.addEventListener('click', function(){
  frequency = 12;
  weekly.classList.remove("frequencyButtonActive");
  fortnightly.classList.remove("frequencyButtonActive");
  monthly.classList.add("frequencyButtonActive");
  frequencyText = 'Monthly'
  calculate();
});

//function to calculate the mortgage costs
function calculate(){

  const hV = toNumber(houseValue.value);
  const dep = toNumber(deposit.value);
  const P = hV - dep;
  const r = interestRate.value / 100 / frequency; // interest rate per term (monthly)
  const n = term.value * frequency;  // number of repayments (monthly)
  let c;  // C = repayment amount per period
  let totalRepayment; // total amount of principal plus interest
  let totalInterest; // Total amount of interest paid
  let interestCostPercent;  // interest cost as a percentage of the loan
  let interestCostTimesHouse;  // interest cost as a decimal of the house value

 if (P > 0 && r > 0 && n > 0){
 }
 else {
   document.getElementById("results").classList.add('inactive');
   return;
 }

  //Calculate payments using formula:  c = (r * P) / ( 1 - (1 + r) ^ (-1 * n))
  c = (r * P) / (1 - (Math.pow((1 + r), (-1 * n))));
  c = Math.round(c);
  //Output repayment amount to repayment input box
  // repayments.value = c;

  //calculate values for innerText elements
  totalRepayment = c * n;
  totalInterest = totalRepayment - P;
  interestCostPercent = totalInterest / totalRepayment * 100;
  interestCostTimesHouse = totalInterest / hV;

  document.getElementById("results").classList.remove("inactive");
  document.getElementById("repaymentFrequency").innerText = frequencyText ;
  document.getElementById("repaymentAmountText").innerText = formatNumber(c);
  document.getElementById("principal").innerText = formatNumber(P);
  document.getElementById("totalRepayment").innerText = formatNumber(totalRepayment);
  document.getElementById("totalInterest").innerText = formatNumber(totalInterest);
  document.getElementById("houseValueColumnText").innerText = '$' + formatNumber(toNumber(houseValue.value));
  document.getElementById("interestColumnText").innerText = '$' + formatNumber(totalInterest);


  //Apply axis heights to principal vs interest graph
 const maxPercent = 90;

 if (hV > totalInterest){
    interestAxis.style.height = (totalInterest / hV) * maxPercent + "%"; 
    houseValueColumn.style.height = maxPercent + "%";
 } else if (hV < totalInterest){
    interestAxis.style.height = maxPercent + "%";
    houseValueColumn.style.height = (hV / totalInterest) * maxPercent + "%";
 } else if (hV = totalInterest){
    houseValueColumn.style.height = maxPercent + "%";
    interestAxis.style.height = maxPercent + "%";
 }

   return;
};
 
// Format numbers for results to include commas every 3 digits (1000000 to 1,000,000)
function formatNumber (num) {
  num = Math.round(num);
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}




function toNumber(num){
  num = num.toString();
  return Number(num.replace(/[\D\s\._\-]+/g, ""));
}

function toString(num){
  if(num == ""){
    return;
  }
  var num = num.toString();
  num = num.replace(/[\D\s\._\-]+/g, "");
  num = num ? parseInt( num, 10 ) : 0;
  num = formatNumber(num);
  return num;
}