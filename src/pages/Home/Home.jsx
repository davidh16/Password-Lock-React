import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Axios from "axios";
import Entity from "../../components/Entity/Entity.jsx";

function Home(){


    const [entities, setEntities] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        Axios.get("http://localhost:8085/entity/list", {withCredentials: true})
            .then((response) => {
                const jsonObject = JSON.parse(response.data);
                setEntities(jsonObject.entities);
            })
            .catch((error) => {
                console.log("evo ga", JSON.stringify(error));
            });
    }, []);

    return(
        <>
            {entities && (
                <div>
                    {entities.map((entity, index) => (
                        <Entity
                            key={entity.uuid}
                            name={entity.name}
                            iconPath={entity.icon_path}
                            password={entity.password}
                            emailAddress={entity.email_address}
                            username={entity.username}
                            description={entity.description}
                        />
                    ))}
                </div>
            )}
        </>

    )
}

export default Home