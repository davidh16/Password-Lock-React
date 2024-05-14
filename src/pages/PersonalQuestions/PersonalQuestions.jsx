import Axios from "axios";
import {useEffect, useState} from "react";

function PersonalQuestions(){

    console.log("ne znam")

    const [questions, setQuestions] = useState()

    useEffect(() => {
        console.log("evo")
        Axios.get("http://localhost:8085/list-security-questions")
            .then((response) => {
                console.log(response.data[0]);
                setQuestions(response.data[0]["question"]);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return(
        <>
            <h1>{questions}</h1>
        </>

    )
}

export default PersonalQuestions