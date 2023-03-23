import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SelectList, SelectListProps } from 'react-native-dropdown-select-list';
import {useFonts, Poppins_500Medium, Poppins_300Light} from '@expo-google-fonts/poppins';
import Colors from '../constants/colors';

export interface  DropDataProps {
    key: string | number;
    value: string;
    disabled?: boolean;
}

interface CustomDropdownInputProps {
    data: DropDataProps[];
    setSelected: Function;
    placeholder: string;
    defaultOption?: DropDataProps;
    search?: boolean;
    asError?: boolean;
    errorMessage?: string;
}

const CustomDropdownInput = (props: CustomDropdownInputProps) => {
 
  const [fontsLoaded] = useFonts({
        Poppins_500Medium, 
        Poppins_300Light
    });
  
  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <SelectList 
        setSelected={props.setSelected} 
        data={props.data} 
        save="value"
        defaultOption={props.defaultOption}
        placeholder={props.placeholder}
        search={props.search}
        fontFamily='Poppins_500Medium'
        boxStyles={{ 
          borderWidth: props.asError ? 1 : 0,
          borderBottomWidth: 2,
          borderColor: props.asError ? 'red' : Colors.primaryColor
        }}
        dropdownStyles={{ 
          borderColor: props.asError ? 'red' : Colors.primaryColor
         }}
         dropdownItemStyles={{ 
          borderBottomWidth: 0.25,
          borderColor:  Colors.grayTone4,
          marginHorizontal: 5
          }}
          dropdownTextStyles={{ 
            color: Colors.grayTone2
           }}
        />
        {(props.asError) && (
                  <Text style={styles.text_ERROR}>{props.errorMessage || 'Error'}</Text>
                )}
    </View>
  );
};

export default CustomDropdownInput;

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: '100%',
    },
    text_ERROR: {
      color: 'red',
      alignSelf: 'stretch',
      fontFamily: 'Poppins_300Light',
      fontSize: 12,
      margin: 5
    },
});