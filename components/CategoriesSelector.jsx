import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Menu, Divider, Provider } from 'react-native-paper';
import {Picker} from '@react-native-picker/picker';
import FontAwesome from '@expo/vector-icons/FontAwesome'


const categories = [
    'Agent Immobiliers',
    'Aide à domicile',
    'Article d’événements ',
    'Chauffeur',
    'Coach sportif', 
    'Photographe',
    'Cours à domicile',
    'Covoiturage',
    'Déménageur',
    'Docteur au quartier',
    'Électricien',
    'Fermier',
    'Gardiennage',
    'Livreur de Gaz',
    'Masseur / Masseuse',
    'Mécanicien',
    'Peintre en bâtiment',
    'Plomberie',
    'Ramassage ordure',
    'Tresse coiffure',
    'Vidangeur',
]

const CategoriesSelector = ({selectedCategory, setSelectedCategory}) => {
    const [visible, setVisible] = useState(false);
    // const [selectedCategory, setSelectedCategory] = useState();

    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    
    console.log('Selected: ', selectedCategory)
    return (
      <Provider>
        <View style={styles.header}>
            <Text style={styles.headerText} >Sélectionner la catégorie</Text>
            <FontAwesome name='sort-alpha-asc' size={23} />

        </View>
              <Picker
                  selectedValue={selectedCategory}
                  onValueChange={(itemValue, itemIndex) =>
                      setSelectedCategory(itemValue)
                  }>
                    {
                        categories.map((item,index) => (
                            <Picker.Item key={index} label={item} value={item} />


                        ))
                    }                  
              </Picker>        
      </Provider>
    );
}

export default CategoriesSelector

const styles = StyleSheet.create({
    header:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:15,
    },
    headerText:{
        fontSize:18,
    }
})