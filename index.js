const loadPhones = async (searchText,dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  const res = await fetch(url)
  const data = await res.json()
  displayPhone(data.data,dataLimit)
}
const displayPhone = (phones,dataLimit) => {
  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.textContent = ''
  const showAll = document.getElementById('Show-all')
  if(dataLimit && phones.length > 10){
    phones = phones.slice(0, 10)
    showAll.classList.remove('d-none')
  } else{
    showAll.classList.add('d-none')
  }
  const noFound = document.getElementById('no-found')
  if (phones.length === 0) {
    noFound.classList.remove('d-none')
  } else {
    noFound.classList.add('d-none')
  }
  phones.forEach(phone => {
    const phoneDiv = document.createElement('div')
    phoneDiv.innerHTML = `
        <div class="col">
              <div class="card h-100 p-3">
                <img src=${phone.image} class="card-img-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title">${phone.
        phone_name}</h5>
                  <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
              </div>
            </div>
        `
    phoneContainer.appendChild(phoneDiv)
  });
  loadSpinner(false)
}
const btnClick = (dataLimit)=>{
  loadSpinner(true)
  const searchElement = document.getElementById('exampleInputEmail1')
  const searchText = searchElement.value;
  loadPhones(searchText,dataLimit)
}

document.getElementById('search-btn').addEventListener('click', function () {
  btnClick(10)
})
document.getElementById('exampleInputEmail1').addEventListener('keypress',function(e){
  if(e.key === 'Enter'){
    btnClick(10)
  }
})
const loadSpinner = isLoading => {
  const loaderSection = document.getElementById('loader')
  if (isLoading) {
    loaderSection.classList.remove('d-none')
  } else {
    loaderSection.classList.add('d-none')
  }
}
document.getElementById('show-all-btn').addEventListener('click',function(){
  btnClick()
})
// loadPhones('iphone')