
import React from "react";
import { Container } from "react-bootstrap";
import Search from "../components/Search";
import ItemList from "../components/Itemlist";

const Results = () => {

    return (
        <Container>
            <div id="itemList">
                <Search />
                <ItemList />
            </div>
        </Container>
    );
};

export default Results;