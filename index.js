class Todolist {
    constructor(target, index, list, input, pushbtn) {
        this.target = target;
        this.index = index;
        this.list = list;
        this.input = input;
    }
    indexplus() {
        ++this.index;
    }
    getTodo() {
        // 이벤트 초기화  -> 개선방향 ul에 이벤트를 추가해서 클래스 del인경우 동작하도록 로직 변경하여 메모리 낭비 최적화 가능할것으로 생각된다.
        document.querySelectorAll('.del').forEach((item, idx) => {
            item.removeEventListener('click', () => { });
        });
        document.querySelectorAll('.check').forEach((item, idx) => {
            item.removeEventListener('click', () => { });
        });
        //ul 내부 데이터 초기화
        this.target.innerHTML = '';
        // list 데이터 가공해야함
        this.list.forEach((el) => {
            let Li = document.createElement('li');
            let Input = document.createElement('input');
            let P = document.createElement('p');
            let A = document.createElement('a');
            Input.type = 'checkbox';
            Input.className = 'check';
            Input.dataset.update = `${el.id}`;
            el.isDone ? Input.checked = true : Input.checked = false;
            A.href = '#none';
            P.innerHTML = el.content;
            A.className = "del";
            A.dataset.delid = `${el.id}`;
            A.innerText = "삭제";
            el.isDone ? P.className = "done" : P.className = "notdone";
            Li.appendChild(Input);
            Li.appendChild(P);
            Li.appendChild(A);
            // 타겟 ul에 집어넣기
            this.target.append(Li);
            document.querySelectorAll('.del').forEach((item, idx) => {
                item.addEventListener('click', () => {
                    this.delTodo(item.dataset.delid);
                });
            });
            document.querySelectorAll('.check').forEach((item) => {
                item.addEventListener('click', () => {
                    this.updateTodo(item.dataset.update);
                });
            });
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
        });
    }
    addTodo() {
        console.log('addtodo실행', this.input.value);
        if (!this.input.value) {
            alert('내용을 넣어주세요');
            return;
        }
        this.indexplus();
        let list = {
            isDone: false,
            content: this.input.value,
            id: this.index
        };
        this.list.push(list);
        this.input.value = '';
        // 데이터 추가후 화면에 보이는 데이터 최신화해주기
        this.getTodo();
    }
    delTodo(dataset) {
        let newlist = [];
        this.list.filter((item, idx) => {
            if (String(item.id) !== dataset) {
                newlist.push(item);
            }
        });
        this.list = newlist;
        this.getTodo();
    }
    updateTodo(dataset) {
        // console.log(dataset)
        let newlist = [];
        newlist = this.list.map((item, index) => {
            console.log(item.id, 'id', dataset, 'dataset');
            if (String(item.id) == dataset) {
                return Object.assign(Object.assign({}, item), { isDone: !item.isDone });
            }
            else {
                return item;
            }
        });
        this.list = newlist;
        this.getTodo();
    }
}
const ul = document.querySelector('.todotarget');
let tempdata = [{
        isDone: false,
        content: '안녕 이건 더미데이터야',
        id: 0
    }];
const inputbox = document.querySelectorAll('#todo,.pushbtn')[0];
const pushbtn = document.querySelectorAll('#todo,.pushbtn')[1];
let todo = new Todolist(ul, 0, tempdata, inputbox, pushbtn);
//초기화와 첫 더미데이터 불러오기
todo.getTodo();
// 타입스크립트에서는 ul을 읽어올 수 없어서 오류발생함 무시하고 진행해보자
// 데이터 추가 이벤트 생성
document.querySelector('.pushbtn').addEventListener('click', function () {
    todo.addTodo();
});