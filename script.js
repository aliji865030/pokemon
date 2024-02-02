let typeList = {};
let storeByPokemonName = [];
// window.onload=storeByName()
// window.onload=fillTypes()

async function fillTypes() {
  let response = await fetch("https://pokeapi.co/api/v2/type/");
  let parsedResponse = await response.json();

  //   console.log(josonData.results);

  for (let i = 0; i < parsedResponse.results.length; i++) {
    let result = parsedResponse.results[i].name.toUpperCase();
    let url = parsedResponse.results[i].url;

    let option = document.createElement("option");
    option.innerText = result;
    option.value = result;
    option.setAttribute("data-url", url);
    typeList[result] = url;

    document.querySelector("#selectType").append(option);
  }
}

// fillTypes()

async function searchType() {
  const optionValue = document.querySelector("#selectType").value;

  // console.log(optionValue,typeList[optionValue]);

  let response = await fetch(typeList[optionValue]);
  let parsedResponse = await response.json();

  document.querySelector(".content").innerHTML = "";
  const pokemonList =
    parsedResponse.pokemon.length > 200 ? 200 : parsedResponse.pokemon.length;
  for (let i = 0; i < pokemonList; i++) {
    let singlePokemon = parsedResponse.pokemon[i].pokemon;
    // console.log(singlePokemon);

    let pokemonName = singlePokemon.name;
    let pokemonUrl = singlePokemon.url;

    // console.log(pokemonName,pokemonUrl);

    let respone2 = await fetch(pokemonUrl);
    let parsedResponse2 = await respone2.json();
    console.log(parsedResponse2);

    // console.log(parsedResponse2.sprites.front_default);

    
    const DIV = document.createElement("div");
    DIV.classList.add("card");
    
    DIV.innerHTML = `
    <div class="book"  >
         <div class="inner" style="background-color:${colors(parsedResponse2.types[0].type.name)};"> 
         
         <div> <p> HEIGHT : ${parsedResponse2.height} </p> 
         <p> WEIGHT : ${parsedResponse2.weight} </p> </div>
         <div> <strong>Moves :</strong>
               <br>
               <br>
              <p> ${parsedResponse2.moves[0].move.name}</p>
              <p> ${parsedResponse2.moves[1].move.name}</p>
              <p> ${parsedResponse2.moves[2].move.name}</p>
         </div>
         </div>
    <div class="cover" style="background-color:${colors(parsedResponse2.types[0].type.name)};">
          <div class="index" > <strong># ${i+1}</strong> </div>
          <div class="image">
          <img src="${parsedResponse2.sprites.front_default}">
          </div>
              <div class="image_content">
               ${parsedResponse2.name}
              </div>

              <div class="pokemon_type"> <p> ${parsedResponse2.types[0].type.name} </p> 
              
              </div>
    </div>
    </div>
    `;
    // document.querySelector(".book").style.backgroundColor=storeByPokemonName[i].color
    document.querySelector(".content").append(DIV);
    // DIV.style.backgroundColor
  }

  // console.log(parsedData.pokemon);
}

function colors(type){
  if(type=="grass")
  return "#a0cf59"
  else if(type=="fire")
  return "#fd842f"
  else if(type=="water")
  return "#4f98c7"
  else if(type=="bug")
  return "#79a449"
  else if(type=="normal")
  return "#a9b0b3"
  else if(type=="poison")
  return "#a9b0b3"
  else if(type=="ground")
  return "#f7e049"
  else if(type=="fairy")
  return "#fdbdea"
  else if(type=="fighting")
  return "#d76f2e"
  else if(type=="psychic")
  return "#f46ebd"
  else if(type=="rock")
  return "#a8922c"
  else if(type=="electric")
  return "#efd73f"
  else if(type=="ghost")
  return "#826aa8"
  else if(type=="ice")
  return "#5ac7e8"
  else if(type=="dragon")
  return "#dcaa2b"
}

async function storeByName() {
  for (let i = 1; i <= 131; i++) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    let parsedResponseData = await response.json();

    // console.log(parsedResponseData);
    let pokemonName = parsedResponseData.name;
    let pokemonurl = parsedResponseData.sprites.front_default;

    storeByPokemonName[pokemonName] = pokemonurl;
    storeByPokemonName[i] = {
      name: parsedResponseData.name.toUpperCase(),
      url: parsedResponseData.sprites.front_default,
      height: parsedResponseData.height,
      weight: parsedResponseData.weight,
      type: parsedResponseData.types[0].type.name,
      color:colors(parsedResponseData.types[0].type.name),
      moves:[
        parsedResponseData.moves[0].move.name.toUpperCase(),
        parsedResponseData.moves[1].move.name.toUpperCase(),
        parsedResponseData.moves[2].move.name.toUpperCase()
            ]
    };

    
  }
}


function pokemonNameFunction(val){
  for(let i=1;i<storeByPokemonName.length;i++){
    if(storeByPokemonName[i].name==val){
      
      return i 
    }
  }

}

function searchPokemonByName() {
  document.querySelector(".content").innerHTML = "";
  let value = document.querySelector("#pokemonName").value;

  let i=pokemonNameFunction(value.toUpperCase())
  


  const DIV = document.createElement("div");
    DIV.classList.add("card");
    
    DIV.innerHTML = `
    <div class="book"  >
         <div class="inner" style="background-color:${storeByPokemonName[i].color};"> 
         
         <div> <p> HEIGHT : ${storeByPokemonName[i].height} </p> 
         <p> WEIGHT : ${storeByPokemonName[i].weight} </p> </div>
         <div> <strong>Moves :</strong>
               <br>
               <br>
              <p> ${storeByPokemonName[i].moves[0]}</p>
              <p> ${storeByPokemonName[i].moves[1]}</p>
              <p> ${storeByPokemonName[i].moves[2]}</p>
         </div>
         </div>
    <div class="cover" style="background-color:${storeByPokemonName[i].color};">
          <div class="index" > <strong># ${i}</strong> </div>
          <div class="image">
          <img src="${storeByPokemonName[i].url}">
          </div>
              <div class="image_content">
               ${storeByPokemonName[i].name}
              </div>

              <div class="pokemon_type"> <p> ${storeByPokemonName[i].type} </p> </div>
    </div>
    </div>
    `;
    // document.querySelector(".book").style.backgroundColor=storeByPokemonName[i].color
    document.querySelector(".content").append(DIV);
    // DIV.style.backgroundColor


  // let image = document.createElement("img");
  // image.src = storeByPokemonName[value];
  // document.querySelector(".content").append(image);
}

function fillPokemon() {
  document.querySelector(".content").innerHTML=""
  for (let i = 1; i < storeByPokemonName.length; i++) {

    const DIV = document.createElement("div");
    DIV.classList.add("card");
    
    DIV.innerHTML = `
    <div class="book"  >
         <div class="inner" style="background-color:${storeByPokemonName[i].color};"> 
         
         <div> <p> HEIGHT : ${storeByPokemonName[i].height} </p> 
         <p> WEIGHT : ${storeByPokemonName[i].weight} </p> </div>
         <div> <strong>Moves :</strong>
               <br>
               <br>
              <p> ${storeByPokemonName[i].moves[0]}</p>
              <p> ${storeByPokemonName[i].moves[1]}</p>
              <p> ${storeByPokemonName[i].moves[2]}</p>
         </div>
         </div>
    <div class="cover" style="background-color:${storeByPokemonName[i].color};">
          <div class="index" > <strong># ${i}</strong> </div>
          <div class="image">
          <img src="${storeByPokemonName[i].url}">
          </div>
              <div class="image_content">
               ${storeByPokemonName[i].name}
              </div>

              <div class="pokemon_type"> <p> ${storeByPokemonName[i].type} </p> </div>
    </div>
    </div>
    `;
    // document.querySelector(".book").style.backgroundColor=storeByPokemonName[i].color
    document.querySelector(".content").append(DIV);
    // DIV.style.backgroundColor
  }
}



let searchByTypeBtn = document.querySelector("#byType");
searchByTypeBtn.addEventListener("click", searchType);

let searchByName = document.querySelector("#searchByName");
searchByName.addEventListener("click", searchPokemonByName);


document.querySelector("#fill").addEventListener("click", fillPokemon);
// console.log(storeByPokemonName);

async function firstStep(){
  await fillTypes()
  await storeByName()
  await fillPokemon()
}






