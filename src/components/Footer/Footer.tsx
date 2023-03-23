// @flow
import * as React from 'react';
import styles from './Footer.module.scss'

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.div1}>
                <div className={styles.div2}>
                    <div>
                        ООО "Пиццафабрика Вологда"
                    </div>

                    <div>
                        Автор: Дмитрий Шунько
                    </div>
                </div>
            </div>
        </footer>
    );
};