var game = document.getElementById("game");
var checkarr= new Array();
var score=10;
document.getElementById("score").innerText = "Điểm "+ score.toString();
var getID;

function about(){
    var luatchoi="Sudoku có rất nhiều biến thể nhưng chỉ thay đổi về kích thước và số lượng ô trong trò chơi còn lối chơi cơ bản vẫn giữ nguyên.\nỞ phiên bản chuẩn (bản gốc) chỉ có kích thước là 9x9 (ô nhỏ) và được chia thành 9 vùng, mỗi vùng có kích thước 3x3.\nCác vùng này được nhóm lại và phân tách với nhau bằng một viền đen đậm hơn so với các ô nhỏ.\nLuật chơi của Sudoku là điền kín những ô còn lại với điều kiện:\nCác hàng ngang: Phải có đủ các số từ 1 đến 9, không trùng số và không cần đúng thứ tự.\nCác hàng dọc: Đảm bảo có đủ các số từ 1-9, không trùng số, không cần theo thứ tự.\nMỗi vùng 3 x 3: Phải có đủ các số từ 1-9 và không trùng số nào trong cùng 1 vùng 3 x 3.";
    alert(luatchoi);
}

function randomso(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function createListItem(text, tag, clazz, id) {
    var ilm = document.createElement(tag);
    ilm.textContent = text;
    ilm.className = clazz;
    ilm.id = id;
    return ilm;
}

function createButton(len) { // tao cac o
    for (var i = 0; i < len; i++) {
        checkarr[i] = new Array();
        for (var j = 0; j < len; j++) {
            checkarr[i].push(0);
        }
    }
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            game.appendChild(createListItem("+", "button", "", "btn" + i.toString() + j.toString()));
        }
        game.appendChild(createListItem("", "br", "", ""));
    }
    for (var i = 0; i < len+1; i++) {
        document.getElementById("inp").appendChild(createListItem((i+1).toString(), "button", "", "btn" + i.toString()));
        document.getElementById("btn"+ i.toString()).style.width = "54px";
        document.getElementById("btn"+ i.toString()).style.height = "54px";

    }
    document.getElementById("btn"+len.toString()).innerText = "X";
}

function setClickBtn(i, j) { // event cac o
    /*document.getElementById("btn" + i.toString() + j.toString()).addEventListener("mousedown", function cc() {
        document.getElementById("btn" + i.toString() + j.toString()).style.backgroundColor = "rgb(207, 207, 207)";
    });
    document.getElementById("btn" + i.toString() + j.toString()).addEventListener("mouseout", function lol() {
        document.getElementById("btn" + i.toString() + j.toString()).style.backgroundColor = "white";
    });*/
        document.getElementById("btn" + i.toString() + j.toString()).onclick = function() {
            if(checkarr[i][j]==0)
            getID = "btn" + i.toString() + j.toString();
            else getID =0;
            //
            for(var x=0;x<dongcot;x++){
                for(var y=0;y<dongcot;y++){
                    if(checkarr[x][y]!=1){
                    if((x==i || y==j )){
                        document.getElementById("btn" + x.toString() + y.toString()).style.backgroundColor = "rgb(179, 255, 0)";
                    }
                    else{
                        
                        document.getElementById("btn" + x.toString() + y.toString()).style.backgroundColor = "white";
                    }
                }
                    
                }
            }
            if(checkarr[i][j]==0)
            document.getElementById("btn" + i.toString() + j.toString()).style.backgroundColor="orange";

        }
}

function setClickBtnInput(i) { // event cac o
        document.getElementById("btn" + i.toString()).onclick = function() {
            if(getID !=0){
                for(var j = 0;j<dongcot;j++){ // check hang
                    for(var k=0;k<dongcot;k++){
                     //document.getElementById("btn"+j.toString()+k.toString()).style.backgroundColor = "white";
                     if(checkarr[j][k]==1){
                        document.getElementById("btn"+j.toString()+k.toString()).style.backgroundColor = "rgb(184, 184, 184)";
                     }
                     else{
                        document.getElementById("btn"+j.toString()+k.toString()).style.backgroundColor = "white";
                     }
                    }
                 }
                try{
                    document.getElementById(getID).style.color = "black";
                    document.getElementById(getID).innerText = document.getElementById("btn" + i.toString()).innerText;
                }     
                catch{}
                checkWinner(dongcot);
                getID = 0;
            }
        }
}
function setClickBtnAfterWin(i, j) { // event cac o
    document.getElementById("btn" + i.toString() + j.toString()).onclick = function() {

    }
    document.getElementById("btn" + i.toString() + j.toString()).ondblclick = function() {

    }
}

function checkbtnAfterWin(len) { // check cac o
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            setClickBtnAfterWin(i, j);
        }

    }
}
function checkbtn(len) { // check cac o
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len; j++) {
            setClickBtn(i, j);
        }
    }
    var x = randomso(0,9).toString();
    var y = randomso(0,9).toString();
    var soluong = 0;
    var max = randomso(20,30);
    //
    while(soluong<=max){
        var test = 1;
        var so =  randomso(1,10).toString();
            for(var m=0;m<dongcot;m++){
                if(parseInt(so)==parseInt(document.getElementById("btn"+x.toString()+m.toString()).innerText)){
                    test = 0;
                   }
            }
            for(var n=0;n<dongcot;n++){
                    if(parseInt(so)==parseInt(document.getElementById("btn"+n.toString()+y.toString()).innerText)){
                        test = 0;
                       }
            }
            /*var a = 0, b =0;
            for(var t = 0; t<dongcot;t++){
                for(var i = a;i<a+3;i++){
                    for(var j = b; j<b+3;j++){
                       for(var p = a; p<a+3; p++){
                           for(var q = b; q<b+3;q++){
                               if(document.getElementById("btn"+i.toString()+j.toString()).innerText != "+" && document.getElementById("btn"+p.toString()+q.toString()).innerText != "+" && i!=p && j!=q && parseInt(document.getElementById("btn"+i.toString()+j.toString()).innerText) ==
                               parseInt(document.getElementById("btn"+p.toString()+q.toString()).innerText)){
                                test = 0;
                               }
                           }
                       }
                    }
                }
                if(t==2||t==5) a+=3;
                b+=3;
                if(b>=dongcot) b=0;
            }*/
            var a = 0, b =0;
            for(var t = 0; t<dongcot;t++){
                for(var i = a;i<a+3;i++){
                    for(var j = b; j<b+3;j++){
                        if(x>=a && x<=a+3 && y>=b && y<=b+3 && parseInt(document.getElementById("btn"+i.toString()+j.toString()).innerText) ==so){
                            test = 0;
                            break;
                        }
                    }
                }
                if(t==2||t==5) a+=3;
                b+=3;
                if(b>=dongcot) b=0;
            }
         if(test === 1){
            document.getElementById("btn"+x+y).innerText = so;
            document.getElementById("btn"+x+y).style.color = "black";
            document.getElementById("btn"+x+y).style.backgroundColor = " rgb(184, 184, 184)";
            checkarr[x][y] = 1;
            soluong++;
         }
        x = randomso(0,9).toString();
        y = randomso(0,9).toString();  
    }
}
function checkbtninput(len) { // check cac o
    for (var i = 0; i < len; i++) {
            setClickBtnInput(i);
    }
    document.getElementById("btn" + len.toString()).onclick = function() {
        if(getID !=0){
            for(var j = 0;j<dongcot;j++){ // check hang
                for(var k=0;k<dongcot;k++){
                 //document.getElementById("btn"+j.toString()+k.toString()).style.backgroundColor = "white";
                 if(checkarr[j][k]==1){
                    document.getElementById("btn"+j.toString()+k.toString()).style.backgroundColor = "rgb(184, 184, 184)";
                 }
                 else{
                    document.getElementById("btn"+j.toString()+k.toString()).style.backgroundColor = "white";
                 }
                }
             }
            try{
                document.getElementById(getID).style.color = "white";
                document.getElementById(getID).innerText = "+";
                document.getElementById(getID).style.backgroundColor = "white";
            }     
            catch{}
            getID = 0;
        }
    }
}
function showMessenger(str) {
    sleep(1000).then(() => {
        checkbtnAfterWin(dongcot);
        document.getElementById("mess").style.display = "flex";
        document.getElementById("userwin").innerText = str;
        document.getElementById("playagain").onclick = function() {
            location.reload();
        }
    });

}
function checkWinner(dongcot) {
    for(var i = 0;i<dongcot;i++){ // check hang
       for(var j=0;j<dongcot-1;j++){
           for(var k=j+1;k<dongcot;k++){
               if(parseInt(document.getElementById("btn"+i.toString()+j.toString()).innerText)==parseInt(document.getElementById("btn"+i.toString()+k.toString()).innerText)){
                    score--;
                    document.getElementById("btn"+i.toString()+k.toString()).style.backgroundColor = "red";
                    document.getElementById("btn"+i.toString()+j.toString()).style.backgroundColor = "red";

               }
           }
       }
    }
    for (var i = 0; i < dongcot; i++) { // check cot
        for (var j = 0; j < dongcot - 1; j++) {
            for (var k = j + 1; k < dongcot; k++) {
                if(parseInt(document.getElementById("btn"+j.toString()+i.toString()).innerText)==parseInt(document.getElementById("btn"+k.toString()+i.toString()).innerText)){
                    score--;
                    document.getElementById("btn"+k.toString()+i.toString()).style.backgroundColor = "red";
                    document.getElementById("btn"+j.toString()+i.toString()).style.backgroundColor = "red";
               }  
            }
        }
    }

    /*for(var i = 0;i<3;i++){
        for(var j = 0; j<3;j++){
           for(var x = 0; x<3; x++){
               for(var y = 0; y<3;y++){
                   if(i!=x && j!=y &&  parseInt(document.getElementById("btn"+i.toString()+j.toString()).innerText) == 
                   parseInt(document.getElementById("btn"+x.toString()+y.toString()).innerText)){
                    document.getElementById("btn"+x.toString()+y.toString()).style.backgroundColor = "red";
                    score--;
                   }
               }
           }
        }
    }*/

    var a = 0, b =0;
    for(var t = 0; t<dongcot;t++){
        for(var i = a;i<a+3;i++){
            for(var j = b; j<b+3;j++){
               for(var x = a; x<a+3; x++){
                   for(var y = b; y<b+3;y++){
                       if(document.getElementById("btn"+i.toString()+j.toString()).innerText != "+" && document.getElementById("btn"+x.toString()+y.toString()).innerText != "+" &&
                           i!=x && j!=y &&  parseInt(document.getElementById("btn"+i.toString()+j.toString()).innerText) == 
                       parseInt(document.getElementById("btn"+x.toString()+y.toString()).innerText)){
                        document.getElementById("btn"+x.toString()+y.toString()).style.backgroundColor = "red";
                        score--;
                       }
                   }
               }
            }
        }
        if(t==2||t==5) a+=3;
        b+=3;
        if(b>=dongcot) b=0;
    }
    document.getElementById("score").innerText = "Điểm "+ score.toString();
    if(score<=0){
        showMessenger("THUA!!!");
    }
    var check = 1;
    for(var i = 0;i<dongcot;i++){ 
        for(var j=0;j<dongcot;j++){
            if(document.getElementById("btn"+i.toString()+j.toString()).innerText == "+"){
                check =0;
                break;
            }
        }
     }
     if(check===1 && score >0){
        showMessenger("THẮNG!!!");
     }
}

// ===========
var dongcot=9;
document.getElementById("html").onclick = function() {
    document.getElementById("mp3").play();
    document.getElementById("nhacnen").play();
}
game.style.width = 60 * dongcot.toString() + "px";
document.getElementById("inp").style.width = 54 * (dongcot+1).toString() + "px";
createButton(dongcot);
for(var i =0; i<dongcot;i++){
    for(var j=0;j<dongcot;j++){
        if((j+1)%3==0 && (j+1)!=dongcot){
            document.getElementById("btn"+ i.toString() + j.toString()).style.borderRight = "2px solid blue";
        }
        if((i+1)%3==0 && (i+1)!=dongcot){
            document.getElementById("btn"+ i.toString() + j.toString()).style.borderBottom = "2px solid blue";
        }
    }   
}
checkbtn(dongcot);
checkbtninput(dongcot);
