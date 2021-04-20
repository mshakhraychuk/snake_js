	let field = document.createElement('div'); //Создаем переменную let, которая видна только в рамках блока {...}, в котором объявлена, и записываем в нее создание блока
	document.body.appendChild(field); //Добавляем див в тело
	field.classList.add('field');//Добавляем класс блоку

	for(let i=1; i<101; i++) {
		let excel = document.createElement('div');
		field.appendChild(excel);
		excel.classList.add('excel');
	}//Создаем через цикл 100 ячеек внутри поля

	let excel = document.getElementsByClassName('excel');//Находим 100 ячеек и записываем их
	// excel[0].setAttribute('posX', 'test');
	// excel[0].setAttribute('posY', 'test'); Таким образом мы можем задавать атрибуты (В нашем примере координаты)

	let x = 1,
		y = 10;

	for (let i=0; i<excel.length; i++) {

		if(x>10){
			x=1;
			y--;
		}

		excel[i].setAttribute('posX', x);
		excel[i].setAttribute('posY', y);
		x++;
		
	} //Передаем атрибуты через цикл и условия координаты каждой ячейке

	//1//


	function generateSnake () {
		let posX = Math.round(Math.random() * (10-3) + 3);//Метод Math.round() возвращает число, округлённое к ближайшему целому.Рандомное число от [1 до 10)
		let posY = Math.round(Math.random() * (10-1) + 1);
		return [posX, posY];


	};//Создаем 2 рандомных значения генерации змеи(координаты)

	
	let coordinates = generateSnake();
	// console.log(coordinates);
	// console.log(coordinates[0]);
	// console.log(coordinates[1]);Проверяем работу функции


	let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), 
	document.querySelector('[posX = "' + (coordinates[0]-1) + '"][posY = "' + coordinates[1] + '"]'), 
	document.querySelector('[posX = "' + (coordinates[0]-2) + '"][posY = "' + coordinates[1] + '"]')]; ///querySelector - Возвращает первый элемент внутри документа, который совпадает с определенной группой селекторов. Ищем div с нужными координатами


	// console.log(snakeBody); //Проверили нахождение элемента

	for (let i = 0; i<snakeBody.length; i++) {
		snakeBody[i].classList.add('snakeBody');
	}

	snakeBody[0].classList.add('head');
	//Создали тело и голову змеи

	let mouse;

	function createMouse() {

		function generateMouse () {

			let posX = Math.round(Math.random() * (10-3) + 3);//Метод Math.round() возвращает число, округлённое к ближайшему целому.Рандомное число от [1 до 10)
			let posY = Math.round(Math.random() * (10-1) + 1);
			return [posX, posY];

		};

		let mouseCoordinates = generateMouse();
		//console.log(mouseCoordinates);//Проверили работу фу-ии
		mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');

		while(mouse.classList.contains('snakeBody')){

			let mouseCoordinates = generateMouse();
			mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');

		}//Проверяем есть ли у элимента мышь класс с такими же координатами как и у змеи

		mouse.classList.add('mouse');

	}

	createMouse();

	let direction = 'right';
	let steps = false; 

	let input = document.createElement('input');
	document.body.appendChild(input);

	input.style.cssText = `
		margin: auto;
		margin-top: 40px;
		font-size: 40px;
		display: block;
	`;

	let score = 0;
	input.value = `Ваши очки: ${score}`;

	
	function move() {
		let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
		snakeBody[0].classList.remove('head');//Удаляем голову змее
		snakeBody[snakeBody.length-1].classList.remove('snakeBody');//Cтираем класс последнего элемента
		snakeBody.pop();//Удаляем последний элемент массива

		if (direction == 'right'){
			if(snakeCoordinates[0] < 10){
				snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0]+1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
			} else{
				snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
			}
		}

		else if (direction == 'left'){
			if(snakeCoordinates[0] > 1){
				snakeBody.unshift(document.querySelector('[posX = "' + (snakeCoordinates[0]-1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
			} else{
				snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
			}
		}
		else if (direction == 'up'){
			if(snakeCoordinates[1] < 10){
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1]+1) + '"]'));
			} else{
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
			}
		}
		else if (direction == 'down'){
			if(snakeCoordinates[1] > 1){
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1]-1) + '"]'));
			} else{
				snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
			}
		}

		if(snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')){
			// console.log('Мы нашли мышь!!!');
			mouse.classList.remove('mouse');
			let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
			let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
			snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
			createMouse();
			score++;
			input.value = `Ваши очки: ${score}`;

		}

		if(snakeBody[0].classList.contains('snakeBody')){
			setTimeout(()=>{alert(`Змея запуталась сама в себе! Ваши очки: ${score}`);}, 200);
			clearInterval(interval);
			snakeBody[0].style.background = 'url(img/gameover.jpg) center no-repeat';
			snakeBody[0].style.backgroundSize = "cover";

		}


		snakeBody[0].classList.add('head');

		for (let i = 0; i<snakeBody.length; i++) {
			snakeBody[i].classList.add('snakeBody');
		}

		steps = true; 
	}

	let interval = setInterval(move, 150);

	window.addEventListener('keydown', function(e){//Метод EventTarget.addEventListener() регистрирует определенный обработчик события
		
		if (steps == true){
			if (e.keyCode == 65 && direction != 'right') {
				direction = 'left';
				steps = false;
			}
		else if (e.keyCode == 68 && direction != 'left') {
				direction = 'right';
				steps = false;
			}
		else if (e.keyCode == 87 && direction != 'down') {
				direction = 'up';
				steps = false;
			}
		else if (e.keyCode == 83 && direction != 'up') {
				direction = 'down';
				steps = false;
			}
		}

	});




