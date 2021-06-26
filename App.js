import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Task from "./components/task";

function Todos() {
  const [todos, setTodos] = React.useState([
    {
      text: "study react",
      key: "1",
      completed: false,
    },
    {
      text: "study electron",
      key: "2",
      completed: true,
    },
  ]);

  const [compeletedTodos, setCompeletedTodos] = React.useState([]);
  const [inCompeletedTodos, setInCompeletedTodos] = React.useState([]);

  useEffect(() => {
    const compeletedTodosList = todos.filter((item) => {
      return item.completed === true;
    });
    const inCompeletedTodosList = todos.filter((item) => {
      return item.completed === false;
    });
    setCompeletedTodos(compeletedTodosList);
    setInCompeletedTodos(inCompeletedTodosList);
  }, [todos]);

  onCompoletedTodo = (todo) => {
    const todosCopy = [...todos];
    const index = todosCopy.indexOf(todo);
    todosCopy[index] = { ...todosCopy[index] };
    todosCopy[index].completed = !todo.completed;
    setTodos(todosCopy);
  };
  onDeletedTodo = (key) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.key != key);
    });
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.list}>
              <FlatList
                data={inCompeletedTodos}
                renderItem={({ item }) => (
                  <Task
                    item={item}
                    onCompoletedTodo={onCompoletedTodo}
                    onDeletedTodo={onDeletedTodo}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.list}>
              <FlatList
                data={compeletedTodos}
                renderItem={({ item }) => (
                  <Task
                    item={item}
                    onCompoletedTodo={onCompoletedTodo}
                    onDeletedTodo={onDeletedTodo}
                  />
                )}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

function FinshedTodos() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>finshedTodos!</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Todo" component={Todos} />
        <Tab.Screen name="Finished" component={FinshedTodos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
  },
  content: {
    padding: 40,
  },
  list: {
    marginTop: 20,
  },
});
