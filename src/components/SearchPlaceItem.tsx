import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Divider } from '@constants/ComponentStyled';
import { PlaceProps } from '../types/PlaceProps';
import Colors from '@constants/colors';

const SearchPlaceItem = ({ item, onPress }: { item: PlaceProps, onPress(item: PlaceProps): Promise<void> }) => {
    let text = item.properties.state || item.properties.country || "";
    if (text !== "") text += ", ";
  return (
    <TouchableOpacity
        style={[styles.itemContainer]}
        onPress={() => onPress(item)}
      >
        <Ionicons name="time-outline" size={20} color={Colors.grayTone4} />
        <View style={{ flex: 1 }}>
          <Text style={[styles.itemTextBold]}>{item.properties.name}</Text>
          <Text style={[styles.itemTextLight]}>
            {text}
            {item.properties.country}
          </Text>
          <Divider style={{ marginTop: 10 }} />
        </View>
      </TouchableOpacity>
  )
}

export default SearchPlaceItem

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      },
      itemTextBold: {
        fontFamily: "Poppins_600SemiBold",
        fontSize: 16,
        color: Colors.grayTone1,
      },
      itemTextLight: {
        color: Colors.grayTone2,
        fontFamily: "Poppins_300Light",
        fontSize: 13,
      },
})