// @flow
import * as React from 'react';
import styles from './Header.module.scss'

export const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.div1}>
                <div className={styles.div2}>
                    Работники ПиццеФабрики
                </div>
            </div>
        </header>
    );
};