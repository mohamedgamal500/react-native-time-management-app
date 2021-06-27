import React from "react";
import { Text, View } from "react-native";
import Todos from "./components/todos";
import FinshedTodos from "./components/finishedTodos";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import store from "./store";

// function Todos() {
//   const todos = useSelector((state) => state);
//   const dispatch = useDispatch();
//   const [inCompeletedTodos, setInCompeletedTodos] = React.useState([]);
//   const [todoText, setTodoText] = useState("");

//   useEffect(() => {
//     getData();
//   }, []);

//   useEffect(() => {
//     const inCompeletedTodosList = todos.filter((item) => {
//       return item.completed === false;
//     });
//     setInCompeletedTodos(inCompeletedTodosList);
//     storeData();
//   }, [todos]);

//   storeData = async () => {
//     try {
//       const jsonValue = JSON.stringify(todos);
//       await AsyncStorage.setItem("todos", jsonValue);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   getData = async () => {
//     try {
//       const jsonValue = await AsyncStorage.getItem("todos");
//       if (jsonValue !== null) {
//         const value = JSON.parse(jsonValue);
//         dispatch(getTodo(value));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   onCompoletedTodo = (todo) => {
//     const todosCopy = [...todos];
//     const index = todosCopy.indexOf(todo);
//     todosCopy[index] = { ...todosCopy[index] };
//     todosCopy[index].completed = !todo.completed;
//     dispatch(updateTodo(todosCopy));
//   };
//   onDeletedTodo = (key) => {
//     dispatch(deleteTodo(todos.filter((todo) => todo.key != key)));
//   };

//   onAddTodo = () => {
//     if (todoText.length > 0) {
//       setTodoText("");
//       dispatch(
//         addTodo([
//           ...todos,
//           { text: todoText, key: Math.random().toString(), completed: false },
//         ])
//       );
//     } else {
//       Alert.alert("OOPS", "You must enter something", [{ text: "I got it" }]);
//     }
//   };
//   return (
//     <>
//       <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//         <View style={styles.container}>
//           <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             style={styles.addTodoWrapper}
//           >
//             <TextInput
//               style={styles.input}
//               selectionColor={"skyblue"}
//               placeholder={"todo..."}
//               value={todoText}
//               onChangeText={(text) => setTodoText(text)}
//             />
//             <TouchableOpacity onPress={onAddTodo}>
//               <View style={styles.addWrapper}>
//                 <Text style={styles.addText}>+</Text>
//               </View>
//             </TouchableOpacity>
//           </KeyboardAvoidingView>
//           <View style={styles.content}>
//             <View style={styles.list}>
//               <FlatList
//                 showsVerticalScrollIndicator={false}
//                 showsHorizontalScrollIndicator={false}
//                 data={inCompeletedTodos}
//                 renderItem={({ item }) => (
//                   <Task
//                     item={item}
//                     onCompoletedTodo={onCompoletedTodo}
//                     onDeletedTodo={onDeletedTodo}
//                   />
//                 )}
//               />
//             </View>
//           </View>
//         </View>
//       </TouchableWithoutFeedback>
//     </>
//   );
// }

// function FinshedTodos() {
//   const todos = useSelector((state) => state);
//   const [compeletedTodos, setCompeletedTodos] = React.useState([]);

//   useEffect(() => {
//     const compeletedTodosList = todos.filter((item) => {
//       return item.completed === true;
//     });
//     setCompeletedTodos(compeletedTodosList);
//   }, [todos]);
//   return (
//     <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//       <View style={styles.container}>
//         <View style={styles.content}>
//           <View style={styles.list}>
//             <FlatList
//               showsVerticalScrollIndicator={false}
//               showsHorizontalScrollIndicator={false}
//               data={compeletedTodos}
//               renderItem={({ item }) => (
//                 <Task
//                   item={item}
//                   onCompoletedTodo={onCompoletedTodo}
//                   onDeletedTodo={onDeletedTodo}
//                 />
//               )}
//             />
//           </View>
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// }

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator tabBarOptions={{ showLabel: false }}>
          <Tab.Screen
            name="Todo"
            component={Todos}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ color: focused ? "skyblue" : "gray" }}>
                    Todo
                  </Text>
                </View>
              ),
            }}
          />
          <Tab.Screen
            name="Finished"
            component={FinshedTodos}
            options={{
              tabBarIcon: ({ focused }) => (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text style={{ color: focused ? "red" : "gray" }}>
                    Finished
                  </Text>
                </View>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
