import React from 'react';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';


export const  HeaderData =  [ 
    {
        // link represents where it should redirect to
        title: "My Account",
        icon:<AccountCircleSharpIcon/>,
        link:"/supplier/supplierprofile"

    },
    {
        title: "New Orders ",
        icon:<InsertChartIcon/>,
        link:"/supplier/allneworders"

    }
];


  