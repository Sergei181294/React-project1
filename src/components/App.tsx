import { Component } from "react"
import { Input, Button, Checkbox, Radiogroup } from "./common"
import css from "./styles.module.css"


interface Task {
       id: number;
       label: string;
       isDone: boolean;
}

interface AppProps {
       className?: string;
     }

interface AppState {
       newTaskInput: string;
       tasks: Task[];
       filter: string;
       counter: number;
}


export class App extends Component<AppProps, AppState>  {

       state: AppState = {
              newTaskInput: "",
              tasks: [{ id: 1, label: 'Выучить JS', isDone: true }, { id: 2, label: 'Выучить React', isDone: false }],
              filter: "all",
              counter: 0,

       }

       filters = [
              { id: '1', label: 'Все', value: 'all' },
              { id: '2', label: 'Сделать', value: 'make' },
              { id: '3', label: 'Сделано', value: 'made' },
       ];

       localStorageKey = 'tasks';

       addTaskHandler() {
              if (this.state.newTaskInput.trim().length === 0) {
                     return alert('Не валидное имя задачи');
              }
              this.setState((prevState) => ({
                     tasks: [...prevState.tasks, { id: prevState.tasks.length + 1, isDone: false, label: prevState.newTaskInput }],
                     newTaskInput: "",
              }));
       }

       deleteTaskHandler = (id: Task["id"]) => {
              this.setState((prevState) => ({
                     tasks: prevState.tasks.filter((task) => task.id !== id)
              }));
       }

       toggleTaskHandler = (id: Task['id']) => {
              this.setState((prevState) => ({
                     tasks: prevState.tasks.map((task) => task.id === id ? { ...task, isDone: !task.isDone } : task),
              }));
       }

       changeFilterHandler = (filter: string) => {
              this.setState({ filter });
       }


       componentDidMount() {
              const tasks = JSON.parse(localStorage.getItem(this.localStorageKey) ?? '[]');

              if (tasks.length) {
                     this.setState({
                            tasks
                     });
              }
       }

       componentDidUpdate(prevProps: any, prevState: any) {
              if (prevState.tasks !== this.state.tasks) {
                     localStorage.setItem(this.localStorageKey, JSON.stringify(this.state.tasks));
              }
       }



       render() {
              return (<div>
                     <Input value={this.state.newTaskInput} onChange={(e) => this.setState({ newTaskInput: e.target.value })} />
                     <Button onClick={() => this.addTaskHandler()} children="Добавить задачу" />
                     <Radiogroup onChange={this.changeFilterHandler} items={this.filters} name="filter" value={this.state.filter} />

                     <ul className={css.list}>
                            {this.state.tasks
                                   .filter((task): boolean => {
                                          if (this.state.filter === 'all') {
                                                 return true;
                                          }

                                          if (this.state.filter === 'make') {
                                                 return !task.isDone;
                                          }
                                          return task.isDone;
                                   })
                                   .map(task => <li className = {css.item} key={task.id}>
                                          <div className= {css.itemBlock}>
                                          <Checkbox  checked={task.isDone} onChange={() => this.toggleTaskHandler(task.id)} />
                                          {task.label}
                                          </div>
                                          {task.isDone && <Button className={css.alertBtn} onClick={() => this.deleteTaskHandler(task.id)} children="Удалить задачу" />}
                                   </li>)}
                     </ul>



              </div >)
       }
}
