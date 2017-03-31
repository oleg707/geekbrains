var chessBoard = document.querySelector('.chessTable');

var i = 0, count = 0;
var liters = ['','A','B','C','D','E','F','G','H',''];
var numbers = ['','1','2','3','4','5','6','7','8',''];

//Делаем таблицу 10х10

while (count < 100) {
    var cell = document.createElement('div');
    chessBoard.appendChild(cell);
    cell.classList.add('cell',count );  //Добавляем каждой ячейке номерной класс. Возможно, надо преобразовать в
                                        // строку count, но работает.
    if (i && i % 2)                    // Раскрашиваем в черно-белую клетку всю таблицу.
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

