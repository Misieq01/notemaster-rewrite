import React from 'react'

const Icon = React.forwardRef(({icon,title,onClick},ref) => <img
                className="icon"
                alt="icon"
                src={icon}
                title={title}
                onClick={onClick}
                ref={ref}
              />);

export default Icon