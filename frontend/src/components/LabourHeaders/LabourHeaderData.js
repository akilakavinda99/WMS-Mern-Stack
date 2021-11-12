import React from 'react';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import HomeIcon from '@material-ui/icons/Home';

export const  LabourHeaderData =  [ 
    {
        title: "Home",
        icon:<HomeIcon/>,
        link:"/supplier/supplierprofile"

    },
    {
        // link represents where it should redirect to
        title: "Add Labourers",
        icon:<PersonAddIcon/>,
        link:"/labour/add"

    },
    {
        title: "View Labourers",
        icon:<SupervisorAccountIcon/>,
        link:"/labour/view"

    },
    {
        title: "Salary Report",
        icon:<MonetizationOnIcon/>,
        link:"labour/salary"

    },
    {
        title: "Attendance",
        icon:<PlaylistAddCheckIcon/>,
        link:"/labour/attendance"

    }
   
];


  