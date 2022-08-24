import React, { useEffect, useRef, useCallback, useState } from "react";
import { Grid, makeStyles, Typography, Card } from "@material-ui/core";
import NavigationIcon from "@mui/icons-material/Navigation";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishesFilterController } from "../../Redux/FilterApi/PublishesAction";
import { addItem } from "../../Redux/FilterControlData/checkBoxControlAction";
import { removeItem } from "../../Redux/FilterControlData/checkBoxControlAction";
import { allSelected } from "../../Redux/FilterControlData/checkBoxControlAction";
import { removeAll } from "../../Redux/FilterControlData/checkBoxControlAction";
const useStyles = makeStyles((theme) => ({
  headerStyle: {
    color: "rgb(147, 118, 0)",
    textAlign: "right",
    marginTop: theme.spacing(4),
  },
  iconStyle: {
    marginRight: theme.spacing(4),
    transform: "rotate(90deg)",
  },
  groupbtnContainer: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  linkStyle: {
    color: "rgb(147, 118, 0)",
    textDecoration: "none",
  },
  ckeckBoxItem: {
    textAlign: "right",
    marginRight: theme.spacing(15),
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
  },
  checkBoxLabelContainer: {
    display: "block",
    position: "relative",
    paddingLeft: "35px",
    marginBottom: "12px",
    cursor: "pointer",
    fontSize: "22px",
    color: "rgb(147,118,0)",
    fontWeight: "bold",
  },
  inputCheckBox: {
    marginRight: theme.spacing(5),
    opacity: "0",
    cursor: "pointer",
    height: "0",
    width: "0",
    "&:checked~$checkmark": {
      background: "rgb(147,118,0)",
    },
  },
  checkmark: {
    display: "inline-block",
    height: "20px",
    width: "30px",
    backgroundColor: "rgb(232,232,166)",
    borderRadius: "40%",
    verticalAlign: "baseline",
    border: "2px solid rgb(147, 118, 0)",
    "&:hover": {
      background: "#ccc",
    },
  },
  checkBoxStyle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  sortStyle: {
    marginTop: theme.spacing(3),
    marginRight: theme.spacing(4),
    marginLeft: theme.spacing(4),
    marginBottom: theme.spacing(3),
    "&:hover": {
      cursor: "pointer",
    },
  },
  sort: {
    marginTop: "auto",
    marginBottom: "auto",
    background: "rgb(147, 118, 0)",
    color: "rgb(232,232,166)",
    padding: theme.spacing(4),
  },
  sortIcone: {
    marginLeft: theme.spacing(3),
    transform: "rotate(-90deg)",
  },
  parageraphStyle: {
    fontSize: "25px",
    marginRight: "auto",
    marginLeft: "auto",
  },
  sortContainer: {
    borderRadius: "50px",
  },
}));
const Publishes = () => {
  const selectedPubs = useSelector((state) => state.checkBoxState);
  const items = useRef([]);
  const dispatch = useDispatch();
  const publishes = useSelector((state) => state.userPublishes);
  const navigate = useNavigate();
  const classes = useStyles();
  const sortItem = useSelector((state) => state.sortState);
  useEffect(() => {
    dispatch(
      fetchPublishesFilterController(
        341393410,
        selectedPubs.gradeFilter.items.length === 0
          ? -1
          : selectedPubs.gradeFilter.items.join("."),
        selectedPubs.majorFilter.items.length === 0
          ? -1
          : selectedPubs.majorFilter.items.join("."),
        selectedPubs.pubFilter.items.length === 0
          ? -1
          : selectedPubs.pubFilter.items.join("."),
        sortItem.empty || sortItem.item.val === "-1" ? 1 : sortItem.item.val
      )
    );
  }, []);

  const { pubs_options } = publishes?.result;
  useEffect(() => {
    items.current = pubs_options?.map((el) => el.is_selected);
  }, [publishes]);
  const changeHandler = useCallback(
    (pos, arr) => {
      dispatch(removeAll("pubFilter"));
      const updatedCheckBox =
        items.current.length > 0 &&
        items.current.map((el, index) => (pos === index ? !el : el));
      updatedCheckBox.length > 0 &&
        updatedCheckBox.forEach((el, index) => {
          el
            ? dispatch(addItem(arr[index].id, "pubFilter"))
            : dispatch(removeItem(arr[index].id, "pubFilter"));
        });
      if (selectedPubs["pubFilter"]?.items.length === updatedCheckBox.lenght)
        dispatch(allSelected("pubFilter"));
      items.current = [...updatedCheckBox];
    },
    [dispatch]
  );
  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.headerContainer} xs={12} container>
        <Grid item xs={6} className={classes.headerStyle}>
          <Typography style={{ fontFamily: "IRANSans" }} variant="h4">
            کتاب ها
          </Typography>
        </Grid>
        <Grid item xs={6} className={classes.headerStyle}>
          <NavigationIcon className={classes.iconStyle} />
        </Grid>
      </Grid>
      <Grid item xs={12} className={classes.groupbtnContainer}>
        <ToggleButtonGroup exclusive style={{ width: "35vw", height: "10vh" }}>
          <ToggleButton
            value="grade"
            style={{
              width: "33%",
              color: "rgb(147, 118, 0)",
              fontWeight: "bold",
              border: "4px solid rgb(147, 118, 0)",
              borderRadius: "50px 0 0 50px",
            }}
          >
            <Link
              to="/books/grade"
              style={{ fontFamily: "IRANSans" }}
              className={classes.linkStyle}
            >
              پایه(
              {selectedPubs.gradeFilter.allSelected
                ? "همه"
                : selectedPubs.gradeFilter.items.length}
              )
            </Link>
          </ToggleButton>
          <ToggleButton
            value="major"
            style={{
              width: "33%",
              fontWeight: "bold",
              border: "4px solid rgb(147, 118, 0)",
            }}
          >
            <Link
              to="/books/major"
              style={{ fontFamily: "IRANSans" }}
              className={classes.linkStyle}
            >
              رشته (
              {selectedPubs.majorFilter.allSelected
                ? "همه"
                : selectedPubs.majorFilter.items.length}
              )
            </Link>
          </ToggleButton>
          <ToggleButton
            value="publishes"
            style={{
              width: "33%",
              color: "rgb(147, 118, 0)",
              fontWeight: "bold",
              border: "4px solid rgb(147, 118, 0)",
              borderRadius: "0 50px 50px 0",
              background: "rgb(147,118,0)",
            }}
          >
            <Link
              to="/books/publishes"
              style={{
                color: "rgb(232, 232, 166)",
                fontFamily: "IRANSans",
                textDecoration: "none",
              }}
            >
              تغییر انتشارات
            </Link>
          </ToggleButton>
        </ToggleButtonGroup>
      </Grid>
      <Grid item xs={12} container className={classes.checkBoxContainer}>
        {pubs_options &&
          pubs_options.map((el, index) => (
            <Grid item xs={12} className={classes.ckeckBoxItem} key={el.id}>
              {items.current && items.current.length > 0 && (
                <>
                  <label className={classes.checkBoxLabelContainer}>
                    {el.name}
                    <input
                      type="checkbox"
                      checked={items.current[index]}
                      className={classes.inputCheckBox}
                      onChange={() => changeHandler(index, pubs_options)}
                      value={el.id}
                    />
                    <div className={classes.checkmark}></div>
                  </label>
                </>
              )}
            </Grid>
          ))}
      </Grid>
      <Grid item xs={12} className={classes.sortStyle}>
        <Card
          className={classes.sortContainer}
          onClick={() => navigate("/books", { replace: true })}
        >
          <Grid className={classes.sort} container>
            <NavigationIcon className={classes.sortIcone} />

            <Typography
              style={{ fontFamily: "IRANSans" }}
              variant="body2"
              className={classes.parageraphStyle}
            >
              ذخیره و بازگشت
            </Typography>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Publishes;
