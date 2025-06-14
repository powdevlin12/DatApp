import {FlashList, ListRenderItem} from '@shopify/flash-list';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  NativeModules,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type TTodo = {
  id: string | number;
  content: string;
  isDone: boolean;
};

type TTodoModules = {
  saveTodo: (data: String) => Promise<void>;
  getTodos: () => Promise<string>;
  deleteAllTodos: () => Promise<void>;
  deleteTodo: (todos: string) => Promise<void>;
};

const TodoListNative = () => {
  const [todos, setTodos] = useState<TTodo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  // ** Get todo native
  const {TodoModules} = NativeModules;

  const renderEmpty = () => {
    return <Text>Empty List</Text>;
  };

  console.log({todos});

  const handleAddTodo = async () => {
    if (newTodo === '') {
      Alert.alert('Notification', 'Please enter todo!!!');
      return;
    }
    try {
      const todoToAdd: TTodo = {
        id: new Date().toISOString(),
        content: newTodo,
        isDone: false,
      };
      await (TodoModules as TTodoModules).saveTodo(JSON.stringify(todoToAdd));
      handleLoadTodo();
      setNewTodo('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoadTodo = useCallback(async () => {
    const todosProcessing = await (TodoModules as TTodoModules).getTodos();
    const todosObject = JSON.parse(todosProcessing).map((item: string) =>
      JSON.parse(item),
    );
    setTodos(todosObject as TTodo[]);
  }, [TodoModules]);

  const handleClearData = async () => {
    const result = await (TodoModules as TTodoModules).deleteAllTodos();
    console.log(result);
    await handleLoadTodo();
  };

  const handleDeleteTodo = async (id: string | number) => {
    const listAfterDelete = [...todos].filter(todo => todo.id !== id);
    setTodos(listAfterDelete);
    const todoSave = listAfterDelete.map(item => JSON.stringify(item));
    const result = await (TodoModules as TTodoModules).deleteTodo(
      JSON.stringify(todoSave),
    );
    console.log(result);
  };

  // ** render
  const renderItem: ListRenderItem<TTodo> = ({item}) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.content}</Text>
      <TouchableOpacity
        onPress={() => {
          handleDeleteTodo(item.id);
        }}>
        <Text style={styles.deleteButton}>X</Text>
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    handleLoadTodo();
  }, [handleLoadTodo]);

  return (
    <View style={styles.container}>
      <View style={[styles.inputContainer, styles.section]}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add new task..."
          placeholderTextColor={'grey'}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddTodo}>
          <Text style={{color: 'white', fontWeight: '600'}}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.section, {marginTop: 16}]}>
        <TouchableOpacity
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 12,
            alignSelf: 'flex-start',
            backgroundColor: 'red',
          }}
          onPress={handleClearData}>
          <Text style={{color: 'white'}}>Clear Todo</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        <FlashList
          renderItem={renderItem}
          estimatedItemSize={120}
          data={todos}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 16,
          }}
          extraData={todos}
          keyExtractor={item => item.id?.toString()}
        />
      </View>
    </View>
  );
};

export default TodoListNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 16,
  },
  section: {
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    // marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: 'grey',
    paddingHorizontal: 24,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 2,
  },
  todoText: {
    fontSize: 14,
    color: 'black',
    fontWeight: '500',
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
