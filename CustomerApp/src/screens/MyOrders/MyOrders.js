import { useApolloClient } from "@apollo/react-hooks";
import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext, useLayoutEffect } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import uuid from "uuid";
import i18n from "../../../i18n";
import EmptyOrder from "../../assets/images/SVG/imageComponents/EmptyOrder";
import {
  ActiveOrders,
  CustomIcon,
  EnategaImage,
  Spinner,
  TextDefault,
  TextError,
  WrapperView,
} from "../../components";
import ConfigurationContext from "../../context/Configuration";
import UserContext from "../../context/User";
import { alignment } from "../../utils/alignment";
import { ICONS_NAME, NAVIGATION_SCREEN } from "../../utils/constant";
import { scale } from "../../utils/scaling";
import useStyle from "./style";

const orderStatusActive = ["PENDING", "PICKED", "ACCEPTED"];
const orderStatusInactive = ["DELIVERED", "COMPLETED"];

function MyOrders() {
  const styles = useStyle();
  const { colors } = useTheme();
  const client = useApolloClient();
  const navigation = useNavigation();
  const configuration = useContext(ConfigurationContext);
  const {
    orders,
    loadingOrders,
    errorOrders,
    fetchOrders,
    fetchMoreOrdersFunc,
    networkStatusOrders,
    updateCart,
  } = useContext(UserContext);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: i18n.t("titleOrders"),
      headerRight: null,
    });
  }, [navigation]);

  // add items to cart and navigate to cart screen
  async function onReOrder({ order }) {
    const data = {
      cartItems: order.items.map((item) => {
        return {
          ...item.food,
          key: uuid.v4(),
          __typename: "CartItem",
          variation: {
            __typename: "ItemVariation",
            _id: item.variation._id,
          },
          quantity: item.quantity,
          addons: item.addons.map((addon) => ({
            ...addon,
            __typename: "ItemAddon",
            options: addon.options.map(({ _id }) => ({
              _id,
              __typename: "ItemOption",
            })),
          })),
        };
      }),
    };
    await updateCart(data.cartItems);
    navigation.navigate(NAVIGATION_SCREEN.Cart);
  }

  function emptyView() {
    if (loadingOrders) return <Spinner visible={loadingOrders} />;
    if (errorOrders) return <TextError text={errorOrders.message} />;
    else {
      return (
        <View style={styles.subContainerImage}>
          <View style={styles.imageContainer}>
            <EmptyOrder width={scale(250)} height={scale(250)} />
          </View>
          <View style={styles.descriptionEmpty}>
            <TextDefault bolder center H4>
              {i18n.t("noOrdersFound")}
            </TextDefault>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.emptyButton}
            onPress={() => navigation.navigate(NAVIGATION_SCREEN.Menu)}
          >
            <TextDefault textColor={colors.buttonText} bold H5 center>
              {i18n.t("startShopping")}
            </TextDefault>
          </TouchableOpacity>
        </View>
      );
    }
  }

  console.log(orders);
  return (
    <WrapperView>
      <FlatList
        data={
          loadingOrders || errorOrders
            ? []
            : orders.filter((o) =>
                orderStatusInactive.includes(o.order_status)
              )
        }
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        ListEmptyComponent={emptyView()}
        ListHeaderComponent={
          <ActiveOrders
            navigation={navigation}
            activeOrders={orders.filter((o) =>
              orderStatusActive.includes(o.order_status)
            )}
            pastOrders={orders.filter((o) =>
              orderStatusInactive.includes(o.order_status)
            )}
            loading={loadingOrders}
            error={errorOrders}
          />
        }
        //keyExtractor={(item) => item._id}
        keyExtractor={(item, index) => String(index)}
        refreshing={networkStatusOrders === 4}
        onRefresh={() => networkStatusOrders === 7 && fetchOrders()}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate(NAVIGATION_SCREEN.OrderDetail, {
                _id: item._id,
                currency_symbol: configuration.currency_symbol,
              })
            }
          >
            <View style={styles.subContainer}>
              <View style={styles.imgContainer}>
                <EnategaImage
                  imgStyle={styles.imgResponsive}
                  source={{ uri: item.items[0].food.img_url }}
                  spinnerProps={{ style: styles.loadingView }}
                />
              </View>
              <View style={styles.infoContainer}>
                <TextDefault H5 bold style={alignment.MBxSmall}>
                  {i18n.t("idVar")}
                  {item.order_id}
                </TextDefault>
                <TextDefault line={3} textColor={colors.tagColor} H5 medium>
                  {configuration.currency_symbol}
                  {item.order_amount}
                  {/* {item.order_status === 'PENDING'
                  ? "We're asking the restaurant how long it will take to deliver your food."
                  : 'The restaurant rider will be at your place around.'} */}
                </TextDefault>
              </View>
              <View style={styles.Vline} />
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => onReOrder({ order: item, client })}
                style={styles.subContainerRight}
              >
                <View>
                  <View style={{ alignSelf: "center" }}>
                    <CustomIcon
                      name={ICONS_NAME.Refresh}
                      size={scale(28)}
                      color={colors.text}
                    />
                  </View>
                  <TextDefault
                    textColor={colors.text}
                    style={alignment.MTxSmall}
                    bold
                    center
                  >
                    {"Re-Order"}
                  </TextDefault>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={fetchMoreOrdersFunc}
      />
    </WrapperView>
  );
}

export default MyOrders;
