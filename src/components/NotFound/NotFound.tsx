// @flow
import * as React from 'react';
import styles from './NotFound.module.scss'

export const NotFound = () => {
    return (
        <div className={styles.div1}>
            <div className={styles.div2}>
                <div className={styles.text1}>
                    #404
                </div>
                <br/>
                <div className={styles.text2}>
                        СТРАНИЦА НЕДОСТУПНА
                </div>
            </div>
        </div>
    );
};