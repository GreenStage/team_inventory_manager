import React from 'react';
import { useSelector } from 'react-redux';
import { PIC_ENDOINT } from '../../connector';


export default function ManageItem() {
  const item = useSelector((state) => state.selectedItem) || {};
  const locations = useSelector((state) => state.group.locations);

  return (
    <div>
      <div className="sectionTitle">
        <h4>Manage Item</h4>
        <div className="sectionSubtitle">
          <div className="row">
            <div className="col-sm-2">
              <img className="thumb" src={PIC_ENDOINT(item.picurl)} alt={item.name} />
            </div>
            <h5 className="col-sm-10">{item.name}</h5>
            {locations}
          </div>

        </div>
      </div>
    </div>
  );
}
