class Matrix{
    

    constructor(elem, rows = 20, cols = 20){
        this.elem = elem;
        this.cells = [];
        this.rows = rows;
        this.cols = cols;

        this.cellsAttributes = []
        this.attributeDescriptionObject = {}
    }
    
    create(){
        for(let i = 0; i < this.rows * this.cols; i++){
            let div = document.createElement('div');
            
            if(i % this.cols === 0){
                div.classList.add('row-start');
            }
            
            div.setAttribute('data-game', '');
            this.elem.appendChild(div);
            this.cells[i] = '';
        }
    }
    
    getCell(x, y){
        let num = this._calcNum(x, y);
        return this.cells[num];
    }
    
    setCell(x, y, val){
        let num = this._calcNum(x, y);
        this.cells[num] = val;
        this.elem.children[num].setAttribute('data-game', val);

        
        
        // Перебор атрибутов дива - удаляем атрибуты, которые добавили для описания фрукта
        for(let attribute of this.elem.children[num].attributes){
            if(attribute.name !== 'data-game' && attribute.name !== 'class'){
                //this.elem.children[num].removeAttribute(attribute.name)
                this.cellsAttributes[num] = {}
                this.removeAttribute(this.attributeDescriptionObject)
            }
        }

        // Перебор атрибутов дива в функциональном стиле - удаляем атрибуты, которые добавили для описания фрукта
        /*Array.prototype.slice.call(this.elem.children[num].attributes).forEach((attribute) =>{
            console.log(this)
            if(attribute.name !== 'data-game' && attribute.name !== 'class'){
                //this.elem.children[num].removeAttribute(attribute.name)
                this.cellsAttributes[num] = {}
                this.removeAttribute(this.attributeDescriptionObject)

                console.log(attribute.name)
            }

        })*/

    }
    
    /* Следуя идеологии запрет на изменение, добро на расширение, не стал записывать типы фруктов
    в ячейку матрицы, создал дополнительный " этаж на матрице - добавил метод, добавляющий атрибуты,
    например с типом фрукта. Можно добавлять сколько угодно атрибутов. Дописать объект ScanField,
    чтобы он мог читать атрибуты. Дописать метод getAttribute в Матрице, чтобы можно было их запрашивать.

    */
    //Добавить атрибут

    addAttribute(attributeDescriptionObject){
        let num = this._calcNum(attributeDescriptionObject.x, attributeDescriptionObject.y)

        this.cellsAttributes[num] = {[attributeDescriptionObject.attribute]: attributeDescriptionObject.value}
        
        this.elem.children[num].setAttribute(attributeDescriptionObject.attribute, attributeDescriptionObject.value)
        

        this.attributeDescriptionObject = attributeDescriptionObject // Сохраняем описание атрибутов в локальном объекте
    }
    // Удалить атрибут
    removeAttribute(attributeDescriptionObject){
        let num = this._calcNum(attributeDescriptionObject.x, attributeDescriptionObject.y)

        this.cellsAttributes[num] = {}

        this.elem.children[num].removeAttribute(attributeDescriptionObject.attribute)
        
    }


    /* пересчитать № строки и № столбца в i */ 
    _calcNum(x, y){
        return (y - 1) * this.cols + x - 1;
    }
}