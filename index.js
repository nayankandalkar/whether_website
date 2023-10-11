console.log("abcd");

//  async  function abcd(){

//     let city="yaVATmal";
//     let apiId="d6e167d8ef660ae3e691a37c04481792"

//     try{

//     let a= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiId}`);
//     let b=await   a.json();
    
    
    
//      console.log(`${b?.wind?.speed}  *C`);
//      console.log(b);



//      let newpara=document.createElement('p');
//      let ca=`${b?.main?.temp.toFixed(2)} *C`;
//       newpara.textContent=parseFloat(ca)-273;
//       document.body.appendChild(newpara);




//     }catch(error){
//              console.log("error fgfhh ");
//     }

 
   
// }

//abcd();



// async function news(){
//    let a=await fetch("https://newsapi.org/v2/everything?q=tesla&from=2023-08-26&sortBy=publishedAt&apiKey=2cbc507273d440c88433593ae1f8d851");
//    let b=  await a.json();

//    let c=b.articles;

//    console.log(c[3].url);   
// }

// news();



// function switchTag(){
//     apiErrorContainer.classList.remove("active");

//     if(clickedTab != currentTab){
//         currentTab.classList.remove("current-tab");
//         currentTab=clickedTab;
//         currentTab.classList.add("current-tab");


//         if(!searchFrom.classList.contains("active")){

//             userInfoContainer.classList.remove("active");
//             grantAcessContainer.classList.remove("active");
//             searchFrom.classList.add("active");
//         }else{
//             searchFrom.classList.remove("active");
//             userInfoContainer.classList.remove("active");
//             getFromSessionStorage();
//         }

//     }
// }


// function getLocation(){
//     if(navigator.geolocation){
//         navigator.geolocation.getCurrentPosition(showPosition);
//     }else{
//         console.log("no")
//     }
// }

// function showPosition(position){

//     let latitude=position.coords.latitude;
//     let longitude=position.coords.longitude;
//     console.log(  "lattitude "+latitude ,"longitude"+longitude)
// }

// getLocation();

// Geolocation.getCurrentPosition();



const usertabs=document.querySelector("[data-userWhether]");
const searchTab=document.querySelector("[data-searchWhether]");
const  WhetherContainer=document.querySelector(".whether-container");


let err=document.querySelector(".error");
let errpara=document.querySelector(".abcd");


const userContainer = document.querySelector(".whether-container");

const inputsearch=document.querySelector('[data-searchInput]');

const grantAcesscontainer=document.querySelector(".grant-location-container");

const searchForm=document.querySelector("[data-searchfrom]");
const loadingScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container")
console.log(usertabs);

 let currentTab=usertabs;

const API_key="b90446d3641b63b52381f3367ba23f2c";

currentTab.classList.add("current-tab");

getFromSessionStorage();


 
usertabs.addEventListener('click',()=>{
    switchTab(usertabs);
});

searchTab.addEventListener('click',()=>{
    switchTab(searchTab);
})

function switchTab(clickedTab){
    if(clickedTab != currentTab){
       // console.log(clickedTab);

        currentTab.classList.remove("current-tab");
        currentTab= clickedTab;
        currentTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            userInfoContainer.classList.remove("active");
            grantAcesscontainer.classList.remove("active");
            searchForm.classList.add("active");
        }else{
            searchForm.classList.remove("actve");
            userInfoContainer.classList.remove("active");
           // grantAcesscontainer.classList.remove("active");
           // grantAcesscontainer.classList.remove("active");
           searchForm.classList.remove("active");
           // searchForm.remove();
           
            getFromSessionStorage();
        }
    }
 
}





 

function getFromSessionStorage(){
    const localCordinate=sessionStorage.getItem("user-coordinates");
    if(!localCordinate){
        grantAcesscontainer.classList.add("active");
    }else{
        const coordinates=JSON.parse(localCordinate);
        fetchUserWhether(coordinates);
    }
}

async function  fetchUserWhether(coordinates){
    const {lat ,lon}=coordinates;
    grantAcesscontainer.classList.remove("active");
    loadingScreen.classList.add("active");
 try{

    const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`);
     const data=await res.json(); 
     loadingScreen.classList.remove("active");
     userInfoContainer.classList.add("active");
     renderWhetherInfo(data);

 }catch(err){
     loadingScreen.classList.remove("active");
}



}


function renderWhetherInfo(whetherInfo){
    const cityName=document.querySelector('[data-cityName]');
    const countryIcon=document.querySelector('[data-countryIcon]');
    const description=document.querySelector('[data-whetherDesc]');
    const whetherIcon=document.querySelector('[data-whetherIcon]');
    const  tempreture=document.querySelector('[data-tempreture]');
    const windspeed=document.querySelector('[data-windspeed]');
    const humidity=document.querySelector('[data-humidity]');
    const cloudiness=document.querySelector('[data-cloudiness]');

    try{

       

    cityName.innerText=whetherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${whetherInfo?.sys?.country.toLowerCase()}.png`
     description.innerText=whetherInfo?.weather?.[0].description;
     whetherIcon.src= `http://openweathermap.org/img/w/${whetherInfo?.weather?.[0]?.icon}.png`;
  
     let a=whetherInfo?.main?.temp;
     let b=parseFloat(a);
     let c=b-273.15
  
     tempreture.innerText=c.toFixed(3);
     humidity.innerText=whetherInfo?.main?.humidity +`  %`;
     windspeed.innerText=whetherInfo?.wind?.speed +`  m/s`;
     cloudiness.innerText=whetherInfo?.clouds?.all +`  %`;
    }catch(e){
        console.log("mayur mayur")
    }

    if(whetherInfo?.message){
        console.log("mayur ");
        userInfoContainer.classList.remove("active");
       // grantAcesscontainer.classList.remove("active");
       
         err.classList.add("active");
         
         errpara.classList.add("active");
    }else{
        err.classList.remove("active");
        
        errpara.classList.remove("active");
    }

    

}

 const grantAcessButton =document.querySelector('[data-grantacess]');

//  grantAcessButton.addEventListener('click',()=>{
//     getlocation();
//  })

 function getlocation(){
    if(navigator.geolocation){
navigator.geolocation.getCurrentPosition(showposition);
    }else{

        console.log("abcd");
    }
 }

 function showposition(position){
    const usercoordinate={
     lat: position.coords.latitude,
     lon:position.coords.longitude
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(usercoordinate));
    fetchUserWhether(usercoordinate);
 }



 
const grantAccessButton1 = document.querySelector("[data-grantAccess]");

grantAccessButton1.addEventListener("click", getlocation);

const searchInput = document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        fetchSearchWeatherInfo(cityName);
})

async function fetchSearchWeatherInfo(city) {
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAcesscontainer.classList.remove("active");

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWhetherInfo(data);
    }
    catch(err) {
        //hW
    }
}






// let  abcd = document.querySelector('[data-searchInput]');
// console.log(abcd);

 

searchForm.addEventListener('submit',(e)=>{
console.log("ok ok");
    let cityName=inputsearch.value;

    if(cityName === ""){
        return
    }else{
       // fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_key}`)
   
       fetchsearchWhetherInfo(cityName);
     //  inputsearch.innerText=" ";
     //  inputsearch.placeholder="enter the city name"
    //  let a=inputsearch.value;
    //  a.remove();
     inputsearch.value="";
    }
})

async function fetchsearchWhetherInfo(city){
loadingScreen.classList.add("active");
userInfoContainer.classList.remove("active");
 
grantAcesscontainer.classList.remove("active");
try{
    let a=await  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}`)
   let b=await a.json();
   console.log(b);
   loadingScreen.classList.remove("active");
   userInfoContainer.classList.add("active");



    renderWhetherInfo(b);
   
     
}catch(e){

}
}