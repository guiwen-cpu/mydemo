import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PersonIcon from "@material-ui/icons/Person";
import HouseOutlinedIcon from "@material-ui/icons/HouseOutlined";
import ExploreRoundedIcon from "@material-ui/icons/ExploreRounded";
import LocalGroceryStoreRoundedIcon from "@material-ui/icons/LocalGroceryStoreRounded";

import "./style.css";

const useStyles = makeStyles({
  root: {
    width: "100%",
    position: "fixed",
    left: 0,
    bottom: 0,
    "&:selected": {
      color: "orange"
    }
  }
});

 export default function LabelBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = useState("/home");
  let history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`${newValue}`);
  };
  // useEffect(() => {
  //   history.push("/home");
  // });

  return (
    <div>
      <BottomNavigation
        value={value}
        onChange={handleChange}
        className={classes.root}
        showLabels
      >

        <BottomNavigationAction
          label="首页"
          value="/home"
          icon={<HouseOutlinedIcon />}
        />
        <BottomNavigationAction
          label="发现"
          value="/discover"
          icon={<ExploreRoundedIcon />}
        />
        <BottomNavigationAction
          label="订单"
          value="/buycar"
          icon={<LocalGroceryStoreRoundedIcon />}
        />
        
        <BottomNavigationAction label="我的" value="/my" icon={<PersonIcon />} />
      </BottomNavigation>
      {props.idLength>0?<div className="biaoqian">{props.idLength}</div>:null}
    </div>





  );
}
