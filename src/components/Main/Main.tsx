
import * as React from 'react';
import {Header} from "../Header/Header";
import {Footer} from "../Footer/Footer";
import {Workers} from "../Workers/Workers";
import styles from "./Main.module.scss"

export const Main = () => {
    return (
        <div className={styles.main}>
            <Header/>
            <Workers/>
            <Footer/>
        </div>
    );
};