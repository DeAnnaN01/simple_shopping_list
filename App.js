import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
    Text,
} from "react-native";

export default function App() {
    const [shoppingList, setShoppingList] = useState([]);
    const [item, setItem] = useState("");
    const [notes, setNotes] = useState("");

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

    const handleEdit = (id) => {
        // Handle edit functionality here
        console.log(`Edit item with id ${id}`);
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
            <Text
                style={{
                    textDecorationLine: item.checked ? "line-through" : "none",
                }}
            >
                {item.item}
            </Text>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => handleEdit(item.id)}>
                    <Text style={{ color: "blue", marginRight: 10 }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Text style={{ color: "red" }}>Delete</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, padding: 20, paddingTop: 55}}>
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
                        fontWeight: 'bold',
                        textAlign: 'center',
                        color: 'purple',
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
}
