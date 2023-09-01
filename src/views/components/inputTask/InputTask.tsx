import React from 'react';
import styles from './InputTask.module.scss';

interface InputTaskProps {
    id: string;
    title: string;
    onDone: (id: string) => void;
    onEdited: (id: string, value: string) => void;
    onRemoved: (id: string) => void;
}

export const InputTask: React.FC<InputTaskProps> = ({ id, title, onEdited, onRemoved }) => {
    const [checked, setChecked] = React.useState(false);

    const [isEditMode, setIsEditMode] = React.useState(false);

    const [value, setValue] = React.useState(title);

    const editTitleInputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEditMode]);
    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    type="checkbox"
                    checked={checked}
                    disabled={isEditMode}
                    className={styles.inputTaskCheckBox}
                    onChange={(e) => {
                        setChecked(e.target.checked);

                        setTimeout(() => {
                            if (e.target.checked) {
                                onRemoved(id);
                            }
                        }, 500);
                    }}
                />
                {isEditMode ? (
                    <input
                        value={value}
                        ref={editTitleInputRef}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onEdited(id, value);
                                setIsEditMode(false);
                            }
                        }}
                        className={styles.inputTaskEditTitle}
                    />
                ) : (
                    <h3 className={styles.inputTaskTitle}>{title}</h3>
                )}
            </label>

            {isEditMode ? (
                <button
                    className={styles.inputTaskSave}
                    arial-aria-label="Save"
                    onClick={() => {
                        onEdited(id, value);
                        setIsEditMode(false);
                    }}
                />
            ) : (
                <button
                    className={styles.inputTaskEdit}
                    arial-aria-label="Edit"
                    onClick={() => {
                        setIsEditMode(true);
                    }}
                />
            )}

            <button
                className={styles.inputTaskRemove}
                arial-aria-label="Remove"
                onClick={() => {
                    if (confirm('Are you sure?')) {
                        onRemoved(id);
                    }
                }}
            />
        </div>
    );
};
