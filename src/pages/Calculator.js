import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, Image, TextInput } from 'react-native'
import Header from '../components/Header.js'

const image = require('../../assets/logoitb.png')
const Calculator = () => {
    const [time, setTime] = useState(0)
    const [bpm1, setbpm1] = useState(0)
    const [bpm2, setbpm2] = useState(0)
    const [bpm3, setbpm3] = useState(0)
    const [value, setValue] = useState(0)
    const [kategori, setKategori] = useState(null)

    useEffect(() => {
        if (time != 0) {
            setValue(Number(((time * 100) / (Number(bpm1) + Number(bpm2) + Number(bpm3))).toPrecision(4)))
            setKategori(hitungKategori())
        }
    })

    const hitungKategori = () => {
        if (value <= 54) {
            return "Kurang"
        } else if (value <= 68) {
            return "Di bawah rata-rata"
        } else if (value <= 83) {
            return "Rata-rata"
        } else if (value <= 96) {
            return "Baik"
        } else {
            return "Sangat baik"
        }
    }

    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.body}>
                <ImageBackground style={styles.background} source={image} imageStyle={{ opacity: 0.2 }}>
                    <View style={styles.inputFields}>
                        <View style={styles.values1}>
                            <View style={styles.buttonComponent}>
                                <Text style={styles.textStyle}>Durasi HST: </Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType='numeric'
                                    selectionColor="#428AF8"
                                    underlineColorAndroid="#428AF8"
                                    onChangeText={(val) => setTime(val)}
                                />
                            </View>
                        </View>
                        <View style={styles.values2}>
                            <View style={styles.buttonComponent}>
                                <Text style={styles.textStyle}>BPM menit 1: </Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType='numeric'
                                    selectionColor="#428AF8"
                                    underlineColorAndroid="#428AF8"
                                    onChangeText={(val) => setbpm1(val)}
                                />
                            </View>
                            <View style={styles.buttonComponent}>
                                <Text style={styles.textStyle}>BPM menit 2: </Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType='numeric'
                                    selectionColor="#428AF8"
                                    underlineColorAndroid="#428AF8"
                                    onChangeText={(val) => setbpm2(val)}
                                />
                            </View>
                            <View style={styles.buttonComponent}>
                                <Text style={styles.textStyle}>BPM menit 3:</Text>
                                <TextInput
                                    style={styles.input}
                                    keyboardType='numeric'
                                    selectionColor="#428AF8"
                                    underlineColorAndroid="#428AF8"
                                    onChangeText={(val) => setbpm3(val)}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.result}>
                        <Text style={styles.textStyle}>Nilai anda adalah:</Text>
                        <Text style={styles.textStyleResult}>{value}</Text>
                        <Text style={styles.textStyle}>Anda termasuk dalam kategori: </Text>
                        <Text style={styles.textStyleResult}>{kategori}</Text>
                        <Text style={styles.textStyle}></Text>
                    </View>
                    <View style={styles.imageContainer2}>
                        <Image style={styles.image} source={require('../../assets/Acuan.jpg')} ></Image>
                    </View>
                </ImageBackground>
            </View>
        </View >
    )
}


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: 50,
    },
    background: {
        flex: 0.80,
        alignSelf: 'stretch',
        width: undefined,
        height: undefined,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 55,
    },
    body: {
        flex: 1,
        width: '100%',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: 100,
        height: 200,
        backgroundColor: 'black'
    },
    imageContainer2: {
        flex: 1,
    },
    image: {
        width: 200,
        height: 180,
        alignSelf: 'center',
    },
    input: {
        textAlign: 'center',
        width: 50,
        height: 40,
        fontSize: 15,
    },
    inputFields: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    values1: {
        justifyContent: 'flex-start'
    },
    values2: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    buttonComponent: {
        alignItems: 'center',
    },
    result: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    textStyleResult: {
        fontWeight: 'bold',
        fontSize: 25,
    }
});

export default Calculator