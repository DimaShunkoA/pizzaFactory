// @flow
import * as React from 'react';
import styles from './Workers.module.scss'
import {Sort} from "./Sort/Sort";
import {Filter} from "./Filter/Filter";
import {AddWorker} from "./AddWorker/AddWorker";
import {Employees} from "./Employees/Employees";

export const Workers = () => {

    return (
        <section className={styles.section}>
            <div className={styles.div1}>
                <div className={styles.div2}>
                    <div className={styles.heading}>
                        <div className={styles.text}>
                            ИМЯ
                        </div>

                        <div className={styles.text}>
                            ДОЛЖНОСТЬ
                        </div>

                        <div className={styles.text}>
                            НОМЕР
                        </div>
                    </div>

                    <div className={styles.buttons}>
                        <div>
                            <Sort/>
                        </div>

                        <div className={styles.bnt}>
                            <AddWorker/>
                            <Filter/>
                        </div>
                    </div>

                    <div className={styles.employees}>
                        <Employees/>
                    </div>
                </div>
            </div>
        </section>
    );
};