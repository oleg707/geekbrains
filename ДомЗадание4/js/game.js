var number = []; // четыре цифры нашего числа
var attempts = 0; // число попыток
var archAtt = []; /// Массив попыток
var archRes = []; /// Массив результатов
var repeat; ///номер попытки, которую мы хотим псмотреть

generateNumber();
guessNumber();

while(true) {    ///Выводим прошлые результаты.
    repeat = parseInt(prompt('Хотите посмотреть свои попытки ? ' +
        'Тогда введите номер попытки.(Положительное число, иначе выход)'));
    if (repeat > attempts) {
        alert('Попыток было всего ' + attempts);
    } else if (repeat > 0) {
        alert('Ваша попытка была :' + archAtt[repeat - 1] + ' Ваш результат : Быки - '
            + archRes[repeat - 1][1] + ', Коровы - ' + archRes[repeat - 1][2]);
    } else break;
}

function generateNumber(){
	number = [];
	var min = 0;
	var max = 9;

	// заполняем массив цифр в числе
	for(var i = 0; i < 4; i++){
		var part = Math.round(min + Math.random() * (max - min));
		
		// первое число всегда уникально
		if(i == 0){
			number[i] = part;
		}
		else{
			// пока не сгенерируется уникальное число, генерируем новые случайные числа
			while(number.indexOf(part) != -1){
				part = Math.round(min + Math.random() * (max - min));
			}
			
			number[i] = part;
		}
	}
}

function guessNumber(){
	var result = prompt("Введите число (-1 - закончить игру)", 0);
	var gameIsRunning = true;
	
	// пока игрок не угадал число
	while(gameIsRunning){
		// выход из игры
		if(parseInt(result) == -1){
			gameIsRunning = false;
		}
		// игрок ввел некорректные данные
		else if(parseInt(result) == 0 || isNaN(parseInt(result))){
			alert("Вы не ввели число");
			// запрашиваем по новой
			result = prompt("Введите число (-1 - закончить игру)", 0);
		}
		// проверяем число
		else{

			archAtt.push(result);/// Добавляем попытку в массив попыток.

			var answer = checkNumber(result);

			archRes.push(answer); /// Добавляем результат (который тоже массив) в архив результатов.

			if(answer[0]){
				// число угадано
				alert("Поздравляем! Вы угадали число. Кол-во попыток: " + attempts);
				// останавливаем игру
				gameIsRunning = false;
			}
			else{
				// следующий ход
				result = prompt("Быки: " + answer[1] + " Коровы: " + answer[2] + " Введите число (-1 - закончить игру)", 0);
			}
		}
	}
}



function checkNumber(myresult){
	// каждая проверка увеличивает кол-во попыток на 1
	attempts++;
	
	// массив результата
	// 0 - общий результат
	// 1 - быки
	// 2 - коровы
	var answer = [false, 0, 0];
	
	// раскладываем число на разряды
	console.log(myresult);
	console.log(number);
	var ranks = myresult.split("");
	
	for(var i = 0; i < ranks.length; i++){		
		// если по индексу значения совпадают, то это бык
		if(parseInt(ranks[i]) == number[i]){
			answer[1]++;
		}
		// если число вообще есть в массиве, то это корова
		else if(number.indexOf(parseInt(ranks[i])) != -1){
			answer[2]++;
		}
	}
	
	// если набралось 4 быка, то это победа
	if(answer[1] == 4){
		answer[0] = true;
	}
	
	return answer;
}