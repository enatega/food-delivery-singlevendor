import { useMutation, useQuery } from "@apollo/react-hooks";
import { useNavigation, useRoute } from "@react-navigation/native";
import gql from "graphql-tag";
import React, { useContext, useLayoutEffect } from "react";
import {
  Image,
  Linking,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { assignOrder, updateOrderStatusRider } from "../../apollo/mutations";
import { assignedOrders, configuration } from "../../apollo/queries";
import { MainWrapper, Spinner, TextDefault, TextError } from "../../components";
import { FlashMessage } from "../../components//FlashMessage/FlashMessage";
import UserContext from "../../context/user";
import { alignment } from "../../utilities/alignment";
import colors from "../../utilities/colors";
import { linkToMapsApp } from "../../utilities/links";
import { scale } from "../../utilities/scaling";
import styles from "./styles";
import i18n from "../../../i18n";

const CONFIGURATION = gql`
  ${configuration}
`;
const UPDATE_ORDER_STATUS = gql`
  ${updateOrderStatusRider}
`;
const ASSIGN_ORDER = gql`
  ${assignOrder}
`;
const ORDERS = gql`
  ${assignedOrders}
`;
const LATITUDE_DELTA = 0.0022;
const LONGITUDE_DELTA = 0.0021;

function OrderDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const {
    unAssignedOrders,
    assignedOrders,
    loadingAssigned,
    loadingUnAssigned,
  } = useContext(UserContext);

  // const [selectedOrder, setOrder] = useState(selectedOrder)
  const selectedOrder =
    unAssignedOrders.find((o) => o._id === route.params?.id) ||
    assignedOrders.find((o) => o._id === route.params?.id) ||
    null;
  const { data, loading: loadingConfig, error: errorConfig } = useQuery(
    CONFIGURATION
  );
  const [mutate, { loading: loadingMutation }] = useMutation(
    UPDATE_ORDER_STATUS,
    {
      onCompleted,
      onError,
      refetchQueries: [{ query: ORDERS }],
    }
  );
  const [mutateAssignOrder, { loading }] = useMutation(ASSIGN_ORDER, {
    onCompleted,
    onError,
  });

  useLayoutEffect(() => {
    if (!selectedOrder) return;
    navigation.setOptions({
      title: `${i18n.t('Order')} ${selectedOrder.order_id}`,
    });
  }, [selectedOrder]);
  async function onCompleted({ updateOrderStatusRider, assignOrder }) {
    if (updateOrderStatusRider) {
      FlashMessage({
        message: `${i18n.t('OrderMarkedAs')} ${i18n.t(updateOrderStatusRider.order_status)}`,
      });
      if (updateOrderStatusRider.order_status === "DELIVERED") {
        navigation.goBack();
        return;
      }
      // setOrder({ ...order, order_status: updateOrderStatusRider.order_status })
    }
    if (assignOrder) {
      // setOrder({ ...order, ...assignOrder })
    }
  }

  function onError({ graphQLErrors, networkError }) {
    let message = "Unknown error occured";
    if (networkError) message = "Internal Server Error";
    if (graphQLErrors) message = graphQLErrors.map((o) => o.message).join(", ");

    FlashMessage({
      message: message,
    });
  }

  function getAddons(addons, currencySymbol) {
    return addons.map((addon, index) => {
      return addon.options.map((option, indexOption) => (
        <View key={`${index}${indexOption}`} style={[styles.orderContent]}>
          <View style={[styles.orderSubContent]}>
            <View style={styles.orderTextLeftContainer}></View>
            <View style={styles.orderTextCenterContainer}>
              <TextDefault
                bolder
                style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
              >
                {addon.title}:{option.title}
              </TextDefault>
            </View>
            <View style={styles.orderTextRightContainer}>
              <TextDefault
                textColor={colors.placeHolderColor}
                bolder
                style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
              >
                {currencySymbol}
                {option.price.toFixed(2)}
              </TextDefault>
            </View>
          </View>
        </View>
      ));
    });
  }

  function getOrderItems(items, currencySymbol) {
    return items.map((item, index) => {
      return (
        <View key={index}>
          <View style={styles.orderContent}>
            <View style={styles.orderSubContent}>
              <View style={styles.orderTextLeftContainer}>
                <TextDefault
                  textColor={colors.fontMainColor}
                  bolder
                  style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
                >
                  {item.quantity}x
                </TextDefault>
              </View>
              <View style={styles.orderTextCenterContainer}>
                <TextDefault
                  bolder
                  style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
                >
                  {item.food.title}({item.variation.title})
                </TextDefault>
              </View>
              <View style={styles.orderTextRightContainer}>
                <TextDefault
                  numberOfLines={1}
                  textColor={colors.placeHolderColor}
                  bolder
                  style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
                >
                  {currencySymbol}
                  {(item.variation.price * item.quantity).toFixed(2)}
                </TextDefault>
              </View>
            </View>
          </View>
          {!item.addons ? null : getAddons(item.addons, currencySymbol)}
        </View>
      );
    });
  }

  if (loadingAssigned || loadingUnAssigned) {
    return <TextError text={i18n.t('Loadingorders')} />;
  }
  if (loadingConfig) {
    return <Spinner />;
  }
  if (errorConfig) {
    return <TextError text={i18n.t('Somethingisworng')} />;
  }
  if (!selectedOrder) {
    return (
      <TextError text={i18n.t('Orderassginedtootherrider')} />
    );
  }

  return (
    <MainWrapper>
      <ScrollView
        style={styles.flex}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.customerCard}>
          <View style={styles.customerSubCard}>
            <View style={styles.customerHeader}>
              <TextDefault
                H3
                bolder
                textColor={colors.tagColor}
                style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
              >
                {i18n.t('CustomerDetails')}
              </TextDefault>
            </View>
            <View style={styles.customerContent}>
              <View style={styles.customerSubContent}>
                <View style={styles.customerContentRow}>
                  <View style={styles.customerTextContainer}>
                    <TextDefault
                      bolder
                      textColor={colors.placeHolderColor}
                      style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
                    >
                      {i18n.t('name')}
                    </TextDefault>
                    <TextDefault bolder style={{ ...alignment.PBxSmall }}>
                      {selectedOrder.user.name}
                    </TextDefault>
                  </View>
                </View>
                <View style={styles.customerContentRow}>
                  <View style={styles.customerTextContainer}>
                    <TextDefault
                      bolder
                      textColor={colors.placeHolderColor}
                      style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
                    >
                      {i18n.t('Contact')}
                    </TextDefault>
                    <TextDefault bolder style={{ ...alignment.PBxSmall }}>
                      {selectedOrder.user.phone}
                    </TextDefault>
                  </View>
                </View>
                <View style={styles.customerContentRow}>
                  <View style={styles.customerAddContainer}>
                    <TextDefault
                      bolder
                      textColor={colors.placeHolderColor}
                      style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
                    >
                      {i18n.t('DelvieryLocation')}
                    </TextDefault>
                    <TextDefault
                      numberOfLines={2}
                      bolder
                      style={{ ...alignment.PBxSmall }}
                    >
                      {`${selectedOrder.delivery_address.delivery_address}`}
                    </TextDefault>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.orderContainer}>
          <View style={styles.orderSubContainer}>
            <View style={styles.orderHeader}>
              <TextDefault
                H3
                bolder
                textColor={colors.tagColor}
                style={{ ...alignment.PTmedium }}
              >
                {i18n.t('OrderDetails')}
              </TextDefault>
            </View>
            <View style={styles.orderSpacer} />
            {getOrderItems(
              selectedOrder.items,
              data.configuration.currency_symbol
            )}

            <View style={styles.orderSpacer} />
            <View style={styles.orderRow}>
              <View style={styles.orderSubRow}>
                <View style={styles.orderTextLeft}>
                  <TextDefault
                    textColor={colors.placeHolderColor}
                    bolder
                    style={{ ...alignment.PTmedium, ...alignment.PLmedium }}
                  >
                    {i18n.t('Subtotal')}
                  </TextDefault>
                </View>
                <View style={styles.orderTextRight}>
                  <TextDefault
                    numberOfLines={1}
                    textColor={colors.placeHolderColor}
                    bolder
                    style={{ ...alignment.PTxSmall, ...alignment.PTmedium }}
                  >
                    {data.configuration.currency_symbol}
                    {(
                      selectedOrder.order_amount -
                      selectedOrder.delivery_charges
                    ).toFixed(2)}
                  </TextDefault>
                </View>
              </View>
            </View>
            <View style={styles.orderRow2}>
              <View style={styles.orderSubRow}>
                <View style={styles.orderTextLeft}>
                  <TextDefault
                    textColor={colors.placeHolderColor}
                    bolder
                    style={{ ...alignment.PLmedium }}
                  >
                    {i18n.t('delvieryCharges')}
                  </TextDefault>
                </View>
                <View style={styles.orderTextRight}>
                  <TextDefault
                    numberOfLines={1}
                    textColor={colors.placeHolderColor}
                    bolder
                  >
                    {data.configuration.currency_symbol}
                    {selectedOrder.delivery_charges.toFixed(2)}
                  </TextDefault>
                </View>
              </View>
            </View>
            <View style={styles.line} />
            <View style={styles.orderRow}>
              <View style={styles.orderSubRow}>
                <View style={styles.orderTextLeft}>
                  <TextDefault H4 bolder>
                    {i18n.t('total')}
                  </TextDefault>
                </View>
                <View style={styles.orderTextRight}>
                  <TextDefault
                    numberOfLines={1}
                    textColor={colors.fontMainColor}
                    H4
                    bolder
                  >
                    {data.configuration.currency_symbol}
                    {selectedOrder.order_amount.toFixed(2)}
                  </TextDefault>
                </View>
              </View>
            </View>
            <View style={styles.orderSpacer}></View>
          </View>
        </View>
        <View style={styles.baseSpacer} />
        <View style={styles.mapContainer}>
          {selectedOrder.delivery_address && (
            <MapView
              style={styles.flex}
              scrollEnabled={false}
              zoomEnabled={false}
              loadingBackgroundColor={colors.tagColor}
              zoomControlEnabled={false}
              rotateEnabled={false}
              cacheEnabled={true}
              initialRegion={{
                latitude: parseFloat(selectedOrder.delivery_address.latitude),
                latitudeDelta: LATITUDE_DELTA,
                longitude: parseFloat(selectedOrder.delivery_address.longitude),
                longitudeDelta: LONGITUDE_DELTA,
              }}
              provider={PROVIDER_GOOGLE}
              onPress={() => {
                linkToMapsApp(
                  {
                    latitude: selectedOrder.delivery_address.latitude,
                    longitude: selectedOrder.delivery_address.longitude,
                  },
                  "Destination"
                );
              }}
            >
              <Marker
                title="Delivery Address"
                coordinate={{
                  latitude: parseFloat(selectedOrder.delivery_address.latitude),
                  longitude: parseFloat(
                    selectedOrder.delivery_address.longitude
                  ),
                }}
                onPress={() =>
                  Linking.openURL(
                    `google.navigation:q=${parseFloat(
                      selectedOrder.delivery_address.longitude
                    )}+${parseFloat(selectedOrder.delivery_address.longitude)}`
                  )
                }
              >
                <Image
                  source={require("../../../assets/images/ui/markerEnatega.png")}
                  style={{ width: scale(40), height: scale(40) }}
                />
              </Marker>
            </MapView>
          )}
        </View>
        <View style={styles.actionContainer}>
          {selectedOrder.order_status === "ACCEPTED" && !selectedOrder.rider && (
            <TouchableOpacity
              disabled={loading}
              style={[
                styles.cancelBtnStyle,
                { backgroundColor: colors.buttonBackground },
              ]}
              onPress={() => {
                mutateAssignOrder({ variables: { id: selectedOrder._id } });
              }}
            >
              {loading ? (
                <Spinner spinnerColor={colors.buttonText} />
              ) : (
                <TextDefault
                  textColor={colors.fontMainColor}
                  H4
                  bold
                  style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
                >
                  {i18n.t('Assigntome')}
                </TextDefault>
              )}
            </TouchableOpacity>
          )}
          {loadingMutation && <Spinner />}
          {!loadingMutation && selectedOrder.rider && (
            <View style={styles.actionSubContainer}>
              {selectedOrder.order_status === "ACCEPTED" && (
                <TouchableOpacity
                  style={[
                    styles.cancelBtnStyle,
                    { backgroundColor: colors.tagColor },
                  ]}
                  onPress={() => {
                    mutate({
                      variables: { id: selectedOrder._id, status: "PICKED" },
                    });
                  }}
                >
                  <TextDefault
                    textColor={colors.fontMainColor}
                    H4
                    bold
                    style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
                  >
                    {i18n.t('Picked')}
                  </TextDefault>
                </TouchableOpacity>
              )}
              {selectedOrder.order_status === "PICKED" && (
                <TouchableOpacity
                  style={styles.acceptBtnStyle}
                  onPress={() => {
                    mutate({
                      variables: { id: selectedOrder._id, status: "DELIVERED" },
                    });
                  }}
                >
                  <TextDefault
                    textColor={colors.fontMainColor}
                    H4
                    bold
                    style={{ ...alignment.PTxSmall, ...alignment.PBxSmall }}
                  >
                    {i18n.t('Delivered')}
                  </TextDefault>
                </TouchableOpacity>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </MainWrapper>
  );
}

export default OrderDetail;
