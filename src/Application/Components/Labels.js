import React from 'react'

const Labels = ({labels = [],size}) =>{
    return (
      <div className="labels-display__container">
        {labels.map((e,i) => (
          <div key={i} className={"labels-display__label--" + size}>{e.name || e}</div>
        ))}
      </div>
    );
}

export default Labels