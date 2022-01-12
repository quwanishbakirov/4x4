window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});
let ids = ["btn1", "btn2", "btn3", "btn4", "btn5", "btn6", "btn7", "btn8", "btn9", "btn10", "btn11", "btn12", "btn13", "btn14", "btn15", "btn16",];
let cnt = 0;
function startGame(){
    let numbers = [1, 2, 3, 4 , 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    numbers = shuffle(numbers);
    if (!isSolvable(numbers)){
        if (numbers[0] != 16 && numbers[1] != 16){
            [numbers[0], numbers[1]] = [numbers[1], numbers[0]];
        } else {
            [numbers[numbers.length-1], numbers[numbers.length-2]] = [numbers[numbers.length-2], numbers[numbers.length-1]];
        }
    };
    cnt = 0;
    document.getElementById("cnt").innerText=cnt;
    for(let i = 0; i<16; i++){
        if(numbers[i]==16){
            document.getElementById(ids[i]).innerText = "";
            continue;
        }
        document.getElementById(ids[i]).innerText = numbers[i];
    }
    for(let i = 0; i<16; i++){
        document.getElementById(ids[i]).onclick = function(){
            let click = new Audio('static/audios/click.mp3');
            click.play();
            let m = Math.floor(i/4);
            let n = i%4;
            if(n >= 1 && numbers[m*4+n-1] == 16){
                numbers = swap(numbers, i, m*4+n-1);
            }
            if(n <= 2 && numbers[m*4+n+1] == 16){
                numbers = swap(numbers, i, m*4+n+1);
            }
            if(m>=1 && numbers[(m-1)*4+n] == 16){
                numbers = swap(numbers, i, (m-1)*4+n);
            }
            if(m<=2 && numbers[(m+1)*4+n] == 16){
                numbers = swap(numbers, i, (m+1)*4+n);
            }
            document.getElementById("cnt").innerText=cnt;
            let k=1;
            let isWinner = false;
            for(let i = 0; i<16; i++){
                if(numbers[i] != k) break;
                k++;
            }
            if(k == 17){
                let claps = new Audio('static/audios/claps.mp3');
                claps.play();
                alert("Congratulations! Your score is" + " " + cnt);
            }
        };
    }
}
function isSolvable(numbers){
    let numberInverions = 0;
    for (let i = 0; i < numbers.length-1; i++)
    {    
        if (numbers[i] == 16) continue;
        for (let j = i+1; j < numbers.length; j++){
            if (numbers[i] > numbers[j] && numbers[j] != 16) {
                numberInverions++;   
            }            
        }
    }    
    let index = numbers.indexOf(16);
    let rowFromBelow = Math.sqrt(numbers.length)-Math.floor(index/4);
    if (rowFromBelow % 2 != 0){
        return numberInverions % 2 == 0;
    } else {
        return numberInverions % 2 != 0;
    }
}
function swap(numbers, i, j){
    cnt++;
    numbers[j] = numbers[i];
    document.getElementById(ids[j]).innerText = numbers[i];
    numbers[i] = 16;
    document.getElementById(ids[i]).innerText = "";
    return numbers;
}
function shuffle(array) {
  var currentIndex = array.length;
  var randomIndex;
  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
let icon =  document.getElementById("icon");
icon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        icon.src = "static/images/sun.png"
    } else{
        icon.src = "static/images/moon .png"
    }
}