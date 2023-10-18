import React, { useState, useEffect } from "react";
import {
    View,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
    Text,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
    const [shoppingList, setShoppingList] = useState([]);
    const [item, setItem] = useState("");
    const [notes, setNotes] = useState("");

    useEffect(() => {
        // Load shopping list from storage when the app starts
        loadShoppingList();
    }, []);

    useEffect(() => {
        // Save shopping list to storage whenever it changes
        saveShoppingList();
    }, [shoppingList]);

    const loadShoppingList = async () => {
        try {
            const storedList = await AsyncStorage.getItem("shoppingList");
            if (storedList) {
                setShoppingList(JSON.parse(storedList));
            }
        } catch (error) {
            console.log("Error loading shopping list:", error);
        }
    };

    const saveShoppingList = async () => {
        try {
            await AsyncStorage.setItem(
                "shoppingList",
                JSON.stringify(shoppingList)
            );
        } catch (error) {
            console.log("Error saving shopping list:", error);
        }
    };

    const handleAdd = () => {
        setShoppingList([
            ...shoppingList,
            { id: Date.now(), item, notes, checked: false },
        ]);
        setItem("");
        setNotes("");
    };

    const handleDelete = (id) => {
        const newList = shoppingList.filter((item) => item.id !== id);
        setShoppingList(newList);
    };

    const handleCheck = (id) => {
        const newList = shoppingList.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        setShoppingList(newList);
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 10,
            }}
            onPress={() => handleCheck(item.id)}
        >
            <View
                style={{
                    flexDirection: "column",
                    marginRight: 25,
                }}
            >
                <Text
                    style={{
                        textDecorationLine: item.checked
                            ? "line-through"
                            : "none",
                        color: item.checked ? "gray" : "blue",
                        fontSize: 18,
                        fontStyle: "italic",
                        fontWeight: "bold",
                        marginTop: 1,
                        marginLeft: 5,
                    }}
                >
                    {item.item}
                </Text>
                <Text
                    style={{
                        textDecorationLine: item.checked
                            ? "line-through"
                            : "none",
                        color: item.checked ? "gray" : "purple",
                        fontSize: 14,
                        marginTop: 1,
                        marginLeft: 15,
                    }}
                >
                    {item.notes}
                </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={{ color: "red" }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, padding: 20, paddingTop: 55 }}>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <TextInput
                    style={{
                        flex: 1,
                        marginRight: 10,
                        padding: 6,
                        borderWidth: 1,
                        borderRadius: 4,
                    }}
                    placeholder="Item"
                    value={item}
                    onChangeText={(text) => setItem(text)}
                />
                <TextInput
                    style={{
                        flex: 1,
                        marginRight: 10,
                        padding: 6,
                        borderWidth: 1,
                        borderRadius: 4,
                    }}
                    placeholder="Notes"
                    value={notes}
                    onChangeText={(text) => setNotes(text)}
                />
                <Button title="Add" onPress={handleAdd} />
            </View>
            <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "purple",
                        margin: 10,
                    }}
                >
                    Shopping List:
                </Text>
            </View>
            <FlatList
                data={shoppingList}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};
