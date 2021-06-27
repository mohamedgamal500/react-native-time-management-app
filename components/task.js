import { CheckBox, View, Text, StyleSheet,TouchableOpacity } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
const Task = ({ item, onCompoletedTodo, onDeletedTodo }) => {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <View>
          <CheckBox
            value={item.completed}
            onValueChange={() => {
              onCompoletedTodo(item);
            }}
            tintColors={{ true: "skyblue" }}
          />
        </View>
        <View style={{ maxWidth: '80%'}}>
          <Text style={item.completed && styles.completed}>{item.text}</Text>
        </View>
      </View>
      <View style={styles.itemRight}>
       <TouchableOpacity onPress={() => onDeletedTodo(item.key)}>
        <MaterialIcons
          name="delete-outline"
          size={24}
          color="red"
        />
         </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "skyblue",
  },
});

export default Task;
