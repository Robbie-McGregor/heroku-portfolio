const startBalance=document.getElementById("startBalance");const deposit=document.getElementById("deposit");const rateOfReturn=document.getElementById("rateOfReturn");const timeFrame=document.getElementById("timeFrame");const inflation=document.getElementById("inflation");const svg=document.getElementById("resultsGraph");const taxRate=document.getElementById("taxRate");const swr=document.getElementById("swr");const weeklyButton=document.getElementById("weeklyDeposits");const monthlyButton=document.getElementById("monthlyDeposits");const yearlyButton=document.getElementById("yearlyDeposits");const scrollToTableIcon=document.getElementById("scrollToTableIcon");let xChange=0;const feedbackText={timeFrame:document.getElementById("timeFrameFeedback"),rateOfReturn:document.getElementById("rateOfReturnFeedback"),startBalance:document.getElementById("startBalance Feedback"),deposit:document.getElementById("depositFeedback")}
let contributionAmount;deposit.addEventListener('change',function(){contributionAmount=Number(deposit.value)});let results=[];let coordinates=[];let inputValues=[];let capitalInvested;let resultsTable;let gridState=!0;let svgGraph;let svgPathPrincipal;let svgPathInterest;let svgPath;let svgLegend;let frequency=12;let swrFrequencyText='Monthly';let tableOrderChronological=!0;weeklyButton.addEventListener("click",weeklyPayments);monthlyButton.addEventListener("click",monthlyPayments);yearlyButton.addEventListener("click",yearlyPayments);scrollToTableIcon.addEventListener("click",function(){document.getElementById("tableButtons").scrollIntoView({behavior:'smooth',block:'start'})});function monthlyPayments(){frequency=12;monthlyButton.classList.add("frequencyButtonActive");yearlyButton.classList.remove("frequencyButtonActive");weeklyButton.classList.remove("frequencyButtonActive");swrFrequencyText='Monthly'}
function weeklyPayments(){frequency=52;weeklyButton.classList.add("frequencyButtonActive");monthlyButton.classList.remove("frequencyButtonActive");yearlyButton.classList.remove("frequencyButtonActive");swrFrequencyText='Weekly'}
function yearlyPayments(){frequency=1;weeklyButton.classList.remove("frequencyButtonActive");yearlyButton.classList.add("frequencyButtonActive");monthlyButton.classList.remove("frequencyButtonActive");swrFrequencyText='Yearly'}
function calculate(){inputValues={startBalance:Number(startBalance.value),returnRate:Number(rateOfReturn.value),timeFrame:Number(timeFrame.value),regularInvesments:Number(deposit.value),inflationRate:Number(inflation.value/100),taxRate:Number(taxRate.value/100),swrRate:Number(swr.value/100),frequency:frequency}
let P=inputValues.startBalance;let r=inputValues.returnRate/100;let n=12;let t=1;let A;let B;let PMT=deposit.value*inputValues.frequency/12;let totalInterest=0;let interestEarned;let inflationAdjustedBalance;let principalInvested=startBalance.value;let gridLines;let tax=inputValues.taxRate;let totalTaxPaid=0;results=[];for(i=0;i<timeFrame.value;i++){A=P*Math.pow((1+(r/n)),(n*t));B=PMT*((Math.pow((1+(r/n)),(n*t))-1)/(r/n));let C=Number(A+B);interestEarned=(C-P-(n*PMT));let taxPaid=interestEarned*tax
interestEarned-=taxPaid;C=C-taxPaid;inflationAdjustedBalance=C/(Math.pow((1+inputValues.inflationRate),(i+1)));principalInvested=Number(principalInvested)+Number(n*PMT);totalInterest+=interestEarned;totalTaxPaid+=taxPaid;let swrAmount=C*inputValues.swrRate;results.push({year:i+1,startingBalance:Number(P.toFixed(0)),principalInvested:Number(principalInvested),interestEarned:Number(interestEarned.toFixed(0)),endingBalance:Number(C.toFixed(0)),totalInterest:Number(totalInterest.toFixed(0)),inflationAdjustedBalance:Number(inflationAdjustedBalance),taxPaid:Number(taxPaid.toFixed(0)),totalTaxPaid:Number(totalTaxPaid.toFixed(0)),swrAmount:Number(swrAmount.toFixed(0))});P=C}
printResults();plot();buildTable();svg.classList.remove("blackBg");document.getElementById("results").classList.remove("inactive");document.getElementById("resultsTable").classList.remove("inactive");document.getElementById("copyTable").classList.remove("inactive");document.getElementById("sortTable").classList.remove("inactive")}
function printResults(){document.getElementById("finalBalanceText").innerText=toString(results[timeFrame.value-1].endingBalance);document.getElementById("totalReturnText").innerText=toString(results[timeFrame.value-1].totalInterest);document.getElementById("principalInvestedText").innerText=toString(results[timeFrame.value-1].principalInvested);document.getElementById("withdrawalRateText").innerText=toString(((results[timeFrame.value-1].swrAmount)/inputValues.frequency).toFixed(0));document.getElementById("swrText").innerText=inputValues.swrRate*100;document.getElementById("swrFrequencyText").innerText=swrFrequencyText;document.getElementById("inflationAdjustedText").innerText=toString((results[timeFrame.value-1].inflationAdjustedBalance).toFixed(0));document.getElementById("taxPaidText").innerText=toString(((results[timeFrame.value-1].totalTaxPaid)).toFixed(0))}
function plot(){svgPath='';plotGraphBackground();plotInterest();plotPrincipal();plotGraphBorder();plotLegend();plotXLabels();plotYLabels();plotGridLines();plotDataPoints();svg.innerHTML=svgPath}
function plotGraphBackground(){svgGraph+=`
  <path vector-effect="non-scaling-stroke" stroke="black"stroke-width="1.5" d="m0,0 L1000,0 L1000 -550 L0 -550 L0 0" fill="white" />

  <text x="500" y="70" class="heavy" text-anchor="middle" fill="black">NUMBER OF YEARS</text>
  <text x="275" y="-140" class="heavy" text-anchor="middle" transform="rotate(270,0,0)">BALANCE</text>
  <text x="500" y="-580" text-anchor="middle" class="graphTitle">BALANCE OVER TIME</text>
  `
svgPath+=svgGraph}
function plotGraphBorder(){svgPath+=`
  <path vector-effect="non-scaling-stroke" stroke="black"stroke-width="1.5" d="m0,0 L1000,0 L1000 -550 L0 -550 L0 0" fill="none" />
  
  `}
function plotXLabels(){let label=0;let x=0;if(results.length%6===0){for(i=0;i<6;i++){svgPath+=`<text x="${x}" text-anchor="middle" y="30" class="graphLabel" fill="black">${label}</text>`
label+=results.length/6;x+=166.67}}
else if(results.length%5===0){for(i=0;i<5;i++){svgPath+=`<text x="${x}" y="30" text-anchor="middle" class="graphLabel" fill="black">${label}</text>`
label+=results.length/5;x+=200}}
else if(results.length%4===0){for(i=0;i<4;i++){svgPath+=`<text x="${x}" y="30" text-anchor="middle" class="graphLabel" fill="black">${label}</text>`
label+=results.length/4;x+=250}}
else if(results.length%3===0){for(i=0;i<3;i++){svgPath+=`<text x="${x}" y="30" text-anchor="middle" class="graphLabel" fill="black">${label}</text>`
label+=results.length/3;x+=333.33}}
else if(results.length%2===0){for(i=0;i<2;i++){svgPath+=`<text x="${x}" y="30" text-anchor="middle" class="graphLabel" fill="black">${label}</text>`
label+=results.length/2;x+=500}}
else{svgPath+=`<text x="${x}" y="30" text-anchor="middle" class="graphLabel" fill="black">${label}</text>`}
svgPath+=`<text x="1000" y="30"  text-anchor="middle" class="graphLabel" fill="black">${results.length}</text>`}
function plotYLabels(){let yMax=roundUp(results[results.length-1].endingBalance);let label=yMax;let y=-540;let yChange=550/5;for(i=0;i<5;i++){svgPath+=`<text x="-12" y="${y}" class="graphLabel" text-anchor="end" fill="black">$${toString(label)}</text>`
label=label-(yMax/5);y=y+yChange}}
function plotInterest(){let xValue=0;let xChange=1000/(inputValues.timeFrame);let yMax=roundUp(results[results.length-1].endingBalance);let yStart=0-(inputValues.startBalance/yMax*550);let yChange;svgPathInterest=`<path vector-effect="non-scaling-stroke" stroke="rgb(71,122,225)"stroke-width="1.5" d="m0,${yStart}`;for(i=0;i<inputValues.timeFrame;i++){xValue+=xChange;yChange=results[i].endingBalance/yMax;yChange=yChange*550;yValue=0-yChange;svgPathInterest+=` L${xValue},${yValue}`}
svgPathInterest+=` L1000,0 l-1000,0" fill="rgb(101, 152, 255" />`;svgPath+=svgPathInterest}
function plotPrincipal(){let xValue=0;let xChange=1000/(inputValues.timeFrame);let yMax=roundUp(results[results.length-1].endingBalance);let yStart=0-(inputValues.startBalance/yMax*550);let yChange;svgPathPrincipal=`<path vector-effect="non-scaling-stroke" stroke="rgb(57, 202, 73"stroke-width="1.5" d="m0,${yStart}`;for(i=0;i<inputValues.timeFrame;i++){xValue+=xChange;yChange=results[i].principalInvested/yMax;yChange=yChange*550;yValue=0-yChange;svgPathPrincipal+=` L${xValue},${yValue}`}
svgPathPrincipal+=` L1000,0 l-1000,0" fill="rgb(87, 232, 103)" stroke="black" />`;svgPath+=svgPathPrincipal}
function plotGridLines(){gridlines='';let x=0;gridlines+=`
  <path vector-effect="non-scaling-stroke" stroke="grey"stroke-width="0.5" d="m0,-110 l1000,0" fill="none" />
  <path vector-effect="non-scaling-stroke" stroke="grey"stroke-width="0.5" d="m0,-220 l1000,0" fill="none" />
  <path vector-effect="non-scaling-stroke" stroke="grey"stroke-width="0.5" d="m0,-330 l1000,0" fill="none" />
  <path vector-effect="non-scaling-stroke" stroke="grey"stroke-width="0.5" d="m0,-440 l1000,0" fill="none" />

    `
svgPath+=gridlines}
function plotLegend(){svgLegend=`

  <path vector-effect="non-scaling-stroke" stroke="black"stroke-width="1" d="m20,-525 l25,0 l0,25 l-25,0 z" fill="rgb(101,152,255)" />
  <path vector-effect="non-scaling-stroke" stroke="black"stroke-width="1" d="m20,-480 l25,0 l0,25 l-25,0 z" fill="rgb(87,232,103)" />
  <text x="57.5" y="-502.5" class="graphLegend" fill="black">Return on Investment</text>
  <text x="57.5" y="-457.5" class="graphLegend" fill="black">Principal</text>


  `;svgPath+=svgLegend}
function plotDataPoints(){let xValue=0;let xChange=1000/(inputValues.timeFrame);let yMax=roundUp(results[results.length-1].endingBalance);let yStart=0-(inputValues.startBalance/yMax*550);let yChange;svgPath+=`<circle cx="${xValue}" cy="${yStart}" r="3" stroke="rgb(71,122,225)" stroke-width="2" stroke-opacity="1" fill="rgb(71,122,225)" stroke-width="35" />
  <rect x="0" y="-550" class="dataPoint" width="${xChange/2}" height="550" fill="white" stroke="black" stroke-width="1" opacity="0" cx="0" id="0" />

  
  `
for(i=0;i<inputValues.timeFrame-1;i++){xValue+=xChange;yChange=results[i].endingBalance/yMax;yChange=yChange*550;yValue=0-yChange;svgPath+=`
    <circle cx="${xValue}" cy="${yValue}" r="3"  stroke="rgb(71,122,225)" stroke-width="2" fill="rgb(71,122,225)" />
    <rect x="${xValue - xChange / 2}" cy="${yValue}" cx="${xValue}" y="-550" class="dataPoint" width="${xChange}" height="550" fill="white" stroke="black" stroke-width="1" opacity="0" cx="0" id=${i+1} />
    `}
xValue+=xChange;yChange=results[i].endingBalance/yMax;yChange=yChange*550;yValue=0-yChange;svgPath+=`
<circle cx="${xValue}" cy="${yValue}" r="3"  stroke="rgb(71,122,225)" stroke-width="2" fill="rgb(71,122,225)" />
  <rect x="${xValue - xChange / 2}" cy="${yValue}" cx="${xValue}" y="-550" class="dataPoint" width="${xChange/2}" height="550" fill="white" stroke="black" stroke-width="1" opacity="0" cx="0" id=${i+1} />
  `}
function buildTable(){let year=new Date();year=Number(year.getFullYear());resultsTable=`
                    <table>
                      <thead>
                        <tr>
                          <th class="tc1">#</th>
                          <th class="tc2">Year</th>
                          <th class="tc3">Capital</th>
                          <th class="tc4">Return</th>
                          <th class="tc5">Balance</th>
                          <th class="tc6">${inputValues.swrRate*100}% SWR</th>
                        </tr>
                      </thead>
                      <tbody>
  `;if(tableOrderChronological===!1){year=year+results.length;for(i=results.length-1;i>=0;i--){resultsTable+=` 
                          <tr>
                            <td class="tc1">${results[i].year.toFixed(0)}</td>
                            <td class="tc2">${year}</td>
                            <td class="tc4">$${toString(results[i].principalInvested.toFixed(0))}</td>
                            <td class="tc5">$${toString(results[i].totalInterest.toFixed(0))}</td>
                            <td class="tc3">$${toString(results[i].endingBalance.toFixed(0))}</td>
                            <td class="tc6">$${toString((results[i].endingBalance * inputValues.swrRate).toFixed(0))}</td>
                          </tr>
      `;year--}}else{year ++;for(i=0;i<results.length;i++){resultsTable+=` 
                          <tr>
                            <td class="tc1">${results[i].year.toFixed(0)}</td>
                            <td class="tc2">${year}</td>
                            <td class="tc4">$${toString(results[i].principalInvested.toFixed(0))}</td>
                            <td class="tc5">$${toString(results[i].totalInterest.toFixed(0))}</td>
                            <td class="tc3">$${toString(results[i].endingBalance.toFixed(0))}</td>
                            <td class="tc6">$${toString((results[i].endingBalance * inputValues.swrRate).toFixed(0))}</td>
                          </tr>
      `;year++}}
resultsTable+=`</tbody></table>
                   `;document.getElementById("resultsTable").innerHTML=resultsTable}
function toNumber(num){num=num.toString();return Number(num.replace(/[\D\s\._\-]+/g,""))}
function toString(num){if(num==""){return}
var num=num.toString();num=num.replace(/[\D\s\._\-]+/g,"");num=num?parseInt(num,10):0;num=formatNumber(num);return num}
function formatNumber(num){num=Math.round(num);return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")}
function roundUp(num){let numLength=Number(String(num).length);numLength=numLength-2;let multiplier=1
for(i=1;i<numLength;i++){multiplier=multiplier*10}
let numCeil=Math.ceil((num+1)/multiplier);numCeil=Math.ceil(numCeil/10)*10;num=numCeil*multiplier;return num}
let dataPoints=document.querySelector("#resultsGraph");let overlay;let overlayIdentifier;dataPoints.addEventListener('mouseover',function(e){var target=e.target
let xLocation;let yLocation;if(target.classList.contains('dataPoint')){if(svg.lastChild.id==("displayDataInfo")){svg.removeChild(svg.lastChild);overlayIdentifier.setAttribute("opacity","0")};xLocation=target.attributes.cx.value-125;if(xLocation>750){xLocation=750}else if(xLocation<0){xLocation=0}
yLocation=-250;overlay=document.createElementNS('http://www.w3.org/2000/svg',"foreignObject");overlay.setAttribute("x",`${xLocation}`);overlay.setAttribute("y",`${yLocation}`);overlay.setAttribute("id","displayDataInfo");overlay.setAttribute("width","250")
overlay.setAttribute("height","150");let overlayInnerHtml=""
overlayInnerHtml+=`
      <div id="dataOverlay">`
if(target.id==0){let startBalance;if(results[0].startingBalance){startBalance=toString(results[0].startingBalance)}else{startBalance='0'}
overlayInnerHtml+=`
          <h4>Opening Balance</h4>
          <ul>
            <li class="lato">
              <div>Balance:</div>
              <div>$${startBalance}</div>
            </li>
          </ul>
          </div>`}else if(target.id<=results.length){let x=target.id-1;if(target.id==1){overlayInnerHtml+=`
          <h4>After 1 Year</h4>`}else{overlayInnerHtml+=`
          <h4>After ${results[x].year} Years</h4>`}
overlayInnerHtml+=`
            <ul>
              <li class="lato">
                <div>Balance:</div>
                <div>$${toString(results[x].endingBalance)}</div>
              </li>
              <li class="lato">
                <div>Return:</div>
                <div>$${toString(results[x].totalInterest)}</div>
              </li>
              <li class="lato">
                <div>Principal:</div>
                <div>$${toString(results[x].principalInvested)}</div>
              </li>
              </ul>
            </div>
            `}
overlay.innerHTML=overlayInnerHtml;svg.appendChild(overlay);target.setAttribute("opacity",'0.25');overlayIdentifier=target}});svg.addEventListener("mouseleave",function(){if(svg.lastChild.id==("displayDataInfo")){svg.removeChild(svg.lastChild);overlayIdentifier.setAttribute("opacity","0")}});function copyTable(el){var aux=document.createElement("div");aux.setAttribute("contentEditable",!0);aux.innerHTML=document.getElementById("resultsTable").innerHTML;aux.setAttribute("onfocus","document.execCommand('selectAll',false,null)");document.body.appendChild(aux);aux.focus();document.execCommand("copy");document.body.removeChild(aux)}
function sortTable(){if(tableOrderChronological===!0){tableOrderChronological=!1}else{tableOrderChronological=!0}
buildTable()}
startBalance.addEventListener('keyup',checksAndCrosses);deposit.addEventListener('keyup',checksAndCrosses);rateOfReturn.addEventListener('keyup',checksAndCrosses);timeFrame.addEventListener('keyup',checksAndCrosses);inflation.addEventListener('keyup',checksAndCrosses);taxRate.addEventListener('keyup',checksAndCrosses);swr.addEventListener('keyup',checksAndCrosses);weeklyButton.addEventListener('click',checksAndCrosses);monthlyButton.addEventListener('click',checksAndCrosses);yearlyButton.addEventListener('click',checksAndCrosses);let error=!1;function checksAndCrosses(){error=!1;if(startBalance.value>0&&startBalance.checkValidity()===!0){feedbackText.startBalance.innerHTML='<span class="check"><i class="fas fa-check"></i></span>'}
else if(startBalance.checkValidity()===!1||startBalance.value<0){feedbackText.startBalance.innerHTML='<span class="times"><i class="fas fa-times"></i></span>';error=!0}
else{feedbackText.startBalance.innerHTML=''}
if(deposit.value>0&&deposit.checkValidity()==!0){feedbackText.deposit.innerHTML='<span class="check"><i class="fas fa-check"></i></span>'}
else if(deposit.checkValidity()===!1||deposit.value<0){feedbackText.deposit.innerHTML='<span class="times"><i class="fas fa-times"></i></span>';error=!0}
else{feedbackText.deposit.innerHTML=''}
if(timeFrame.value>0&&timeFrame.checkValidity()==!0){feedbackText.timeFrame.innerHTML='<span class="check"><i class="fas fa-check"></i></span>'}else if(timeFrame.checkValidity()===!1){feedbackText.timeFrame.innerHTML='<span class="times"><i class="fas fa-times"></i></span>';error=!0}else{feedbackText.timeFrame.innerHTML='';error=!0}
if(rateOfReturn.value>0&&rateOfReturn.checkValidity()==!0){feedbackText.rateOfReturn.innerHTML='<span class="check"><i class="fas fa-check"></i></span>'}else if(rateOfReturn.checkValidity()===!1||rateOfReturn.value<0){feedbackText.rateOfReturn.innerHTML='<span class="times"><i class="fas fa-times"></i></span>';error=!0}else{feedbackText.rateOfReturn.innerHTML='';error=!0}
if(startBalance.value>0||deposit.value>0){}else{error=!0}
if(error==!0){document.getElementById("results").classList.add("inactive");document.getElementById("resultsTable").classList.add("inactive");document.getElementById("copyTable").classList.add("inactive");document.getElementById("sortTable").classList.add("inactive");return}
calculate()}
const questionDivs={swr:document.getElementById("swrDiv"),swrIcon:document.getElementById("swrQuestion"),tax:document.getElementById("taxDiv"),taxIcon:document.getElementById("taxQuestion"),inflation:document.getElementById("inflationDiv"),inflationIcon:document.getElementById("inflationQuestion")}
questionDivs.swrIcon.addEventListener('click',swrInfoDisplay);questionDivs.taxIcon.addEventListener('click',taxInfoDisplay);questionDivs.inflationIcon.addEventListener('click',inflationInfoDisplay);let swrInfo;swrInfo=document.createElement("div");swrInfo.setAttribute=("id","swrText");swrInfo.className=("infoText");swrInfo.innerHTML=`
    <i class="fas fa-times closeButton" id="closeSwrInfo"></i>
    <h4>Safe Withdrawal Rate</h4>
    <p>The SWR is the percentage of your stock portfolio that you can withdraw every year for retirement. This figure is 4% - based on the <a href="https://en.wikipedia.org/wiki/Trinity_study" rel=”noopener noreferrer” target="_blank">Trinity Study.</a>.</p>
    <p>You can try inputting a more conservative or aggressive SWR by changing this value.</p>
`;function swrInfoDisplay(){document.getElementById("swrDiv").appendChild(swrInfo)}
let taxInfo;taxInfo=document.createElement("div");taxInfo.setAttribute=("id","taxText");taxInfo.className=("infoText");taxInfo.innerHTML=`
    <i class="fas fa-times closeButton" id="closeTaxInfo"></i>
    <h4>Tax Rate</h4>
    <p> If you enter a tax rate here tax will be calculated yearly and deducted from the returns.</p>
`;function taxInfoDisplay(){document.getElementById("taxDiv").appendChild(taxInfo)}
let inflationInfo=document.createElement("div");inflationInfo.setAttribute=("id","inflationText");inflationInfo.className=("infoText");inflationInfo.innerHTML=`
    <i class="fas fa-times closeButton" id="closeInflationInfo"></i>
    <h4>Inflation Rate</h4>
    <p>Over time inflation erodes the purchasing power of your money. That means that $100 can buy more today than it can this time next year, due to average prices going up. Typically an inflation rate of 2% is desirable.</p>
    <p>See the effect that inflation will have on your purchasing power by looking at the 'Inflation Adjusted Balance'.
    <p>Read more <a href="https://en.wikipedia.org/wiki/Inflation" rel=”noopener noreferrer” target="_blank">here.</a></p>
`;function inflationInfoDisplay(){document.getElementById("inflationDiv").appendChild(inflationInfo)}
questionDivs.swr.addEventListener("click",function(e){let target=e.target;if(target.id==="closeSwrInfo"){document.getElementById("swrDiv").removeChild(swrInfo)}});questionDivs.tax.addEventListener("click",function(e){let target=e.target;if(target.id==="closeTaxInfo"){document.getElementById("taxDiv").removeChild(taxInfo)}});questionDivs.inflation.addEventListener("click",function(e){let target=e.target;if(target.id==="closeInflationInfo"){document.getElementById("inflationDiv").removeChild(inflationInfo)}})