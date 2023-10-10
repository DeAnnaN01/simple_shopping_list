import { StatusBar } from "expo-status-bar";
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, ScrollView } from "react-native";

export default function App() {
    const [checked, setChecked] = useState(false);
    const [item, setItem] = useState('');
    const [notes, setNotes] = useState('');
    const [shoppingList, setShoppingList] = useState([]);
    const [selected, setSelected] = useState([]);

    const handleAdd = () => {
        setShoppingList([...shoppingList, { item, notes }]);
        setItem('');
        setNotes('');
    };

    const handleDelete = () => {
        const newList = [...shoppingList];
        newList.filter((item) => item !== checked);
        setShoppingList(newList);
    };



    return (
        <SafeAreaView style={styles.container}>
            {/* <ScrollView> */}
                <View style={styles.form} >
                    <Text>Item: </Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={text => setItem(text)}
                        value={item}
                    />
                    <Text>Notes: </Text>
                    <TextInput 
                        style={styles.input}
                        onChangeText={text => setNotes(text)}
                        value={notes}
                    />
                    <Button
                        title="Add"
                        onPress={handleAdd}
                        color='purple'
                    />
                </View>
                <View>
                    <Text style={styles.title}>Shopping List</Text>
                    {shoppingList.map((item, index) => (
                        <FlatList
                            key={(index) => index.toString()}
                            data={shoppingList}
                            renderItem={({ item }) => (
                                <View style={styles.list}>
                                    <Checkbox
                                        value={checked}
                                        onValueChange={() => {
                                            setChecked(!checked);
                                            setSelected(selected);
                                        }}
                                        style={styles.checkbox}
                                    />
                                    <Text>{item.item}</Text>
                                    <Text>{item.notes}</Text>
                                </View>
                            )}
                        />
                    ))}
                    <View style={styles.delete} >
                        <Button
                            title="Delete Checked Item"
                            onPress={() => handleDelete()}
                            color='red'
                        />
                    </View>
                </View>
                <StatusBar style="auto" />
            {/* </ScrollView> */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        marginTop: 35,
        marginLeft: 15,
        alignContent: 'center',
        marginRight: 15,

    },
    input: {
        height: 40,
        width: '50%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    form: {
        flexDirection: "column",
        justifyContent: "space-between",
    },
    list: {
        marginTop: 20,
    },
    title: {
        justifyContent: 'center',
        fontSize: 24,
        fontStyle: 'italic',
        color: 'purple',
        maxWidth: '50%',
        marginLeft: 20,
        marginTop: 20,
    },
    delete: {
        marginTop: 20,
        alignContent: 'bottom'
    },
});
