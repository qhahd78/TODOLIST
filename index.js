'use strict'

const inputValue = document.querySelector('#input-box');
const mainDiv = document.querySelector('#main-div');
const toDobox = document.getElementsByClassName('todo-box');

// toDo 리스트를 추가하는 함수 
const toDo = () => {
    let nowDate = new Date();
    // let year = nowDate.getYear();
    // let month = nowDate.getMonth() +1;
    // let day = nowDate.getDate();
    let hour = nowDate.getHours();
    let min = nowDate.getMinutes();
    
    // input 에 들어온 text 설정
    let text = inputValue.value;
    // 새로운 tododiv 만들기
    const newTodo = document.createElement("div");
    const newTodoText1 = document.createElement("p");
    const newTodoText2 = document.createElement("p");
    const todoText = document.createElement('span');
    const time = document.createElement('span');
    console.log(`${hour}:${min}`);
    // div 안에 자식 추가
    newTodo.appendChild(newTodoText1);
    newTodo.appendChild(newTodoText2);
    // p 안에 자식 
    newTodoText1.appendChild(todoText);
    newTodoText1.appendChild(time);
    // p 안의 text 설정
    todoText.innerHTML = `${text}`
    // span 안의 text 설정 
    time.innerHTML= `${hour} : ${min}`
    // p 안의 del 설정
    newTodoText2.innerHTML = 'X'
    // class 추가
    todoText.setAttribute("class", "todo-text");
    newTodo.setAttribute("class","todo-box");
    newTodoText2.setAttribute("onclick","del()");
    // mainDiv 안에 넣기 
    mainDiv.appendChild(newTodo);
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
    mainDiv.removeChild(event.target.parentNode);
    // 요게 todo 하나 
    console.log(event.target.parentNode);
}