class Fruit extends Elem{
    
    constructor(matrix, cords){
        super(matrix, cords)
        this.value = 'fruit';
        this.fruitTypeArray = ['apple','banan','pineapple']
        this.fruitType = this._getRandomArrayValue(this.fruitTypeArray)
    }
		/* Переопределяю метод родителя, и пишу в матрицу тип фрукта
		с помощью нового метода
		*/
	    show(){
        for(let cord of this.cords){
            this.matrix.setCell(cord[0], cord[1], this.value);
            this.matrix.addAttribute({
            							"x": cord[0],
            							"y": cord[1],
            							"attribute": 'fruitType',
            							"value":this.fruitType
            })

        }
    }    
    // Получить случайны элемент из массива
    _getRandomArrayValue(array){
    	return array[Math.floor(Math.random() * array.length)]
    }
}