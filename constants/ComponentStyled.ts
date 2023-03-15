import styled from "styled-components/native";
import Colors from "./colors";


export const OTPInputContainer = styled.View`
 justify-content: center;
 align-items: center;
`;

export const TextInputHidden = styled.TextInput`
 width: 300px;
 border-color: #e5e5e5;
 border-width: 1px;
 border-radius: 5px;
 padding: 15px;
 position: absolute;
 opacity: 0;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
 width: 80%;
 flex-direction: row;
 justify-content: space-evenly;
`;
export const SplitBoxes = styled.View`
 borderWidth: 1px;
 borderColor: ${Colors.whiteTone4};
 border-radius: 5px;
 padding: 12px;
 min-width: 50px;
 shadowColor: '#171717';
 elevation: 0;
 backgroundColor: ${Colors.whiteTone3};
`;

export const SplitBoxText = styled.Text`
 font-size: 20px;
 text-align: center;
 color: ${Colors.grayTone1};
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
 border-color: #ecdbba;
 background-color: grey;
`;