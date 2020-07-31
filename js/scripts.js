window.onload = function (e) {

    var div = document.querySelector('.fields');
    var matrix = new Matrix(div, 15, 15);
    matrix.create();
    
    //var fruit = new Fruit(matrix,[[8,7]])
    var fruit = new Fruit(matrix, [[Math.floor(Math.random() * matrix.cols + 1), Math.floor(Math.random() * matrix.rows + 1)]])
    fruit.show()
    
    var wall = new Wall(matrix,[[3, 7],[4, 7],[5, 7],[6, 7]])
    wall.show()

    var snake = new Snake(matrix, [[5, 5],[4, 5],[3, 5]], 'right');
    snake.show();
    // Можно добавить вторую змейку    

    let scanField = new ScanField(matrix)

    document.onkeydown = function(e){
        
        
        switch(e.keyCode){
            case 37:
                snake.course = 'left';
                break;
            case 38:
                snake.course = 'up';
                break;
            case 39:
                snake.course = 'right';
                break;
            case 40:
                snake.course = 'down';
                break;
        }
    }


    
    let gameStepTime = 500
    let timerMultiplier = 1
    let fruitTime = 20
    /*Переписал игровой цикл, чтобы игра ускорялась, когда Змея съедает фрукт.
    Сделал с помощью рекурсивного setTimeout
     Надо разобраться с рекурсивным setTimeout, чтобы не висела в памяти функция.
    */
    let gameStep = function() {

        snake.move();
        // Если нет фруктов на поле - создать новый фрукт в случайном месте

         if(!scanField.find('fruit')) {
            var fruit = new Fruit(matrix, [[Math.floor(Math.random() * matrix.cols + 1), Math.floor(Math.random() * matrix.rows + 1)]])
            fruit.show()
            
        }
        
        // Увеличиваем скорость при поедании фрукта
        timerMultiplier = scanField.findCount('snake') * fruitTime
        // Ограничение, чтобы Змея не ускорялась слишком сильно
        if (timerMultiplier >= gameStepTime - fruitTime){
            timerMultiplier =  gameStepTime - fruitTime
        } 

        

        
        

    };
    // Главный цикл
    (function mainLoop() {
        gameStep()
        timerId = setTimeout(mainLoop, gameStepTime - timerMultiplier);
        

        if(!snake.alive){

            clearTimeout(timerId)
            alert('gameover');
        }

    })()

   

   /* let timer = setInterval(() => {
        snake.move();
        
        // Если нет фруктов на поле - создать новый фрукт в случайном месте

        if(!scanField.find('fruit')) {
            var fruit = new Fruit(matrix, [[Math.floor(Math.random() * matrix.cols + 1), Math.floor(Math.random() * matrix.rows + 1)]])
            fruit.show()
            
        }
        

        if(!snake.alive){
            clearInterval(timer);
            alert('gameover');
        }

    }, 200);
*/
}
