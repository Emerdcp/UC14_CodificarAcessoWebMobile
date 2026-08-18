import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    header: {
        height: 80,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 12,
        paddingTop: 35,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    back: {
        fontSize: 38,
        marginRight: 15,
        lineHeight: 38,
        color: '#00243A',
        width: 35,
        textAlign: 'center',
    },

    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#00243A',
    },

    content: {
        flex: 1,
        padding: 20,
    },

    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
    },

    card: {
        backgroundColor: '#fff',

        borderRadius: 14,

        padding: 18,

        borderWidth: 1,
        borderColor: '#e5e5e5',

        elevation: 2,

        shadowOffset: {
            width: 0,
            height: 2,
        },

        shadowOpacity: 0.08,

        shadowRadius: 4,

        marginBottom: 16,
    },

    cardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#00243A',
        marginBottom: 8,
    },

    cardDescription: {
        fontSize: 14,
        color: '#666',
        marginBottom: 16,
        lineHeight: 20,
    },

    locationButton: {
        height: 50,

        borderRadius: 10,

        backgroundColor: '#00243A',

        alignItems: 'center',
        justifyContent: 'center',
    },

    locationButtonText: {
        color: '#fff',

        fontSize: 15,

        fontWeight: '600',
    },

    coordinates: {
        marginTop: 15,

        fontSize: 13,

        color: '#555',

        lineHeight: 20,

        backgroundColor: '#f5f5f5',

        padding: 10,

        borderRadius: 8,
    },
    photoButtons: {
        flexDirection: 'row',
        gap: 10,
    },

    photoButton: {
        flex: 1,

        height: 50,

        borderRadius: 10,

        backgroundColor: '#00243A',

        alignItems: 'center',
        justifyContent: 'center',
    },

    photoButtonText: {
        color: '#fff',

        fontSize: 14,

        fontWeight: '600',
    },

    photoPreviewContainer: {
        marginTop: 15,
    },

    photoPreview: {
        width: '100%',

        height: 220,

        borderRadius: 10,
    },

    removePhotoButton: {
        marginTop: 10,

        alignItems: 'center',

        paddingVertical: 8,
    },

    removePhotoText: {
        color: '#D32F2F',

        fontSize: 14,

        fontWeight: '600',
    },

});