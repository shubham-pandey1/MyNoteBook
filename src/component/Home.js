import React from "react";
import Notes from "./Notes";


const Home = (props) => {
    const {showAlert} = props;
    return (
        <div className="container mx-5 my-2">
            <Notes showAlert={showAlert}/>
        </div>
    )
}
export default Home;