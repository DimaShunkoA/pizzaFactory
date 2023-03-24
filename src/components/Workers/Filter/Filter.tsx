// @flow
import * as React from 'react';
import {
    Box,
    Button, Checkbox,
    Divider,
    FormControl,
    FormControlLabel, FormGroup,
    Menu,
    MenuItem,
    Select,
    SelectChangeEvent
} from "@mui/material";
import styles from "./Filter.module.scss";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";

const styleSelect = {
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: '#dc2626',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#dc2626',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#dc2626',
    },
    '.MuiSvgIcon-root ': {
        fill: "#dc2626 !important",
    }
}
export const Filter = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const [post, setPost] = useState(String(searchParams.get("role") ? searchParams.get("role") : ""));
    const [archive, setArchive] = useState({
        isArchive: !!Number(searchParams.get("isArchive")),
        isNotArchive: searchParams.get("isArchive") === '0'
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangeSelect = (event: SelectChangeEvent) => {
        setPost(event.target.value as string);
        let params = {};

        searchParams.forEach((value, key) => {
            params = {...params, [key]: value}
        });

        setSearchParams({...params, role: event.target.value})

    };

    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.target.checked) {
            setArchive({isArchive: false, isNotArchive: false, [event.target.name]: event.target.checked});

            let isArchive = event.target.checked ? event.target.name === "isArchive" ? "1" : "0" : ""
            let params = {};

            searchParams.forEach((value, key) => {
                params = {...params, [key]: value}
            });

            setSearchParams({...params, isArchive: isArchive})
        }
    };

    const reset = () => {
        let sort = searchParams.get("sort")
        setPost("")
        setArchive({isArchive: false, isNotArchive: false})

        if(sort){
            setSearchParams({sort: sort});
        }else {
            setSearchParams();
        }
    }

    const {isArchive, isNotArchive} = archive;

    return (
        <div>
            <Button
                data-testid="button"
                className={styles.button}
                variant="outlined"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Фильтр
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <Box>
                    <div className={styles.post}>
                        Должность:
                    </div>
                    <Box sx={{ minWidth: 160 }}>
                        <FormControl sx={{ width: 160}}>
                            <Select
                                sx={styleSelect}
                                inputProps={{ "data-testid": "select"}}
                                className={styles.select}
                                value={post}
                                onChange={handleChangeSelect}
                            >
                                <MenuItem sx={{color: '#dc2626', fontSize: '14px'}} value={"driver"}>DRIVER</MenuItem>
                                <MenuItem sx={{color: '#dc2626', fontSize: '14px'}} value={"cook"}>COOK</MenuItem>
                                <MenuItem sx={{color: '#dc2626', fontSize: '14px'}} value={"waiter"}>WAITER</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>

                    <Divider sx={{my:"7px"}} />

                    <FormGroup sx={{mx:"10px"}}>
                        <FormControlLabel
                            className={styles.check}
                            control={
                                <Checkbox data-testid="isArchive" className={styles.check} checked={isArchive} onChange={handleChangeCheckBox} name="isArchive" />
                            }
                            label="В архиве"
                        />
                        <FormControlLabel
                            className={styles.check}
                            control={
                                <Checkbox data-testid="isNotArchive" className={styles.check} checked={isNotArchive} onChange={handleChangeCheckBox} name="isNotArchive" />
                            }
                            label="Не в архиве"
                        />
                    </FormGroup>

                    <Divider sx={{my:"7px"}} />

                    <Button data-testid="reset" className={styles.reset} variant="outlined" onClick={reset}>Сбросить</Button>
                </Box>
            </Menu>
        </div>
    );
};