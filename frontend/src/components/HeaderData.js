import React from "react"

// importing material ui icons
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import CheckBoxIcon from "@material-ui/icons/CheckBox"
import EventAvailableIcon from "@material-ui/icons/EventAvailable"
import EventBusyIcon from "@material-ui/icons/EventBusy"
import PageviewIcon from "@material-ui/icons/Pageview"
import ExploreIcon from "@material-ui/icons/Explore"
import TimerIcon from "@material-ui/icons/Timer"
import ViewListIcon from "@material-ui/icons/ViewList"
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered"
import WarningIcon from "@material-ui/icons/Warning"
import SendIcon from "@material-ui/icons/Send"

export const HeaderData = [
  {
    // link represents where it should redirect to
    title: "Item Waiting List",
    icon: <TimerIcon />,
    link: "/itwt/wlist",
  },

  {
    title: "Add New Item",
    icon: <AddCircleOutlineIcon />,
    link: "/item/addstk",
  },

  {
    title: "Inventory List",
    icon: <ViewListIcon />,
    link: "/item/vinventory",
  },

  {
    title: "All Item List",
    icon: <FormatListNumberedIcon />,
    link: "/stockmanagement/viewinventory",
  },

  {
    title: "Low Quantity List",
    icon: <WarningIcon />,
    link: "/stockmanagement/viewinventory",
  },

  {
    title: "Locatioin Map",
    icon: <ExploreIcon />,
    link: "/stockmanagement/viewinventory",
  },
  {
    title: "Dispatch Request List",
    icon: <SendIcon />,
    link: "/stockmanagement/viewinventory   ",
  },
]
