table = document.querySelector("#budget-table-body");
addMasterCategoryBtn = document.querySelector("#add-master-category-btn");
const budgetTable = document.querySelector("#budget-table")
collapseAllBtn = document.querySelector("#collapse-all-btn");
backgroundColorChangeInput = document.querySelector("#background-color-input");
checkAllInput = document.querySelector("#check-all-input");
let localData;
let colorChangeItem = null;

function newMasterCategory(){
  const newMasterCategory = new MasterCategory;
  const newMasterCategoryDOMElement = new MasterCategoryDOMElement(newMasterCategory);
  newMasterCategory.DOMRef.children[3].children[0].focus()
}

//Data Array
const data = {
  masterCategories: []
};


(function Init(){
  loadEventListeners();

 getLocalStorage();    


  //Initialise Example Categories



})();

//Constructor Functions

function MasterCategory(name, color, hidden){
  this.name = name || ''
  this.subCategories = [];
  this.weekly = 0;
  this.monthly = 0;
  this.yearly = 0;
  this.backgroundColor = color || getRandomColor();
  this.color = '#ccc'
  this.hidden = hidden || false;
  this.type = 'Master Category';
  data.masterCategories.push(this);
  return this;
}

function SubCategory(parent, name, color, hidden){
  this.name = name || "";
  this.items = [];
  this.weekly = 0;
  this.monthly = 0;
  this.yearly = 0;
  this.backgroundColor = color || '#faebd7';
  this.color = '#ccc'
  this.masterCategory = parent;
  this.hidden = hidden || false;
  this.type = 'Sub Category';



  parent.subCategories.push(this);
}

function Item(parent, name, weekly, monthly, yearly, hidden){
  this.name = name || "";
  this.subCategory = parent;
  this.masterCategory = parent.masterCategory;
  this.weekly = weekly || 0;
  this.monthly = monthly || 0;
  this.yearly = yearly || 0;
  this.hidden = hidden || false;
  this.type = 'Item';


  this.backgroundColor = "#ffffff";
  this.color = '#cccccc'
  parent.items.push(this);
  return this;
}





function getRandomColor() {
  // color = "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  h = Math.random() * 360;
  s = 100;
  l = 75;
  color = hslToHex(h, s, l)
  return color;
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}






function exampleCategories(){

    //Create savings master category
    const savings = new MasterCategory('Total Savings', '#4DEB32');
    new MasterCategoryDOMElement(savings);  

    //Create expenses master category
    const expenses = new MasterCategory('Total Expenses', '#fa8072');
    new MasterCategoryDOMElement(expenses);
    
    //Create income master category
    const income = new MasterCategory('Total Income', '#87ceeb');
    new MasterCategoryDOMElement(income);

    setLocalStorage();
}



//DOM MANIPUTATION


function MasterCategoryDOMElement(element){
  //create DOM containers
  const container = document.createElement("div");
  container.setAttribute("class", "master-category-container")

  const headerContainer = document.createElement("div");
  headerContainer.setAttribute("class", "table-row highlight master-category-header")

  headerContainer.style.background = `${element.backgroundColor}`;
  
  headerContainer.innerHTML = `
  <div class="table-col-0 table-cell">
  <input type="checkbox">
  </div>
  <div class="table-col-1">
  <button class="collapse-expand-btn btn collapse-btn" title="Collapse Master Category"><i class="fas fa-caret-down"></i></button>
</div>
<div class="table-col-2 table-cell"><button class="btn add-sub-category-btn" title="Add New Sub-Category"><i class="fas fa-plus-circle"></i></button></div>
<div class="table-col-3 table-cell"><input type="text" class="name-input" onfocus="this.select(), addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateName(event)" title="Master Category Name" placeholder="Enter Master Category Name" value="${element.name}"></div>
<div class="table-col-4 table-cell">$0</div>
<div class="table-col-5 table-cell">$0</div>
<div class="table-col-6 table-cell">$0</div>
<div class="table-col-7 table-cell"></div>
<div class="table-col-8 table-cell"><button title="Delete Master Category" class="btn delete-master-category-btn"><i class="fas fa-trash-alt"></i></div>
<div class="table-col-9 table-cell"><button class="btn move-btn" title="Move Master-Category"><i class="fas fa-sort"></i></button></div>
<div class="table-col-10 table-cell"><button class="color-btn btn" title="Change Color"><i class="fas fa-palette"></i></button></div>
  `
  container.appendChild(headerContainer);
  const firstTableChild = table.firstElementChild;
  table.insertBefore(container, firstTableChild);
  
  // link DOM headerContainer to data
  element.DOMRef = headerContainer;
  headerContainer.DATARef = element;

  return element;
}

function SubCategoryDOMElement(parent, element){

 //create DOM container
 const container = document.createElement("div");
 container.setAttribute("class", "sub-category-container")

 const headerContainer = document.createElement("div");
 headerContainer.setAttribute("class", "table-row highlight sub-category-header")

 container.style.background = `${element.backgroundColor}`;
 
 headerContainer.innerHTML = `
 <div class="table-col-0 table-cell">
 <input type="checkbox" title="Change Color">
 </div>
 <div class="table-col-1">
 <button class="collapse-expand-btn btn collapse-btn" title="Collapse Sub Category"><i class="fas fa-angle-down"></i></button>
</div>
<div class="table-col-2 table-cell"><button class="btn add-item-btn" title="Add New Item"><i class="fas fa-plus"></i></button></div>
<div class="table-col-3 table-cell"><input type="text"" title="Sub-Category Name" placeholder="Enter Sub Category Name"   class="name-input" onfocus="this.select(), addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateName(event)" value="${element.name}"></div>
<div class="table-col-4 table-cell">$0</div>
<div class="table-col-6 table-cell">$0</div>
<div class="table-col-5 table-cell">$0</div>
<div  title="Percentage of ${element.masterCategory.name}" class="table-col-7 table-cell">0%</div>
<div class="table-col-8 table-cell"><button class="btn delete-sub-category-btn" title="Delete Sub Category"><i class="fas fa-trash-alt"></i></button></div>
<div class="table-col-9 table-cell"><button class="btn move-btn" title="Move Sub-Category"><i class="fas fa-sort"></i></button></div>
<div class="table-col-10 table-cell"><button class="color-btn btn" title="Change Color"><i class="fas fa-palette"></i></button></div>
 `

 parent.DOMRef.parentElement.insertBefore(container, parent.DOMRef.nextElementSibling);
 container.appendChild(headerContainer);

 // link DOM container to data
 element.DOMRef = headerContainer;
 headerContainer.DATARef = element;
 
 return element;

}


function ItemDOMElement(parent, element){

  //create DOM container
  const container = document.createElement("div");
  container.setAttribute("class", "table-row highlight table-item");

 
  container.style.background = `${element.backgroundColor}`;

  container.innerHTML = `
  <div class="table-col-0 table-cell">
  <input type="checkbox">
  </div>
  <div class="table-col-1"></div>
 <div class="table-col-2 table-cell"></div>
 <div class="table-col-3 table-cell"><input type="text" class="name-input"  onfocus="this.select(), addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateName(event)"  title="Item Name" placeholder="Enter Item Name" value="${element.name}"></div>
 <div class="table-col-4 table-cell"><input type="text" onfocus="this.select(), addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateValue(event)"title="Enter Amount Weekly" class="number-input weekly-input" value="$${getNumberAsString(Number(element.weekly.toFixed(0)))}"></div>
 <div class="table-col-5 table-cell"><input type="text" onfocus="this.select(), addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateValue(event)"  title="Enter Amount Monthly" value="$${getNumberAsString(Number(element.monthly.toFixed(0)))}" class="number-input monthly-input"></div>
 <div class="table-col-6 table-cell"><input type="text" onfocus="this.select(), addActiveClass(event), removeHighlightClass()" onblur="removeActiveClass(event), addHighlightClass(), updateValue(event)"   value="$${getNumberAsString(Number(element.yearly.toFixed(0)))}" class="number-input yearly-input" title="Enter Amount Yearly"></div>
 <div  title="Percentage of ${element.masterCategory.name}" class="table-col-7 table-cell">0%</div>
 <div class="table-col-8 table-cell"><button title="Delete Item" class="btn delete-item-btn"><i class="far fa-trash-alt"></i></button></div>
 <div class="table-col-9 table-cell"><button class="btn move-btn" title="Move Item"><i class="fas fa-sort"></i></button></div>
  `
  parent.DOMRef.parentElement.insertBefore(container, parent.DOMRef.nextElementSibling);

  
  // link DOM container to data
  element.DOMRef = container;
  container.DATARef = element;
  updatePercentageTitle(parent.masterCategory);

  return element;
 }
 
//Event Listeners
function loadEventListeners(){
  addMasterCategoryBtn.addEventListener("click", newMasterCategory);

  //Check All Input
  checkAllInput.addEventListener("change", function(e){
    toggleCheckAll(e);
  })


  //background Color Change Input
  backgroundColorChangeInput.addEventListener("change", function(e){
    colorChangeExecute(e);
  })
  //background Color Change Input
  backgroundColorChangeInput.addEventListener("input", function(e){
    colorChangeExecute(e);
  })




  //Collapse All Button
  collapseAllBtn.addEventListener("click", function(e){
    toggleCollapseAll(e);
  })

  //Table Event Delegation Event Listeners

  //Table Key Press
  table.addEventListener("keypress", function(e){
    if (e.target.classList.contains("name-input") && e.keyCode === 13){
      updateName(e);
    }
  });
  table.addEventListener("keypress", function(e){
    if (e.target.classList.contains("number-input") && e.keyCode === 13){
      updateValue(e);
    }
  });

  //Table Click Event
  table.addEventListener("click", function(e){
    const target = e.target;
    //Click on minimize buttons:
    if(target.classList.contains("add-item-btn")){
      //Add an item, passing through the target (which has an id which is attached to the category)
      const parent = target.parentElement.parentElement.DATARef;
      newItem(parent);
      return;
    }

    if(target.classList.contains('collapse-expand-btn')){
      toggleCollapse(target.parentElement.parentElement.DATARef, target)
    }

    if (target.classList.contains("add-sub-category-btn")){
      //Add Sub Category
      const parent = target.parentElement.parentElement.DATARef;
      newSubCategory(parent);
      return;
    }

    if (target.classList.contains("delete-master-category-btn")){
      deleteMasterCategory(target.parentElement.parentElement);
      return;
    }

    if (target.classList.contains("delete-sub-category-btn")){
      deleteSubCategory(target.parentElement.parentElement);
      return;
    }

    if (target.classList.contains("delete-item-btn")){
      deleteItem(target.parentElement.parentElement);
      return;
    }

    if (target.classList.contains("color-btn")){
      colorChange(target.parentElement.parentElement);
      return;
    }
    
  })-

  //Cancel object movement if escape key is pressed
  document.addEventListener('keydown', function(e){
    if (e.keyCode === 27 && dragItem){

      if(mouseOverObj){
        mouseOverObj.classList.remove("hover-top");
        mouseOverObj.classList.remove("hover-bottom");
      }
  
      // Remove the attached event from the element so it doesn't keep following your mouse. :)
  
      dragObject.style.position = 'relative';
      dragObject.style.top = "0";
      dragObject.classList.remove("drag-object");
     
  
      showAllUnhiddenItems();  
      dragObject = false;
      dragging = false;
      mouseOverObj = null;
      document.body.classList.remove("disable-pointer-events");
      insertPosition = null;
      e.preventDefault();
    }


  })

  document.addEventListener('mousedown', function(e){
    if (dragObject){
      if (dragObject.classList.contains("table-item")){
          dropItem(e);
          addHighlightClass();

        } else if (dragObject.classList.contains("sub-category-header")){
          dropSubCategory(e);
          addHighlightClass();

        } else if (dragObject.classList.contains("master-category-header")){
          dropMasterCategory(e);
          addHighlightClass();
        }
    }  if (e.target.classList.contains("move-btn")){
        if (e.target.parentElement.parentElement.classList.contains("master-category-header")){
          removeHighlightClass();
          dragMasterCategory(e);

          } else if (e.target.parentElement.parentElement.classList.contains("sub-category-header")){
          removeHighlightClass();
          dragSubCategory(e);

          } else if (e.target.parentElement.parentElement.classList.contains("table-item")){
          removeHighlightClass();
          dragItem(e);

          }
        }

  });



  table.addEventListener("mouseover", function(e){
  if (e.target.classList != null){
  if (dragObject && e.target.classList.contains("table-row")){
    if(dragObject.classList.contains("table-item")){
      mouseOverItem(e);
    }
    else if(dragObject.classList.contains("sub-category-header")){
      mouseOverSubCategory(e);
    }
    else if(dragObject.classList.contains("master-category-header")){
      mouseOverMasterCategory(e);
    }

  }
  }});

  document.addEventListener("mousemove", function(e){
    if(dragObject){
      if(dragObject.classList.contains("table-item")){
        moveItem(e);
      }
      else if(dragObject.classList.contains("sub-category-header")){
        moveSubCategory(e);
      }
      else if(dragObject.classList.contains("master-category-header")){
        moveMasterCategory(e);
      }
      
    }
  });

}


function newItem(parent){
  if (parent.hidden === true){
    toggleCollapse(parent, parent.DOMRef.children[1].children[0])
    }


  const newItem = new Item(parent);
  new ItemDOMElement(parent, newItem);
  newItem.DOMRef.children[3].children[0].focus();
  

  setLocalStorage();

}

function newSubCategory(parent){
  if (parent.hidden === true){
    toggleCollapse(parent, parent.DOMRef.children[1].children[0])
    }
  const newSubCategory = new SubCategory(parent);
  


  new SubCategoryDOMElement(parent, newSubCategory);
  newItem(newSubCategory);
  newSubCategory.DOMRef.children[3].children[0].focus()

  setLocalStorage();
}

function deleteItem(item){
  const subCategory = item.DATARef.subCategory;
  itemIndex = (subCategory.items.indexOf(item.DATARef));
  subCategory.items.splice(itemIndex, 1);
  item.remove();


  updateTotals();
  updateUITotal(item.DATARef.subCategory);
  updateUITotal(item.DATARef.masterCategory);
  updatePercentages(item.DATARef.masterCategory);

  setLocalStorage();
}

function deleteSubCategory(subCategory){
  const masterCategory = subCategory.DATARef.masterCategory;
  const subCategoryIndex = (masterCategory.subCategories.indexOf(subCategory.DATARef));
  masterCategory.subCategories.splice(subCategoryIndex, 1);
  subCategory.parentElement.remove();

  updateTotals();
  updateUITotal(subCategory.DATARef);
  updateUITotal(subCategory.DATARef.masterCategory);
  updatePercentages(subCategory.DATARef.masterCategory);

  setLocalStorage();
}

function deleteMasterCategory(masterCategory){
  const masterCategoryIndex = (data.masterCategories.indexOf(masterCategory.DATARef)); 
  data.masterCategories.splice(masterCategoryIndex, 1);
  masterCategory.parentElement.remove();

  setLocalStorage();

}




//Add comma separators to numbers (1250 to 1,250)
function getNumberAsString(num){
  //Returns the number with comma separators (1000 becomes 1,000)
  num = num.toLocaleString('en');
  //If there is a decimal space in the number and only one digit after it, add a second one (i.e 12.5 becomes 12.50)
  if (num.split('.').length > 1 && num.split('.')[1].length < 2){
    //Add a zero on to the end of number
    num += '0'
  }
  return num;
}


function toggleCollapse(item, button){

  if (item.type === "Master Category"){
    if (item.hidden === true){
      expandMasterCategory(item, button);

    } else {
      collapseMasterCategory(item, button);
    }
  } else if(item.type === 'Sub Category'){
    if (item.hidden === true){
      expandSubCategory(item, button);
    } else {
      collapseSubCategory(item, button);
    }
  }

}

function collapseMasterCategory(masterCategory, button){
  let text = masterCategory.name;
  if (text == ""){
    text = 'Master Category';
  }
  masterCategory.hidden = true;
  button.innerHTML = `<i class="fas fa-caret-right"></i>`
  button.classList.remove("collapse-btn")
  button.setAttribute("title", `Expand ${text}`)
  masterCategory.subCategories.forEach(function(subCategory){
    subCategory.DOMRef.style.display = "none";
    subCategory.items.forEach(function(item){
      item.DOMRef.style.display="none";
    })
  })

  setLocalStorage();
}

function expandMasterCategory(masterCategory, button){
  let text = masterCategory.name;
  if (text == ""){
    text = 'Master Category';
  }
  masterCategory.hidden = false;
  button.innerHTML = `<i class="fas fa-caret-down"></i>`
  button.classList.add("collapse-btn")
  button.setAttribute("title", `Collapse ${text}`)
  masterCategory.subCategories.forEach(function(subCategory){
    subCategory.DOMRef.style.display = "grid";
    if(subCategory.hidden === false){
      subCategory.items.forEach(function(item){
        item.DOMRef.style.display = "grid";
      })
    }
  })

  setLocalStorage();
}

function collapseSubCategory(subCategory, button){
  let text = subCategory.name;
  if (text == ""){
    text = 'Sub Category';
  }
  button.innerHTML = `<i class="fas fa-angle-right"></i>`
  button.classList.remove("collapse-btn");
  button.setAttribute("title", `Expand ${text}`);
  subCategory.hidden = true;
  subCategory.items.forEach(function(item){
    item.hidden = true;
    item.DOMRef.style.display = 'none';
  })

  setLocalStorage();
}

function expandSubCategory(subCategory, button){
  let text = subCategory.name;
  if (text == ""){
    text = 'Sub Category';
  }
  subCategory.hidden = false;
  button.innerHTML = `<i class="fas fa-angle-down"></i>`;
  button.classList.add("collapse-btn");
  button.setAttribute("title", `Collapse ${text}`)
      subCategory.items.forEach(function(item){
        item.hidden = false;
        item.DOMRef.style.display = 'grid';
      });

      setLocalStorage();
}

function showAllUnhiddenItems(dragObject){
  data.masterCategories.forEach(function(masterCategory){
    if(masterCategory.hidden === false){
      masterCategory.subCategories.forEach(function(subCategory){
        subCategory.DOMRef.style.display = "grid";
        if (subCategory.hidden === false){
          subCategory.items.forEach(function(item){
            item.DOMRef.style.display = "grid";
          })
        }
      })
    }
  })
}


function updateName(e){
  e.target.parentElement.parentElement.DATARef.name = e.target.value;
  if(e.target.parentElement.parentElement.classList.contains("master-category-header")){
    updatePercentageTitle(e.target.parentElement.parentElement.DATARef);
  }
  if (e.target.parentElement.parentElement.classList.contains("master-category-header") || e.target.parentElement.parentElement.classList.contains("sub-category-header")){
    updateCollapseButtonTitle(e.target.parentElement.parentElement)
  }

  setLocalStorage();
}

function updateValue(e){
  if (e.target.classList.contains("weekly-input")){
    updateItemWeekyInput(e)
  } else if (e.target.classList.contains("monthly-input")){
    updateItemMonthlyInput(e)
  } else if (e.target.classList.contains("yearly-input")){
    updateItemYearlyInput(e)
  }

}

function removeCharactersFromNumber(num){
  num = Number(num.replace(/[^0-9.]/g, ''));
  return num;
}

//Add comma separators to numbers (1250 to 1,250)
function getNumberAsString(num){
  //Returns the number with comma separators (1000 becomes 1,000)
  num = num.toLocaleString('en');
  //If there is a decimal space in the number and only one digit after it, add a second one (i.e 12.5 becomes 12.50)
  if (num.split('.').length > 1 && num.split('.')[1].length < 2){
    //Add a zero on to the end of number
    num += '0'
  }
  return num;
}


function updateItemWeekyInput(e){
  //Get string from input box
  let newValue = e.target.value;
  //Remove non-number characters and get as a number
  newValue = removeCharactersFromNumber(newValue);
  //get item to update
  let item = e.target.parentElement.parentElement.DATARef;
  item.weekly = newValue;
  item.monthly = newValue * 52 / 12;
  item.yearly = newValue * 52;


  updateSubCategoryTotalData(item.subCategory);
  updateMasterCategoryTotalData(item.masterCategory);
  updateUITotal(item.subCategory);
  updateUITotal(item.masterCategory);
  updateItemInputValues(item);
  updatePercentages(item.masterCategory);
  e.target.blur(); 

  setLocalStorage();
}
function updateItemMonthlyInput(e){
  //Get string from input box
  let newValue = e.target.value;
  //Remove non-number characters and get as a number
  newValue = removeCharactersFromNumber(newValue);
  //get item to update
  let item = e.target.parentElement.parentElement.DATARef;
  item.weekly = newValue * 12 / 52;
  item.monthly = newValue;
  item.yearly = newValue * 12;

  updateSubCategoryTotalData(item.subCategory);
  updateMasterCategoryTotalData(item.masterCategory);
  updateUITotal(item.subCategory);
  updateUITotal(item.masterCategory);
  updateItemInputValues(item);
  updatePercentages(item.masterCategory);
  e.target.blur();
  
  setLocalStorage();
}
function updateItemYearlyInput(e){
  //Get string from input box
  let newValue = e.target.value;
  //Remove non-number characters and get as a number
  newValue = removeCharactersFromNumber(newValue);
  //get item to update
  let item = e.target.parentElement.parentElement.DATARef;
  item.weekly = newValue / 52;
  item.monthly = newValue / 12;
  item.yearly = newValue;

  updateSubCategoryTotalData(item.subCategory);
  updateMasterCategoryTotalData(item.masterCategory);
  updateUITotal(item.subCategory);
  updateUITotal(item.masterCategory);
  updateItemInputValues(item);
  updatePercentages(item.masterCategory);
  e.target.blur(); 

  setLocalStorage();
}

function updateSubCategoryTotalData(subCategory){
  let weekly = 0;
  subCategory.items.forEach(function(item){
    weekly += item.weekly;
  })
  subCategory.weekly = weekly;
  subCategory.monthly = weekly * 52 / 12;
  subCategory.yearly = weekly * 52;
}

function updateMasterCategoryTotalData(masterCategory){
  let weekly = 0;
  masterCategory.subCategories.forEach(function(subCategory){
    weekly += subCategory.weekly;
  })
  masterCategory.weekly = weekly;
  masterCategory.monthly = weekly * 52 / 12;
  masterCategory.yearly = weekly * 52;
}




function updateUITotal(category){
  category.DOMRef.children[4].innerText = `$${getNumberAsString(Number(category.weekly.toFixed(2)))}`
  category.DOMRef.children[5].innerText = `$${getNumberAsString(Number(category.monthly.toFixed(2)))}`
  category.DOMRef.children[6].innerText = `$${getNumberAsString(Number(category.yearly.toFixed(0)))}`
}


function updateItemInputValues(item){
  item.DOMRef.children[4].children[0].value =  `$${getNumberAsString(Number(item.weekly.toFixed(2)))}`;
  item.DOMRef.children[5].children[0].value =  `$${getNumberAsString(Number(item.monthly.toFixed(2)))}`;
  item.DOMRef.children[6].children[0].value =  `$${getNumberAsString(Number(item.yearly.toFixed(0)))}`;
}

function updatePercentages(masterCategory){
  //Loop thorugh all master categories
  masterCategory.subCategories.forEach(function(subCategory){
    //Find subCategory percentage of master Category
    subCategory.percent = subCategory.weekly / masterCategory.weekly * 100;
    //Update DOM for categories
    if (isNaN(subCategory.percent)){
      subCategory.DOMRef.children[7].innerText = `0%`;
    
    } else {
      subCategory.DOMRef.children[7].innerText = `${percentDisplay(subCategory.percent)}%`;
    }

    //Then loop through items in the subCategory
    subCategory.items.forEach(function(item){
      //Add percentage to item
      item.percent = item.weekly / masterCategory.weekly * 100;
      //Update DOM for item
      if (isNaN(item.percent)){
      item.DOMRef.children[7].innerText = `0%`;      
      } else {
        item.DOMRef.children[7].innerText = `${percentDisplay(item.percent)}%`;
      }
    })
  })
}

//This function is to fix rounding errors which are happening (ie 55.00000000000001 %) and get them to either whole numbers (55%) or decimals if necessary (i.e 0.2%) while avoiding decimals such as 55.0% displaying
function percentDisplay(percent){
  //split number at decimal place
  percentDecimal = String(percent).split('.');
  //if there is any value after the decimal place
  if (percentDecimal[1]){
    // round percent to one decimal places
    percent = String(Number(percent.toFixed(1)));
     
  }

  return percent;
}

function updatePercentageTitle(masterCategory){
  let text = 'Master Category';
  if (masterCategory.name){
    text = masterCategory.name;
  }
  masterCategory.subCategories.forEach(function(subCategory){
    subCategory.DOMRef.children[7].setAttribute("title", `Percentage of ${text}`)
    subCategory.items.forEach(function(item){
    item.DOMRef.children[7].setAttribute("title", `Percentage of ${text}`)

    })
  })

  setLocalStorage();
}

function toggleCollapseAll(e){
  if (e.target.classList.contains('collapse-btn')){
    collapseAll(e.target);
  } else {
    expandAll(e.target);
  }

  setLocalStorage();
}

function collapseAll(button){
  data.masterCategories.forEach(function(masterCategory){
    collapseMasterCategory(masterCategory, masterCategory.DOMRef.children[1].children[0])
    masterCategory.subCategories.forEach(function(subCategory){
      collapseSubCategory(subCategory, subCategory.DOMRef.children[1].children[0]);
    })
  })


  button.classList.remove("collapse-btn");
  button.innerHTML = `<i class="fas fa-caret-right"></i>`
  button.setAttribute("title", "Expand All")
}
function expandAll(button){
  data.masterCategories.forEach(function(masterCategory){
    expandMasterCategory(masterCategory, masterCategory.DOMRef.children[1].children[0])
    masterCategory.subCategories.forEach(function(subCategory){
      expandSubCategory(subCategory, subCategory.DOMRef.children[1].children[0]);
    })
  })

  button.classList.add("collapse-btn");
  button.innerHTML = `<i class="fas fa-caret-down"></i>`
  button.setAttribute("title", "Collapse All")
}




function updateCollapseButtonTitle(category){
  let text = category.DATARef.name;
  if (text == ""){
    if (category.classList.contains("sub-category-header")){
      text = "Sub Category";
    } else if (category.classList.contains("master-category-header")){
      text = "Master Category";
    }
  }
  const button = category.children[1].children[0];
  if (button.classList.contains("collapse-btn")){
    button.setAttribute("title", `Collapse ${text}`)
  } else {
    button.setAttribute("title", `Expand ${text}`)

  }
}

function toggleCheckAll(e){
  if (e.target.checked === true){
    checkAll();
  } else {
    uncheckAll();
  }
}

function checkAll(){
  table.querySelectorAll("input[type='checkbox']").forEach(function(checkbox){
    checkbox.checked = true;
  })
}
function uncheckAll(){
  table.querySelectorAll("input[type='checkbox']").forEach(function(checkbox){
    checkbox.checked = false;
  })
}

function colorChange(item){
  colorChangeItem = item;
  backgroundColorChangeInput.value = item.DATARef.backgroundColor;
  backgroundColorChangeInput.click();

}

function colorChangeExecute(event){
colorChangeItem.style.backgroundColor = event.target.value;
colorChangeItem.DATARef.backgroundColor = event.target.value;

setLocalStorage();
}


function removeHighlightClass(){
  const items = document.querySelectorAll(".table-row");
  items.forEach(function(item){
    item.classList.remove("highlight")
  });

}

function addHighlightClass(){
  const items = document.querySelectorAll(".table-row");
  items.forEach(function(item){
    item.classList.add("highlight")
  });
}

function addActiveClass(e){
  e.target.parentElement.parentElement.classList.add("active");
}

function removeActiveClass(e){
  e.target.parentElement.parentElement.classList.remove("active");
}


//Local storage
function setLocalStorage(){
 try {
   localStorage.setItem("data", JSON.stringify(data, getCircularReplacer()));
   localData = JSON.stringify(data, getCircularReplacer());
   
  } catch {
    console.log("error setting data in local storage, try enabling third party cookies")
  }
}

function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return value;
  };
};


function getLocalStorage(){
  try {
    const storageData = JSON.parse(localStorage.getItem("data"));
    console.log(storageData)
    // if ((storageData.masterCategories.length < 1)){
    //   exampleCategories();
    //   console.log('wtf')
    // }
    //loop through stored data mastercategories
    for(i = 0; i < storageData.masterCategories.length; i++){
      //Create Master Category
      const masterCat = new MasterCategory(storageData.masterCategories[i].name, storageData.masterCategories[i].backgroundColor, storageData.masterCategories[i].hidden);
      new MasterCategoryDOMElement(masterCat);

      //loop through subcategories
      for (j = 0; j < storageData.masterCategories[i].subCategories.length; j++){
        //Create Sub Category
        const subCat = new SubCategory(masterCat, storageData.masterCategories[i].subCategories[j].name, storageData.masterCategories[i].subCategories[j].backgroundColor, storageData.masterCategories[i].subCategories[j].hidden);
        new SubCategoryDOMElement(masterCat, subCat);

        subCat.masterCategory = masterCat;


        //loop through Items
        for (k = 0; k < storageData.masterCategories[i].subCategories[j].items.length; k++){
          //Create Item
          //Get item values from stored data
          weekly = storageData.masterCategories[i].subCategories[j].items[k].weekly; 
          monthly = storageData.masterCategories[i].subCategories[j].items[k].monthly; 
          yearly = storageData.masterCategories[i].subCategories[j].items[k].yearly; 
          hidden = storageData.masterCategories[i].subCategories[j].items[k].hidden; 

          const newItem = new Item(subCat, storageData.masterCategories[i].subCategories[j].items[k].name, weekly, monthly, yearly, hidden);

          newItem.subCategory = subCat;
          newItem.masterCategory = masterCat;


          new ItemDOMElement(subCat, newItem);

        
        }

        //If subcategory is collapsed, collapse it
        if(subCat.hidden === true){
          collapseSubCategory(subCat, subCat.DOMRef.children[1].children[0]);
        }
        //Update subcategory values
        updateSubCategoryTotalData(subCat);
        updateUITotal(subCat);

        updateCollapseButtonTitle(subCat.DOMRef)



        
      }

      //if Mastercategory is collapsed, collapse it
      if(masterCat.hidden === true){
        collapseMasterCategory(masterCat, masterCat.DOMRef.children[1].children[0]);
      }

      //Update Master Category values
      updateMasterCategoryTotalData(masterCat);
      updateUITotal(masterCat);

      //Update percentages
      updatePercentages(masterCat);

      //Update percentage t and collapse button titles (mouseover text)
      updatePercentageTitle(masterCat)
      updateCollapseButtonTitle(masterCat.DOMRef)
    }

  } catch {
    //error with local data here
    exampleCategories();
  } 

  if (data.masterCategories.length < 1){
    exampleCategories();
    }


}