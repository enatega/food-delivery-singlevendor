import { useTheme } from "@react-navigation/native";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";
import i18n from "../../../../i18n";
import RadioButton from "../../../components/FdRadioBtn/RadioBtn";
import { alignment } from "../../../utils/alignment";
import { ICONS_NAME } from "../../../utils/constant";
import { scale } from "../../../utils/scaling";
import { CustomIcon } from "../../CustomIcon";
import TextDefault from "../../Text/TextDefault/TextDefault";
import useStyles from "./styles";

function PaymentModal(props) {
  const styles = useStyles();
  const { colors } = useTheme();
  const [selectedPayment, setSelectedPayment] = useState(
    props.payment ?? {},
    {}
  );

  const CASH = [
    {
      payment: "STRIPE",
      label: i18n.t("creditCart"),
      index: 0,
      icon: ICONS_NAME.Visa,
      iconSize: scale(30),
    },
    {
      payment: "PAYPAL",
      label: i18n.t("paypal"),
      index: 1,
      icon: ICONS_NAME.Paypal,
      iconSize: scale(30),
    },
    {
      payment: "COD",
      label: i18n.t("cod"),
      index: 2,
      icon: ICONS_NAME.Cash,
      iconSize: scale(25),
    },
  ];

  function onSelectPayment(payment) {
    setSelectedPayment(payment);
    props.paymentChange(payment);
  }

  return (
    <View style={styles.flex}>
      <TextDefault
        H4
        bold
        style={[
          alignment.MTlarge,
          alignment.PTmedium,
          alignment.MBlarge,
          alignment.PBxSmall,
        ]}
      >
        {`(${i18n.t("Change Payment Method")})`}
      </TextDefault>
      {CASH.map((item, index) => (
        <View key={index.toString()} style={styles.width100}>
          <TouchableOpacity
            style={[styles.radioGroup]}
            key={index.toString()}
            onPress={() => {
              onSelectPayment(item);
            }}
          >
            <View style={[alignment.MRxSmall, styles.iconContainer]}>
              <CustomIcon
                name={item.icon}
                size={item.iconSize}
                color={colors.iconColorPrimary}
              />
            </View>

            <TextDefault numberOfLines={1} style={styles.flex}>
              {item.label}
            </TextDefault>
            <View style={styles.radioContainer}>
              <RadioButton
                animation={"bounceIn"}
                outerColor={colors.radioOuterColor}
                size={11}
                innerColor={colors.radioColor}
                isSelected={selectedPayment.index === item.index}
                onPress={() => {
                  onSelectPayment(item);
                }}
              />
            </View>
          </TouchableOpacity>
          <View key={`2${index.toString()}`} style={styles.horizontalLine} />
        </View>
      ))}
      <TouchableOpacity style={[styles.button]} onPress={props.onClose}>
        <TextDefault H5 bold textColor={colors.lightBackground}>
          {`(${i18n.t("Done")})`}
        </TextDefault>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={props.onClose}
        style={[styles.width100, alignment.PBlarge, alignment.PTlarge]}
      >
        <TextDefault>{`(${i18n.t("Cancel")})`}</TextDefault>
      </TouchableOpacity>
    </View>
  );
}

PaymentModal.propTypes = {
  payment: PropTypes.object,
  paymentChange: PropTypes.func,
  onClose: PropTypes.func,
};
export default PaymentModal;
