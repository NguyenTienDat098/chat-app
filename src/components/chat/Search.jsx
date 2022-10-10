import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useMemo, useState } from "react";
import { HomeContext } from "../../pages/home/Home";
import useFireStore from "../hooks/fireStore";

function Search() {
  const HomeData = useContext(HomeContext);
  const { handleSetListUserSearch } = HomeData;
  const [valueSearch, setValueSearch] = useState("");

  const userSearchCondition = useMemo(() => {
    return {
      fieldName: "displayName",
      operator: ">=",
      compareValue: valueSearch,
    };
  }, [valueSearch]);

  const res = useFireStore("users", userSearchCondition, "displayName");
  useEffect(() => {
    handleSetListUserSearch(res);
  }, [res, handleSetListUserSearch]);

  return (
    <div className="m-2 relative">
      <FontAwesomeIcon
        icon={faSearch}
        className="absolute cursor-pointer"
        style={{ top: "50%", right: "5px", transform: "translate(-50%, -50%)" }}
      />
      <input
        value={valueSearch}
        onChange={(e) => {
          setValueSearch(e.target.value);
        }}
        type="text"
        placeholder="Search"
        className="w-full outline-none rounded-full p-2 pl-3 pr-3"
        style={{ boxShadow: "1px 2px 5px 1px rgba(0,0,0,0.3)" }}
      />
    </div>
  );
}

export default Search;
