import { NoteItemType } from '../type';
import Button from '../components/Button';
import { Green, LightGray, White } from '../constants/colors';
import NoteItem from '../components/NoteItem';
import { Strings } from '../constants/strings';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Alert, SafeAreaView } from 'react-native';
import AddNoteModal from '../components/AddNoteModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const Home = () => {

    const STORAGE_KEY = '@notes';
    const [visible, setVisible] = useState(false);
    const [notes, setNotes] = useState<NoteItemType[]>([]);

    useEffect(() => {
        getNotes()
    }, [])

    // Function to fetch notes from AsyncStorage
    const getNotes = async () => {
        try {
            const notes = await AsyncStorage.getItem(STORAGE_KEY);
            if (notes !== null) {
                const parsedNotes = JSON.parse(notes)
                console.log(parsedNotes);

                setNotes(parsedNotes)
                return parsedNotes
            }
            return [];
        } catch (error) {
            console.log('Error fetching notes:', error);
            return [];
        }
    };

    const saveNotes = async (notes: NoteItemType[]) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
            getNotes()
        } catch (error) {
            console.error('Error saving notes:', error);
        }
    };

    const addNote = async (newNote: NoteItemType) => {
        try {
            let notes: NoteItemType[] = await getNotes();
            notes.push(newNote);
            await saveNotes(notes);
        } catch (error) {
            console.log('Error adding note:', error);
        }
    };

    // Function to edit a note
    const editNote = async (editedNote: NoteItemType) => {
        try {
            let notes = await getNotes();
            notes = notes.map((note: NoteItemType) =>
                note.id === editedNote.id ? { ...note, ...editedNote } : note
            );
            await saveNotes(notes);

        } catch (error) {
            console.error('Error editing note:', error);
        }
    };

    const deleteNote = async (noteId: string | number) => {
        Alert.alert(
            Strings.deleteTitle,
            Strings.deleteDesc,
            [
                {
                    text: Strings.cancel,
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: Strings.delete,
                    onPress: async () => {
                        try {
                            let notes = await getNotes();
                            notes = notes.filter((note: NoteItemType) => note.id != noteId);
                            await saveNotes(notes);
                        } catch (error) {
                            console.error('Error deleting note:', error);
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: false }
        );

    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header />
            <View style={{ flex: 1, padding: 10, backgroundColor: '#efefef' }}>

                <AddNoteModal
                    visible={visible}
                    onClose={() => setVisible(false)}
                    onSave={addNote}
                    onUpdate={() => { }}
                />

                <FlatList
                    data={notes}
                    renderItem={({ item }) => <NoteItem note={item} onEdit={editNote} onDelete={deleteNote} />}
                    keyExtractor={(item) => item.id.toString()}
                    ListEmptyComponent={() => {
                        return (
                            <Text style={{ textAlign: 'center' }}>{Strings.noNotes}</Text>
                        )
                    }}
                />

                <Button
                    text={Strings.addNote}
                    onPress={() => { setVisible(true) }}
                    style={{ backgroundColor: Green, position: 'absolute', bottom: 10, right: 10 }}
                />

            </View>
        </SafeAreaView>
    )
}

export default Home