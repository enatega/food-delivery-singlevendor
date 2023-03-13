import { useQuery } from "@apollo/react-hooks";
import { useNavigation } from "@react-navigation/native";
import gql from "graphql-tag";
import React, { useContext, useLayoutEffect } from "react";
import { FlatList, View } from "react-native";
import { categories } from "../../apollo/server";
import EmptyFood from "../../assets/images/SVG/imageComponents/EmptyFood";
import {
  MenuCard,
  Spinner,
  StatusCard,
  TextDefault,
  TextError,
  WrapperView,
} from "../../components";
import UserContext from "../../context/User";
import { alignment } from "../../utils/alignment";
import { NAVIGATION_SCREEN } from "../../utils/constant";
import { scale } from "../../utils/scaling";
import useStyle from "./styles";

// constants
const CATEGORIES = gql`
  ${categories}
`;

function Menu() {
  const styles = useStyle();
  const navigation = useNavigation();
  const { isLoggedIn, profile } = useContext(UserContext);
  const { data, refetch, networkStatus, loading, error } = useQuery(CATEGORIES);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Home",
    });
  }, []);

  function emptyView() {
    if (loading) {
      return <Spinner />;
    } else if (error) {
      return (
        <TextError
          text={error ? error.message : "No Foods"}
          backColor="transparent"
        />
      );
    } else {
      return (
        <View style={styles.emptyContainer}>
          <EmptyFood width={scale(250)} height={scale(250)} />
          <TextDefault H4 bold style={alignment.MTlarge}>
            No item found
          </TextDefault>
        </View>
      );
    }
  }

  return (
    <WrapperView>
      <View style={[styles.flex, styles.mainContentContainer]}>
        <FlatList
          style={styles.flex}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => String(index)}
          ListEmptyComponent={emptyView()}
          data={loading ? [] : error ? [] : data.categories}
          refreshing={networkStatus === 4}
          onRefresh={() => refetch()}
          ListHeaderComponent={() => {
            if (!error && !loading) {
              return (
                <>
                  {isLoggedIn && profile && <StatusCard />}

                  <TextDefault style={alignment.Psmall} H4 medium>
                    Featured
                  </TextDefault>
                </>
              );
            }
            return null;
          }}
          renderItem={({ item }) => (
            <View key={item._id} style={styles.cardViewContainer}>
              <MenuCard
                onPress={() =>
                  navigation.navigate(NAVIGATION_SCREEN.MenuItems, {
                    ...item,
                  })
                }
                title={item.title}
                description={item.description}
                image={item.img_menu || ""}
              />
            </View>
          )}
        />
      </View>
    </WrapperView>
  );
}

export default React.memo(Menu);
