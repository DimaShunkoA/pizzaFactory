// @flow
import * as React from 'react';
import {Box, Button, Modal} from "@mui/material";
import {Forms} from "../../Forms/Forms";
import styles from "./Employee.module.scss"

type People = {
    id: number,
    name: string,
    isArchive: boolean,
    role: string,
    phone: string,
    birthday: string
}

type IProps = {
    employee: People
}
export const Employee = ({employee}:IProps) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button className={styles.workersBtn} variant="contained" onClick={handleOpen}>
                <div className={styles.date}>
                    {employee.name}
                </div>

                <div className={styles.date}>
                    {employee.role}
                </div>

                <div className={styles.date}>
                    {employee.phone}
                </div>
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modal}>
                    <Forms employees={employee} isAdd={false} handleClose={handleClose}/>
                </Box>
            </Modal>
        </div>
    );
};