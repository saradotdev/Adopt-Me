import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
    state = {
        hasError: false,
    };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        // Typically you would log this to TrackJS or New Relic (error tracking softwares)
        console.error("ErrorBoundary component caught an error", error, info);
    }

    render() {
        if (this.state.hasError) {
            return (
                <h2>
                    There was an error with this listing.
                    <Link to="/">Click here to go back to the homepage.</Link>
                </h2>
            );
        }

        return this.props.children; // if there's no error, then safely display the child components inside ErrorBoundary
    }
}

export default ErrorBoundary;
