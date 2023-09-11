/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, LinearProgress, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { categories } from "../../apollo/graphQL";
import { RestaurantRow, SearchContainer, Footer, PaymentModal, FilterModal } from "../../components";
import useFilterModal from "../../hooks/useFilterModal";

const CATEGORIES = gql`
  ${categories}
`;

function Home() {
  const { data, loading} = useQuery(CATEGORIES);
  const {isOpen, toggleModal} = useFilterModal()  

  const sections = [
    {
      _id: "601e9657cf8e2913cb91088b",
      name: "Featured",
    },
    {
      _id: "601e96f0cf8e2913cb9108f6",
      name: "Hot Items",
    },
  ];

  const restaurantSections = sections.map((sec) => ({
    ...sec,
    ...data
  }));

  return (
    <Grid container>
      {<FilterModal isOpen={isOpen} toggleModal={toggleModal}/>}
      <Grid container item>
        <SearchContainer showSearch toggleModal={toggleModal}/>
      </Grid>
      <Grid container item>
        {loading ? (
          <div style={{ width: "100%" }}>
            <LinearProgress color="primary" />
          </div>
        ) : (
          // <Typography>Hello</Typography>
          <RestaurantRow restaurantSections={restaurantSections} />
        )}
      </Grid>
      <Footer />
    </Grid>
  );
}

export default Home;
