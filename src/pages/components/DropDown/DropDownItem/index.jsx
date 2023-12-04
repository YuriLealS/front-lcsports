import { Link } from "react-router-dom";

import "./dropDownItem.css";

const DropDownItem = ({ item }) => {
  return (
    <li className="dropdownItem">
      <img src={item.imageProfile} alt={item.text} />
      <Link to={item.path} onClick={item?.onClick ? item.onClick : null}>
        {item.text}
      </Link>
    </li>
  );
};

export default DropDownItem;
