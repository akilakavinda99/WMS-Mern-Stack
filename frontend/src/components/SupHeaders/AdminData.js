import React from 'react';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';


export const  AdminData =  [ 
    {
        // link represents where it should redirect to
        title: "My Account",
        icon:<AccountCircleSharpIcon/>,
        link:"/supplier/supplierprofile"

    },
    {
        title: "Supplier Register ",
        icon:<InsertChartIcon/>,
        link:"/supplier/register"

    },
    {
        title: "Agent Register",
        icon:<EmojiPeopleIcon/>,
        link:"/agent/register"
    },
    {
        title: "All Users ",
        icon:<InsertChartIcon/>,
        link:"/admin/alluser"

    }
   
];


  