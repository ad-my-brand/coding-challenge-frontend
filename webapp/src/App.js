import "./App.css";
import React, { Suspense } from "react";
import { Switch, BrowserRouter, Route } from "react-router-dom";
import styled from "styled-components";
import theme from "./utilities/theme";

//Import the Lazy components.
const LoginPage = React.lazy(() => import("./Pages/Login"));

const Wrapper = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: ${theme.colors.primary};
`;
const Layout = styled.div`
	width: 60%;
	min-height: 100vh;
	background-color: ${theme.colors.white};
	padding: 1rem 2rem;

	@media screen and (max-width:${theme.breakPoints.tablet}) {
		width: 80%;
	}

	@media screen and (max-width:${theme.breakPoints.mobile}) {
		width: 100%;
	}
`;

function App() {
  return (
    <div className="App">
      <BrowserRouter>
    	<Wrapper>
          <Layout>
            <Suspense fallback={() => <h1>Loading ...</h1>}>
              <Switch>
                <Route path="/" component={LoginPage} />
              </Switch>
            </Suspense>
          </Layout>
        </Wrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
