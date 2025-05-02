import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div>
            <h2>Page is not found</h2>
             <p>
            <Link to="/">Go back</Link>
      </p>
        </div>
    )
}