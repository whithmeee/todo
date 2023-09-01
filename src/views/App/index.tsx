import React from 'react';
import styles from './index.module.scss';
import { useToDoStore } from '../../data/stores/useToDoStore';
import { InpitPlus } from '../components/inputplus';
import Notasks from '../components/notasks/Notasks';
import { InputTask } from '../components/inputTask/InputTask';
export const App: React.FC = () => {
    console.log(useToDoStore);

    const [tasks, createTask, updateTask, removeTask] = useToDoStore((state) => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ]);

    console.log(tasks);

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do App</h1>
            <section className={styles.articleSection}>
                <InpitPlus
                    onAdd={(title) => {
                        if (title) {
                            createTask(title);
                        }
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                <>
                    <>{!tasks.length && <Notasks />}</>
                    <>
                        {tasks.map((task) => (
                            <InputTask
                                key={task.id}
                                id={task.id}
                                title={task.title}
                                onEdited={updateTask}
                                onRemoved={removeTask}
                            />
                        ))}
                    </>
                </>
            </section>
        </article>
    );
};
