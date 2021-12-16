import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, Modal, Pressable } from 'react-native'
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons'
import * as MediaLibrary from 'expo-media-library';

const sound = require('../../assets/clicks.mp3')
var clickSound = null;
const Kamera = () => {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(false)
    const [hasAudioPermissions, setHasAudioPermissions] = useState(false)
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false)

    const [time, setTime] = useState(0)
    const [startTimer, setStartTimer] = useState(false)

    const [modalVisible, setModalVisible] = useState(true);

    const [recordingStatus, setRecordingStatus] = useState(false)
    const [cameraRef, setCameraRef] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [cameraFlash, setCameraFlash] = useState(Camera.Constants.FlashMode.off)
    const [CameraReady, setCameraReady] = useState(false)

    const isFocused = useIsFocused()

    useEffect(() => {
        let timerId;
        if (startTimer == true) {
            setTime(0)
            timerId = setInterval(() => {
                setTime(time => time + 1);
            }, 1000)
        }
        return () => clearInterval(timerId)
    }, [startTimer])

    useEffect(() => {
        const getPermissions = async () => {
            const cameraStatus = await Camera.requestCameraPermissionsAsync()
            setHasCameraPermissions(cameraStatus.status == 'granted')

            const audioStatus = await Audio.requestPermissionsAsync()
            setHasAudioPermissions(audioStatus.status == 'granted')

            const galleryStatus = await MediaLibrary.requestPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status == 'granted')
        }
        getPermissions()
        clickSound = new Audio.Sound();
        clickSound.loadAsync(sound, { shouldPlay: true, isLooping: true })
        return () => { clickSound.unloadAsync() }
    }, [])

    if (!hasCameraPermissions || !hasAudioPermissions || !hasGalleryPermissions) {
        return (
            <View></View>
        )
    }

    const handlePress = async () => {
        if (cameraRef) {
            if (recordingStatus == false) {
                setStartTimer(true)
                setRecordingStatus(true)
                try {
                    const options = { quality: Camera.Constants.VideoQuality['480'] }
                    const videoRecordPromise = cameraRef.recordAsync(options)
                    if (videoRecordPromise) {
                        const data = await videoRecordPromise;
                        const source = data.uri
                        MediaLibrary.saveToLibraryAsync(source)
                    }
                } catch (err) {
                    console.warn(err)
                }
            } else {
                setStartTimer(false)
                setRecordingStatus(false)
                cameraRef.stopRecording()
            }
        }
    }


    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Selamat datang! Atur volume HP menjadi 100%. Letakkan kamera di tempat yang aman, lalu mulailah merekam. Pastikan bahwa pijakan memiliki tinggi 40-50 cm. Jangan lupa pakai sepatu, ya!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Siap, laksanakan!</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            {isFocused ? <Camera
                ref={ref => setCameraRef(ref)}
                ratio={'16:9'}
                style={styles.camera}
                type={cameraType}
                flashMode={cameraFlash}
                onCameraReady={() => setCameraReady(true)}
            /> : null}
            <View style={styles.sideBarContainer}>
                <TouchableOpacity style={styles.sideBarButton}>
                    <Feather name='refresh-ccw' size={24} color={'white'}
                        onPress={() => setCameraType(cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back)} />
                    <Text style={styles.iconText}>Flip</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.sideBarButton}>
                    <Feather name='zap' size={24} color={'white'}
                        onPress={() => setCameraFlash(cameraFlash === Camera.Constants.FlashMode.off ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off)} />
                    <Text style={styles.iconText}>Flash</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomBarContainer}>
                <View style={styles.recordButtonContainer}>
                    <Text style={styles.timerText}>{time}</Text>
                    <TouchableOpacity disabled={!CameraReady} style={styles.recordButton} onPress={handlePress} />
                </View>
            </View>
        </View >
    )
}

export default Kamera

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    camera: {
        flex: 1,
        backgroundColor: 'black',
        aspectRatio: 9 / 16,
    },
    bottomBarContainer: {
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        marginBottom: 130,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    recordButtonContainer: {
        flex: 1,
        marginHorizontal: 30,
        alignItems: 'center'
    },
    recordButton: {
        borderWidth: 8,
        borderColor: '#ff404087',
        backgroundColor: '#ff4040',
        borderRadius: 100,
        height: 80,
        width: 80,
        alignSelf: 'center'
    },
    sideBarContainer: {
        top: 60,
        right: 0,
        marginHorizontal: 20,
        position: 'absolute',
    },
    iconText: {
        color: 'white',
        fontSize: 14,
        marginTop: 5
    },
    sideBarButton: {
        alignItems: 'center',
        marginBottom: 25
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    timerText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
        marginBottom: 10
    }
});
