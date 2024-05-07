
    type List = {
        isDone : boolean,
        content : string,
        id : number
    }
    interface Todomaker {
        getTodo() : void
        addTodo() : void
        delTodo(dataset:string,action?:string) : void
        updateTodo (idx : string) : void
        elementmaker() :void
        eventreset() :void
        eventinit() : void
    }

/**
 * @param1 target : ul태그
 * @param2 태그들의 id값 숫자 0을 넣으세요
 * @param3 list[] : isDone: boolean,content: 인풋태그에 입력한 텍스트, id: param2의 값
 * @param4 input : input태그 ( 메모 입력하는 태그지정)
 * @param5 pushbtn : input태그 옆에 + 버튼
 * @method getTodo : list의 값을 param1에 append해주는 메서드  화면 업데이트와 이벤트 등록도 같이 해줌
 * @method addTodo : param3 list 배열에 값을 넣어주는 메서드
 * @method deltodo : param3 list배열에 값을 지워주는 메서드
 * @method updateTodo : param3 list배열에 본인의 값을 수정하는 메서드
 */
    
    class Todolist implements Todomaker {
        protected target : Element
        protected index : number
        protected list : List[]
        protected input : HTMLInputElement
        public pushbtn : Element
        constructor(target : Element, index : number, list : List[], input:HTMLInputElement,pushbtn : Element){
            this.target = target
            this.index = index
            this.list = list
            this.input = input
        }
        protected indexplus(){
            ++this.index
        }
        getTodo(): void {
            this.eventreset()
            //ul 내부 데이터 초기화
            this.target.innerHTML=''
            this.elementmaker()
            this.eventinit()
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
        updateTodo(dataset : string, action?:string):void {
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
        elementmaker():void{
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
            })
        }
        eventreset():void{
          // 이벤트 초기화  -> 개선방향 ul에 이벤트를 추가해서 클래스 del인경우 동작하도록 로직 변경하여 메모리 낭비 최적화 가능할것으로 생각된다.
          document.querySelectorAll('.del').forEach((item,idx)=>{
            item.removeEventListener('click',()=>{})
        }) 
        document.querySelectorAll('.check').forEach((item,idx)=>{
            item.removeEventListener('click',()=>{})
        }) 
        }
        eventinit():void{
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
    document.querySelector('details').open=true
interface Cartimplements {
    Allclear() : void
}


class NewTodolist extends Todolist implements Todomaker,Cartimplements{
    alldel : Element
    constructor(target:Element, index:number, list:List[],input:HTMLInputElement,pushbtn:Element,alldel:Element ){
        super(target,index,list,input,pushbtn)
        super.getTodo()
        this.alldel = alldel
    }
       elementmaker(): void {
        this.list.forEach((el)=>{
            let Li:HTMLElement = document.createElement('li')
            let Input : HTMLInputElement = document.createElement('input')
            let P : HTMLElement = document.createElement('p')
            let A1 : HTMLAnchorElement = document.createElement('a')
            let A2 : HTMLAnchorElement = document.createElement('a')
            Input.type= 'checkbox'
            Input.className='check'
            Input.dataset.update=`${el.id}`
            if(el.isDone){
                Input.checked=true
                P.className="donecart"
            }else{
                Input.checked= false
                P.className="notdonecart"
            }
            A1.href='#none'
            A2.href='#none'
            P.innerHTML = el.content
            A1.className="updatebtn"
            A2.className="del"
            A1.dataset.update = `${el.id}`
            A2.dataset.delid = `${el.id}`
            A1.innerText="수정"
            A2.innerText="삭제"
            Li.appendChild(Input)
            Li.appendChild(P)
            Li.appendChild(A1)
            Li.appendChild(A2)
            // 타겟 ul에 집어넣기
            this.target.append(Li)
        })
    }
    Allclear():void {
        this.list=[]
        this.getTodo()
    }
    updateTodo(dataset: string, action? :string): void {
        if(action){
            this.list.forEach((item,index)=>{
                if(String(item.id) == dataset){
                    let newtext = prompt(item.content,item.content)
                    this.list[index].content = newtext
                }
            })
        }else{
            this.list.forEach((item,index)=>{
            if(String(item.id) == dataset){
                this.list[index].isDone = !item.isDone
            }
        }
        
            )
        }
        this.getTodo()
    }
    eventinit():void{
        document.querySelectorAll('.del').forEach((item:HTMLElement,idx)=>{
            item.addEventListener('click',()=>{
                this.delTodo(item.dataset.delid)
            })
        })
        document.querySelectorAll('.check,.updatebtn').forEach((item:HTMLElement)=>{
            if(item.className=='check'){
                item.addEventListener('click',()=>{
                    this.updateTodo(item.dataset.update)
                })
            }else{
                item.addEventListener('click',()=>{
                    this.updateTodo(item.dataset.update,'update')
                })
            }
        })
    }
    eventreset():void{
        // 이벤트 초기화  -> 개선방향 ul에 이벤트를 추가해서 클래스 del인경우 동작하도록 로직 변경하여 메모리 낭비 최적화 가능할것으로 생각된다.
        document.querySelectorAll('.del').forEach((item,idx)=>{
          item.removeEventListener('click',()=>{})
      }) 
      document.querySelectorAll('.check,.updatebtn').forEach((item,idx)=>{
          item.removeEventListener('click',()=>{})
      }) 
      }
}

const cartul = document.querySelector('.carttarget')
const cartinput = document.querySelectorAll('#cart,.cartbtn')[0] as  HTMLInputElement
const cartbtn:Element= document.querySelectorAll('#cart,.cartbtn')[1]
const alldel = document.querySelector('.alldel')
let cart = new NewTodolist(cartul,0,[],cartinput,cartbtn,alldel)
//초기화와 첫 더미데이터 불러오기
cart.getTodo()
document.querySelector('.cartbtn').addEventListener('click',function(){
    cart.addTodo()
})
document.querySelector('.alldel').addEventListener('click',()=>{
    cart.Allclear()
})

