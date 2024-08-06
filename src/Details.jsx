import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";

const Details = () => {
    const { id } = useParams();
    const results = useQuery(["details", id], fetchPet);
    /* React Query searches for details of the id in its cache, and if it doesn't find them, it runs the fetchPet function. details and id are passed as queryKey to fetchPet */

    if (results.isLoading) {
        return (
            <div className="loading-pane">
                <h2 className="loader">⏳</h2>
            </div>
        );
    }

    const pet = results.data.pets[0]; // the fetched data has a "pets" key

    return (
        <div className="details">
            <div>
                <h1>{pet.name}</h1>
                <h2>
                    {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
                </h2>
                <button>Adopt {pet.name}</button>
                <p>{pet.description}</p>
            </div>
        </div>
    );
};

export default Details;
