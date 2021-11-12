import React from 'react';
import './userreport.css'
import ManagerHeader from './manager/managerHeader';

export default function Chart(){
  return(<>
  <ManagerHeader/>
  <div className="damchartlft">
  <iframe className="damchart" src="https://charts.mongodb.com/charts-project-0-utlkq/embed/charts?id=5d95691e-5383-4a5d-9fac-f65255bcdb46&theme=light"></iframe>
  </div>
  </>)
}