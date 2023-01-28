import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar, ProgressBar, Searchbar } from 'react-native-paper'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SafeAreaView } from 'react-native-safe-area-context'
import SellerCard from '../components/SellerCard'
import { useNavigation, useRoute } from '@react-navigation/native'
import { API, graphqlOperation } from 'aws-amplify'
import { listListings } from '../src/graphql/queries'
import Wrapper from '../components/Wrapper'

const ByCategory = () => {
    const navigation = useNavigation();
    const [categoryContent, setCategoryContent] = useState();
    const [loading, setLoading] = useState(true);
    const route = useRoute();
    const [searchQuery, setSearchQuery] = useState('');
    const onChangeSearch = query => setSearchQuery(query);

    useEffect(() => {
        async function loadContent() {
            let filter = {
                category: {
                    eq: route.params.category
                }
            };
            const result = await API.graphql(graphqlOperation(listListings, { filter: filter}));
            const content = [];            
            result.data.listListings.items.forEach((data) => {
                content.push(data)
            } )
            setCategoryContent(content);
        }
        loadContent();
        setLoading(false);        
    },[])
    console.log('CATEGORY CONTENT: ', categoryContent == '')
    if (loading){
        return <ProgressBar indeterminate color={'#345847'} />
      }
    
  return (
    <Wrapper>
      <SafeAreaView>
      <View style={styles.header} >        
                <MaterialIcons onPress={() => navigation.goBack()} name='arrow-back' size={30}  />
                <View>                    
                    <Text style={{...styles.headerText, fontWeight:'600'}} >{route.params.category}</Text>
                </View>
                <MaterialIcons name='person-search' size={30} />
        
            </View>
            <Searchbar
                placeholder="Rechercher un vendeur"
                onChangeText={onChangeSearch}
                value={searchQuery}
                style={styles.searchBar}
                />
            <ScrollView >
                {
                    categoryContent != ''?
                    categoryContent?.filter(cat => cat?.seller?.name?.includes(searchQuery)).map((item, index) => (
                        <SellerCard key={index} seller={item} />
                    ))
                    :
                    <Text style={styles.avis}>Pas encore d'avis</Text>
                }
                {/* <SellerCard /> */}
            </ScrollView>
    </SafeAreaView>
    </Wrapper>
  )
}

export default ByCategory

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
    avis:{
        fontSize:29,
        textAlign:'center',
        marginTop: 40,
        fontWeight:'300'
    }
})