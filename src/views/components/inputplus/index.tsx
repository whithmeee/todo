import React, { useCallback } from 'react';

import styles from './index.module.scss';

interface InputPlusProps {
    onAdd: (title: string) => void;
}

export const InpitPlus: React.FC<InputPlusProps> = ({ onAdd }) => {
    const [value, setValue] = React.useState('');

    const addTask = useCallback(() => {
        onAdd(value);
        setValue('');
    }, [value]);
    return (
        <div className={styles.inputPlus}>
            <input
                type="text"
                className={styles.inputPlusValue}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        addTask();
                    }
                }}
                placeholder="Type here..."
            />

            <button onClick={addTask} aria-label="add" className={styles.inputPlusButton}></button>
        </div>
    );
};
