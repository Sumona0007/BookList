import React, { Component } from "react";

const Filter = (props) => {
  const {filteredItems,onclick,selectedItems}=props;
  return ( 
      
          <div className="col-lg-2">
              <ul className="list-group">
                  {
                      filteredItems.map(item =>
                      (
                          <li 
                              key={item.id} 
                              class={selectedItems===item.name ? "list-group-item active" :"list-group-item"} 
                              onClick={()=>onclick(item.name)}
                          >
                              {item.name}
                          </li>
                      ))
                  } 
                  
              </ul>
          </div>
      );
   
}


export default Filter;
