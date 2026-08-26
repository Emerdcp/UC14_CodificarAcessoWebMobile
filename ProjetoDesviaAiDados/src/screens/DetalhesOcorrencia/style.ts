import { StyleSheet } from 'react-native';


export const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },


    header: {
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE'
    },


    back: {
        fontSize: 36,
        color: '#00263D',
        marginRight: 12,
        marginTop: -4
    },


    title: {
        flex: 1,
        fontSize: 18,
        fontWeight: '700',
        color: '#00263D'
    },


    content: {
        padding: 20,
        paddingBottom: 40
    },


    loading: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#666666',
        fontSize: 16
    },


    photo: {
        width: '100%',
        height: 220,
        borderRadius: 14,
        marginBottom: 16
    },


    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        padding: 18,
        marginBottom: 15,

        borderWidth: 1,
        borderColor: '#E5E5E5'
    },


    cardTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: '#00263D',
        marginBottom: 10
    },


    description: {
        fontSize: 16,
        color: '#555555',
        lineHeight: 23
    },


    sectionTitle: {
        fontSize: 17,
        fontWeight: '700',
        color: '#00263D',
        marginBottom: 12
    },


    info: {
        fontSize: 15,
        color: '#555555',
        marginBottom: 7
    },


    actions: {
        gap: 12,
        marginTop: 5
    },


    likeButton: {
        backgroundColor: '#00263D',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center'
    },


    resolveButton: {
        backgroundColor: '#22C55E',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center'
    },


    buttonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700'
    },

    backButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4,
    },

});