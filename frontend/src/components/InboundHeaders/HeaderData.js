import React from 'react';

// importing material ui icons
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import PageviewIcon from '@material-ui/icons/Pageview';
import HomeIcon from '@material-ui/icons/Home';

export const  HeaderData =  [ 
    {
        title: "Home",
        icon:<HomeIcon/>,
        link:"/supplier/supplierprofile"

    },
    {
        // link represents where it should redirect to
        title: "View Inbound",
        icon:<PageviewIcon/>,
        link:"/inbound/view"

    },
   
    {
        title: "Add to Inbound",
       icon:<AddCircleOutlineIcon/>,
        link:"/inbound/add"

    },
    {
        title: "Quality Passed",
        icon:<EventAvailableIcon/>,
        link:"/inbound/qualitypassed"

    },
    {
        title: "Quality Failed",
        icon:<EventBusyIcon/>,
        link:"/inbound/qualityfailed"

    },
   


];


  