import { render } from "@testing-library/react"
import "@testing-library/jest-dom"
import HomeContent from "../src/components/HomeContent"

describe("<HomeContent />", () => {

    const { getByTestId } = render(<HomeContent users={[]} />);

    const userSelect = getByTestId("user-select");
    const postBtn = getByTestId("post-btn");
    const postTitle = getByTestId("post-title");
    const postBody = getByTestId("post-body");
    it("should render elements", () => {


        // check elements renders or not
        expect(userSelect).toBeInTheDocument();
        expect(postTitle).toBeInTheDocument();
        expect(postBody).toBeInTheDocument();
        expect(postBtn).toBeInTheDocument();
    })

})