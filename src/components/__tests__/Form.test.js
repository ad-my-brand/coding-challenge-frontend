import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from '../../reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from "redux-devtools-extension";
import Form from "../Form";

describe("Form", () => {
    const store=createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));
    it("should render the basic fields", () => {
    
      render(<Provider store={store}><Form /></Provider>);
      expect(screen.getByRole("textbox", { name: /title/i })).toBeInTheDocument();
      expect(screen.getByRole("textbox", { name: /body/i })).toBeInTheDocument();
      expect(screen.getByRole("combobox", { name: /user/i })).toBeInTheDocument();
      expect(screen.getByRole("button", { name: /POST/i })).toBeInTheDocument();
    });

  });

