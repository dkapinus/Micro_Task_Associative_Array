import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

type todolistsType = {
    id:string;
    title:string,
    filter:FilterValuesType
}


function App() {



    let todolistID1=v1();
    let todolistID2=v1();

    let [todolists, setTodolists] = useState<Array<todolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'completed'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]:[
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]:[
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });



    function removeTask(todolistID:string,id: string) {
        let filteredTasks = {...tasks,[todolistID]:tasks[todolistID].filter(t => t.id != id)};
        setTasks(filteredTasks);
    }

    function addTask(todolistID:string,title: string) {
        let task = {id: v1(), title: title, isDone: false};
        // let newTasks = [task, ...tasks];

        setTasks({...tasks,[todolistID]:[...tasks[todolistID],task]});


    }

    function changeStatus(todolistID:string,taskId: string, isDone: boolean) {

        // if (task) {
        //     task.isDone = isDone;
        // }

        setTasks({...tasks,[todolistID]:tasks[todolistID].map(t => t.id === taskId ?{...t,isDone: isDone}:t)});
    }




    function changeFilter(todolistID:string,value: FilterValuesType) {
        setTodolists(todolists.map((el)=>el.id==todolistID ? {...el,filter:value} :el));
    }


    return (
        <div className="App">
            {todolists.map((el)=>{
                let tasksForTodolist = tasks[el.id];

                if (el.filter === "active") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                }
                if (el.filter === "completed") {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
                }
                return (
                    <Todolist title={el.title}
                              tasks={tasksForTodolist}
                              key={el.id}
                              todolistID={el.id}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={el.filter}
                    />
                )
                }

            )

            }

        </div>
    );
}

export default App;
