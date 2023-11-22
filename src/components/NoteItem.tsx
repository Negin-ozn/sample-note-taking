import { NoteItemType } from '../type';
import React, { useState } from 'react';
import AddNoteModal from './AddNoteModal';
import { Strings } from '../constants/strings';
import { Red, White, Yellow } from '../constants/colors';
import { View, Text, Pressable, StyleSheet } from 'react-native';

type Props = {
    note: NoteItemType,
    onEdit: (note: NoteItemType) => void,
    onDelete: (id: string | number) => void,
}

const NoteItem = (props: Props) => {

    const [editVisible, setEditVisible] = useState(false);

    return (
        <View style={styles.container}>

            <AddNoteModal
                visible={editVisible}
                onClose={() => setEditVisible(false)}
                onUpdate={(note) => { props.onEdit(note) }}
                note={props.note}
                isEdit={true}
                onSave={() => { }}
            />
            <View style={{ gap: 10 }}>
                <Text>{props.note.text}</Text>
                <Text>{props.note.client}</Text>
                <Text>{props.note.category}</Text>
            </View>

            <View style={styles.actions}>
                <Pressable onPress={() => setEditVisible(true)}>
                    <Text style={{ color: Yellow, fontSize: 16 }}>{Strings.edit}</Text>
                </Pressable>

                <Pressable
                    onPress={() => props.onDelete(props.note.id)}>
                    <Text style={{ color: Red, fontSize: 16 }}>{Strings.delete}</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 5,
        marginBottom: 5,
        borderRadius: 10,
        backgroundColor: White,
    },
    actions: {
        gap: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
})

export default NoteItem