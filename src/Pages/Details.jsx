import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AdoptedPetContext from "../Context/AdoptedPetContext";
import ErrorBoundary from "../Components/ErrorBoundary";
import fetchPet from "../Requests/fetchPet";
import Carousel from "../Components/Carousel";
import Modal from "../Components/Modal";

const Details = () => {
    const navigate = useNavigate();
    const [, setAdoptedPet] = useContext(AdoptedPetContext);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const results = useQuery(["details", id], fetchPet);
    /* React-Query searches for details of the id in its cache, and if it doesn't find them, it runs the fetchPet function. details and id are passed as queryKey to fetchPet */

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
            <Carousel images={pet.images} />
            <div>
                <h1>{pet.name}</h1>
                <h2>
                    {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
                    <button onClick={() => setShowModal(true)}>
                        Adopt {pet.name}
                    </button>
                    <p>{pet.description}</p>
                    {showModal ? (
                        <Modal>
                            <div>
                                <h1>Would you like to adopt {pet.name}?</h1>
                                <div className="buttons">
                                    <button
                                        onClick={() => {
                                            setAdoptedPet(pet);
                                            navigate("/");
                                        }}
                                    >
                                        Yes
                                    </button>
                                    <button onClick={() => setShowModal(false)}>
                                        No
                                    </button>
                                </div>
                            </div>
                        </Modal>
                    ) : null}
                </h2>
            </div>
        </div>
    );
};

function DetailsErrorBoundary() {
    return (
        <ErrorBoundary>
            <Details />
        </ErrorBoundary>
    );
}

export default DetailsErrorBoundary;
