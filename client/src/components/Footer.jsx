import React from "react";


function Footer (props) {
    const date = new Date()

    return <p className="footer">©Callum McNeil {date.getFullYear()}</p>
}

export default Footer;