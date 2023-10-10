import { StatusBar } from "expo-status-bar";
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Button, SafeAreaView, StyleSheet, Text, TextInput, View, FlatList, ScrollView } from "react-native";

export default function App() {
    const [checked, setChecked] = useState(false);
    const [item, setItem] = useState('');
    const [notes, setNotes] = useState('');
    const [shoppingList, setShoppingList] = useState([]);



    const handleAdd = () => {
        setShoppingList((prevShoppingList) => {
            return [
                ...prevShoppingList, 
                { item: item, notes: notes, checked: checked},
            ]
        });
        setItem('');
        setNotes('');
        setChecked(false);
    };

    const handleDelete = () => {
        const newList = [...shoppingList];
        newList.filter( (item) => item !== checked);
        setShoppingList(newList);
    };


    const renderItem = () => shoppingList.map((item, index) => (
        <View style={styles.list} key={index} >
            <Checkbox
                value={checked}
                onValueChange={(newValue) => {
                    setChecked(newValue);
                }}
                style={styles.checkbox}
            />
            <Text style={styles.item} >{item.item}</Text>
            <Text style={styles.notes} >{item.notes}</Text>
        </View>
    ));


    // const handleDelete = () => {
    //     setShoppingList((prevShoppingList) => {
    //         return (
    //             prevShoppingList.filter((checked) => checked === 'false')
    //         );
    //     });
    // };



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
                        <FlatList
                            key={(index) => index.toString()}
                            data={shoppingList}
                            renderItem={renderItem}
                        />
                    <View style={styles.delete} >
                        <Button
                            title="Delete All Items"
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
    item: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        color: 'blue',
    },
    notes: {
        fontSize: 16,
        marginLeft: 20,
        fontStyle: 'italic',
    },
    
});
