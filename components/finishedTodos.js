import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Task from "./task";
import { useSelector } from "react-redux";

export default function FinshedTodos() {
  const todos = useSelector((state) => state);
  const [compeletedTodos, setCompeletedTodos] = useState([]);

  useEffect(() => {
    const compeletedTodosList = todos.filter((item) => {
      return item.completed === true;
    });
    setCompeletedTodos(compeletedTodosList);
  }, [todos]);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.list}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
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
    marginTop: 30,
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
