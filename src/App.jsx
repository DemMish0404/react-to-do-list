import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [chores, setChores] = useState(['feed the bird', "feed the dog" , "feed yourself"])
  const refToTheToDoInput = useRef(null)


  function addAChoreToTheList(){
    const currentChoreToAdd = refToTheToDoInput.current.value
    if(currentChoreToAdd.trim().length !== 0 ){
      console.log(`значение инпута не пустая строка`)
      setChores([...chores,currentChoreToAdd])
      refToTheToDoInput.current.value = ""
    }
  }

  function deleteAChoreFromTheList(index){
    const filteredArr = chores.filter((elem,i)=> i !== index)
    setChores(filteredArr) // массив с те ме же элементами кроме удаленного
  }

  // будем по формуле менять индексы в массиве местами
  //? не знаю почему но возникает ошибка что нельзя обратиться к массиву до инициализации - перекинул выше и норм
  const arrToUpdate = [...chores]
  function moveAChoreUp(index){

    // чтобы не двигать и так первый элемент и не было багов
    if(index !== 0){
      [arrToUpdate[index] ,arrToUpdate[index -1]] = [arrToUpdate[index - 1],  arrToUpdate[index]]
    
      setChores(arrToUpdate)
    }
    
  } 

  function moveAChoreDown(index){
    // чтобы не двигать уже последний и не было багов
    if(index < chores.length - 1){
      [arrToUpdate[index] ,arrToUpdate[index +1]] = [arrToUpdate[index + 1],  arrToUpdate[index]]
    
      setChores(arrToUpdate)
    }
    
  } 


  return (
    <>
    <h1 >Todo list</h1>
      <div className='todo-list'>
        <div className="todo-list__write-what-to-add">
            <input ref={refToTheToDoInput} className='todo-list__input' type="text" placeholder='write what you want to add to the todo list' />
            <button onClick={addAChoreToTheList} className='todo-list__button'>add</button>
        </div>
        <ul className="todo-list__list list-todo-list">

          {chores.map((elem,index)=>  <li key={index} className='list-todo-list__item'>
              <span className='list-todo-list__name-of-the-chore'>{elem}</span>
              <button onClick={()=>deleteAChoreFromTheList(index)} className='list-todo-list__button delete-chore-button'>delete</button>
              <button onClick={()=>moveAChoreUp(index)} className='list-todo-list__button chore-up-button'>👆</button>
              <button onClick={()=>moveAChoreDown(index)} className='list-todo-list__button chore-up-button'>👇</button>
            </li>) }
           

            
        </ul>
      </div>
    </>
    
  )
}

export default App
