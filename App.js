import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet,
    TouchableOpacity,
} from "react-native";
import { CheckBox } from "@rneui/themed";
import { MongoClient } from "mongodb";

const uri =
    "mongodb+srv://13dpn13:uU0qC18DrLrj7UMR@walmartlist.kjzqdnt.mongodb.net/SimpleList?retryWrites=true&w=majority";
const dbname = "SimpleList";

const App = () => {
    const [item, setItem] = useState("");
    const [notes, setNotes] = useState("");
    const [shoppingList, setShoppingList] = useState([]);

    useEffect(() => {
        fetchShoppingList();
    }, []);

    const fetchShoppingList = async () => {
        try {
            const client = new MongoClient(uri);
            await client.connect();
            const db = client.db(dbname);
            const result = await db.collection("ShoppingList").find().toArray();
            setShoppingList(result);
            await client.close();
        } catch (error) {
            console.error("Error fetching shopping list:", error);
        }
    };

    const handleAddItem = async () => {
        try {
            const client = new MongoClient(uri);
            await client.connect();
            const db = client.db(dbname);
            const newItem = { item, notes };
            await db.collection("ShoppingList").insertOne(newItem);
            setItem("");
            setNotes("");
            await fetchShoppingList();
            await client.close();
        } catch (error) {
            console.error("Error adding item:", error);
        }
    };

    const handleDeleteSelectedItems = async () => {
        try {
            const client = new MongoClient(uri);
            await client.connect();
            const db = client.db(dbname);
            const selectedItems = shoppingList.filter((item) => item.selected);
            const deletePromises = selectedItems.map((item) =>
                db.collection("ShoppingList").deleteOne({ _id: item._id })
            );
            await Promise.all(deletePromises);
            await fetchShoppingList();
            await client.close();
        } catch (error) {
            console.error("Error deleting items:", error);
        }
    };

    const handleToggleItem = (index) => {
        const updatedList = [...shoppingList];
        updatedList[index].selected = !updatedList[index].selected;
        setShoppingList(updatedList);
    };

    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.label}>Item:</Text>
                <TextInput
                    style={styles.input}
                    value={item}
                    onChangeText={setItem}
                />
                <Text style={styles.label}>Notes:</Text>
                <TextInput
                    style={styles.input}
                    value={notes}
                    onChangeText={setNotes}
                />
                <Button title="Add Item" onPress={handleAddItem} />
            </View>
            <View style={styles.container}>
                <Text style={styles.label}>Shopping List:</Text>
                <FlatList
                    data={shoppingList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View style={styles.input4}>
                            <CheckBox
                                value={!!item.selected}
                                onPress={() => handleToggleItem(index)}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="red"
                            />
                            <View
                                style={{
                                    flexDirection: "column",
                                    paddingLeft: 10,
                                }}
                            >
                                <Text style={styles.input4}>{item.item}</Text>
                                <Text style={styles.input3}>{item.notes}</Text>
                            </View>
                        </View>
                    )}
                />
                <Button
                    title="Delete Selected Items"
                    onPress={handleDeleteSelectedItems}
                />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
        justifyContent: "flex-start",
        padding: 20,
    },
    label: {
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "normal",
        color: "purple",
        paddingBottom: 5,
        paddingTop: 10,
    },
    input: {
        fontSize: 20,
        color: "blue",
        padding: 5,
    },
    label2: {
        fontSize: 18,
        fontStyle: "italic",
        fontWeight: "bold",
        color: "purple",
        paddingBottom: 5,
        paddingTop: 10,
    },
    input2: {
        fontSize: 20,
        color: "blue",
        fontWeight: "bold",
        paddingLeft: 10,
    },
    input3: {
        fontSize: 18,
        color: "black",
        fontWeight: "normal",
        padding: 5,
    },
    input4: {
        fontSize: 20,
        color: "blue",
        fontWeight: "bold",
        padding: 5,
        flexDirection: "row",
    },
});

export default App;
