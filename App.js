import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    CheckBox,
    Picker,
    StyleSheet
} from "react-native";




const App = () => {
    const [item, setItem] = useState("");
    const [notes, setNotes] = useState("");
    const [shoppingList, setShoppingList] = useState([]);

    const handleAddItem = () => {
        const newItem = { item, notes };
        setShoppingList([...shoppingList, newItem]);
        setItem("");
        setNotes("");
    };

    const handleDeleteSelectedItems = () => {
        const filteredList = shoppingList.filter((item) => !item.selected);
        setShoppingList(filteredList);
    };

    const handleToggleItem = (index) => {
        const updatedList = [...shoppingList];
        updatedList[index].selected = !updatedList[index].selected;
        setShoppingList(updatedList);
    };

    return (
        <View>
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
                                onValueChange={() => handleToggleItem(index)}
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
        </View>
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
