import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Colors from '@constants/colors';
import {Ionicons, FontAwesome5} from '@expo/vector-icons';
import DateTimePicker , { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface DatePickerProps {
    date: Date;
    setDate: Function;
    shadow?: boolean;
    bgColor?: string;
    marginHorizontal?: number;
    marginVertical?: number;
    error?: boolean
  }


const DatePicker = (props: DatePickerProps) => {
    
    const [show, setShow] = useState(false);
    const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate! || Date;
        setShow(false);
        props.setDate(currentDate);
    }

  return (
    <>
    
    <TouchableOpacity onPress={() => setShow(!show)} style={[
        styles.container,
        props.shadow != null && props.shadow ? styles.shadowProp : props.shadow != null && !props.shadow ? undefined : styles.shadowProp,
        props.error ? styles.container_ERROR : props.date  ? styles.container_GOOD : styles.container_NORMAL,
        {
          backgroundColor: props.bgColor ? props.bgColor : undefined,
          marginVertical: props.marginVertical ? props.marginVertical : undefined
        }
      ]}>
      <Text style={[styles.text]}>{`${props.date.getDate()}.${props.date.getMonth()}.${props.date.getFullYear()}`}</Text>
      <Ionicons name="calendar" size={20} color={Colors.grayTone3} />
    </TouchableOpacity>
    {show &&
        <DateTimePicker
            testID="dateTimePicker"
            value={props.date}
            mode='date'
            is24Hour={true}
            display='calendar'
            onChange={onChange}
         />
    }
    {props.error && (
        <Text style={styles.text_ERROR}>Date is required</Text>
      )}
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        height: 50,
      },
      shadowProp: {
        shadowColor: '#171717',
        elevation: 4,
        backgroundColor: Colors.whiteTone1,
        borderRadius: 10
      },
      container_NORMAL: {
        borderColor: Colors.whiteTone1,
      },
      container_GOOD: {
        borderColor: Colors.primaryColor,
      },
      container_ERROR: {
        borderColor: 'red',
      },
      text: {
        color: Colors.grayTone1,
        fontFamily: 'Poppins_300Light',
        fontSize: 13,
      },
      text_ERROR: {
        color: 'red',
        alignSelf: 'stretch',
      },
});