let tableOffset;
let mouseOverObj = null;
let mouseYOffset;
let dragObjectPositionTop;
let tableYStartPosition;
objY = null;
let insertPosition = + 1;

let dragObject = null;
let y, prev_y;
let dragging = false;

function dragItem(e){
  document.body.classList.add("disable-pointer-events");

  //Set object to be dragged
  dragObject = e.target.parentElement.parentElement;

  // showAllUnhiddenItems();
  
  //Get Y position from top of window
  mouseY = e.clientY;

  //Get Y position of drag object from top of window
  dragObjectPositionTop = dragObject.getBoundingClientRect().y;

  //Get offset from mouse to drag object
  mouseYOffset = mouseY - dragObjectPositionTop;
  mouseYOffset = 20;
  
  //Set top position of drag object
  dragObject.style.top = dragObjectPositionTop + pageYOffset + 'px';
  //Make drag object position absolute
  dragObject.style.position = "absolute";

  dragObject.classList.add("drag-object")
  //Remove transiton duration so that the drag object follows the mouse without a delay
  dragging = true;

  mouseOverObj = dragObject.previousElementSibling;
  mouseOverObj.classList.add("hover-bottom")
}
function mouseOverItem(e){

  if(e.target.classList.contains("table-item")){
    let yPosition = e.clientY - e.target.getBoundingClientRect().y;
    if (yPosition < 20){
      mouseOverObj.classList.remove("hover-top")
      mouseOverObj.classList.remove("hover-bottom")
      e.target.classList.add("hover-top");
      mouseOverObj = e.target;
    } else {
      mouseOverObj.classList.remove("hover-top")
      mouseOverObj.classList.remove("hover-bottom")
      e.target.classList.add("hover-bottom");
      mouseOverObj = e.target;
    }
  }

}
function moveItem(e){
    tableYStartPosition = table.getBoundingClientRect().y;
    //track y position of mouse
    y = e.clientY + pageYOffset;
    //Set y position of drag object
    dragObject.style.top = y - mouseYOffset + 'px';


      // move change position of empty slot form top to bottom/bottom to top when moving over center of items
      if (e.target.classList){
        if(e.target.classList.contains("table-item")){
          let yPosition = e.clientY - e.target.getBoundingClientRect().y;
          if (yPosition < 20){
            e.target.classList.add("hover-top");
            e.target.classList.remove("hover-bottom");
          } else {
            e.target.classList.add("hover-bottom");
            e.target.classList.remove("hover-top");
          }
          mouseOverObj = e.target;
        } else if (e.target.classList.contains("sub-category-header")){
          mouseOverObj.classList.remove("hover-top");
          mouseOverObj.classList.remove("hover-bottom");
          e.target.classList.add("hover-bottom");
          e.target.classList.remove("hover-top");
          mouseOverObj = e.target;
        }
      }
}
function dropItem(e) {

  if(mouseOverObj.classList.contains("sub-category-header")){
    mouseOverObj.parentElement.insertBefore(dragObject, mouseOverObj.parentElement.firstChild.nextElementSibling);
    if (mouseOverObj.DATARef.hidden === true){
      dragObject.style.display = 'none';
    }
    } else if (mouseOverObj.classList.contains("hover-top")){
      mouseOverObj.parentElement.insertBefore(dragObject, mouseOverObj);
      insertPosition = 1;
    } else if (mouseOverObj.classList.contains("hover-bottom")){
      mouseOverObj.parentElement.insertBefore(dragObject, mouseOverObj.nextElementSibling);
      insertPosition = 0;
    }

    if(mouseOverObj){
      mouseOverObj.classList.remove("hover-top");
      mouseOverObj.classList.remove("hover-bottom");
    }

    // Remove the attached event from the element so it doesn't keep following your mouse. :)

    dragObject.style.position = 'relative';
    dragObject.style.top = "0"; 
    dragObject.classList.remove("drag-object");
    
    moveItemData(dragObject, mouseOverObj);
    insertPosition = null;

      
    dragObject = false;
    dragging = false;
    mouseOverObj = null;
    document.body.classList.remove("disable-pointer-events");
    updateTotals();

    setLocalStorage();
}
function dragSubCategory(e){
  document.body.classList.add("disable-pointer-events");

  //Set object to be dragged
  dragObject = e.target.parentElement.parentElement;

  //Hide all items
  data.masterCategories.forEach(function(masterCategory){
    masterCategory.subCategories.forEach(function(subCategory){
      subCategory.items.forEach(function(item){
        item.DOMRef.style.display = "none";
      })
    })
  })
  
  //Get Y position from top of window
  mouseY = e.clientY;

  //Get Y position of drag object from top of window
  dragObjectPositionTop = dragObject.getBoundingClientRect().y;

  //Get offset from mouse to drag object
  mouseYOffset = mouseY - dragObjectPositionTop;
  mouseYOffset = 20;
  
  //Set top position of drag object
  dragObject.style.top = dragObjectPositionTop + pageYOffset + 'px';
  //Make drag object position absolute
  dragObject.style.position = "absolute";

  dragObject.classList.add("drag-object")
  //Remove transiton duration so that the drag object follows the mouse without a delay
  dragging = true;

  mouseOverObj = dragObject.parentElement.previousElementSibling;

  mouseOverObj.classList.add("hover-bottom")
}
function mouseOverSubCategory(e){

  if(e.target.classList.contains("sub-category-header")){
    let yPosition = e.clientY - e.target.getBoundingClientRect().y;
    if (yPosition < 20){
      mouseOverObj.classList.remove("hover-top")
      mouseOverObj.classList.remove("hover-bottom")
      e.target.classList.add("hover-top");
      mouseOverObj = e.target;
    } else {
      mouseOverObj.classList.remove("hover-top")
      mouseOverObj.classList.remove("hover-bottom")
      e.target.classList.add("hover-bottom");
      mouseOverObj = e.target;
    }
  } else if (e.target.classList.contains("master-category-header")){
    mouseOverObj.classList.remove("hover-top");
    mouseOverObj.classList.remove("hover-bottom");
    e.target.classList.add("hover-bottom");
    e.target.classList.remove("hover-top");
    mouseOverObj = e.target;
  }

}
function moveSubCategory(e){


    tableYStartPosition = table.getBoundingClientRect().y;
    //track y position of mouse
    y = e.clientY + pageYOffset;
    //Set y position of drag object
    dragObject.style.top = y - mouseYOffset + 'px';


      // move change position of empty slot form top to bottom/bottom to top when moving over center of items
      if (e.target.classList){
        if(e.target.classList.contains("sub-category-header")){
          let yPosition = e.clientY - e.target.getBoundingClientRect().y;
          if (yPosition < 20){
            e.target.classList.add("hover-top");
            e.target.classList.remove("hover-bottom");
          } else {
            e.target.classList.add("hover-bottom");
            e.target.classList.remove("hover-top");
          }
          mouseOverObj = e.target;
        } else if (e.target.classList.contains("master-category-header")){
          mouseOverObj.classList.remove("hover-top");
          mouseOverObj.classList.remove("hover-bottom");
          e.target.classList.add("hover-bottom");
          e.target.classList.remove("hover-top");
          mouseOverObj = e.target;
        }
      }
}
function dropSubCategory(e) {
  if(mouseOverObj.classList.contains("master-category-header")){
    mouseOverObj.parentElement.insertBefore(dragObject.parentElement, mouseOverObj.parentElement.firstChild.nextElementSibling);
    if(mouseOverObj.DATARef.hidden === true){
      dragObject.style.display = 'none';
      }
    } else if (mouseOverObj.classList.contains("hover-top")){
      mouseOverObj.parentElement.parentElement.insertBefore(dragObject.parentElement, mouseOverObj.parentElement);
      insertPosition = 1;
    } else if (mouseOverObj.classList.contains("hover-bottom")){
      mouseOverObj.parentElement.parentElement.insertBefore(dragObject.parentElement, mouseOverObj.parentElement.nextElementSibling);
      insertPosition = 0;
    }

    if(mouseOverObj){
      mouseOverObj.classList.remove("hover-top");
      mouseOverObj.classList.remove("hover-bottom");
    }

    // Remove the attached event from the element so it doesn't keep following your mouse. :)

    dragObject.style.position = 'relative';
    dragObject.style.top = "0";
    dragObject.classList.remove("drag-object");

    moveSubCategoryData(dragObject, mouseOverObj)

    showAllUnhiddenItems(dragObject);  
    dragObject = false;
    dragging = false;
    mouseOverObj = null;
    document.body.classList.remove("disable-pointer-events");
    insertPosition = null;
    updateTotals();

    setLocalStorage();
}
function dragMasterCategory(e){
  document.body.classList.add("disable-pointer-events");

  //Set object to be dragged
  dragObject = e.target.parentElement.parentElement;

  //Hide all sub categories
  data.masterCategories.forEach(function(masterCategory){
    masterCategory.subCategories.forEach(function(subCategory){
      subCategory.DOMRef.style.display = "none"

      //Hide all items
      subCategory.items.forEach(function(item){
        item.DOMRef.style.display = "none";
      })
    })
  })
  
  //Get Y position from top of window
  mouseY = e.clientY;

  //Get Y position of drag object from top of window
  dragObjectPositionTop = dragObject.getBoundingClientRect().y;

  //Get offset from mouse to drag object
  mouseYOffset = mouseY - dragObjectPositionTop;
  mouseYOffset = 20;
  
  //Set top position of drag object
  dragObject.style.top = dragObjectPositionTop + pageYOffset + 'px';
  //Make drag object position absolute
  dragObject.style.position = "absolute";

  dragObject.classList.add("drag-object")
  //Remove transiton duration so that the drag object follows the mouse without a delay
  dragging = true;

  mouseOverObj = dragObject.parentElement.previousElementSibling;
  if (mouseOverObj == null){
  mouseOverObj = dragObject.parentElement.nextElementSibling;
  mouseOverObj.classList.add("hover-top");
  return;
  }
  mouseOverObj.classList.add("hover-bottom")
  return;
}
function mouseOverMasterCategory(e){

  if(e.target.classList.contains("master-category-header")){
    let yPosition = e.clientY - e.target.getBoundingClientRect().y;
    if (yPosition < 20){
      mouseOverObj.classList.remove("hover-top")
      mouseOverObj.classList.remove("hover-bottom")
      e.target.parentElement.classList.add("hover-top");
      mouseOverObj = e.target.parentElement;
    } else {
      mouseOverObj.classList.remove("hover-top")
      mouseOverObj.classList.remove("hover-bottom")
      e.target.parentElement.classList.add("hover-bottom");
      mouseOverObj = e.target.parentElement;
    }
  }
}
function moveMasterCategory(e){


    tableYStartPosition = table.getBoundingClientRect().y;
    //track y position of mouse
    y = e.clientY + pageYOffset;
    //Set y position of drag object
    dragObject.style.top = y - mouseYOffset + 'px';


      // move change position of empty slot form top to bottom/bottom to top when moving over center of items
      if (e.target.classList){
        if(e.target.classList.contains("master-category-header")){
          let yPosition = e.clientY - e.target.getBoundingClientRect().y;
          if (yPosition < 20){
            e.target.parentElement.classList.add("hover-top");
            e.target.parentElement.classList.remove("hover-bottom");
          } else {
            e.target.parentElement.classList.add("hover-bottom");
            e.target.parentElement.classList.remove("hover-top");
          }
          mouseOverObj = e.target.parentElement;
        } 
      }
}
function dropMasterCategory(e) {
  if (mouseOverObj.classList.contains("hover-top")){
      insertPosition = 1;
      dragObject.parentElement.parentElement.insertBefore(dragObject.parentElement, mouseOverObj);
    } else if (mouseOverObj.classList.contains("hover-bottom")){
      dragObject.parentElement.parentElement.insertBefore(dragObject.parentElement, mouseOverObj.nextElementSibling);
      insertPosition = 0;
    }




  // Remove the attached event from the element so it doesn't keep following your mouse. :)

  dragObject.style.position = 'relative';
  dragObject.style.top = "0";
  dragObject.classList.remove("drag-object");
   
  moveMasterCategoryData(dragObject, mouseOverObj.firstChild);


  mouseOverObj.classList.remove("hover-top");
  mouseOverObj.classList.remove("hover-bottom");
  showAllUnhiddenItems();  
  dragObject = false;
  dragging = false;
  mouseOverObj = null;
  document.body.classList.remove("disable-pointer-events");
  insertPosition = null;

  setLocalStorage();

  
}

function moveMasterCategoryData(masterCategory, newPosition){
  // get the index of the object being moved
  oldIndex = data.masterCategories.indexOf(masterCategory.DATARef);
  //Get object to move
  object = masterCategory.DATARef;
  //Remove object from old position
  data.masterCategories.splice(oldIndex, 1);
  // get the new index position
  newIndex = data.masterCategories.indexOf(newPosition.DATARef) + insertPosition;
  //Insert object at new position
  data.masterCategories.splice(newIndex, 0, object);
}

function moveSubCategoryData(subCategory, newPosition){

  // get the index of the object being moved
  oldIndex = subCategory.DATARef.masterCategory.subCategories.indexOf(subCategory.DATARef);
  //Get object to move
  object = subCategory.DATARef;

  // Remove object from old position
  subCategory.DATARef.masterCategory.subCategories.splice(oldIndex, 1);
  //Insert object in new position
  if(newPosition.classList.contains("sub-category-header")){
    // get the new index position
    newIndex = newPosition.DATARef.masterCategory.subCategories.indexOf(newPosition.DATARef) + insertPosition;
    
    newPosition.DATARef.masterCategory.subCategories.splice(newIndex, 0, subCategory.DATARef);

    //Update reference to master category
    subCategory.DATARef.masterCategory = newPosition.DATARef.masterCategory;

    // //Insert object at new position at top of a master category
  } else if (newPosition.classList.contains("master-category-header")){
    newPosition.DATARef.subCategories.push(subCategory.DATARef);
    subCategory.DATARef.masterCategory = newPosition.DATARef;
  }

  //Update reference of items to master category
  subCategory.DATARef.items.forEach(function(item){
    item.masterCategory = newPosition.DATARef.masterCategory
  })
  updatePercentageTitle(subCategory.DATARef.masterCategory);


}

function moveItemData(item, newPosition){

  // get the index of the object being moved
  oldIndex = item.DATARef.subCategory.items.indexOf(item.DATARef);
  // Remove object from old position
  item.DATARef.subCategory.items.splice(oldIndex, 1);
  
  //Insert object in new position
  if(newPosition.classList.contains("table-item")){
    // get the new index position
    newIndex = newPosition.DATARef.subCategory.items.indexOf(newPosition.DATARef) + insertPosition;
    
    newPosition.DATARef.subCategory.items.splice(newIndex, 0, item.DATARef);

    item.DATARef.subCategory = newPosition.DATARef.subCategory;
    item.DATARef.masterCategory = newPosition.DATARef.masterCategory;

    // //Insert object at new position at top of a subcategory
  } else if (newPosition.classList.contains("sub-category-header")){
   newPosition.DATARef.items.push(item.DATARef);

   item.DATARef.subCategory = newPosition.DATARef;
   item.DATARef.masterCategory = newPosition.DATARef.masterCategory;
  }

  updatePercentageTitle(item.DATARef.masterCategory);
}


function updateTotals(){

  data.masterCategories.forEach(function(masterCategory){
    masterCategory.subCategories.forEach(function(subCategory){
      updateSubCategoryTotalData(subCategory);
      updateUITotal(subCategory);
    });
    updateMasterCategoryTotalData(masterCategory);
    updateUITotal(masterCategory);

    updatePercentages(masterCategory);
  })
}



