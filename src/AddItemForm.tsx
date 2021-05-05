import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

function AddItemForm(props: AddItemFormPropsType) {
    let [title, setTitle] = useState<string>('')
    let [error, setError] = useState<string | null>(null)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setTitle(e.currentTarget.value)
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if(trimmedTitle){
            props.addItem(trimmedTitle)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }

    const errorMessage = error && <div className="error-text">{error}</div>

    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.charCode === 13){
            addItem();
        }
    }

    return(
        <div>
            <input 
            value={title}
            onChange={changeTitle}
            onKeyPress={onKeyPressAddItem}
            className={error ? 'error' : ''}
            />
            <button onClick={addItem}>+</button>
            {errorMessage} 
        </div>
    )
}

export default AddItemForm