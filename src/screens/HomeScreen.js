import { View, Text, Image, ScrollView, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Button, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Features from '../components/Features';
import { dummyMessages } from '../constants';
import { apiCall } from '../api/openAI';


export default function HomeScreen() {
    const [messages, setmessages] = useState([])
    const [recording, setrecording] = useState(false)
    const [speaking, setSpeaking] = useState(true)
    const [result, setresult] = useState('')
    const [inputValue, setInputValue] = useState('');
    const scrollViewRef = useRef();

    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true });
        }, 200)
    }

    const fetchResponse = async () => {
        if (inputValue.trim().length > 0) {
            let newMessages = [...messages];
            newMessages.push({ role: 'user', content: inputValue.trim() });
            setmessages(newMessages);

            apiCall(inputValue.trim(), newMessages).then(res => {
                console.log('got api data: ', res);
                updateScrollView();
                if (res.success) {
                    setmessages({ ...res.data })
                    setresult('')
                } else {
                    Alert.alert('Error', res.msg)
                }
            });
        }
    }

    return (
        <View className='flex-1 bg-white'>
            <SafeAreaView className='flex-1 flex mx-5'>
                {/* Bot icon */}
                <View className='flex-row justify-center'>
                    <Image source={require('../../assets/images/bot.png')} style={{ height: hp(15), width: hp(15) }} />
                </View>
                {/* Feature || messages */}
                {
                    messages.length > 0 ? (
                        <View className='space-y-2 flex-1'>
                            <Text style={{ fontSize: wp(5) }} className='text-gray-700 font-semibold ml-1'>Crew Commander will help you!</Text>
                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                                <View className='border-emerald-300 border-x-2 border-y-2 p-3 rounded-3xl flex flex-row items-center justify-between'>
                                    <TextInput
                                        style={{ fontSize: 15 }}
                                        placeholder='Send Message'
                                        value={inputValue}
                                        onChangeText={(text) => setInputValue(text)}
                                    />
                                    <TouchableOpacity
                                        onPress={fetchResponse} // Agregamos la llamada a fetchResponse al presionar el botón "Send"
                                        className='justify-end bg-emerald-500 p-2 rounded-md'>
                                        <Text style={{ fontSize: 15 }} className='font-bold text-white'>
                                            Send
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </KeyboardAvoidingView>
                            <View style={{ height: hp(58) }} className='bg-neutral-200 rounded-3xl p-4'>
                                <ScrollView
                                    bounces={false}
                                    className='space-y-4'
                                    showsVerticalScrollIndicator={false}>
                                    {
                                        messages.map((message, index) => {
                                            if (message.role === 'assistant') {
                                                if (message.content.includes('https')) {
                                                    // image
                                                    return (
                                                        <View key={index} className='justify-start flex-row'>
                                                            <View className='p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none'>
                                                                <Image className='rounded-2xl' resizeMode='contain' source={{ uri: message.content }} style={{ height: wp(60), width: wp(60) }} />
                                                                <Text>Powered with DALL-E</Text>
                                                            </View>
                                                        </View>

                                                    )
                                                } else {
                                                    // text
                                                    return (
                                                        <View key={index} className='flex-row justify-start'>
                                                            <View style={{ width: wp(70) }}
                                                                className='bg-emerald-100 rounded-xl p-2 rounded-tl-none'>
                                                                <Text>{message.content}</Text>
                                                            </View>
                                                        </View>
                                                    )
                                                }
                                            }
                                            else {
                                                // user
                                                return (
                                                    <View key={index} className='flex-row justify-end'>
                                                        <View style={{ width: wp(70) }}
                                                            className='bg-white rounded-xl p-2 rounded-tr-none'>
                                                            <Text>{message.content}</Text>
                                                        </View>
                                                    </View>
                                                )
                                            }
                                        })
                                    }
                                </ScrollView>
                            </View>
                        </View>
                    ) : (
                        <Features />
                    )
                }
                {/* recording, clear and stop buttons */}
                <View className='flex justify-center items-center'>
                    {
                        recording ? (

                            <TouchableOpacity>
                                <Image className='rounded-full'
                                    source={require('../../assets/images/voiceLoading.gif')}
                                    style={{ width: hp(10), height: hp(10) }} />
                            </TouchableOpacity>
                        ) : (
                            <TouchableOpacity>
                                <Image className='rounded-full'
                                    source={require('../../assets/images/recordingIcon.png')}
                                    style={{ width: hp(10), height: hp(10) }} />
                            </TouchableOpacity>
                        )
                    }
                    {
                        messages.length > 0 && (
                            <TouchableOpacity
                                // onPress={onClear}
                                className='bg-neutral-300 rounded-3xl p-2 absolute right-10'>
                                <Text className='text-white font-semibold'>Clear</Text>
                            </TouchableOpacity>
                        )
                    }
                    {
                        speaking > 0 && (
                            <TouchableOpacity
                                // onPress={onStop}
                                className='bg-red-400 rounded-3xl p-2 absolute left-10'>
                                <Text className='text-white font-semibold'>Stop</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
            </SafeAreaView>
        </View>
    )
}