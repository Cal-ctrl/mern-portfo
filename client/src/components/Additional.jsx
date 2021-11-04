import React from 'react';
import Fab from '@mui/material/Fab';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';



function Additional (props) {

    return (
        <div>
        <Fab onClick={props.likedfunc}>
            <ThumbUpIcon />
        </Fab>
        <Fab>
            <h4>
                {props.upVotes}
            </h4>
        </Fab>
        </div>
      
    )
}

export default Additional;