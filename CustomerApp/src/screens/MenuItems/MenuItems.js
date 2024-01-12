import { useQuery } from "@apollo/react-hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
//import { useHeaderHeight } from '@react-navigation/stack'
import { useHeaderHeight } from "@react-navigation/elements";
import gql from "graphql-tag";
import { get } from "lodash";
import React, { useContext, useLayoutEffect, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { foods } from "../../apollo/server";
import EmptyFood from "../../assets/images/SVG/imageComponents/EmptyFood";
import {
  EnategaImage,
  FilterModal,
  FlashMessage,
  RightButton,
  Spinner,
  TextDefault,
  TextError,
  WrapperView,
} from "../../components";
import ConfigurationContext from "../../context/Configuration";
import UserContext from "../../context/User";
import { alignment } from "../../utils/alignment";
import { ICONS_NAME, NAVIGATION_SCREEN, SORT_DATA } from "../../utils/constant";
import { moderateScale, scale } from "../../utils/scaling";
import useStyle from "./styles";
import i18n from "../../../i18n";

// constants
const FOODS = gql`
  ${foods}
`;

function MenuItems() {
  const route = useRoute();
  const styles = useStyle();
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const _id = route.params._id ?? null;
  const imgMenu = route.params.img_menu ?? null;
  const title = route.params.title ?? null;
  const description = route.params.description ?? null;
  const [filters, setFilters] = useState({});
  const { loading, error, data, refetch, networkStatus } = useQuery(FOODS, {
    variables: { category: _id, ...filters },
  });
  const { addCartItem } = useContext(UserContext);
  const configuration = useContext(ConfigurationContext);
  const modalizeRef = useRef(null);

  const closeModal = () => {
    modalizeRef.current.close();
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerRight: () => (
        <RightButton
          icon={ICONS_NAME.Filter}
          onPress={() => modalizeRef.current.open()}
        />
      ),
    });
  }, [navigation]);

  async function onAddToCart(food) {
    if (food.stock < 1) {
      FlashMessage({
        message: i18n.t('ItemOutOfStock'),
      });
      return;
    }

    if (
      food.variations.length === 1 &&
      food.variations[0].addons.length === 0
    ) {
      await addCartItem(food._id, food.variations[0]._id);
      navigation.navigate(NAVIGATION_SCREEN.Cart);
    } else {
      navigation.navigate(NAVIGATION_SCREEN.ItemDetail, { food });
    }
  }

  function renderGridCards(item) {
    return (
      <TouchableOpacity
        onPress={() => {
          onAddToCart(item);
        }}
        activeOpacity={0.7}
        style={styles.cardContainer}
      >
        <View style={styles.cardImageContainer}>
          <EnategaImage
            imgStyle={styles.imgResponsive}
            imgSource={
              item.img_url
                ? { uri: item.img_url }
                : require("../../assets/images/food_placeholder.png")
            }
            resizeMode={"cover"}
            spinnerProps={{ style: styles.loadingView }}
          />
          {item.stock < 1 && (
            <View style={styles.emtpyStockLabel}>
              <TextDefault textColor={styles.whiteFont.color} center>
                {i18n.t('NoStock')}
              </TextDefault>
            </View>
          )}
        </View>
        <View style={[styles.textContainer]}>
          <TextDefault numberOfLines={2} style={alignment.MBxSmall} bolder H5>
            {item.title}
          </TextDefault>
          <TextDefault
            numberOfLines={2}
            textColor={styles.lightColor.color}
            small
            medium
          >
            {item.description}
          </TextDefault>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {item.variations[0].discounted > 0 && (
              <TextDefault
                textColor={styles.lightColor.color}
                style={[alignment.MRxSmall]}
                small
                bold
                H5
                lineOver
              >
                {configuration.currency_symbol}{" "}
                {(
                  item.variations[0].price + item.variations[0].discounted
                ).toFixed(2)}
              </TextDefault>
            )}
            <TextDefault textColor={styles.tagColor.color} H4 bolder>
              {configuration.currency_symbol}{" "}
              {item.variations[0].price.toFixed(2)}
            </TextDefault>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  function sortData(foods) {
    const VALUE = get(SORT_DATA, get(filters, "sort"));
    switch (VALUE) {
      case SORT_DATA.NameAsc:
        return foods.sort((a, b) =>
          a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1
        );
      case SORT_DATA.NameDesc:
        return foods.sort((a, b) =>
          a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1
        );
      case SORT_DATA.PriceAsc:
        return foods.sort((a, b) =>
          a.variations[0].price > b.variations[0].price ? 1 : -1
        );
      case SORT_DATA.PriceDesc:
        return foods.sort((a, b) =>
          a.variations[0].price < b.variations[0].price ? 1 : -1
        );
      default:
        return foods.sort((a, b) => (a.img_url < b.img_url ? 1 : -1));
    }
  }

  const setFilterss = (filterObj) => {
    setFilters(filterObj);
  };

  function emptyView() {
    if (loading) {
      return <Spinner />;
    } else if (error) {
      return (
        <TextError
          text={error ? error.message : i18n.t('NoFoods')}
          backColor="transparent"
        />
      );
    } else {
      return (
        <View style={styles.emptyContainer}>
          <EmptyFood width={scale(250)} height={scale(250)} />
          <TextDefault H4 bold style={alignment.MTlarge}>
            {i18n.t('NoFooditemFound')}
          </TextDefault>
        </View>
      );
    }
  }

  function renderListHeader() {
    return (
      <View style={styles.backgroundImageContainer}>
        <ImageBackground
          style={styles.backgroundImage}
          borderRadius={moderateScale(20)}
          source={
            imgMenu
              ? { uri: imgMenu }
              : require("../../assets/images/food_placeholder.png")
          }
        >
          <View style={styles.shadeContainer}></View>
          <View style={styles.backgroundImageTextContainer}>
            <TextDefault
              numberOfLines={1}
              textColor={styles.whiteFont.color}
              H4
              bolder
            >
              {title}
            </TextDefault>
            <TextDefault
              numberOfLines={1}
              textColor={styles.whiteFont.color}
              bold
            >
              {description}
            </TextDefault>
          </View>
        </ImageBackground>
      </View>
    );
  }
  return (
    <WrapperView>
      <View style={[styles.flex]}>
        <FlatList
          style={styles.flex}
          contentContainerStyle={styles.contentContaienr}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={renderListHeader()}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={emptyView}
          data={loading ? [] : error ? [] : sortData(data.foodByCategory)}
          refreshing={networkStatus === 4}
          onRefresh={() =>
            refetch({
              variables: { category: _id, ...filters },
            })
          }
          renderItem={({ item }) => renderGridCards(item)}
        />
      </View>
      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        handlePosition="inside"
        modalTopOffset={headerHeight}
        avoidKeyboardLikeIOS={Platform.select({
          ios: true,
          android: false,
        })}
        keyboardAvoidingOffset={2}
        keyboardAvoidingBehavior="height"
      >
        <FilterModal
          filterObj={filters}
          setFilters={setFilterss}
          closeFilterModal={closeModal}
        />
      </Modalize>
    </WrapperView>
  );
}
export default MenuItems;
