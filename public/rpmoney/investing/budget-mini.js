table=document.querySelector("#budget-table-body");addMasterCategoryBtn=document.querySelector("#add-master-category-btn");const budgetTable=document.querySelector("#budget-table")
collapseAllBtn=document.querySelector("#collapse-all-btn");backgroundColorChangeInput=document.querySelector("#background-color-input");checkAllInput=document.querySelector("#check-all-input");let colorChangeItem=null;function newMasterCategory(){const newMasterCategory=new MasterCategory;const newMasterCategoryDOMElement=new MasterCategoryDOMElement(newMasterCategory);newMasterCategory.DOMRef.children[3].children[0].focus()}
const data={masterCategories:[]};(function Init(){loadEventListeners();try{getLocalStorage()}catch{exampleCategories()}})();function MasterCategory(name,color,hidden){this.name=name||''
this.subCategories=[];this.weekly=0;this.monthly=0;this.yearly=0;this.backgroundColor=color||getRandomColor();this.color='#ccc'
this.hidden=hidden||!1;this.type='Master Category';data.masterCategories.push(this);return this}
function SubCategory(parent,name,color,hidden){this.name=name||"";this.items=[];this.weekly=0;this.monthly=0;this.yearly=0;this.backgroundColor=color||'#faebd7';this.color='#ccc'
this.masterCategory=parent;this.hidden=hidden||!1;this.type='Sub Category';parent.subCategories.push(this)}
function Item(parent,name,weekly,monthly,yearly,hidden){this.name=name||"";this.subCategory=parent;this.masterCategory=parent.masterCategory;this.weekly=weekly||0;this.monthly=monthly||0;this.yearly=yearly||0;this.hidden=hidden||!1;this.type='Item';this.backgroundColor="#ffffff";this.color='#cccccc'
parent.items.push(this);return this}
function getRandomColor(){h=Math.random()*360;s=100;l=75;color=hslToHex(h,s,l)
return color}
function hslToHex(h,s,l){h/=360;s/=100;l/=100;let r,g,b;if(s===0){r=g=b=l}else{const hue2rgb=(p,q,t)=>{if(t<0)t+=1;if(t>1)t-=1;if(t<1/6)return p+(q-p)*6*t;if(t<1/2)return q;if(t<2/3)return p+(q-p)*(2/3-t)*6;return p};const q=l<0.5?l*(1+s):l+s-l*s;const p=2*l-q;r=hue2rgb(p,q,h+1/3);g=hue2rgb(p,q,h);b=hue2rgb(p,q,h-1/3)}
const toHex=x=>{const hex=Math.round(x*255).toString(16);return hex.length===1?'0'+hex:hex};return `#${toHex(r)}${toHex(g)}${toHex(b)}`}
function exampleCategories(){const savings=new MasterCategory('Total Savings','#4DEB32');new MasterCategoryDOMElement(savings);const expenses=new MasterCategory('Total Expenses','#fa8072');new MasterCategoryDOMElement(expenses);const income=new MasterCategory('Total Income','#87ceeb');new MasterCategoryDOMElement(income);setLocalStorage()}
function MasterCategoryDOMElement(element){const container=document.createElement("div");container.setAttribute("class","master-category-container")
const headerContainer=document.createElement("div");headerContainer.setAttribute("class","table-row highlight master-category-header")
headerContainer.style.background=`${element.backgroundColor}`;headerContainer.innerHTML=`
  <div class="table-col-0 table-cell">
  <input type="checkbox">
  </div>
  <div class="table-col-1">
  <button class="collapse-expand-btn btn collapse-btn" title="Collapse Master Category"><i class="fas fa-caret-down"></i></button>
</div>
<div class="table-col-2 table-cell"><button class="btn add-sub-category-btn" title="Add New Sub-Category"><i class="fas fa-plus-circle"></i></button></div>
<div class="table-col-3 table-cell"><input type="text" class="name-input" onfocus="addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateName(event)" title="Master Category Name" placeholder="Enter Master Category Name" value="${element.name}"></div>
<div class="table-col-4 table-cell">$0</div>
<div class="table-col-5 table-cell">$0</div>
<div class="table-col-6 table-cell">$0</div>
<div class="table-col-7 table-cell"></div>
<div class="table-col-8 table-cell"><button title="Delete Master Category" class="btn delete-master-category-btn"><i class="fas fa-trash-alt"></i></div>
<div class="table-col-9 table-cell"><button class="btn move-btn" title="Move Master-Category"><i class="fas fa-sort"></i></button></div>
<div class="table-col-10 table-cell"><button class="color-btn btn" title="Change Color"><i class="fas fa-palette"></i></button></div>
  `
container.appendChild(headerContainer);const firstTableChild=table.firstElementChild;table.insertBefore(container,firstTableChild);element.DOMRef=headerContainer;headerContainer.DATARef=element;return element}
function SubCategoryDOMElement(parent,element){const container=document.createElement("div");container.setAttribute("class","sub-category-container")
const headerContainer=document.createElement("div");headerContainer.setAttribute("class","table-row highlight sub-category-header")
container.style.background=`${element.backgroundColor}`;headerContainer.innerHTML=`
 <div class="table-col-0 table-cell">
 <input type="checkbox" title="Change Color">
 </div>
 <div class="table-col-1">
 <button class="collapse-expand-btn btn collapse-btn" title="Collapse Sub Category"><i class="fas fa-angle-down"></i></button>
</div>
<div class="table-col-2 table-cell"><button class="btn add-item-btn" title="Add New Item"><i class="fas fa-plus"></i></button></div>
<div class="table-col-3 table-cell"><input type="text"" title="Sub-Category Name" placeholder="Enter Sub Category Name"   class="name-input" onfocus="addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateName(event)" value="${element.name}"></div>
<div class="table-col-4 table-cell">$0</div>
<div class="table-col-6 table-cell">$0</div>
<div class="table-col-5 table-cell">$0</div>
<div  title="Percentage of ${element.masterCategory.name}" class="table-col-7 table-cell">0%</div>
<div class="table-col-8 table-cell"><button class="btn delete-sub-category-btn" title="Delete Sub Category"><i class="fas fa-trash-alt"></i></button></div>
<div class="table-col-9 table-cell"><button class="btn move-btn" title="Move Sub-Category"><i class="fas fa-sort"></i></button></div>
<div class="table-col-10 table-cell"><button class="color-btn btn" title="Change Color"><i class="fas fa-palette"></i></button></div>
 `
parent.DOMRef.parentElement.insertBefore(container,parent.DOMRef.nextElementSibling);container.appendChild(headerContainer);element.DOMRef=headerContainer;headerContainer.DATARef=element;return element}
function ItemDOMElement(parent,element){const container=document.createElement("div");container.setAttribute("class","table-row highlight table-item");container.style.background=`${element.backgroundColor}`;container.innerHTML=`
  <div class="table-col-0 table-cell">
  <input type="checkbox">
  </div>
  <div class="table-col-1"></div>
 <div class="table-col-2 table-cell"></div>
 <div class="table-col-3 table-cell"><input type="text" class="name-input"  onfocus="addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateName(event)"  title="Item Name" placeholder="Enter Item Name" value="${element.name}"></div>
 <div class="table-col-4 table-cell"><input type="text" onfocus="addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateValue(event)"title="Enter Amount Weekly" class="number-input weekly-input" value="$${getNumberAsString(Number(element.weekly.toFixed(0)))}"></div>
 <div class="table-col-5 table-cell"><input type="text" onfocus="addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateValue(event)"  title="Enter Amount Monthly" value="$${getNumberAsString(Number(element.monthly.toFixed(0)))}" class="number-input monthly-input"></div>
 <div class="table-col-6 table-cell"><input type="text" onfocus="addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateValue(event)"   value="$${getNumberAsString(Number(element.yearly.toFixed(0)))}" class="number-input yearly-input" title="Enter Amount Yearly"></div>
 <div  title="Percentage of ${element.masterCategory.name}" class="table-col-7 table-cell">0%</div>
 <div class="table-col-8 table-cell"><button title="Delete Item" class="btn delete-item-btn"><i class="far fa-trash-alt"></i></button></div>
 <div class="table-col-9 table-cell"><button class="btn move-btn" title="Move Item"><i class="fas fa-sort"></i></button></div>
  `
parent.DOMRef.parentElement.insertBefore(container,parent.DOMRef.nextElementSibling);element.DOMRef=container;container.DATARef=element;updatePercentageTitle(parent.masterCategory);return element}
function loadEventListeners(){addMasterCategoryBtn.addEventListener("click",newMasterCategory);checkAllInput.addEventListener("change",function(e){toggleCheckAll(e)})
backgroundColorChangeInput.addEventListener("change",function(e){colorChangeExecute(e)})
backgroundColorChangeInput.addEventListener("input",function(e){colorChangeExecute(e)})
collapseAllBtn.addEventListener("click",function(e){toggleCollapseAll(e)})
table.addEventListener("keypress",function(e){if(e.target.classList.contains("name-input")&&e.keyCode===13){updateName(e)}});table.addEventListener("keypress",function(e){if(e.target.classList.contains("number-input")&&e.keyCode===13){updateValue(e)}});table.addEventListener("click",function(e){const target=e.target;if(target.classList.contains("add-item-btn")){const parent=target.parentElement.parentElement.DATARef;newItem(parent);return}
if(target.classList.contains('collapse-expand-btn')){toggleCollapse(target.parentElement.parentElement.DATARef,target)}
if(target.classList.contains("add-sub-category-btn")){const parent=target.parentElement.parentElement.DATARef;newSubCategory(parent);return}
if(target.classList.contains("delete-master-category-btn")){deleteMasterCategory(target.parentElement.parentElement);return}
if(target.classList.contains("delete-sub-category-btn")){deleteSubCategory(target.parentElement.parentElement);return}
if(target.classList.contains("delete-item-btn")){deleteItem(target.parentElement.parentElement);return}
if(target.classList.contains("color-btn")){colorChange(target.parentElement.parentElement);return}})-document.addEventListener('keydown',function(e){if(e.keyCode===27&&dragItem){if(mouseOverObj){mouseOverObj.classList.remove("hover-top");mouseOverObj.classList.remove("hover-bottom")}
dragObject.style.position='relative';dragObject.style.top="0";dragObject.classList.remove("drag-object");showAllUnhiddenItems();dragObject=!1;dragging=!1;mouseOverObj=null;document.body.classList.remove("disable-pointer-events");insertPosition=null;e.preventDefault()}})
document.addEventListener('mousedown',function(e){if(dragObject){if(dragObject.classList.contains("table-item")){dropItem(e);addHighlightClass()}else if(dragObject.classList.contains("sub-category-header")){dropSubCategory(e);addHighlightClass()}else if(dragObject.classList.contains("master-category-header")){dropMasterCategory(e);addHighlightClass()}}if(e.target.classList.contains("move-btn")){if(e.target.parentElement.parentElement.classList.contains("master-category-header")){removeHighlightClass();dragMasterCategory(e)}else if(e.target.parentElement.parentElement.classList.contains("sub-category-header")){removeHighlightClass();dragSubCategory(e)}else if(e.target.parentElement.parentElement.classList.contains("table-item")){removeHighlightClass();dragItem(e)}}});table.addEventListener("mouseover",function(e){if(e.target.classList!=null){if(dragObject&&e.target.classList.contains("table-row")){if(dragObject.classList.contains("table-item")){mouseOverItem(e)}
else if(dragObject.classList.contains("sub-category-header")){mouseOverSubCategory(e)}
else if(dragObject.classList.contains("master-category-header")){mouseOverMasterCategory(e)}}}});document.addEventListener("mousemove",function(e){if(dragObject){if(dragObject.classList.contains("table-item")){moveItem(e)}
else if(dragObject.classList.contains("sub-category-header")){moveSubCategory(e)}
else if(dragObject.classList.contains("master-category-header")){moveMasterCategory(e)}}})}
function newItem(parent){if(parent.hidden===!0){toggleCollapse(parent,parent.DOMRef.children[1].children[0])}
const newItem=new Item(parent);new ItemDOMElement(parent,newItem);newItem.DOMRef.children[3].children[0].focus();setLocalStorage()}
function newSubCategory(parent){if(parent.hidden===!0){toggleCollapse(parent,parent.DOMRef.children[1].children[0])}
const newSubCategory=new SubCategory(parent);new SubCategoryDOMElement(parent,newSubCategory);newItem(newSubCategory);newSubCategory.DOMRef.children[3].children[0].focus()
setLocalStorage()}
function deleteItem(item){const subCategory=item.DATARef.subCategory;itemIndex=(subCategory.items.indexOf(item.DATARef));subCategory.items.splice(itemIndex,1);item.remove();updateTotals();updateUITotal(item.DATARef.subCategory);updateUITotal(item.DATARef.masterCategory);updatePercentages(item.DATARef.masterCategory);setLocalStorage()}
function deleteSubCategory(subCategory){const masterCategory=subCategory.DATARef.masterCategory;const subCategoryIndex=(masterCategory.subCategories.indexOf(subCategory.DATARef));masterCategory.subCategories.splice(subCategoryIndex,1);subCategory.parentElement.remove();updateTotals();updateUITotal(subCategory.DATARef);updateUITotal(subCategory.DATARef.masterCategory);updatePercentages(subCategory.DATARef.masterCategory);setLocalStorage()}
function deleteMasterCategory(masterCategory){const masterCategoryIndex=(data.masterCategories.indexOf(masterCategory.DATARef));data.masterCategories.splice(masterCategoryIndex,1);masterCategory.parentElement.remove();setLocalStorage()}
function getNumberAsString(num){num=num.toLocaleString('en');if(num.split('.').length>1&&num.split('.')[1].length<2){num+='0'}
return num}
function toggleCollapse(item,button){if(item.type==="Master Category"){if(item.hidden===!0){expandMasterCategory(item,button)}else{collapseMasterCategory(item,button)}}else if(item.type==='Sub Category'){if(item.hidden===!0){expandSubCategory(item,button)}else{collapseSubCategory(item,button)}}}
function collapseMasterCategory(masterCategory,button){let text=masterCategory.name;if(text==""){text='Master Category'}
masterCategory.hidden=!0;button.innerHTML=`<i class="fas fa-caret-right"></i>`
button.classList.remove("collapse-btn")
button.setAttribute("title",`Expand ${text}`)
masterCategory.subCategories.forEach(function(subCategory){subCategory.DOMRef.style.display="none";subCategory.items.forEach(function(item){item.DOMRef.style.display="none"})})
setLocalStorage()}
function expandMasterCategory(masterCategory,button){let text=masterCategory.name;if(text==""){text='Master Category'}
masterCategory.hidden=!1;button.innerHTML=`<i class="fas fa-caret-down"></i>`
button.classList.add("collapse-btn")
button.setAttribute("title",`Collapse ${text}`)
masterCategory.subCategories.forEach(function(subCategory){subCategory.DOMRef.style.display="grid";if(subCategory.hidden===!1){subCategory.items.forEach(function(item){item.DOMRef.style.display="grid"})}})
setLocalStorage()}
function collapseSubCategory(subCategory,button){let text=subCategory.name;if(text==""){text='Sub Category'}
button.innerHTML=`<i class="fas fa-angle-right"></i>`
button.classList.remove("collapse-btn");button.setAttribute("title",`Expand ${text}`);subCategory.hidden=!0;subCategory.items.forEach(function(item){item.hidden=!0;item.DOMRef.style.display='none'})
setLocalStorage()}
function expandSubCategory(subCategory,button){let text=subCategory.name;if(text==""){text='Sub Category'}
subCategory.hidden=!1;button.innerHTML=`<i class="fas fa-angle-down"></i>`;button.classList.add("collapse-btn");button.setAttribute("title",`Collapse ${text}`)
subCategory.items.forEach(function(item){item.hidden=!1;item.DOMRef.style.display='grid'});setLocalStorage()}
function showAllUnhiddenItems(dragObject){data.masterCategories.forEach(function(masterCategory){if(masterCategory.hidden===!1){masterCategory.subCategories.forEach(function(subCategory){subCategory.DOMRef.style.display="grid";if(subCategory.hidden===!1){subCategory.items.forEach(function(item){item.DOMRef.style.display="grid"})}})}})}
function updateName(e){e.target.parentElement.parentElement.DATARef.name=e.target.value;if(e.target.parentElement.parentElement.classList.contains("master-category-header")){updatePercentageTitle(e.target.parentElement.parentElement.DATARef)}
if(e.target.parentElement.parentElement.classList.contains("master-category-header")||e.target.parentElement.parentElement.classList.contains("sub-category-header")){updateCollapseButtonTitle(e.target.parentElement.parentElement)}
setLocalStorage()}
function updateValue(e){if(e.target.classList.contains("weekly-input")){updateItemWeekyInput(e)}else if(e.target.classList.contains("monthly-input")){updateItemMonthlyInput(e)}else if(e.target.classList.contains("yearly-input")){updateItemYearlyInput(e)}}
function removeCharactersFromNumber(num){num=Number(num.replace(/[^0-9.]/g,''));return num}
function getNumberAsString(num){num=num.toLocaleString('en');if(num.split('.').length>1&&num.split('.')[1].length<2){num+='0'}
return num}
function updateItemWeekyInput(e){let newValue=e.target.value;newValue=removeCharactersFromNumber(newValue);let item=e.target.parentElement.parentElement.DATARef;item.weekly=newValue;item.monthly=newValue*52/12;item.yearly=newValue*52;updateSubCategoryTotalData(item.subCategory);updateMasterCategoryTotalData(item.masterCategory);updateUITotal(item.subCategory);updateUITotal(item.masterCategory);updateItemInputValues(item);updatePercentages(item.masterCategory);e.target.blur();setLocalStorage()}
function updateItemMonthlyInput(e){let newValue=e.target.value;newValue=removeCharactersFromNumber(newValue);let item=e.target.parentElement.parentElement.DATARef;item.weekly=newValue*12/52;item.monthly=newValue;item.yearly=newValue*12;updateSubCategoryTotalData(item.subCategory);updateMasterCategoryTotalData(item.masterCategory);updateUITotal(item.subCategory);updateUITotal(item.masterCategory);updateItemInputValues(item);updatePercentages(item.masterCategory);e.target.blur();setLocalStorage()}
function updateItemYearlyInput(e){let newValue=e.target.value;newValue=removeCharactersFromNumber(newValue);let item=e.target.parentElement.parentElement.DATARef;item.weekly=newValue/52;item.monthly=newValue/12;item.yearly=newValue;updateSubCategoryTotalData(item.subCategory);updateMasterCategoryTotalData(item.masterCategory);updateUITotal(item.subCategory);updateUITotal(item.masterCategory);updateItemInputValues(item);updatePercentages(item.masterCategory);e.target.blur();setLocalStorage()}
function updateSubCategoryTotalData(subCategory){let weekly=0;subCategory.items.forEach(function(item){weekly+=item.weekly})
subCategory.weekly=weekly;subCategory.monthly=weekly*52/12;subCategory.yearly=weekly*52}
function updateMasterCategoryTotalData(masterCategory){let weekly=0;masterCategory.subCategories.forEach(function(subCategory){weekly+=subCategory.weekly})
masterCategory.weekly=weekly;masterCategory.monthly=weekly*52/12;masterCategory.yearly=weekly*52}
function updateUITotal(category){category.DOMRef.children[4].innerText=`$${getNumberAsString(Number(category.weekly.toFixed(2)))}`
category.DOMRef.children[5].innerText=`$${getNumberAsString(Number(category.monthly.toFixed(2)))}`
category.DOMRef.children[6].innerText=`$${getNumberAsString(Number(category.yearly.toFixed(0)))}`}
function updateItemInputValues(item){item.DOMRef.children[4].children[0].value=`$${getNumberAsString(Number(item.weekly.toFixed(2)))}`;item.DOMRef.children[5].children[0].value=`$${getNumberAsString(Number(item.monthly.toFixed(2)))}`;item.DOMRef.children[6].children[0].value=`$${getNumberAsString(Number(item.yearly.toFixed(0)))}`}
function updatePercentages(masterCategory){masterCategory.subCategories.forEach(function(subCategory){subCategory.percent=subCategory.weekly/masterCategory.weekly*100;if(isNaN(subCategory.percent)){subCategory.DOMRef.children[7].innerText=`0%`}else{subCategory.DOMRef.children[7].innerText=`${percentDisplay(subCategory.percent)}%`}
subCategory.items.forEach(function(item){item.percent=item.weekly/masterCategory.weekly*100;if(isNaN(item.percent)){item.DOMRef.children[7].innerText=`0%`}else{item.DOMRef.children[7].innerText=`${percentDisplay(item.percent)}%`}})})}
function percentDisplay(percent){percentDecimal=String(percent).split('.');if(percentDecimal[1]){percent=String(Number(percent.toFixed(1)))}
return percent}
function updatePercentageTitle(masterCategory){let text='Master Category';if(masterCategory.name){text=masterCategory.name}
masterCategory.subCategories.forEach(function(subCategory){subCategory.DOMRef.children[7].setAttribute("title",`Percentage of ${text}`)
subCategory.items.forEach(function(item){item.DOMRef.children[7].setAttribute("title",`Percentage of ${text}`)})})
setLocalStorage()}
function toggleCollapseAll(e){if(e.target.classList.contains('collapse-btn')){collapseAll(e.target)}else{expandAll(e.target)}
setLocalStorage()}
function collapseAll(button){data.masterCategories.forEach(function(masterCategory){collapseMasterCategory(masterCategory,masterCategory.DOMRef.children[1].children[0])
masterCategory.subCategories.forEach(function(subCategory){collapseSubCategory(subCategory,subCategory.DOMRef.children[1].children[0])})})
button.classList.remove("collapse-btn");button.innerHTML=`<i class="fas fa-caret-right"></i>`
button.setAttribute("title","Expand All")}
function expandAll(button){data.masterCategories.forEach(function(masterCategory){expandMasterCategory(masterCategory,masterCategory.DOMRef.children[1].children[0])
masterCategory.subCategories.forEach(function(subCategory){expandSubCategory(subCategory,subCategory.DOMRef.children[1].children[0])})})
button.classList.add("collapse-btn");button.innerHTML=`<i class="fas fa-caret-down"></i>`
button.setAttribute("title","Collapse All")}
function updateCollapseButtonTitle(category){let text=category.DATARef.name;if(text==""){if(category.classList.contains("sub-category-header")){text="Sub Category"}else if(category.classList.contains("master-category-header")){text="Master Category"}}
const button=category.children[1].children[0];if(button.classList.contains("collapse-btn")){button.setAttribute("title",`Collapse ${text}`)}else{button.setAttribute("title",`Expand ${text}`)}}
function toggleCheckAll(e){if(e.target.checked===!0){checkAll()}else{uncheckAll()}}
function checkAll(){table.querySelectorAll("input[type='checkbox']").forEach(function(checkbox){checkbox.checked=!0})}
function uncheckAll(){table.querySelectorAll("input[type='checkbox']").forEach(function(checkbox){checkbox.checked=!1})}
function colorChange(item){colorChangeItem=item;backgroundColorChangeInput.value=item.DATARef.backgroundColor;backgroundColorChangeInput.click()}
function colorChangeExecute(event){colorChangeItem.style.backgroundColor=event.target.value;colorChangeItem.DATARef.backgroundColor=event.target.value;setLocalStorage()}
function removeHighlightClass(){const items=document.querySelectorAll(".table-row");items.forEach(function(item){item.classList.remove("highlight")})}
function addHighlightClass(){const items=document.querySelectorAll(".table-row");items.forEach(function(item){item.classList.add("highlight")})}
function addActiveClass(e){e.target.parentElement.parentElement.classList.add("active")}
function removeActiveClass(e){e.target.parentElement.parentElement.classList.remove("active")}
function setLocalStorage(){try{localStorage.setItem("data",JSON.stringify(data,getCircularReplacer()))}catch{console.log("error setting data in local storage, try enabling third party cookies")}}
function getCircularReplacer(){const seen=new WeakSet();return(key,value)=>{if(typeof value==="object"&&value!==null){if(seen.has(value)){return}
seen.add(value)}
return value}};function getLocalStorage(){const storageData=JSON.parse(localStorage.getItem("data"));console.log(storageData)
if((storageData.masterCategories.length<1)){exampleCategories()}
for(i=0;i<storageData.masterCategories.length;i++){const masterCat=new MasterCategory(storageData.masterCategories[i].name,storageData.masterCategories[i].backgroundColor,storageData.masterCategories[i].hidden);new MasterCategoryDOMElement(masterCat);for(j=0;j<storageData.masterCategories[i].subCategories.length;j++){const subCat=new SubCategory(masterCat,storageData.masterCategories[i].subCategories[j].name,storageData.masterCategories[i].subCategories[j].backgroundColor,storageData.masterCategories[i].subCategories[j].hidden);new SubCategoryDOMElement(masterCat,subCat);subCat.masterCategory=masterCat;for(k=0;k<storageData.masterCategories[i].subCategories[j].items.length;k++){weekly=storageData.masterCategories[i].subCategories[j].items[k].weekly;monthly=storageData.masterCategories[i].subCategories[j].items[k].monthly;yearly=storageData.masterCategories[i].subCategories[j].items[k].yearly;hidden=storageData.masterCategories[i].subCategories[j].items[k].hidden;const newItem=new Item(subCat,storageData.masterCategories[i].subCategories[j].items[k].name,weekly,monthly,yearly,hidden);newItem.subCategory=subCat;newItem.masterCategory=masterCat;new ItemDOMElement(subCat,newItem)}
if(subCat.hidden===!0){collapseSubCategory(subCat,subCat.DOMRef.children[1].children[0])}
updateSubCategoryTotalData(subCat);updateUITotal(subCat);updateCollapseButtonTitle(subCat.DOMRef)}
if(masterCat.hidden===!0){collapseMasterCategory(masterCat,masterCat.DOMRef.children[1].children[0])}
updateMasterCategoryTotalData(masterCat);updateUITotal(masterCat);updatePercentages(masterCat);updatePercentageTitle(masterCat)
updateCollapseButtonTitle(masterCat.DOMRef)}}
let tableOffset;let mouseOverObj=null;let mouseYOffset;let dragObjectPositionTop;let tableYStartPosition;objY=null;let insertPosition=+1;let dragObject=null;let y,prev_y;let dragging=!1;function dragItem(e){document.body.classList.add("disable-pointer-events");dragObject=e.target.parentElement.parentElement;mouseY=e.clientY;dragObjectPositionTop=dragObject.getBoundingClientRect().y;mouseYOffset=mouseY-dragObjectPositionTop;mouseYOffset=20;dragObject.style.top=dragObjectPositionTop+pageYOffset+'px';dragObject.style.position="absolute";dragObject.classList.add("drag-object")
dragging=!0;mouseOverObj=dragObject.previousElementSibling;mouseOverObj.classList.add("hover-bottom")}
function mouseOverItem(e){if(e.target.classList.contains("table-item")){let yPosition=e.clientY-e.target.getBoundingClientRect().y;if(yPosition<20){mouseOverObj.classList.remove("hover-top")
mouseOverObj.classList.remove("hover-bottom")
e.target.classList.add("hover-top");mouseOverObj=e.target}else{mouseOverObj.classList.remove("hover-top")
mouseOverObj.classList.remove("hover-bottom")
e.target.classList.add("hover-bottom");mouseOverObj=e.target}}}
function moveItem(e){tableYStartPosition=table.getBoundingClientRect().y;y=e.clientY+pageYOffset;dragObject.style.top=y-mouseYOffset+'px';if(e.target.classList){if(e.target.classList.contains("table-item")){let yPosition=e.clientY-e.target.getBoundingClientRect().y;if(yPosition<20){e.target.classList.add("hover-top");e.target.classList.remove("hover-bottom")}else{e.target.classList.add("hover-bottom");e.target.classList.remove("hover-top")}
mouseOverObj=e.target}else if(e.target.classList.contains("sub-category-header")){mouseOverObj.classList.remove("hover-top");mouseOverObj.classList.remove("hover-bottom");e.target.classList.add("hover-bottom");e.target.classList.remove("hover-top");mouseOverObj=e.target}}}
function dropItem(e){if(mouseOverObj.classList.contains("sub-category-header")){mouseOverObj.parentElement.insertBefore(dragObject,mouseOverObj.parentElement.firstChild.nextElementSibling);if(mouseOverObj.DATARef.hidden===!0){dragObject.style.display='none'}}else if(mouseOverObj.classList.contains("hover-top")){mouseOverObj.parentElement.insertBefore(dragObject,mouseOverObj);insertPosition=1}else if(mouseOverObj.classList.contains("hover-bottom")){mouseOverObj.parentElement.insertBefore(dragObject,mouseOverObj.nextElementSibling);insertPosition=0}
if(mouseOverObj){mouseOverObj.classList.remove("hover-top");mouseOverObj.classList.remove("hover-bottom")}
dragObject.style.position='relative';dragObject.style.top="0";dragObject.classList.remove("drag-object");moveItemData(dragObject,mouseOverObj);insertPosition=null;dragObject=!1;dragging=!1;mouseOverObj=null;document.body.classList.remove("disable-pointer-events");updateTotals();setLocalStorage()}
function dragSubCategory(e){document.body.classList.add("disable-pointer-events");dragObject=e.target.parentElement.parentElement;data.masterCategories.forEach(function(masterCategory){masterCategory.subCategories.forEach(function(subCategory){subCategory.items.forEach(function(item){item.DOMRef.style.display="none"})})})
mouseY=e.clientY;dragObjectPositionTop=dragObject.getBoundingClientRect().y;mouseYOffset=mouseY-dragObjectPositionTop;mouseYOffset=20;dragObject.style.top=dragObjectPositionTop+pageYOffset+'px';dragObject.style.position="absolute";dragObject.classList.add("drag-object")
dragging=!0;mouseOverObj=dragObject.parentElement.previousElementSibling;mouseOverObj.classList.add("hover-bottom")}
function mouseOverSubCategory(e){if(e.target.classList.contains("sub-category-header")){let yPosition=e.clientY-e.target.getBoundingClientRect().y;if(yPosition<20){mouseOverObj.classList.remove("hover-top")
mouseOverObj.classList.remove("hover-bottom")
e.target.classList.add("hover-top");mouseOverObj=e.target}else{mouseOverObj.classList.remove("hover-top")
mouseOverObj.classList.remove("hover-bottom")
e.target.classList.add("hover-bottom");mouseOverObj=e.target}}else if(e.target.classList.contains("master-category-header")){mouseOverObj.classList.remove("hover-top");mouseOverObj.classList.remove("hover-bottom");e.target.classList.add("hover-bottom");e.target.classList.remove("hover-top");mouseOverObj=e.target}}
function moveSubCategory(e){tableYStartPosition=table.getBoundingClientRect().y;y=e.clientY+pageYOffset;dragObject.style.top=y-mouseYOffset+'px';if(e.target.classList){if(e.target.classList.contains("sub-category-header")){let yPosition=e.clientY-e.target.getBoundingClientRect().y;if(yPosition<20){e.target.classList.add("hover-top");e.target.classList.remove("hover-bottom")}else{e.target.classList.add("hover-bottom");e.target.classList.remove("hover-top")}
mouseOverObj=e.target}else if(e.target.classList.contains("master-category-header")){mouseOverObj.classList.remove("hover-top");mouseOverObj.classList.remove("hover-bottom");e.target.classList.add("hover-bottom");e.target.classList.remove("hover-top");mouseOverObj=e.target}}}
function dropSubCategory(e){if(mouseOverObj.classList.contains("master-category-header")){mouseOverObj.parentElement.insertBefore(dragObject.parentElement,mouseOverObj.parentElement.firstChild.nextElementSibling);if(mouseOverObj.DATARef.hidden===!0){dragObject.style.display='none'}}else if(mouseOverObj.classList.contains("hover-top")){mouseOverObj.parentElement.parentElement.insertBefore(dragObject.parentElement,mouseOverObj.parentElement);insertPosition=1}else if(mouseOverObj.classList.contains("hover-bottom")){mouseOverObj.parentElement.parentElement.insertBefore(dragObject.parentElement,mouseOverObj.parentElement.nextElementSibling);insertPosition=0}
if(mouseOverObj){mouseOverObj.classList.remove("hover-top");mouseOverObj.classList.remove("hover-bottom")}
dragObject.style.position='relative';dragObject.style.top="0";dragObject.classList.remove("drag-object");moveSubCategoryData(dragObject,mouseOverObj)
showAllUnhiddenItems(dragObject);dragObject=!1;dragging=!1;mouseOverObj=null;document.body.classList.remove("disable-pointer-events");insertPosition=null;updateTotals();setLocalStorage()}
function dragMasterCategory(e){document.body.classList.add("disable-pointer-events");dragObject=e.target.parentElement.parentElement;data.masterCategories.forEach(function(masterCategory){masterCategory.subCategories.forEach(function(subCategory){subCategory.DOMRef.style.display="none"})})
mouseY=e.clientY;dragObjectPositionTop=dragObject.getBoundingClientRect().y;mouseYOffset=mouseY-dragObjectPositionTop;mouseYOffset=20;dragObject.style.top=dragObjectPositionTop+pageYOffset+'px';dragObject.style.position="absolute";dragObject.classList.add("drag-object")
dragging=!0;mouseOverObj=dragObject.parentElement.previousElementSibling;if(mouseOverObj==null){mouseOverObj=dragObject.parentElement.nextElementSibling;mouseOverObj.classList.add("hover-top");return}
mouseOverObj.classList.add("hover-bottom")
return}
function mouseOverMasterCategory(e){if(e.target.classList.contains("master-category-header")){let yPosition=e.clientY-e.target.getBoundingClientRect().y;if(yPosition<20){mouseOverObj.classList.remove("hover-top")
mouseOverObj.classList.remove("hover-bottom")
e.target.parentElement.classList.add("hover-top");mouseOverObj=e.target.parentElement}else{mouseOverObj.classList.remove("hover-top")
mouseOverObj.classList.remove("hover-bottom")
e.target.parentElement.classList.add("hover-bottom");mouseOverObj=e.target.parentElement}}}
function moveMasterCategory(e){tableYStartPosition=table.getBoundingClientRect().y;y=e.clientY+pageYOffset;dragObject.style.top=y-mouseYOffset+'px';if(e.target.classList){if(e.target.classList.contains("master-category-header")){let yPosition=e.clientY-e.target.getBoundingClientRect().y;if(yPosition<20){e.target.parentElement.classList.add("hover-top");e.target.parentElement.classList.remove("hover-bottom")}else{e.target.parentElement.classList.add("hover-bottom");e.target.parentElement.classList.remove("hover-top")}
mouseOverObj=e.target.parentElement}}}
function dropMasterCategory(e){if(mouseOverObj.classList.contains("hover-top")){insertPosition=1;dragObject.parentElement.parentElement.insertBefore(dragObject.parentElement,mouseOverObj)}else if(mouseOverObj.classList.contains("hover-bottom")){dragObject.parentElement.parentElement.insertBefore(dragObject.parentElement,mouseOverObj.nextElementSibling);insertPosition=0}
dragObject.style.position='relative';dragObject.style.top="0";dragObject.classList.remove("drag-object");moveMasterCategoryData(dragObject,mouseOverObj.firstChild);mouseOverObj.classList.remove("hover-top");mouseOverObj.classList.remove("hover-bottom");showAllUnhiddenItems();dragObject=!1;dragging=!1;mouseOverObj=null;document.body.classList.remove("disable-pointer-events");insertPosition=null;setLocalStorage()}
function moveMasterCategoryData(masterCategory,newPosition){oldIndex=data.masterCategories.indexOf(masterCategory.DATARef);object=masterCategory.DATARef;data.masterCategories.splice(oldIndex,1);newIndex=data.masterCategories.indexOf(newPosition.DATARef)+insertPosition;data.masterCategories.splice(newIndex,0,object)}
function moveSubCategoryData(subCategory,newPosition){oldIndex=subCategory.DATARef.masterCategory.subCategories.indexOf(subCategory.DATARef);object=subCategory.DATARef;subCategory.DATARef.masterCategory.subCategories.splice(oldIndex,1);if(newPosition.classList.contains("sub-category-header")){newIndex=newPosition.DATARef.masterCategory.subCategories.indexOf(newPosition.DATARef)+insertPosition;newPosition.DATARef.masterCategory.subCategories.splice(newIndex,0,subCategory.DATARef);subCategory.DATARef.masterCategory=newPosition.DATARef.masterCategory}else if(newPosition.classList.contains("master-category-header")){newPosition.DATARef.subCategories.push(subCategory.DATARef);subCategory.DATARef.masterCategory=newPosition.DATARef}
updatePercentageTitle(subCategory.DATARef.masterCategory)}
function moveItemData(item,newPosition){oldIndex=item.DATARef.subCategory.items.indexOf(item.DATARef);item.DATARef.subCategory.items.splice(oldIndex,1);if(newPosition.classList.contains("table-item")){newIndex=newPosition.DATARef.subCategory.items.indexOf(newPosition.DATARef)+insertPosition;newPosition.DATARef.subCategory.items.splice(newIndex,0,item.DATARef);item.DATARef.subCategory=newPosition.DATARef.subCategory;item.DATARef.masterCategory=newPosition.DATARef.masterCategory}else if(newPosition.classList.contains("sub-category-header")){newPosition.DATARef.items.push(item.DATARef);item.DATARef.subCategory=newPosition.DATARef;item.DATARef.masterCategory=newPosition.DATARef.masterCategory}
updatePercentageTitle(item.DATARef.masterCategory)}
function updateTotals(){data.masterCategories.forEach(function(masterCategory){masterCategory.subCategories.forEach(function(subCategory){updateSubCategoryTotalData(subCategory);updateUITotal(subCategory)});updateMasterCategoryTotalData(masterCategory);updateUITotal(masterCategory);updatePercentages(masterCategory)})}