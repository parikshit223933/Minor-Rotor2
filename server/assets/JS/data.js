console.log('data-----------------JS')

var couple = document.getElementsByClassName('couple');
console.log(couple)
const couple_length= couple.length
for(let i=0;i<couple_length;i++){
    console.log(couple[i].children);
   for(let j=0;j<couple[i].childElementCount;j++){
         if(j<couple[i].childElementCount-1){
             couple[i].children[j].style.borderBottom='0.1px solid #ffc662'
         }
   }
}
var navz = document.getElementsByTagName("nav");
window.onscroll=()=>{
    if()
}