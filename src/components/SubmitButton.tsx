import Spinner from "./Spinner";

function SubmitButton({ loading = false }: { loading: boolean }) {
  return (
    <button type="submit" className="btn btn-primary" disabled={loading}>
      {loading && <Spinner />}
      Submit
    </button>
  );
}

export default SubmitButton;
