let content = document.getElementById('content')

let gridSize = 50;

let grid = [];
let memGrid = [];
let intervalo;
let setIntervalo;
let matarIntervalo;

function createGrid(){
    content.innerHTML=''
    for(let y = 0; y < gridSize; y++){
        grid.push([]);
        memGrid.push([]);
        for(let x = 0; x < gridSize; x++){
            grid[y].push(0);
            memGrid[y].push(0);
            content.innerHTML+='<button id="cell-'+y+'-'+x+'" onclick="clickedCell('+ x +', '+ y +')" class="cell"></button>'
        }
    }

    document.getElementById('loading-screen').classList.add('hide')
}

function getStatus(x, y){
    if(x < 0 || y < 0 || y >= gridSize || x >= gridSize){
        return 0;
    }
    return grid[y][x];
}

function getAdjCount(x, y){
    return getStatus(x, y+1)+getStatus(x, y-1)+getStatus(x+1, y)+getStatus(x-1, y)+getStatus(x-1, y+1)+getStatus(x+1, y-1)+getStatus(x-1, y-1)+getStatus(x+1, y+1);
}

function updateCell(x, y){  
    let btn = document.getElementById('cell-'+y+'-'+x)
    if(grid[y][x]){
        btn.classList.add("filled")
    }else{
        btn.classList.remove("filled")
    }
}

function updateGrid(){
    let adjsList = [];
    for(let y = 0; y < gridSize; y++){
        adjsList.push([])
        for(let x = 0; x < gridSize; x++){
            let adjs = getAdjCount(x, y); 
            let isAlive = getStatus(x, y);
            if(adjs==3){
                memGrid[y][x]=1;
            }else if( (adjs>2 && isAlive) || (isAlive && adjs>3)){
                memGrid[y][x]=0;
            }else if((adjs==3 && isAlive) || (adjs==2 && isAlive)){
                memGrid[y][x]=1;
            }
           adjsList[y].push(adjs);
        }
    }
    for(let y = 0; y < gridSize; y++){
        for(let x = 0; x < gridSize; x++){
            grid[y][x] = memGrid[y][x]
            updateCell(x, y);
            memGrid[y][x] = 0
        }
    }
}

function clickedCell(x, y){
    if(grid[y][x]){
        grid[y][x]=0
    }else{
        grid[y][x]=1
    }
    updateCell(x, y);
    matarIntervalo();
}

function clearGrid(){
    for(let y = 0; y < gridSize; y++){
        for(let x = 0; x < gridSize; x++){
            grid[y][x] = 0
            updateCell(x, y);
        }
    }
}

setTimeout(()=>{createGrid()}, 1)

setIntervalo = () => {
    intervalo = setInterval(()=>{updateGrid()}, 300)
}

matarIntervalo = () => {
    clearInterval(intervalo)
}