    type List = {
        isDone : boolean,
        content : string,
        id : number
    }
    interface Todomaker {
        getTodo() : void
        addTodo() : void
        delTodo(dataset:string) : void
        updateTodo (idx : string) : void
    }
    class Todolist implements Todomaker {
        private target : Element
        private index : number
        private list : List[]
        private input : HTMLInputElement
        public pushbtn : Element
        constructor(target : Element, index : number, list : List[], input:HTMLInputElement,pushbtn : Element){
            this.target = target
            this.index = index
            this.list = list
            this.input = input
        }
        indexplus(){
            ++this.index
        }
        getTodo(): void {
            // 이벤트 초기화  -> 개선방향 ul에 이벤트를 추가해서 클래스 del인경우 동작하도록 로직 변경하여 메모리 낭비 최적화 가능할것으로 생각된다.
            document.querySelectorAll('.del').forEach((item,idx)=>{
                item.removeEventListener('click',()=>{})
            }) 
            document.querySelectorAll('.check').forEach((item,idx)=>{
                item.removeEventListener('click',()=>{})
            }) 
            //ul 내부 데이터 초기화
            this.target.innerHTML=''
            // list 데이터 가공해야함
                this.list.forEach((el)=>{
                let Li:HTMLElement = document.createElement('li')
                let Input : HTMLInputElement = document.createElement('input')
                let P : HTMLElement = document.createElement('p')
                let A : HTMLAnchorElement = document.createElement('a')    
                Input.type= 'checkbox'
                Input.className='check'
                Input.dataset.update=`${el.id}`
                if(el.isDone){
                    Input.checked=true
                    P.className="done"
                }else{
                    Input.checked= false
                    P.className="notdone"
                }
                // el.isDone? Input.checked=true : Input.checked= false
                // el.isDone? P.className="done" : P.className="notdone"
                A.href='#none'
                P.innerHTML = el.content
                A.className="del"
                A.dataset.delid = `${el.id}`
                A.innerText="삭제"

                Li.appendChild(Input)
                Li.appendChild(P)
                Li.appendChild(A)
                // 타겟 ul에 집어넣기
                this.target.append(Li)
              
                // this.target.addEventListener('click',(e:MouseEvent)=>{
                //     console.log(e)
                //     switch(e.target.className){
                //     case 'del' : 
                //     console.log('del')
                //     this.delTodo(e.target.dataset.delid)
                //     break;
                //     case 'check':
                //         console.log('check')
                //         this.updateTodo(e.target.dataset.update)
                //     break;
                //     }
                // }) 
            })
            document.querySelectorAll('.del').forEach((item:HTMLElement,idx)=>{
                item.addEventListener('click',()=>{
                    this.delTodo(item.dataset.delid)
                })
            })
            document.querySelectorAll('.check').forEach((item:HTMLElement)=>{
                item.addEventListener('click',()=>{
                    this.updateTodo(item.dataset.update)
                })
            })
        } 
        addTodo():void {  
            console.log('addtodo실행',this.input.value)
            
            if(!this.input.value){
                alert('내용을 넣어주세요')
                return 
            }
            this.indexplus()
            let list :List = {
                isDone : false,
                content : this.input.value,
                id : this.index
            }
            this.list.push(list)
            this.input.value=''
            // 데이터 추가후 화면에 보이는 데이터 최신화해주기
            this.getTodo()
        }
        delTodo(dataset : string) : void {
            let newlist:List[] = []
            this.list.filter((item,idx)=>{
                if(String(item.id) !== dataset){
                    newlist.push(item)
                }
            })
            this.list = newlist
            this.getTodo()
        }
        updateTodo(dataset : string):void {
            // console.log(dataset,this.list)
            // let newlist = []

            this.list.forEach((item,index)=>{
                // console.log(item.id,item.isDone,'id',dataset,'dataset')
            if(String(item.id) == dataset){
                this.list[index].isDone = !item.isDone
                // console.log(this.list[item.id], '바뀌었니?')
            }
            
           })
        //    this.list = newlist
            this.getTodo()

        }
        // viewTodo(list:List[],){
        //     list.map(el=>this.target.append(el))
        // }
    }

    const ul = document.querySelector('.todotarget')
    let tempdata : List[] = [{
        isDone : false,
        content : '안녕 이건 더미데이터야',
        id : 0
    }]
    
    const inputbox = document.querySelectorAll('#todo,.pushbtn')[0] as  HTMLInputElement
    const pushbtn:Element= document.querySelectorAll('#todo,.pushbtn')[1]

    let todo = new Todolist(ul,0,tempdata,inputbox,pushbtn)
    //초기화와 첫 더미데이터 불러오기
    todo.getTodo()
    // 타입스크립트에서는 ul을 읽어올 수 없어서 오류발생함 무시하고 진행해보자
    
    // 데이터 추가 이벤트 생성
    document.querySelector('.pushbtn').addEventListener('click',function(){
        todo.addTodo()
    })



