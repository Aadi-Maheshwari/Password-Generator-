const inputslider=document.querySelector("[data-length-slider]");
const lengthDisplay = document.querySelector("[data-length-container]");
const uppercase=document.querySelector("#uppercase");
const lowercase=document.querySelector("#lowercase");
const numbers=document.querySelector("#numbers");
const symbols=document.querySelector("#symbols");
const indecator=document.querySelector("[data-indecator]");
const generatepass=document.querySelector('.generatepass');
const datacopyMsg=document.querySelector("[data-copyMsg]");
const allCheckbox = document.querySelectorAll("input[type=checkBox]")
const copybtn=document.querySelector("[copybtn]");
const passDISPLay = document.querySelector(".display");
const symbols2='!@#$%^&*()~{}[]|\:;/<>';

 let password="";
 let passwordlength = 10;
 let checkcount=0;
 handleslider();
 setIndicator("#ccc")

// pass length ko ui prr reflect krata hai 
 function  handleslider(){
  inputslider.value = passwordlength;
  lengthDisplay.innerText = passwordlength;
  const min = inputslider.min;
  const max = inputslider.max;
  inputslider.style.backgroundSize = ((passwordlength-min)*100/(max - min)) + "% 100%";
 }
//  strength ki ball ka color
 function setIndicator(color){
  indecator.style.backgroundColor = color;
 }
// it use for ramndom no. between two points 
 function getrandomint(min,max){
  return Math.floor(Math.random()*(max-min)+min); 
 }

 function generatenumber(){
  return getrandomint(0,9);
 }

 function generatelower(){
  return String.fromCharCode(getrandomint(97,123));
 }

 function generateupper(){
  return String.fromCharCode(getrandomint(65,91));
 }

 function generatesymbol(){
  const random=getrandomint(0,symbols2.length);
  return symbols2.charAt(random);
 }

 function calcstrength(){
  let hasupper = false;
  let haslower = false;
  let hasnum = false;
  let hassymbol = false;
  if(uppercase.checked) hasupper = true;
  if(lowercase.checked) haslower = true;
  if(numbers.checked) hasnum = true;
  if(symbols.checked) hassymbol = true;

  if(hasupper && haslower && (hasnum || hassymbol) && passwordlength >=8){
    setIndicator("#0f0");
  } else if((haslower||hasupper) && (hasnum || hassymbol) && passwordlength>=6){
    setIndicator("#ff0");
  }
  else{
    setIndicator("#f00");
  }
 }
  
  // clipboard prr copy krta hai 
 async function copycontent(){
  try {
    await navigator.clipboard.writeText(passDISPLay.value);
    copybtn.innerText = "copied";
  } 
  catch(e){
    copybtn.innerText="failed"; 
  }
  copybtn.classList.add("active");
  setTimeout(() => {
    copybtn.classList.remove("active");
  }, 2000);
 }
        // slider ot no. ko connect karta h 
 inputslider.addEventListener('input',(e)=>{
  passwordlength = e.target.value;         
  handleslider();
 })

 copybtn.addEventListener('click',()=>{
  if(passDISPLay.value){
    copycontent();
  }
 })

 function handlecheckboxchange(){
  checkcount=0;
  allCheckbox.forEach((checkbox)=>{
    if(checkbox.checked)
      checkcount++;
  });
  if(passwordlength< checkcount){
        passwordlength=checkcount;
        handleslider();
 }
}
 
 allCheckbox.forEach((checkbox)=>{
  checkbox.addEventListener('change', handlecheckboxchange);
 })

 generatepass.addEventListener('click',()=>{
  if(checkcount== 0) return;
  if(passwordlength < checkcount){
    passwordlength = checkcount;
    handleslider();
  }
  password="";
  // if(uppercase.checked){
  //   password +=generateupper();
  // }
  // if(lowercase.checked){
  //   password +=generatelower();
  // }
  // if(numbers.checked){
  //   password+=generatenumber();
  // }
  // if(symbols2.checked){
  //   password+=generatesymbol();
  // }

  let funcArr = [];
  if(uppercase.checked){
       funcArr.push(generateupper);
    }
    if(lowercase.checked){
      funcArr.push(generatelower);
    }
    if(numbers.checked){
      funcArr.push(generatenumber);
    }
    if(symbols.checked){
      funcArr.push(generatesymbol);
    }

    // compulsary addition 
    for (let i = 0; i < funcArr.length; i++) {
      password += funcArr[i]();  
    }
    
    // remaining addition 
    for(let i=0;i<passwordlength-funcArr.length;i++){
      let randIndex = getrandomint(0,funcArr.length);
      password += funcArr[randIndex]();
    }


    // shufle the pass
    password = shufflepass(Array.from(password));

    // show in UI

    passDISPLay.value = password;
    // calc strength 
    calcstrength();

 })


//  fisher yates method 
 function shufflepass(array){
  for(let i = array.length - 1;i > 0; i--){
    const j = Math.floor(Math.random() * (i+1));
    const temp =array[i];
    array[i]=array[j];
    array[j]=array[i];
  }
  let str ="";
  array.forEach((el)=>(str+=el));
  return str;
 }