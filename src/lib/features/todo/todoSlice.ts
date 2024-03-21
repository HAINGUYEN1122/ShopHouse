import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuid4 } from "uuid";

export interface TodoListState {
  id: string;
  content: string;
  isDone: boolean;
}

const initialState: TodoListState[] = [
  { id: uuid4(), content: "Hit the gym", isDone: false },
  { id: uuid4(), content: "Meet George", isDone: false },
];

export const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todoList: initialState,
  },
  reducers: {
    addTodo(state: { todoList: TodoListState[]; }, action: { payload: { todo: any; }; }) {
      const newTask = {
        id: uuid4(),
        content: action.payload.todo,
        isDone: false,
      };
      state.todoList.push(newTask);
    },
    deleteTask: (state: { todoList: TodoListState[]; }, action: { payload: { id: any; }; }) => {
      state.todoList = state.todoList.filter(
        (item: { id: any; }) => item.id !== action.payload.id
      );
    },
    setIsDoneTask: (state: { todoList: any[]; }, action: { payload: { id: any; }; }) => {
      state.todoList = state.todoList.map((item: { id: any; isDone: any; }) => {
        if (item.id === action.payload.id) {
          return { ...item, isDone: !item.isDone };
        }
        return item;
      });
    },
  },
});

export const { addTodo, deleteTask, setIsDoneTask } = todoSlice.actions;

export default todoSlice.reducer;
