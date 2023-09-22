import { StyleSheet, Text, View, Image, FlatList } from "react-native";
import React from "react";
import SimpleHeader from "@components/SimpleHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@constants/colors";
import UserRating from "@components/UserRating";
import { ScrollView } from "react-native-gesture-handler";
import { Divider } from "@constants/ComponentStyled";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "@navigators/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import SkillCard from "@components/cards/SkillCard";
import { DriverSkill } from "@mytypes/DriverProps";
import ExperienceCard from "@components/cards/ExperienceCard";
import ImageSliderModal from "@components/modal/ImageSliderModal";

type Props = NativeStackScreenProps<AppStackParamList, "DriverDetail">;

const DriverDetailScreen = ({ route }: Props) => {
  const [showImageModal, setShowImageModal] = React.useState(false);
  const [images, setImages] = React.useState<string[]>([]);
  const openModalSlider = (images: string[]) => {
    setImages(images);
    setShowImageModal(true);
  };
  return (
    <>
      <ImageSliderModal
        modalVisible={showImageModal}
        setModalVisible={setShowImageModal}
        images={images}
      />
      <SafeAreaView style={styles.container}>
        <View style={{ paddingHorizontal: 20 }}>
          <SimpleHeader text={"Driver Details"} />
          <View
            style={[
              {
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            {route.params.driver.picture ? (
              <Image
                resizeMode="contain"
                style={[styles.image]}
                source={{ uri: route.params.driver.picture }}
              />
            ) : (
              <Ionicons
                name="person-circle"
                size={120}
                color={Colors.primaryColor}
              />
            )}
            <UserRating
              enablerating={true}
              rate={route.params.driver.score?.starCount!}
            />
          </View>
        </View>
        <ScrollView
          style={[styles.contentScroll]}
          showsVerticalScrollIndicator={false}
        >
          {(route.params.driver.firstName || route.params.driver.lastName) && (
            <>
              <Text style={styles.lightText}>Name and Surname</Text>
              <Text style={styles.semiBoldText}>
                {route.params.driver.firstName} {route.params.driver.lastName}
              </Text>
            </>
          )}
          {route.params.driver.businessName && (
            <>
              <Text style={styles.lightText}>Gender</Text>
              <Text style={styles.semiBoldText}>
                {route.params.driver.businessName}
              </Text>
            </>
          )}
          {route.params.driver.about && (
            <>
              <Text style={styles.lightText}>About</Text>
              <Text style={styles.semiBoldText}>
                {route.params.driver.about}
              </Text>
            </>
          )}
          {route.params.driver.gender && (
            <>
              <Text style={styles.lightText}>Gender</Text>
              <Text style={styles.semiBoldText}>
                {route.params.driver.gender}
              </Text>
            </>
          )}
          {route.params.driver.cvLink && (
            <>
              <Text style={styles.lightText}>Cv Link</Text>
              <Text style={styles.semiBoldText}>
                {route.params.driver.cvLink}
              </Text>
            </>
          )}
          {route.params.driver.yearsOfExperience != undefined && (
            <>
              <Text style={styles.lightText}>Years Of Experience</Text>
              <Text style={styles.semiBoldText}>
                {route.params.driver.yearsOfExperience}
              </Text>
            </>
          )}

          {route.params.driver.skills && (
            <>
              <Text style={styles.lightText}>Skills</Text>
              <View style={{ paddingHorizontal: 15, marginTop: 5, gap: 5 }}>
                {route.params.driver.skills.map((skill, i) => (
                  <SkillCard key={i} props={skill} />
                ))}
              </View>
            </>
          )}

          {route.params.driver.experiences && (
            <>
              <Text style={styles.lightText}>Experience</Text>
              <View style={{ paddingHorizontal: 15, marginTop: 5, gap: 5 }}>
                {route.params.driver.experiences.map((exp, i) => (
                  <ExperienceCard
                    onOpenSlider={() => openModalSlider(exp.attachments!)}
                    key={i}
                    props={exp}
                  />
                ))}
              </View>
            </>
          )}
          {route.params.driver.driverPricing && (
            <>
              <Text style={styles.lightText}>Pricing</Text>
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 5,
                  backgroundColor: Colors.whiteTone2,
                  padding: 5,
                  borderRadius: 5,
                  borderWidth: 0.5,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={[styles.lightText, { margin: 0, fontSize: 14 }]}>
                    Per Kilometer : 
                  </Text>
                  <Text
                    style={[styles.semiBoldText, { margin: 0, fontSize: 14 }]}
                  >
                    {route.params.driver.driverPricing.pricePerKilometer}
                    {route.params.driver.driverPricing.currency}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={[styles.lightText, { margin: 0, fontSize: 14 }]}>
                    Per Hour :
                  </Text>
                  <Text
                    style={[styles.semiBoldText, { margin: 0, fontSize: 14 }]}
                  >
                    {route.params.driver.driverPricing.pricePerHour}
                    {route.params.driver.driverPricing.currency}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                    justifyContent: "center",
                  }}
                >
                  <Text style={[styles.lightText, { margin: 0, fontSize: 14 }]}>
                    Per Day :
                  </Text>
                  <Text
                    style={[styles.semiBoldText, { margin: 0, fontSize: 14 }]}
                  >
                    {route.params.driver.driverPricing.pricePerDay}
                    {route.params.driver.driverPricing.currency}
                  </Text>
                </View>
              </View>
            </>
          )}
          <View style={{ height: 50 }}></View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default DriverDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.whiteTone1,
    paddingTop: 40,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 120 / 2,
    borderWidth: 0.5,
    borderColor: Colors.grayTone4,
    backgroundColor: Colors.whiteTone1,
  },
  contentScroll: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    flex: 1,
    backgroundColor: Colors.whiteTone3,
    paddingHorizontal: 30,
    paddingTop: 10,
    position: "relative",
    marginTop: 10,
  },
  semiBoldText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: Colors.grayTone1,
  },
  lightText: {
    fontSize: 12,
    fontFamily: "Poppins_300Light",
    color: Colors.grayTone2,
    marginVertical: 5,
  },
});
