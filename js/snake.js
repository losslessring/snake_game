/* Не очень нравится реализация с началом в 1,1, я бы сделал начало в 0,0
Не очень нравится что передается массив x head[0], y head[1]. Я бы сделал
объект с полями x, y. {x:x, y:y}
*/

class Snake extends Elem{
    
    constructor(matrix, coords, course){
        super(matrix, coords)
        this.value = 'snake'
        this.course = course;
        this.previousCourse = this.course
        this.alive = true;
        
    }
    
    
    move(){


        
        /* Переменная для сохранения головы Змеи.
         Копируем нулевой элемент массива, потому что массивы передаются по ссылке.
        */
        var head = this.cords[0].slice()
        

        
        /* Проверка смены курса, если курс меняется на противоположный
        и Змея ломает себе шею, то сохраняется текущий курс
        */
        this.course = this._checkCourse(this.course, this.previousCourse)
        
        // Движение головы Змеи
        this._headMove(head)

        //Сохранение предыдущего курса
        this.previousCourse = this.course
       

 
        /* Движение змеи. Простой алгоритм. Стираем хвост в конце массива
        добавляем голову в начало массива.


        */
        
        // Просмотр поля
        this._analyzeEnvironment(this._checkFieldObjects(head))
        
        if(!this.alive){
            return;
        }
        
        if (this._checkFieldObjects(head) !== 'fruit'){
            // Удаляем хвост Змеи
            var tail = this.cords.pop()
            this.matrix.setCell(tail[0], tail[1], '');
        }
        // Добавляем голову Змее
        this.cords.unshift(head)
        this.matrix.setCell(head[0], head[1], 'snake');
 


    }

    /* Проверка смены курса, если курс меняется на противоположный
    и Змея ломает себе шею, то сохраняется текущий курс
    */
    _checkCourse(course, previousCourse){
        if(course !== previousCourse) {
            switch(true){
                case course === 'left' && previousCourse === 'right':
                    console.log(`saved neck break`)
                    return previousCourse
                    break;
                case course === 'right' && previousCourse === 'left':
                    console.log(`saved neck break`)
                    return previousCourse
                    break;
                case course === 'up' && previousCourse === 'down':
                    console.log(`saved neck break`)
                    return previousCourse
                    break;
                case course === 'down' && previousCourse === 'up':
                    console.log(`saved neck break`)
                    return previousCourse
                    break;
            }
        }

        return course
    }

    // Движение головы Змеи 
    _headMove(head) {
            switch(this.course){
                case 'right':
                    head[0]++;
                    break;
                case 'left':
                    head[0]--;
                    break;
                case 'up':
                    head[1]--;
                    break;
                case 'down':
                    head[1]++;
                    break;
            }
    }

    // Функция проверки выхода за край поля
    _checkEdges(head){
        return head[0] >= 1 && head[0] <= this.matrix.cols &&
               head[1] >= 1 && head[1] <= this.matrix.rows;
    }
    // 
    _checkFieldObjects(head){
        if (!this._checkEdges(head)) return 'out'
        return this.matrix.getCell(head[0],head[1])

    }
    _analyzeEnvironment(cellStatus){
        
        switch(cellStatus){
            case 'out':
                this.alive = false;
                break;
            case 'snake':
                this.alive = false;
                break;
            case 'fruit':                
                break;
            case 'wall':
                this.alive = false;
                break;
        }
    }

}