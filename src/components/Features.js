import { View, Text, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Features() {
    return (
        <View style={{ height: hp(60) }} className='space-y-4'>
            <Text style={{ fontSize: wp(6.5) }} className='font-semibold text-gray-600'>Features</Text>
            <View className='bg-emerald-200 p-4 rounded-xl space-y-2'>
                <View className='items-center flex-row space-x-1'>
                    <Image style={{ height: hp(4), width: hp(4) }} source={require('../../assets/images/chatgptIcon.png')} />
                    <Text style={{ fontSize: wp(4.8) }} className='font-semibold text-gray-700'>ChatGPT</Text>
                </View>
                <Text className='text-gray-700 font-medium' style={{ fontSize: wp(3) }}>
                    ChatGPT is an advanced language model developed by OpenAI, specialized in generating coherent responses in text conversations.
                </Text>
            </View>
            <View className='bg-orange-200 p-4 rounded-xl space-y-2'>
                <View className='items-center flex-row space-x-1'>
                    <Image style={{ height: hp(4), width: hp(4) }} source={require('../../assets/images/dalleIcon.png')} />
                    <Text style={{ fontSize: wp(4.8) }} className='font-semibold text-gray-700'>DALL-E</Text>
                </View>
                <Text className='text-gray-700 font-medium' style={{ fontSize: wp(3) }}>
                    DALL-E is an innovative generative model developed by OpenAI, known for its ability to create diverse and imaginative images from textual descriptions.
                </Text>
            </View>
            <View className='bg-cyan-200 p-4 rounded-xl space-y-2'>
                <View className='items-center flex-row space-x-1'>
                    <Image style={{ height: hp(4), width: hp(4) }} source={require('../../assets/images/smartaiIcon.png')} />
                    <Text style={{ fontSize: wp(4.8) }} className='font-semibold text-gray-700'>Crew Commander</Text>
                </View>
                <Text className='text-gray-700 font-medium' style={{ fontSize: wp(3) }}>
                    An AI assistant is a smart, virtual entity designed to assist users with tasks and provide information through natural language interactions.
                </Text>
            </View>
        </View>
    )
}