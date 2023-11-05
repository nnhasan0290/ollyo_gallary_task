import "./CustomCheckMark.css"

const CustomCheckMark = ({checked, onChange, id}:any) => {
  return (
    <label className="Custom__checkLabel">
      <input checked={checked} onChange={onChange} type="checkbox" value={id}/>
      <span className="checkmark"></span>
    </label>
  );
};

export default CustomCheckMark;
