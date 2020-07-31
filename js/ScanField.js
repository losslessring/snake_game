// Объект для сканирования игрового поля

class ScanField {
    
    constructor(matrix){
    this.matrix = matrix   
    this.fieldObjectsArray = []  
	}

	// Сканирую все клетки матрицы и возвращаю массив с объектами на поле
    scan(){
    	//Очищаем массив перед каждым сканированием
    	this.fieldObjectsArray.length = 0

    	// Сканируем начиная с 1, потому что так происходит пересчет клеток в Матрице
    	for(let i = 1; i <= this.matrix.cols; i++){
    		for(let j = 1; j <= this.matrix.rows; j++){
    			this.fieldObjectsArray.push(this.matrix.getCell(i,j))
    		}
    	}
    	//console.log(this.fieldObjectsArray)
    	return this.fieldObjectsArray
    	
    }
    // Ищу заданный объект в массиве
    find(valueToFind){

    	this.scan()
  		
    	for (let currentValue of this.fieldObjectsArray) {
    		
  			if (currentValue === valueToFind) {
  				
				return true
  			} 
  		}
  		return false

	}
	findCount(valueToFind){
		let valueCounter = 0
		this.scan()
  		
    	for (let currentValue of this.fieldObjectsArray) {
    		
  			if (currentValue === valueToFind) {
  				
				valueCounter += 1
  			} 
  		}
  		return valueCounter

	}
	
}