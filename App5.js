import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    StyleSheet
} from "react-native";
import {CheckBox} from '@rneui/themed';
import { TouchableOpacity } from "react-native";


const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://13dpn13:uU0qC18DrLrj7UMR@walmartlist.kjzqdnt.mongodb.net/SimpleList?retryWrites=true&w=majority";
const dboper = require('./operations');
const URL = uri;


const dbname = 'SimpleList';
const db = client.db(dbname);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await db.command({ ping: 1 });
        console.log(
            "Pinged your deployment. You successfully connected to MongoDB!"
        );
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);




const ShoppingList = (() => {
    return dboper.findDocuments(db, 'ShoppingList');
});

const App = () => {
    const [item, setItem] = useState("");
    const [notes, setNotes] = useState("");
    const [shoppingList, setShoppingList] = useState([ShoppingList]);

    const handleAddItem = () => {
        const newItem = { item, notes };
        setShoppingList([...shoppingList, newItem]);
        setItem("");
        setNotes("");
        dboper.insertDocument(db, { item, notes}, 'ShoppingList').then (result => {
            console.log('Insert Document:', result.ops);
        
            return dboper.findDocuments(db, 'ShoppingList');
        })
        
    };

    const handleDeleteSelectedItems = () => {
        const filteredList = shoppingList.filter((item) => {
            !item.selected;
            dboper.removeDocument(db, {item, notes}, 'ShoppingList')
            .then(result => {
                console.log('Deleted Document Count:' , result.deletedCount);
            });
        });
        setShoppingList(filteredList);
    };

    const handleToggleItem = (index) => {
        const updatedList = [...shoppingList];
        updatedList[index].selected = !updatedList[index].selected;
        setShoppingList(updatedList);
    };

    return (
        <TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.label} >Item:</Text>
                <TextInput  style={styles.input} value={item} onChangeText={setItem} />

                <Text style={styles.label} >Notes:</Text>
                <TextInput style={styles.input} value={notes} onChangeText={setNotes} />

                <Button title="Add Item" onPress={handleAddItem} />
            </View>
            <View style={styles.container}>
                <Text style={styles.label} >Shopping List:</Text>
                <FlatList
                    data={shoppingList}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => (
                        <View  style={styles.input4}>
                            <CheckBox
                                value={!!item.selected}
                                onPress={() => handleToggleItem(index)}
                                iconType="material-community"
                                checkedIcon="checkbox-marked"
                                uncheckedIcon="checkbox-blank-outline"
                                checkedColor="red"
                            />
                            <View style={{flexDirection: 'column', paddingLeft: 10}}>
                                <Text style={styles.input4} >{item.item}</Text>
                                <Text style={styles.input3} >{item.notes}</Text>
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
        justifyContent: 'flex-start',
        padding: 20
    },
    label: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 'normal',
        color: 'purple', 
        paddingBottom: 5,
        paddingTop: 10
    },
    input: {
        fontSize: 20,
        color: 'blue',
        padding: 5
    },
    label2: {
        fontSize: 18,
        fontStyle: 'italic',
        fontWeight: 700,
        color: 'purple', 
        paddingBottom: 5,
        paddingTop: 10
    },
    input2: {
        fontSize: 20,
        color: 'blue',
        fontWeight: 500,
        paddingLeft: 10,
    },
    input3: {
        fontSize: 18,
        color: 'black',
        fontWeight: 300,
        padding: 5,
    },
    input4: {
        fontSize: 20,
        color: 'blue',
        fontWeight: 500,
        padding: 5,
        flexDirection: 'row'
    },

});


export default App;
