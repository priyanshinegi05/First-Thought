import { Routes, Route } from "react-router-dom";
import { AuthRoutes } from "../features/auth";
import { ProtectedRoute } from "./ProtectedRoute";
import { PostRoutes } from "../features/posts";
import { UserRoutes } from "../features/users";
import Home from "../features/misc/routes/Home";
import About from "../features/misc/routes/About";
import Privacy from "../features/misc/routes/Privacy";
import Terms from "../features/misc/routes/Terms";
import Unsubscribe from "../features/misc/routes/Unsubscribe";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/auth/*" element={<AuthRoutes />} />
            <Route path="/newsletter/unsubscribe" element={<Unsubscribe />} />

            <Route path="/" element={<ProtectedRoute />}>
                <Route index element={<Home />} />
                <Route path="posts/*" element={<PostRoutes />} />
                <Route path="users/*" element={<UserRoutes />} />
                <Route path="about" element={<About />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="terms" element={<Terms />} />
            </Route>
        </Routes>
    );
};
