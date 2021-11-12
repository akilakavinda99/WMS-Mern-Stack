import React from "react";
import './Header.css';
import { SupHeaderData } from "./SupHeader";

function AgentHeader(){

    return(
        //mapping and creating rows
        <div className="VSideBar"> 
            <ul className="VSideBarList">
                {SupHeaderData.map((val,key)=>{
                    return(
                        <li className='row'
                        //checking the pathname and link and if they are rqual, then display as selected
                        id={window.location.pathname==val.link ? "active":""}
                        key={key} onClick={()=>{window.location.pathname=val.link}}>
                            
                            <div id ="icon">{val.icon}</div>
                            <div id ="title">{val.title}</div>
                            
                        </li>
                   );
                })}
            </ul>
        </div>
    )
}

export default AgentHeader;