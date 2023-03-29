import { useNavigation, useTheme } from "@react-navigation/native";
import React, { useContext } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import ConfigurationContext from "../../../context/Configuration";
import UserContext from "../../../context/User";
import { alignment } from "../../../utils/alignment";
import { NAVIGATION_SCREEN } from "../../../utils/constant";
import Spinner from "../../Spinner/Spinner";
import TextDefault from "../../Text/TextDefault/TextDefault";
import TextError from "../../Text/TextError/TextError";
import useStyle from "./styles";

export const orderStatuses = [
  {
    key: "PENDING",
    status: 1,
    statusText: "Your order is still pending.",
  },
  {
    key: "ACCEPTED",
    status: 2,
    statusText: "Restaurant is preparing Food.",
  },
  {
    key: "PICKED",
    status: 3,
    statusText: "Rider is on the way.",
  },
  {
    key: "DELIVERED",
    status: 4,
    statusText: "Order is delivered.",
  },
  {
    key: "COMPLETED",
    status: 5,
    statusText: "Order is completed.",
  },
];

const orderStatusActive = ["PENDING", "PICKED", "ACCEPTED"];

const StatusCard = () => {
  const { colors } = useTheme();
  const styles = useStyle();
  const navigation = useNavigation();
  const {
    loadingOrders,
    errorOrders,
    orders,
    networkStatusOrders,
    fetchOrders,
  } = useContext(UserContext);
  const configuration = useContext(ConfigurationContext);

  const checkStatus = (status) => {
    const obj = orderStatuses.filter((x) => {
      return x.key === status;
    });
    return obj[0];
  };

  if (loadingOrders) return <Spinner />;
  if (errorOrders) return <TextError>{errorOrders.message}</TextError>;

  return (
    <FlatList
      contentContainerStyle={styles.mainContainer}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      horizontal={true}
      refreshing={networkStatusOrders === 4}
      onRefresh={() => networkStatusOrders === 7 && fetchOrders()}
      data={orders.filter((o) => orderStatusActive.includes(o.order_status))}
      //keyExtractor={(item) => item._id}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{ flex: 1, paddingHorizontal: 10 }}
          onPress={() =>
            navigation.navigate(NAVIGATION_SCREEN.OrderDetail, {
              _id: item._id,
              currency_symbol: configuration.currency_symbol,
            })
          }
        >
          <View key={index} style={styles.statusContainer}>
            <View style={styles.textContainer}>
              <TextDefault H5 medium textColor={styles.lightText.color}>
                Your order ID
              </TextDefault>
              <TextDefault style={{ ...alignment.PBlarge }} H4 bolder>
                {item.order_id}
              </TextDefault>
              <TextDefault H5 textColor={colors.placeHolderColor} medium>
                Status
              </TextDefault>

              <TextDefault textColor={"#00b9c6"} H5 medium>
                {item.order_status}{" "}
                <TextDefault numberOfLines={2} medium>
                  {/* {checkStatus(item.order_status).status}.{' '} */}(
                  {checkStatus(item.order_status).statusText})
                </TextDefault>
              </TextDefault>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default StatusCard;
