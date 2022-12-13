
const FormControl = ({ label, value, setValue }) => {
    return (
        <div className="px-8 py-4  rounded-md">
            <div className=" first-letter:flex flex-col mb-2">
                <label className=" text-sm font-bold my-4" htmlFor={label}>
                    {label}
                </label>
                <input
                    className=" text-sm rounded-md border-gray-300 shadow-sm focus:ring-blue-600 focus:border-blue-600"
                    style={{ width: "100%" }}
                    type="text"
                    name={label}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
            </div>
        </div>
    );
};

export default FormControl;
