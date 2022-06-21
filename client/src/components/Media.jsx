import Container from 'react-bootstrap/esm/Container';
import React from "react";
import MediaFilm from "./MediaFilm"
import MediaSelector from "./MediaSelector"

export default function Media() {

    return (
        <Container>
            <MediaSelector />
            <hr />
            <MediaFilm />
            <hr />
        </Container>
    )

}