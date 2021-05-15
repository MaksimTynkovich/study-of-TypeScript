import { IconButton, TextField } from '@material-ui/core';
import { AddBox } from '@material-ui/icons';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<string | null>(null)
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError("title is required!")
        }
        setTitle("")
    }
    const onkeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === "Enter"){
            addItem()
        }
    }

    return (
        <div>
            <TextField 
                variant={"outlined"}
                label={"Title"}
                value={title}
                onChange={changeTitle}
                onKeyPress={onkeyPressAddItem}
                error={!!error}
                helperText={error}
            />
            <IconButton color={"secondary"} onClick={addItem}><AddBox/></IconButton>
        </div>
    )
}

export default AddItemForm