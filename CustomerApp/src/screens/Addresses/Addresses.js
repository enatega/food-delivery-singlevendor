import { useMutation } from "@apollo/react-hooks";
import { useNavigation, useTheme } from "@react-navigation/native";
import gql from "graphql-tag";
import React, { useContext, useLayoutEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import i18n from "../../../i18n";
import { deleteAddress } from "../../apollo/server";
import EmptyAddress from "../../assets/images/SVG/imageComponents/EmptyAddress";
import {
  CustomIcon,
  RightButton,
  TextDefault,
  WrapperView,
} from "../../components";
import UserContext from "../../context/User";
import { COLORS } from "../../Theme";
import { alignment } from "../../utils/alignment";
import { ICONS_NAME, NAVIGATION_SCREEN } from "../../utils/constant";
import { scale } from "../../utils/scaling";
import useStyle from "./styles";

const DELETE_ADDRESS = gql`
  ${deleteAddress}
`;

function Addresses() {
  const styles = useStyle();
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { profile } = useContext(UserContext);
  const [mutate, { loading: loadingMutation }] = useMutation(DELETE_ADDRESS);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: i18n.t("myAddresses"),
      headerRight: () => (
        <RightButton
          icon={ICONS_NAME.Plus}
          iconSize={scale(18)}
          onPress={() => navigation.navigate(NAVIGATION_SCREEN.NewAddress)}
        />
      ),
    });
  }, [navigation]);

  const addressIcons = {
    Home: ICONS_NAME.Home,
    Work: ICONS_NAME.Cart,
    Other: ICONS_NAME.Location,
  };

  const colorIcons = {
    Other: COLORS.primary,
    Home: COLORS.redishPink,
    Work: COLORS.primaryLightBlue,
  };

  const emptyView = React.memo(() => {
    return (
      <View style={styles.subContainerImage}>
        <View style={styles.image}>
          <EmptyAddress width={scale(180)} height={scale(180)} />
        </View>
        <View style={styles.descriptionEmpty}>
          <TextDefault
            textColor={colors.fontMainColor}
            bold
            H5
            style={alignment.Msmall}
          >
            No Addresses found.
          </TextDefault>
          <View>
            <TextDefault textColor={colors.fontSecondColor}>
              You haven&#39;t saved any address yet.
              {"\n"}
              Click Add New Address to get started
            </TextDefault>
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.adressBtn}
            onPress={() => navigation.navigate(NAVIGATION_SCREEN.NewAddress)}
          >
            <TextDefault textColor={colors.white} H5 bold>
              Add New Address
            </TextDefault>
          </TouchableOpacity>
        </View>
      </View>
    );
  });
  return (
    <WrapperView>
      <View style={styles.containerInfo}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={profile.addresses}
          style={[styles.flex, styles.width100]}
          contentContainerStyle={
            profile.addresses.length > 0
              ? styles.contentContainer
              : { flexGrow: 1 }
          }
          ListEmptyComponent={emptyView}
          // keyExtractor={(item) => item._id}
          keyExtractor={(item, index) => String(index)}
          ItemSeparatorComponent={() => <View style={styles.line} />}
          ListHeaderComponent={() => <View style={alignment.MTmedium} />}
          renderItem={({ item: address }) => (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.width100}
              onPress={() => {
                navigation.navigate(NAVIGATION_SCREEN.EditAddress, {
                  ...address,
                });
              }}
            >
              <View style={[styles.titleAddress, styles.width100]}>
                <View
                  style={{
                    alignItems: "center",
                    flexDirection: "row",
                    flex: 1,
                  }}
                >
                  <CustomIcon
                    name={addressIcons[address.label]}
                    size={scale(20)}
                    color={colorIcons[address.label]}
                  />
                  <TextDefault
                    bold
                    H5
                    style={[alignment.MTxSmall, alignment.MLsmall]}
                  >
                    {address.label}
                  </TextDefault>
                </View>
                <View style={[styles.titleAddress]}>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={loadingMutation}
                    style={[styles.iconButton, alignment.MRsmall]}
                    onPress={() => {
                      navigation.navigate(NAVIGATION_SCREEN.EditAddress, {
                        ...address,
                      });
                    }}
                  >
                    <CustomIcon
                      name={ICONS_NAME.Pencil}
                      size={scale(20)}
                      color={colors.placeHolderColor}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.7}
                    disabled={loadingMutation}
                    style={styles.iconButton}
                    onPress={() => {
                      mutate({ variables: { id: address._id } });
                    }}
                  >
                    <CustomIcon
                      name={ICONS_NAME.Trash}
                      size={scale(20)}
                      color={colors.placeHolderColor}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.addressDetail}>
                <TextDefault textColor={colors.fontSecondColor}>
                  {address.delivery_address}, {address.details}
                </TextDefault>
              </View>
            </TouchableOpacity>
          )}
        />
        <TextDefault
          textColor={colors.fontSecondColor}
          style={alignment.MBsmall}
        >
          All rights are reserved by Enatega
        </TextDefault>
      </View>
    </WrapperView>
  );
}
export default React.memo(Addresses);
