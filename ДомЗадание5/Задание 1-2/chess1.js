var chessBoard = document.querySelector('.chessTable');

var i = 0, count = 0;
var liters = ['','A','B','C','D','E','F','G','H',''];
var numbers = ['','1','2','3','4','5','6','7','8',''];

//Делаем таблицу 10х10

while (count < 100) {
    var cell = document.createElement('div');
    chessBoard.appendChild(cell);
    cell.classList.add('cell',count );  //Добавляем каждой ячейке номерной класс. Возможно, надо преобразовать в
                                        // строку count через String(), но и это работает.
    if (i % 2)                    // Раскрашиваем в черно-белую клетку всю таблицу.
    cell.classList.add('cellBlack');
    i += ((i + 2) % 11) ? 1 : 2;
    count++;
}

var a = document.getElementsByClassName('cell'); //Получаем коллекцию пронумерованных
                                                 //по классу ячеек.
for (var k =0; k < 10; k++) {                    //Заполняем цифры и буквы по периметру.
    a[k].innerHTML = liters[k];                  //Красим периметр в серый.
    a[k].classList.add('cellGray');
    a[90+k].innerHTML = liters[k];
    a[90+k].classList.add('cellGray');
    a[k*10].classList.add('cellGray');
    a[k*10].innerHTML = numbers[k];
    a[k*10+9].innerHTML = numbers[k];
    a[k*10+9].classList.add('cellGray');
}

a[11].innerHTML = '&#9820'; // Расставляем фигуры в виде UNICODE-символов руками.
a[12].innerHTML = '&#9822'; // Циклы тут могут быть только для пешек,
a[13].innerHTML = '&#9821'; // но если фигуры переставлять в ходе игры, то циклов
a[14].innerHTML = '&#9819'; // быть уже не может.
a[15].innerHTML = '&#9818';
a[16].innerHTML = '&#9821';
a[17].innerHTML = '&#9822';
a[18].innerHTML = '&#9820';
a[21].innerHTML = '&#9823';
a[22].innerHTML = '&#9823';
a[23].innerHTML = '&#9823';
a[24].innerHTML = '&#9823';
a[25].innerHTML = '&#9823';
a[26].innerHTML = '&#9823';
a[27].innerHTML = '&#9823';
a[28].innerHTML = '&#9823';
a[71].innerHTML = '&#9817';
a[72].innerHTML = '&#9817';
a[73].innerHTML = '&#9817';
a[74].innerHTML = '&#9817';
a[75].innerHTML = '&#9817';
a[76].innerHTML = '&#9817';
a[77].innerHTML = '&#9817';
a[78].innerHTML = '&#9817';
a[81].innerHTML = '&#9814';
a[82].innerHTML = '&#9816';
a[83].innerHTML = '&#9815';
a[84].innerHTML = '&#9813';
a[85].innerHTML = '&#9812';
a[86].innerHTML = '&#9815';
a[87].innerHTML = '&#9816';
a[88].innerHTML = '&#9814';