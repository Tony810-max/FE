import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PageRoutes } from "./routes";
import MainLayout from "./layouts/MainLayout";
import { Fragment } from "react";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {PageRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = MainLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }
                        return <Route key={index} path={route.path} element={
                            <Layout>
                                <Page />
                            </Layout>}
                        />
                    })}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
