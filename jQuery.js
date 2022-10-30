window.$ = window.jQuery = function(selectorOrArray){
    let elements
    if(typeof selectorOrArray === 'string'){
        elements = document.querySelectorAll(selectorOrArray)
    }
    else if(selectorOrArray instanceof Array){
        elements = selectorOrArray
    }

    return {
        oldApi: selectorOrArray.oldApi,
        addClass(className){
            for(let i=0;i<elements.length;i++){
                elements[i].classList.add(className)
            }
            return this
        },

        find(selector){
            let array = []
            for(let i=0; i<elements.length ;i++){
                array = array.concat(Array.from(elements[i].querySelectorAll(selector)))
            }
            array.oldApi = this
            return jQuery(array)
        },
        each(fn){
            for(let i=0;i<elements.length;i++){
                fn.call(null,elements[i],i)
            }
            return this
        },//对elements的每个元素调用fn函数

        parent(){
            let array = []
            this.each((node)=>{
                if(array.indexOf(node.parentNode) === -1){
                    array.push(node.parentNode)
                }
            })
            return jQuery(array)
        },//array是仅读变量，但允许进行api操作，不允许赋值。
        //获取元素的父元素
        //indexOf本质是判断参数是否是调用者的实例
        //可以用于判断元素是否在数组内
        
        children(){
            let array = []
            this.each((node) =>{
                array.push(...node.children)
            })
            return jQuery(array)
        },
        //node.children是一个伪数组，需要通过...将其转为数组，放入array中
        //如果使用Array.from()会将children伪数组放入数组中再放入array

        print(){
            console.log(elements)
        },
        //当调用find会创建一个新的实例，此时要返回操作上个实例，通过end函数实现
        //当新的实例产生后，与旧的实例是没有关联的，因此在新建实例时需要传参获取上个实例信息
        //而这个参数就是this，作为数组的最后一个元素传入新的实例
        end(){
            return this.oldApi
            //直接返回当前实例的oldApi属性
            //而oldApi属性来自上一个接口函数，在操作结束后，传入的
        },
    }
}
