'use strict'

const inputValue = document.querySelector('#input-box');
const mainDiv = document.querySelector('#main-div');
const toDobox = document.getElementsByClassName('todo-box');

// 시간 출력 함수 
const makeTime = () => {
    // 현재 시간 저장 
    let nowDate = new Date();
    let hour = nowDate.getHours();
    let min = String(nowDate.getMinutes());
    // 현재 분이 한 자리의 경우 앞에 0을 붙여주는 조건문 
    if (min < 10) {
        let newMin = '0'+ min;
        return (`${hour}:${newMin}`);
    } else {
        let newMin = min;
        return (`${hour}:${newMin}`);
    };
};

// todo 만드는 함수 
const makeTodo = (localObj) => {
    // 새로운 tododiv 만들기
    const newTodo = document.createElement("div");
    const newTodoText1 = document.createElement("p");
    const newTodoText2 = document.createElement("p");
    const todoText = document.createElement('span');
    const time = document.createElement('span');
    // div 안에 자식 추가
    newTodo.appendChild(newTodoText1);
    newTodo.appendChild(newTodoText2);
    // p 안에 자식 
    newTodoText1.appendChild(todoText);
    newTodoText1.appendChild(time);
    // p 안의 text 설정
    todoText.innerHTML = `${localObj.text}`;
    // span 안의 text 설정 
    time.innerHTML= `${localObj.time}`;;
    // p 안의 del 설정
    newTodoText2.innerHTML = 'X'
    // class 추가
    todoText.setAttribute("class", "todo-text");
    newTodo.setAttribute("class","todo-box");
    // 효과 클래스 추가 
    newTodo.classList.add("transition-start");
    setTimeout(() => {
        newTodo.classList.add("transition");
    }, 30);
    newTodoText2.setAttribute("onclick","del()");
    // mainDiv 안에 넣기 
    mainDiv.appendChild(newTodo);
}

// toDo 리스트를 추가하는 함수 
const toDo = () => {
    const nowTime = makeTime()
    // input 에 들어온 text 설정
    let text = inputValue.value;
    // localStorage 객체 형태로 저장
    const obj = {'text':text, 'time':nowTime};
    localStorage.setItem(text, JSON.stringify(obj));
    // localStorage 객체 불러오기 
    const localObj = JSON.parse(localStorage.getItem(text));
    // todo div 만들기
    makeTodo(localObj);
    // 스크롤 맨 아래로 고정
    mainDiv.scrollTop = mainDiv.scrollHeight;
    // input 값 초기화 
    inputValue.value = '';
}

// 엔터 이벤트가 일어날 때 함수
const enter = () => {
    if (window.event.keyCode == 13 && (inputValue.value)) {
        toDo();
    }
}

const del = () => {
    // todo 의 부모를 찾아서 todo 를 삭제 
    const div = event.target.parentNode
    mainDiv.removeChild(event.target.parentNode);
    // localStorage key 값에 해당하는 text에 접근 
    const key = div.childNodes[0].childNodes[0].innerHTML;
    localStorage.removeItem(key);
}

// 화면에 출력 
const list = () => {
    for(let i=0; i<localStorage.length; i++) {
        const localObj = JSON.parse(localStorage.getItem(localStorage.key(i)))
        makeTodo(localObj)
    }
}
list();