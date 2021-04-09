const appRoot = document.getElementById('app-root');
appRoot.classList.add('app');

let header = document.createElement('h1');
header.textContent = 'Countries Search';
appRoot.append(header);

let form = document.createElement('form');
form.classList.add('search-form');
header.after(form);
form.insertAdjacentHTML('afterbegin', `<field id="type-of-search"><label for="form-radio">Please choose the type of 
    search:</label><div id="form-radio" class="form-radio"><input type="radio" name="searchType" id="choice-by-region" 
    value="by-region"><label for="choice-by-region">By Region</label><br><input type="radio" name="searchType" 
    id="choice-by-language" value="by-language"><label for="choice-by-language">By Language</label><br></div></field>`);
form.insertAdjacentHTML('beforeend', `<field id="search-query"><label for="select-search-query">Please choose search 
    query:</label><select id="select-search-query" disabled><option value="">Select value</option></select></field>`);


let select = document.getElementById('select-search-query');
let firstOption = select.querySelector('option');


let radios = form.querySelectorAll('input[type=radio]');
for (let radio of radios){
    radio.addEventListener('change', function (e) {
        let target = e.target;
        deleteTable();
        createSorryParagraph();
        select.disabled = false;
        while (select.lastChild !== firstOption){
            select.removeChild(select.lastChild);
        }
        if (target.id === 'choice-by-region'){
            let regionList = externalService.getRegionsList();
            for(let region of regionList){
                firstOption.insertAdjacentHTML('afterend', `<option value="${region}">${region}</option>`)
            }
        }
        if (target.id === 'choice-by-language'){
            let languageList = externalService.getLanguagesList();
            for(let language of languageList){
                firstOption.insertAdjacentHTML('afterend', `<option value="${language}">${language}</option>`)
            }
        }
    })
}

select.addEventListener('change', function () {
    if(this.value !== ''){
        createTable(this.value);
    } else {
        deleteTable();
        createSorryParagraph();
    } 
})

function createTable(query){
    deleteTable();
    deleteSorryParagraph();
    let table = document.createElement('table');
    table.id = 'countriesTable';
    table.classList.add('countries');
    form.after(table);

    table.insertAdjacentHTML('afterbegin', `<thead><tr><th>Country name<span id="byNameSort">↕</span></th><th>Capital
    </th><th>World Region</th><th>Languages</th><th>Area<span id="byAreaSort">↕</span></th><th>Flag</th></tr></thead>`);
    let thead = table.querySelector('thead');
    let tbody = document.createElement('tbody');
    thead.after(tbody);

    if (externalService.getCountryListByRegion(query) !== []){
        let list = externalService.getCountryListByRegion(query);
    
        list.forEach(element => {
            tbody.insertAdjacentHTML('beforeend', `<tr><td>${element.name}</td><td>${element.capital}</td>
            <td>${element.region}</td><td>${Object.values(element.languages).join(', ')}</td><td>${element.area}</td>
            <td><img src='${element.flagURL}' alt='${element.name} flag'></td></tr>`); 
        });
    }
    if (externalService.getCountryListByLanguage(query) !== []){
        let list = externalService.getCountryListByLanguage(query);
    
        list.forEach(element => {
            tbody.insertAdjacentHTML('beforeend', `<tr><td>${element.name}</td><td>${element.capital}</td>
            <td>${element.region}</td><td>${Object.values(element.languages).join(', ')}</td><td>${element.area}</td>
            <td><img src='${element.flagURL}' alt='${element.name} flag'></td></tr>`);
        });
    }
    sortTable('byNameSort');
}

function deleteTable(){
    let existingTable = document.getElementById('countriesTable');
    if(existingTable){
		existingTable.remove();
	}
}

function createSorryParagraph(){
    let showNothingParagraph = document.getElementById('showNothing');
    if (!showNothingParagraph){
        form.insertAdjacentHTML('afterend', `<p id="showNothing">No items, please choose search query</p>`);
    }
}

function deleteSorryParagraph(){
    let showNothingParagraph = document.getElementById('showNothing');
    if(showNothingParagraph){
		showNothingParagraph.remove();
	}
};

document.addEventListener('click', function(e){
    if(e.target && e.target.id === 'byNameSort'){
        sortTable(e.target.id);
   }
   if(e.target && e.target.id === 'byAreaSort'){
    sortTable(e.target.id);
}
});

function sortTable(parameter) {
    const areaIndex = 4;
    let index, table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById('countriesTable');
    switching = true;
    let spanName = document.getElementById('byNameSort');
    let spanArea = document.getElementById('byAreaSort');
    if(parameter === 'byNameSort'){
        index = 0;  
    }
    if(parameter === 'byAreaSort'){
        index = areaIndex;
    }
    dir = 'asc';
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < rows.length - 1; i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName('TD')[index];
        y = rows[i + 1].getElementsByTagName('TD')[index];
        if (dir === 'asc') {
            let itemRow1 = isNaN(Number(x.innerHTML)) ? x.innerHTML.toLowerCase() : Number(x.innerHTML);
            let itemRow2 = isNaN(Number(y.innerHTML)) ? y.innerHTML.toLowerCase() : Number(y.innerHTML);
            parameter === 'byNameSort' && (spanName.textContent = '↑') && (spanArea.textContent = '↕');
            parameter === 'byAreaSort' && (spanName.textContent = '↕') && (spanArea.textContent = '↑');
          if ( itemRow1 > itemRow2) {
            shouldSwitch = true;
            break;
          }
        } else if (dir === 'desc') {
            let itemRow1 = isNaN(Number(x.innerHTML)) ? x.innerHTML.toLowerCase() : Number(x.innerHTML);
            let itemRow2 = isNaN(Number(y.innerHTML)) ? y.innerHTML.toLowerCase() : Number(y.innerHTML);
            parameter === 'byNameSort' && (spanName.textContent = '↓') && (spanArea.textContent = '↕');
            parameter === 'byAreaSort' && (spanName.textContent = '↕') && (spanArea.textContent = '↓');
          if (itemRow1 < itemRow2) {
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount === 0 && dir === 'asc') {
          dir = 'desc';
          switching = true;
        }
      }
    }
  }