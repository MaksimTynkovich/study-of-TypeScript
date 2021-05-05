import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type EditableSpanPropsType = {
    title: string
}

function EditableSpan(props: EditableSpanPropsType){
    return(
        <span>{props.title}</span>
    )
}

export default EditableSpan