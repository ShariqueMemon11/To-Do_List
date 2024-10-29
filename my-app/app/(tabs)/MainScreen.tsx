import { Text, View, StyleSheet, TextInput, FlatList, Pressable, Modal, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen() {
  const [modalisvisible, setmodalisvisible] = useState(false);
  const [enteredtext, setenteredtext] = useState('');
  const [mygoals, setmygoals] = useState<any[]>([]);

  useEffect(() => {
    loadGoals(); 
  }, []);
  
  useEffect(() => {
    saveGoals([]); 
  }, [mygoals]);

  const saveGoals = async (updatedGoals: any[]) => {
    await AsyncStorage.setItem('goals', JSON.stringify(mygoals));
  };

  const loadGoals = async () => {
    const StoredGoals = await AsyncStorage.getItem('goals');
    if (StoredGoals) {
      setmygoals(JSON.parse(StoredGoals));
    } else {
      setmygoals([]);
    }
  };

  function goalinputhandler(enteredtext: any) {
    setenteredtext(enteredtext);
  }

  function addgoalhandler() {
    setmygoals(currentmygoals => {
      const updatedGoals = [...currentmygoals, enteredtext];
      saveGoals(updatedGoals); // Save updated goals
      return updatedGoals;
    });
    setenteredtext('');
    setmodalisvisible(false); // Close the modal after adding a goal
  }

  const deletegoalhandler = (index: number) => {
    setmygoals(currentmygoals => {
      const updatedGoals = currentmygoals.filter((_, i) => i !== index);
      saveGoals(updatedGoals); // Save updated goals
      return updatedGoals;
    });
  }

  function openaddgoalhandler() {
    setmodalisvisible(true);
  }

  function closemodalhandler() {
    setmodalisvisible(false);
  }

  return (
    <View style={styles.appcontainer}>
      <StatusBar style="light" />
      <View style={{ paddingTop: 50 }}>
        <Pressable onPress={openaddgoalhandler} style={({ pressed }) => [styles.button, pressed && styles.presseditem]}>
          <Text style={styles.buttontext}>Add New Task</Text>
        </Pressable>
      </View>
      {modalisvisible && (
        <Modal visible={modalisvisible} animationType="slide">
          <View style={styles.inputcontainer}>
            <Image style={styles.img} source={require('../../assets/images/goal.png')} />
            <TextInput
              style={styles.textinput}
              placeholder="Enter your task!"
              onChangeText={goalinputhandler}
              value={enteredtext}
            />
            <View style={styles.buttoncontainer}>
              <Pressable android_ripple={{ color: '#210644' }} onPress={closemodalhandler} style={({ pressed }) => [styles.button, pressed && styles.presseditem, styles.cancelbutton]}>
                <Text style={styles.buttontext}>Cancel</Text>
              </Pressable>
              <Pressable android_ripple={{ color: '#210644' }} onPress={addgoalhandler} style={({ pressed }) => [styles.button, pressed && styles.presseditem]}>
                <Text style={styles.buttontext}>Add task</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
      <View style={styles.goalscontainer}>
        <FlatList
          data={mygoals}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.goallist}>
              <Pressable android_ripple={{ color: '#210644' }} onPress={() => deletegoalhandler(index)} style={({ pressed }) => pressed && styles.presseditem}>
                <Text style={styles.goaltext}>{item}</Text>
              </Pressable>
            </View>
          )}
          alwaysBounceVertical={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appcontainer: {
    flex: 1,
    paddingTop: 27,
    paddingHorizontal: 16,
    backgroundColor: '#1e0858',
  },
  inputcontainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#311b6b',
    paddingBottom: 100,
  },
  textinput: {
    borderWidth: 2,
    borderColor: '#e4d0ff',
    backgroundColor: '#e4d0ff',
    color: '#120438',
    width: '90%',
    marginRight: 3,
    padding: 10,
    marginBottom: 15,
    borderRadius: 6,
  },
  goalscontainer: {
    flex: 6,
  },
  goallist: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: '#5e0acc',
    color: 'white',
  },
  goaltext: {
    color: 'white',
    padding: 8,
  },
  deletetext: {
    color: 'red',
  },
  presseditem: {
    opacity: 0.7,
    color: '#210644',
  },
  buttoncontainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#5e0acc',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal: 15,
  },
  buttontext: {
    color: 'white',
    fontSize: 16,
  },
  cancelbutton: {
    backgroundColor: '#f31282',
  },
  img: {
    width: 100,
    height: 100,
    margin: 20,
  },
});
