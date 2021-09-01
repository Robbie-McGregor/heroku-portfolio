const scrollToContentIcon = document.getElementById("scrollToContentIcon");

scrollToContentIcon.addEventListener("click", function(){
  document.getElementById("contentStart").scrollIntoView({ behavior: 'smooth'});
});