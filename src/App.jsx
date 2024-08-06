import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchParams from "./SearchParams";
import Details from "./Details";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: Infinity,
            cacheTime: Infinity,
        },
    },
});

const App = () => {
    return (
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <header>
                    <Link to="/">Adopt Me!</Link>
                </header>

                <Routes>
                    <Route path="/" element={<SearchParams />} />
                    <Route path="/details/:id" element={<Details />} />
                </Routes>
            </QueryClientProvider>
        </BrowserRouter>
    );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

// If you don't use JSX:

// import React from "react";

// const App = () => {
//     return React.createElement("div", {}, [
//         React.createElement("h1", {}, "Adopt Me!"),
//         React.createElement(Pet, {
//             name: "Luna",
//             animal: "Dog",
//             breed: "Havanese",
//         }),
//         React.createElement(Pet, {
//             name: "Roomie",
//             animal: "Cat",
//             breed: "Persian",
//         }),
//         React.createElement(Pet, {
//             name: "Maggie",
//             animal: "Bird",
//             breed: "Cockatiel",
//         }),
//     ]);
// };

// root.render(React.createElement(App));
