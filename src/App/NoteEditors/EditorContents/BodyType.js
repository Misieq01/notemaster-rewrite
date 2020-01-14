import React from 'react'

import Note from './Note'
import List from './List'

const BodyType = ({type,...props}) =>{
    switch(type){
        case 'note':
            return <Note {...props} />
        case 'list':
            return <List {...props} />
        default:
            return null
    }
}

export default BodyType