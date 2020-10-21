const { Router } = require("react-router-dom")

const AppRouter = () => {
    return(
        <Router>
            <Switch>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}

export default AppRouter