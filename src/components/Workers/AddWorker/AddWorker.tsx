// @flow
import * as React from 'react';
import {
    Box,
    Button,
    Modal,
} from "@mui/material";
import styles from "./AddWorker.module.scss"
import {useState} from "react";
import {Forms} from "../Forms/Forms";
import {useSelector} from "react-redux";
import {IRootState} from "../../../index";

export const AddWorker = () => {
    const id = useSelector((state:IRootState) => state.employee.nextId)

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);

    const handleClose = () => setOpen(false);

    return (
        <div>
            <Button
                className={styles.button}
                variant="outlined"
                onClick={handleOpen}
            >
                Добавить
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={styles.modal}>
                    <Forms employees={{
                            id: id,
                            name: "",
                            isArchive: false,
                            role: "",
                            phone: "",
                            birthday: ""
                        }}
                        isAdd={true}
                        handleClose={handleClose}
                    />
                </Box>
            </Modal>
        </div>
    )
};