const { MongoClient } = require("mongodb");

import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
    Text,
} from "react-native";


const uri =
    "mongodb+srv://13dpn13:uU0qC18DrLrj7UMR@walmartlist.kjzqdnt.mongodb.net/ShoppingList?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version



const client = new MongoClient(uri, { useUnifiedTopology: true });

const handleAdd = async () => {
    try {
        await client.connect();
        const database = client.db("ShoppingList");
        const collection = database.collection("ShoppingList");

        const newItem = {
            id: Date.now(),
            item,
            notes,
            checked: false,
        };

        await collection.insertOne(newItem);

        setShoppingList([...shoppingList, newItem]);
        setItem("");
        setNotes("");
    } catch (error) {
        console.error("Error adding item to the shopping list:", error);
    } finally {
        await client.close();
    }
};

const handleDelete = async (id) => {
    try {
        await client.connect();
        const database = client.db("ShoppingList");
        const collection = database.collection("ShoppingList");

        await collection.deleteOne({ id });

        const newList = shoppingList.filter((item) => item.id !== id);
        setShoppingList(newList);
    } catch (error) {
        console.error("Error deleting item from the shopping list:", error);
    } finally {
        await client.close();
    }
};

const handleCheck = async (id) => {
    try {
        await client.connect();
        const database = client.db("ShoppingList");
        const collection = database.collection("ShoppingList");

        const itemToUpdate = await collection.findOne({ id });

        if (itemToUpdate) {
            const updatedItem = {
                ...itemToUpdate,
                checked: !itemToUpdate.checked,
            };

            await collection.updateOne({ id }, { $set: updatedItem });

            const newList = shoppingList.map((item) =>
                item.id === id ? updatedItem : item
            );
            setShoppingList(newList);
        }
    } catch (error) {
        console.error("Error updating item in the shopping list:", error);
    } finally {
        await client.close();
    }
};

const renderItem = ({ item }) => {(
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
)};





class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        shoppingList: [],
        item: "",
        notes: "",
        };
    }

    componentDidMount() {
        this.fetchShoppingList();
    }

    async fetchShoppingList() {
        try {
            await client.connect();
            const database = client.db("ShoppingList");
            const collection = database.collection("ShoppingList");

            const result = await collection.find().toArray();
            this.setState({ shoppingList: result });
        } catch (error) {
            console.error("Error fetching shopping list:", error);
        } finally {
        await client.close();
        }
    }

    

    render() {
        const { shoppingList, item, notes } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Item"
                        value={item}
                        onChangeText={(text) => this.setState({ item: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Notes"
                        value={notes}
                        onChangeText={(text) => this.setState({ notes: text })}
                    />
                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={this.handleAdd}
                    >
                        <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        data={shoppingList}
                        renderItem={this.renderItem}
                        keyExtractor={(item) => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
};

export default App;

