const yourLocation=document.querySelector('#your-location'); 
const cityName=document.querySelector('#city-names'); 
const search_city=document.querySelector('#search-city'); 
const airQuality=document.querySelector('#air-quality');
const aqi=document.querySelector('#aqi');
const coUnit=document.querySelector('#co-unit');
const noUnit=document.querySelector('#no-unit');
const no2Unit=document.querySelector('#no2-unit');
const o3Unit=document.querySelector('#o3-unit');
const so2Unit=document.querySelector('#so2-unit');
const pm25Unit=document.querySelector('#pm25-unit');
const pm10Unit=document.querySelector('#pm10-unit');
const nh3Unit=document.querySelector('#nh3-unit');
const searchBar=document.querySelector('#search-bar');
 const searchAqi=document.querySelector('#searh-aqi');
const images=document.querySelector("#images");
const text_decp=document.querySelector("#text-discp");
const search_section=document.querySelector("#search-section");
const showData=document.querySelector("#ShowData");
const loading=document.querySelector("#loading");
const so2=document.querySelector('#So2');
const no2=document.querySelector('#No2');
const o3=document.querySelector('#O3');
const pm10=document.querySelector('#Pm10');
const Pm25=document.querySelector('#Pm25');
const pm10_limit=document.querySelector('#pm10-limit');
const pm25_limit=document.querySelector('#pm25-limit');
const no2_limit=document.querySelector('#no2-limit');
const o3_limit=document.querySelector('#o3-limit');
const so2_limit=document.querySelector('#so2-limit');






const API_KEY = "d1845658f92b31c64bd94f06f7188c9c"; 
let user_loc = navigator.geolocation;
function geolocator() {
  if (user_loc) {
      user_loc.getCurrentPosition(success);
  } else {
      "Your browser doesn't support geolocation API";
  }
}
function success(data) {
  const c={lat: data.coords.latitude,
   lon: data.coords.longitude};
   fetchUserWeatherInfo(c);
}


async function fetchUserWeatherInfo(position) {

  const {lat, lon}=position;
 console.log(lat," ",lon)
 
 const city = await fetch(
  `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
);
const cityData= await city.json(); 
 



 
  try {
      const response = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
      const  data = await response.json();
 
   
  render(data,cityData);
 
  console.log(data);
  }
  catch(err) {
      

  }

}  

function render(data,cityData)
{
  loading.style.scale="0";
  cityName.innerText=cityData?.name; 
  aqi.innerText=data?.list?.[0]?.main?.aqi;
   
  pm25Unit.innerText=data?.list?.[0]?.components?.pm2_5  +"  ";
  o3Unit.innerText=data?.list?.[0]?.components?.o3 + "  ";
  no2Unit.innerText=data?.list?.[0]?.components?.no2 + "  ";
  pm10Unit.innerText=data?.list?.[0]?.components?.pm10 + "  ";
 so2Unit.innerText=data?.list?.[0]?.components?.so2 + "  ";
 no2Unit.innerText=data?.list?.[0]?.components?.no2 + "  ";
  if(pm25Unit.value >15 )
    {
         pm25Unit.style.color="red";

    }    



   airdesc(data?.list?.[0]?.main?.aqi );
    
}
function render1(data,cityData)
{ if(data?.list?.[0]?.main?.aqi===undefined)
  {
    airQuality.innerText="Not available";
    aqi.innerText="Not available";
    return;
  }
  
  
  cityName.innerText=cityData; 
  aqi.innerText=data?.list?.[0]?.main?.aqi;
  pm25Unit.innerText=data?.list?.[0]?.components?.pm2_5  +"  ";
  o3Unit.innerText=data?.list?.[0]?.components?.o3 + "  ";
  no2Unit.innerText=data?.list?.[0]?.components?.no2 + "  ";
  pm10Unit.innerText=data?.list?.[0]?.components?.pm10 + "  ";
 so2Unit.innerText=data?.list?.[0]?.components?.so2 + "  ";
 no2Unit.innerText=data?.list?.[0]?.components?.no2 + "  ";
 
 Pm25.classList.remove( 'active');
 pm25_limit.innerText=" Save Limit";
  
 o3.classList.remove( 'active');
 o3_limit.innerText=" Save Limit";

 pm10.classList.remove( 'active');
 pm10_limit.innerText=" Save Limit";

 no2.classList.remove( 'active');
 no2_limit.innerText=" Save Limit";

 so2.classList.remove( 'active');
 so2_limit.innerText="Save Limit";

   airdesc(data?.list?.[0]?.main?.aqi );
   if( (parseInt(pm25Unit.innerHTML))>15  )
    {
         Pm25.classList.add( 'active');
         pm25_limit.innerText="Above Than save Limit";

    } 
   
    if( (parseInt(o3Unit.innerHTML))>100  )
      {
           o3.classList.add('active');
           o3_limit.innerText="Above Than save Limit";
      } 
      if( (parseInt(pm10Unit.innerHTML))>45  )
        {
             pm10.classList.add( 'active');
             pm10_limit.innerText="Above Than save Limit";
    
        } 
        if( (parseInt(no2Unit.innerHTML))>25  )
          {
               no2.classList.add( 'active');
                  no2_limit.innerText="Above Than save Limit";
          } 
          if( (parseInt(so2Unit.innerHTML))>40  )
            {
                so2.classList.add( 'active'); 
                so2_limit.innerText="Above Than save Limit";
        
            } 
    
}

function airdesc(data)
{
  if(data===1)
  {
    airQuality.innerText="Good";
    aqi.innerText="0 to 50 "     ;
    images.setAttribute("src", "images/good.png");
    text_decp.innerText="Air quality is satisfactory, and air pollution poses little or no risk.";
  }
  else if(data===2)
    {aqi.innerText="51 to 100 "
      airQuality.innerText="fair";
      images.setAttribute("src", "images/fair.png");
      text_decp.innerText=" Air quality is acceptable; however, some pollutants may be a concern for a small number of people";
    }
    else if(data===3)
      {aqi.innerText="101 to 200 "
        airQuality.innerText="Modrated";   
        images.setAttribute("src", "images/modrate.png");
        text_decp.innerText="Air quality is acceptable; moderate health concern for a very small number of people.";
      }
      else if(data===4)
        {aqi.innerText="201 to 300 "
          airQuality.innerText="Poor";
          images.setAttribute("src", "images/poor.png");
          text_decp.innerText="Air quality is unhealthy for sensitive groups, and everyone may begin to experience health effects";
        }
        else if(data===5)
          {aqi.innerText="301 to 500 "
            airQuality.innerText="Very Poor";
            images.setAttribute("src", "images/very-poor.png");
            text_decp.innerText="ir quality is hazardous, and serious health effects can be experienced by everyone.";
          }

}



yourLocation.addEventListener('click',()=>{
  geolocator(); 
    search_section.style.scale="0";
   showData.style.scale="1";
   loading.style.scale="1";

});





async function search() {
  let city= searchBar.value;
  let a=await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${API_KEY}`);
  const  d = await a.json();
  let lat=d?.[0]?.lat;
 let lon=d?.[0]?.lon;
 console.log(lat," ",lon);
 
  try {
      const response = await fetch(
          `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
      const  data = await response.json();
  console.log(data);
 render1(data,city);
  }
  catch(err) {
      

  }

}

searchAqi.addEventListener('click', ()=>{
  search();
  showData.style.scale="1";
});
search_city.addEventListener('click', ()=>{

  search_section.style.scale="1";
 

});