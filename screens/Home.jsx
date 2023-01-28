import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, MD2Colors, Searchbar } from 'react-native-paper'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import CategoryIcon from '../components/CategoryIcon'
import Wrapper from '../components/Wrapper'
import { useNavigation, useRoute } from '@react-navigation/native'
import Snackb from '../components/Snackbar'
import { API, Auth, graphqlOperation } from 'aws-amplify'
import { getClient, getSeller } from '../src/graphql/queries'
import Entypo from '@expo/vector-icons/Entypo'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5'
import Octicons from '@expo/vector-icons/Octicons'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Fontisto from '@expo/vector-icons/Fontisto'

const categories = [
    {
        id:0,
        text:'Déménageur',
        icon:'truck',
        backcolor: MD2Colors.blue100,
        color: MD2Colors.blueA700
    },
    {
        id:1,
        text:'Électricien',
        icon:'',
        backcolor:MD2Colors.amber100,
        color:MD2Colors.amberA700,
        iconImage: <MaterialCommunityIcons name='power-plug' size={40} color={MD2Colors.amberA700} />
    },
    {
        id:2,
        text:'Peintre',
        backcolor:MD2Colors.green100,
        color: MD2Colors.greenA700,
        icon:'',
        iconImage: <MaterialCommunityIcons name='format-paint' color={MD2Colors.greenA700} size={40} />
    },
    {
        id:3,
        text:'Plomberie',
        backcolor:MD2Colors.orange100,
        color: MD2Colors.orange700,
        icon:'tools'
    },
    {
        id:4,
        text:'Vidangeur',
        backcolor:MD2Colors.red100,
        color: MD2Colors.redA700,
        icon:'',
        iconImage: <MaterialIcons name='cleaning-services' size={40} color={MD2Colors.red700} />
    },
    {
        id:5,
        text:'Aide à domicile',
        backcolor:MD2Colors.grey300,
        color: MD2Colors.grey700,
        icon:'',
        iconImage: <FontAwesome5 name='hands-helping' size={40} color={MD2Colors.grey700} />
    },
    {
        id:6,
        text:'Chauffeur',
        backcolor:MD2Colors.cyan100,
        color: MD2Colors.cyan700,
        icon:'',
        iconImage: <FontAwesome5 name='car-alt' size={40} color={MD2Colors.cyan700} />
    },
    {
        id:7,
        text:'Mécanicien',
        backcolor:MD2Colors.indigo100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <MaterialIcons name='car-repair' size={40} color={MD2Colors.indigo700} />
    },
    {
        id:8,
        text:'Cours',
        backcolor:MD2Colors.lime100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <FontAwesome5 name='chalkboard-teacher' size={40} color={MD2Colors.lime700} />
    },
    {
        id:9,
        text:'Agent Immobiliers',
        backcolor:MD2Colors.pink100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <MaterialIcons name='house' size={40} color={MD2Colors.pink700} />
    },
    {
        id:10,
        text:'Gardiennage',
        backcolor:MD2Colors.lightGreen100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <Entypo name='flower' size={40} color={MD2Colors.lightGreen700} />
    },
    {
        id:11,
        text:'Article d’événements',
        backcolor:MD2Colors.blueGrey100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <MaterialCommunityIcons name='party-popper' color={MD2Colors.blueGrey700} size={40} />
    },
    {
        id:12,
        text:'Coach sportif',
        backcolor:MD2Colors.brown100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <FontAwesome name='soccer-ball-o' size={40} color={MD2Colors.brown700} />
    },
    {
        id:13,
        text:'Photographe',
        backcolor:MD2Colors.teal100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <MaterialIcons name='photo-camera' size={40} color={MD2Colors.teal700} />
    },
    {
        id:14,
        text:'Docteur au quartier',
        backcolor:MD2Colors.deepOrange100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <Fontisto name='doctor' color={MD2Colors.deepOrange700} size={40} />
    },
    {
        id:15,
        text:'Fermier',
        backcolor:MD2Colors.deepPurple100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <FontAwesome5 name='carrot' size={40} color={MD2Colors.deepPurple700} />
    },
    {
        id:16,
        text:'Livreur de Gaz',
        backcolor:MD2Colors.indigo100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <MaterialCommunityIcons name='gas-cylinder' color={MD2Colors.indigo700} size={40} />
    },
    {
        id:17,
        text:'Masseur / Masseuse',
        backcolor:MD2Colors.lightBlue100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <MaterialCommunityIcons name='palm-tree' color={MD2Colors.lightBlue700} size={40} />
    },
    {
        id:18,
        text:'Ramassage ordure',
        backcolor:MD2Colors.purple100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <MaterialCommunityIcons name='delete' color={MD2Colors.purple700} size={40} />
    },
    {
        id:19,
        text:'Tresse coiffure',
        backcolor:MD2Colors.teal100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <MaterialCommunityIcons name='hair-dryer' color={MD2Colors.teal700} size={40} />
    },
    {
        id:20,
        text:'Covoiturage',
        backcolor:MD2Colors.yellowA100,
        color: MD2Colors.orange700,
        icon:'',
        iconImage: <MaterialCommunityIcons name='car-multiple' color={MD2Colors.yellowA700} size={40} />
    }
    
]

const Home = () => {
    const [userIn, setUserIn] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [snackVisible, setSnackVisible] = useState(false);
    const [isSeller, setIsSeller] = useState(false);
    const [client, setClient] = useState();
    const [seeAll, setSeeAll] = useState(false);
    const onChangeSearch = query => setSearchQuery(query);
    const navigation = useNavigation();
    const route = useRoute();

    useEffect(() => {
        if (route?.params?.msg === 'added'){
            setSnackVisible(true);            
        }
    },[route]);

    useEffect(() => {
        async function loadUser(){            
            const user = await Auth.currentAuthenticatedUser();            
            setUserIn(user);
            const result = await API.graphql(graphqlOperation(getClient,{id:user.attributes.profile} ))
            if(result.data.getClient) {
                setClient(result.data.getClient);            
            } else {
                setIsSeller(true)
                console.log('getting seller:')
                const resultSeller = await API.graphql(graphqlOperation(getSeller,{id:user.attributes.profile} ))
                setClient(resultSeller.data.getSeller);                
            }
        }      
        loadUser();      
      },[]);    
      
  return (
    <View>
        <SafeAreaView>
            <View style={styles.header} >
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile', {...client, isSeller:isSeller}, {userIn}, isSeller)} > 
                    <Avatar.Image size={44} source={{uri: client?.image}} />
                </TouchableOpacity>
                <View>
                    <Text style={styles.headerText} >Bienvenue</Text>
                    <Text style={{...styles.headerText, fontWeight:'600'}} >{client?.name}</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('BELL! DING')} >
                    <SimpleLineIcons onPress={() => navigation.navigate('Notifications') } name='bell' size={25} />
                </TouchableOpacity>
            </View>
            <Searchbar
                placeholder="Chercher"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
                />
            <View style={seeAll ? {display:'none'} : styles.titleContainer} >
                <Text style={styles.title} >En vedette</Text>
                {/* <Text style={styles.titleRight} >See all</Text> */}
            </View>
            <Image 
                source={require('../assets/cours2.png')}
                style={seeAll ? {display:'none'} : styles.banner}
            />

            <View style={styles.titleContainer} >
                <Text style={styles.title} >Services</Text>
                <TouchableOpacity onPress={() => setSeeAll(!seeAll)} >
                    <Text style={styles.titleRight} >{seeAll? 'Cacher': 'Voir tous' }</Text>
                </TouchableOpacity>
            </View>
            <ScrollView  style={seeAll ? {width:'100%', height:'100%', flexWrap:'wrap'} : {width:'100%', height:340, flexWrap:'wrap'}}  
                contentContainerStyle={styles.iconsContainer} >
                
                    {
                        categories.filter(cat => cat.text.includes(searchQuery)).map((item, index) => (
                            <CategoryIcon iconImage={item.iconImage} text={item.text} icon={item.icon} color={item.color} backColor={item.backcolor} key={index}/>
                        ))
                    }
                
            </ScrollView>                
        </SafeAreaView>
        <Snackb visible={snackVisible} text='Travail supplémentaire' setVisible={setSnackVisible} />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:15
    },
    headerText:{
        fontSize:18,
    },
    searchBar:{
        width:330,
        alignSelf:'center',
        borderRadius:15,
        marginTop:10,
    },
    titleContainer:{
        flexDirection:'row', 
        justifyContent:'space-between',
        marginHorizontal:15,
        marginTop:15,
    },
    title:{
        fontSize:23,
        fontWeight:'bold'
    },
    titleRight:{
        fontSize:18,
        fontWeight:'500'
    },
    banner:{
        width:'90%',
        borderRadius:20,
        alignSelf:'center',
        height:200,
        marginTop:30,        
    },
    iconsContainer:{
        flexDirection:'row',
        marginHorizontal: 0,
        marginTop:20,
        flexWrap:'wrap',
        justifyContent:'space-between',        
        width:390
    }
})