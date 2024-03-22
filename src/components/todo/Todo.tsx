"use client";

import {
  Button,
  Input,
  Row,
  Card,
  message,
  Space,
  Tag,
  Switch,
  Table,
  TableProps,
} from "antd";
import * as React from "react";
import { PlusCircleTwoTone } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { useState } from "react";
import {
  TodoListState,
  addTodo,
  deleteTask,
  setIsDoneTask,
} from "@/lib/features/todo/todoSlice";
import userApi from "@/service/api/userApi/userService";

const TodoList = () => {
  const todos = useAppSelector((state) => state.todo.todoList);
  return (
    <ul className="tasks-list">
      {todos?.map(
        (
          todo: { id: string; content: string; isDone: boolean },
          key: number
        ) => (
          <TodoItem
            key={key}
            id={todo.id}
            isDone={todo.isDone}
            content={todo.content}
          />
        )
      )}
    </ul>
  );
};

const TodoItem = (todo: { isDone: boolean; id: string; content: string }) => {
  const dispatch = useAppDispatch();
  const [Done, setDone] = useState(false);
  const removeTask = () => {
    dispatch(
      deleteTask({
        id: todo.id,
      })
    );
  };
  const checkDone = () => {
    setDone(true);
    dispatch(
      setIsDoneTask({
        id: todo.id,
      })
    );
  };
  return (
    <Row justify="space-between" style={{ marginTop: 12 }}>
      {!todo.isDone ? (
        <Tag color="red">{todo.content}</Tag>
      ) : (
        <Tag color="green">{todo.content}</Tag>
      )}
      <Space>
        <Switch onChange={checkDone} />
        <Button onClick={removeTask}>Delete</Button>
      </Space>
    </Row>
  );
};

const UserTable = () => {
  const [listUser, setListUser] = React.useState([]);
  const param = {
    page: 1,
    pageSize: 3,
  };
  const columns: TableProps<any>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  React.useEffect(() => {
    userApi.getUserCustomer(param).then((res) => {
      setListUser(res.users);
    });
  }, []);
  return <Table dataSource={listUser} columns={columns} />;
};

export default function Todos() {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");
  const onSubmit = (event: any) => {
    event.preventDefault();

    if (value.trim().length === 0) {
      message.warning("Enter a task before adding !!");
      setValue("");
      return;
    }

    dispatch(
      addTodo({
        todo: value,
      })
    );
    setValue("");
  };

  return (
    <>
      <Row justify="center" align="middle">
        <Card title="Create New Todo">
          <Input
            placeholder="input placeholder"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            style={{ minWidth: "100vh" }}
          />
          <Button
            style={{ marginTop: 24 }}
            type="primary"
            onClick={onSubmit}
            icon={<PlusCircleTwoTone />}
          >
            Add Todo
          </Button>
        </Card>
      </Row>
      <Row justify="center" align="middle">
        <Card title="Todo List" style={{ width: "100%", marginTop: 24 }}>
          <TodoList />
        </Card>
      </Row>
      <UserTable></UserTable>
    </>
  );
}
