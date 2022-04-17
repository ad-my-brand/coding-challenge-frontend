const Dropdown = ({ options, set }) => {
  return (
    <div>
      <select
        name="selectList"
        className="form-control w-50"
        id="selectList"
        onChange={(e) => {
          set(e.target.value);
        }}
      >
         <option value={-1}>select one user</option> 
        {options.map((m, i) => (
          <>
            <option value={i}>{m.name}</option>
          </>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
