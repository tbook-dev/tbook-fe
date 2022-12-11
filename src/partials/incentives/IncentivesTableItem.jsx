import React from 'react';
import { NavLink } from 'react-router-dom';

function IncentivesTableItem(props) {
  return (
    <tr>
      <td className="px-5 last:pr-5 py-3 w-20 whitespace-nowrap w-px">
        <div className="flex items-center">
          <label className="inline-flex">
            <span className="sr-only">Select</span>
            <input id={props.id} className="form-checkbox" type="checkbox" onChange={props.handleClick} checked={props.isChecked} />
          </label>
        </div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <NavLink to={`/incentive/${props.name}`}><button href={`/incentive/${props.name}`} className="text-left font-medium text-sky-500">{props.name}</button></NavLink>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.email}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left">{props.location}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.orders}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-sky-500">{props.lastOrder}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-left font-medium text-emerald-500">{props.spent}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="text-center">{props.refunds}</div>
      </td>
      <td className="px-2 first:pl-5 last:pr-5 py-3 w-px whitespace-nowrap">
        {/* Menu button */}
        <div className='flex'>
        <NavLink to='/incentive/grant/create'>
        <button className="flex-1 w-16 font-medium text-sky-500">Create</button>
        </NavLink>

        <NavLink to='/incentive/grant'>
        <button className="flex-1 w-16 font-medium text-sky-500">View</button>
        </NavLink>
        </div>
      </td>
    </tr>
  );
}

export default IncentivesTableItem;
