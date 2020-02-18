import React, { useMemo, useState } from "react";

import {useSelector,useDispatch} from 'react-redux'
import {GetAllLabels} from '../../Store/Selectors/labelsSelectors'
import {getNoteById} from '../../Store/Selectors/notesSelectors'
import {AddLabelToNote,DeleteLabelFromNote} from '../../Store/Actions/notesStuffActions'

import CheckedBodIcon from "../../../Assets/Icons/Labels/square-check.svg";
import UnCheckedBodIcon from "../../../Assets/Icons/Labels/square-uncheck.svg";
import SearchIcon from "../../../Assets/Icons/Labels/search.svg";


const LabelsPicker = ({ parent, id,componentType, ...props }) => {
  const dispatch = useDispatch()
  const labels = useSelector(state=>GetAllLabels(state))
  const noteLabels = useSelector(state=>getNoteById(state,id).labels)
 
  const [searchValue, setSearchValue] = useState('')

  const AddLabelToNoteHandler = label => {
    dispatch(AddLabelToNote(id,label))
  };

  const DeleteLabelFromNoteHandler = label => {
    dispatch(DeleteLabelFromNote(id,label._id))
  };

  const displayedLabels = labels.map((e, i) => {
    const isAdded = noteLabels.map(el=>el.name).includes(e.name);
    if(e.name.toLowerCase().includes(searchValue.toLowerCase())){
          return (
            <div className='labelsPicker__labelWrapper' key={e._id}>
              <div className='labelsPicker__label'>{e.name}</div>
              {isAdded ? (
                <img className='labelsPicker__boxIcon' alt='icon'
                  src={CheckedBodIcon}
                  cursor="pointer"
                  onClick={() => DeleteLabelFromNoteHandler(e)}
                />
              ) : (
                <img className='labelsPicker__boxIcon' alt='icon'
                  src={UnCheckedBodIcon}
                  cursor="pointer"
                  onClick={() => AddLabelToNoteHandler(e)}
                />
              )}
            </div>
          );
    }else{
      return null
    }

  });

    const [top, left] = useMemo(() => {
     
      const rect = parent.getBoundingClientRect();
      let y;
      let x;
      let containerHeight = 30;
      displayedLabels.filter(e=> e !== null).forEach(() => {
        containerHeight += 35;
      });
      if(componentType === 'card'){
      y = rect.top + rect.height + window.scrollY - containerHeight;
      x = rect.left + (rect.width - 40) / 2;

      return [y, x];
      }else if (componentType === 'editor'){
              y = rect.top + rect.height + window.scrollY - containerHeight;
              x = rect.left + (rect.width - 40) / 2;

              return [y, x];
      }

    }, [parent, displayedLabels,componentType]);
   
  return (
    <div className='labelsPicker__absolute' style={{top:top,left:left}}>
      <div className='labelsPicker__container'
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <div className='labelsPicker__inputWrapper'>
          <input className='labelsPicker__input' placeholder="Search label" value={searchValue} onChange={event=>setSearchValue(event.target.value)} />
          <img className='labelsPicker__searchIcon' alt='searchIcon' src={SearchIcon} />
        </div>
        <div className='labelsPicker__labelsBox'>{displayedLabels}</div>
      </div>
    </div>
  );
};

export default LabelsPicker;
