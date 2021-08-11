'use strict'

const inputValue = document.querySelector('#input-box');
const mainDiv = document.querySelector('#main-div');
const toDobox = document.getElementsByClassName('todo-box');
// 정렬할 때 필요한 숫자 
let keyValue = 0;
// 시간 출력 함수 
const makeTime = () => {
    // 현재 시간 저장 
    let nowDate = new Date();
    let hour = nowDate.getHours();
    let min = String(nowDate.getMinutes());
    let sec = nowDate.getSeconds();
    // 현재 분이 한 자리의 경우 앞에 0을 붙여주는 조건문 
    if (min < 10) {
        let newMin = '0'+ min;
        return (`${hour}:${newMin}:${sec}`);
    } else {
        let newMin = min;
        return (`${hour}:${newMin}:${sec}`);
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

// // toDo 리스트를 추가하는 함수 
const toDo = () => {
    const normalList = [];
    const sortedKey = []

    const nowTime = makeTime()
    for(let i=0; i<localStorage.length; i++) {
        const localObj = JSON.parse(localStorage.getItem(localStorage.key(i)))
        normalList.push(localObj);
    }
    // sortList 정렬 후 출력 
    for (let item=0; item<normalList.length; item++){
        sortedKey.push(normalList[item].keyValue);
    }
    // 정렬 
    sortedKey.sort();
    // input 에 들어온 text 설정
    let text = inputValue.value;
    let maxNum = 0;
    // 정렬 
    if (localStorage.length > 0){
        // max 구할 수 없는 경우
        if (localStorage.length === 1) {
            maxNum = sortedKey.length +1;
            keyValue = maxNum
            console.log(`길이가1일때 ${maxNum}`);
        } else {
            maxNum = (Math.max.apply(null, sortedKey))+1;
            console.log(sortedKey);
            console.log(`길이가 적당할 때 ${maxNum}`);
            keyValue = maxNum;
        }
    } else {
        keyValue += 1
        console.log(`빈값일때${keyValue}`);
    }
    // localStorage 객체 형태로 저장
    const obj = {'keyValue':keyValue,'text':text, 'time':nowTime};
    // const obj = {'text':text, 'time':nowTime};
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

const sortedList = [];
const sortList = [];
const keyList = [];

// 화면에 출력 
const list = () => {
    // localStorage 값으로 list 를 만드는 과정 
    for(let i=0; i<localStorage.length; i++) {
        const localObj = JSON.parse(localStorage.getItem(localStorage.key(i)))
        sortList.push(localObj);
    }
    // sortList 정렬 후 출력 
    for (let item=0; item<sortList.length; item++){
        keyList.push(sortList[item].keyValue);
    }
    // 정렬 
    keyList.sort();
    // 정렬된 key 로 맞는 value 찾고, 새로운 리스트 sortedList 에 순서대로 저장.
    for (let i=0; i<keyList.length; i++) {
        for (let j=0; j<sortList.length; j++) {
            if (sortList[j].keyValue === keyList[i]) {
                sortedList.push(sortList[j]);
            } else {
                continue
            }
        }
    }
    // 중복제거
    const norepeatList = Array.from(new Set(sortedList));
    // 정렬된 리스트로 List 출력 
    for (let i=0; i<norepeatList.length; i++) {
        makeTodo(norepeatList[i]);
    }
}

list();