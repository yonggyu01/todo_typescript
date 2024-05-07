Typescript와 SCSS를 사용해서 제작하는 todo리스트입니다

deploy :

https://yonggyu01.github.io/todo_typescript/

객체지향 프로그래밍의 원칙에 맞춰 제작한 Todo리스트 앱입니다..

![image](https://github.com/yonggyu01/todo_typescript/assets/152263794/03f8378a-797a-48a4-92fb-bb632bc4b6ac)


클래스의 구조를 다이어그램으로 정리해봤습니다.

제가 주로 신경써서 구현한 부분은 객체지향 프로그래밍의 원칙중 

캡슐화 부분입니다.
![image](https://github.com/yonggyu01/todo_typescript/assets/152263794/6c2edf8d-f2f3-4d32-8ebb-37f286ea2841)

외부에서 접근을 제한할 변수와 메서드는

protected 를 사용하여 Todolist 내부에서 특정 함수를 통해서만 업데이트가 가능하도록 캡슐화하였고, 상속을 통해 자식요소도 사용이 가능하도록 했습니다.

![image](https://github.com/yonggyu01/todo_typescript/assets/152263794/4940e44e-d2a5-4208-812e-2f10f70dc5fb)


캡슐화 되어있어 public으로 설정된 변수와 메서드만 접근이 가능합니다.

클래스 Todolist는 추상화가 되어있어 유사한 구조의 앱을 제작할때 사용하기 좋습니다.

![image](https://github.com/yonggyu01/todo_typescript/assets/152263794/c9ff6c69-96b7-4150-a8a8-7c27111d8840)

상속 기능을 통해 새로운 클래스를 정의하였습니다.

해당 클래스에서는 list에 존재하는 모든 데이터를 한번에 삭제하는 기능을 추가하고

객체지향프로그래밍의 원칙중 하나인 다형성의 원칙대로

메서드 오버라이딩을 통해 같은 함수를 다른 기능으로 변경하여 처리하도록 하였습니다.

![image](https://github.com/yonggyu01/todo_typescript/assets/152263794/fbd80353-7e55-4176-8c77-68925e2cb844)


비교적 간단한 CRUD기능을 갖고있는 Todolist 앱이지만
객체지향 프로그래밍의 원칙에 맞게 재사용성을 고려하여 제작하였습니다.

구동화면


![07 05 2024 15_16](https://github.com/yonggyu01/todo_typescript/assets/152263794/e791ac3b-fe82-4023-b4af-127cd2249e78)






