import React from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

const ResultsHeader = ({ onBack, title }) => (
    <SafeAreaView style={styles.headerContainer}>
        <View style={styles.header}>
            <View style={styles.headerCenter}>
                <Text accessibilityRole="heading" aria-level="3" style={styles.title}>{title}</Text>
            </View>
        </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
    headerContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#0b244c',
        backgroundColor: '#fff',
    },
    header: {
        padding: 10,
        paddingVertical: 5,
        alignItems: 'center',
        flexDirection: 'row',
        minHeight: 50
    },
    headerCenter: {
        flex: 1,
        order: 2
    },
    headerLeft: {
        order: 1,
        width: 80
    },
    headerRight: {
        order: 3,
        width: 80
    },
    title: {
        fontSize: 19,
        fontWeight: '600',
        textAlign: 'center',
        color: 'black'
    },
});

export default ResultsHeader