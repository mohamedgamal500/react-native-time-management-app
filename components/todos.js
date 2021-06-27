import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import Task from "./task";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, updateTodo, getTodo } from "../actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Todos() {
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();
  const [inCompeletedTodos, setInCompeletedTodos] = useState([]);
  const [todoText, setTodoText] = useState("");

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    const inCompeletedTodosList = todos.filter((item) => {
      return item.completed === false;
    });
    setInCompeletedTodos(inCompeletedTodosList);
    storeData();
  }, [todos]);

  storeData = async () => {
    try {
      const jsonValue = JSON.stringify(todos);
      await AsyncStorage.setItem("todos", jsonValue);
    } catch (err) {
      console.log(err);
    }
  };

  getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("todos");
      if (jsonValue !== null) {
        const value = JSON.parse(jsonValue);
        dispatch(getTodo(value));
      }
    } catch (err) {
      console.log(err);
    }
  };

  onCompoletedTodo = (todo) => {
    const todosCopy = [...todos];
    const index = todosCopy.indexOf(todo);
    todosCopy[index] = { ...todosCopy[index] };
    todosCopy[index].completed = !todo.completed;
    dispatch(updateTodo(todosCopy));
  };
  onDeletedTodo = (key) => {
    dispatch(deleteTodo(todos.filter((todo) => todo.key != key)));
  };

  onAddTodo = () => {
    if (todoText.length > 0) {
      setTodoText("");
      dispatch(
        addTodo([
          ...todos,
          { text: todoText, key: Math.random().toString(), completed: false },
        ])
      );
    } else {
      Alert.alert("OOPS", "You must enter something", [{ text: "I got it" }]);
    }
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.addTodoWrapper}
          >
            <TextInput
              style={styles.input}
              selectionColor={"skyblue"}
              placeholder={"todo..."}
              value={todoText}
              onChangeText={(text) => setTodoText(text)}
            />
            <TouchableOpacity onPress={onAddTodo}>
              <View style={styles.addWrapper}>
                <Text style={styles.addText}>+</Text>
              </View>
            </TouchableOpacity>
          </KeyboardAvoidingView>
          <View style={styles.content}>
            <View style={styles.list}>
              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ddd",
    padding: 10,
  },
  content: {
    padding: 15,
    paddingBottom: 1,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
  addTodoWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 10,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    width: 300,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#C0C0C0",
    borderWidth: 1,
  },
  addText: {
    color: "gray",
  },
});
