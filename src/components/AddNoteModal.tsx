import Button from './Button';
import data from '../data/data.json';
import { NoteItemType } from '../type';
import React, { useState } from 'react';
import { Strings } from '../constants/strings';
import { Blue, Green, Red, White } from '../constants/colors';
import { View, Text, Modal, TextInput, Alert, Pressable, ScrollView, StyleSheet } from 'react-native';


type Props = {
    isEdit?: boolean,
    visible: boolean,
    note?: NoteItemType,
    onClose: () => void,
    onSave: (e: NoteItemType) => void,
    onUpdate: (e: NoteItemType) => void,
}

const AddNoteModal = ({ visible, onClose, onSave, note, isEdit, onUpdate }: Props) => {

    const [client, setClient] = useState(note?.client ?? '');
    const [noteText, setNoteText] = useState(note?.text ?? '');
    const [category, setCategory] = useState(note?.category ?? '');


    const handleUpdate = () => {
        if (note != undefined) {
            onUpdate({
                id: note.id,
                client: client,
                category: category,
                text: noteText
            });
            onClose();
        } else {
            Alert.alert('Please fill in all fields.');
        }
    };

    const handleSave = async () => {
        if (client && category && noteText) {
            const newNote = {
                id: Date.now(), // Generate a unique ID
                client,
                category,
                text: noteText,
            };

            // Save the note
            await onSave(newNote);

            // Reset fields
            setClient('');
            setCategory('');
            setNoteText('');

            // Close modal
            onClose();
        } else {
            Alert.alert('Please fill in all fields.');
        }
    };

    return (
        <Modal visible={visible} >
            <Text style={{ textAlign: 'center', marginTop: 40, fontSize: 22 }}>{isEdit ? Strings.editNote : Strings.addNote}</Text>
            <ScrollView style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 30, }}>
                <View style={styles.infoCon}>
                    <View style={{ gap: 10, flex: 1 }}>
                        <Text style={{ fontSize: 18, }}>{Strings.client}</Text>
                        {
                            data.clients.map((item: string) => {
                                return (
                                    <Pressable
                                        style={[styles.item, {
                                            backgroundColor: item === client ? Green : White
                                        }]}
                                        key={item}
                                        onPress={() => { setClient(item) }}
                                    >
                                        <Text>{item}</Text>
                                    </Pressable>
                                )
                            })
                        }

                    </View>
                    <View style={{ gap: 10, flex: 1 }}>
                        <Text style={{ fontSize: 18, }}>{Strings.category}</Text>
                        {
                            data.categories.map((item: string) => {
                                return (

                                    <Pressable
                                        style={[styles.item, {
                                            backgroundColor: item === category ? Green : White
                                        }]}
                                        key={item}
                                        onPress={() => setCategory(item)}
                                    >
                                        <Text>{item}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: 20 }}>
                    <Text style={{ fontSize: 18, }}>{Strings.note}</Text>
                    <TextInput
                        placeholder={Strings.note}
                        value={noteText}
                        onChangeText={(text) => setNoteText(text)}
                        style={styles.inputCon}
                    />
                </View>
            </ScrollView>
            <View style={styles.btnCon}>
                <Button text={Strings.cancel} onPress={onClose} style={{ backgroundColor: Red, flex: 1 }} />
                <Button text={Strings.save} onPress={isEdit ? handleUpdate : handleSave} style={{ backgroundColor: Blue, flex: 1 }} />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    infoCon: {
        flex: 1,
        gap: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    inputCon: {
        padding: 8,
        marginTop: 10,
        borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'lightgray',
    },
    item: {
        height: 48,
        width: '100%',
        borderRadius: 10,
        borderWidth: 0.5,
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderColor: 'lightgray',
    },
    btnCon: {
        gap: 20,
        marginBottom: 20,
        flexDirection: 'row',
        marginHorizontal: 20,
    }
})

export default AddNoteModal;
