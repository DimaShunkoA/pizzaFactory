// @flow
import * as React from 'react';
import styles from "./Sort.module.scss";
import {Button, Menu, MenuItem} from "@mui/material";
import {useSearchParams} from "react-router-dom";

export const Sort = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const styleName = {
        fontWeight: searchParams.get("sort") === "name" ? '700' : 'none'
    }

    const styleBirthday = {
        fontWeight: searchParams.get("sort") === "birthday" ? '700' : 'none'
    }

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const sort = (sort: string) => {
        let params = {};

        searchParams.forEach((value, key) => {
            if(key !== 'sort'){
                params = {...params, [key]: value}
            }
        });

        if (sort){
            setSearchParams({...params, sort: sort})
        }else {
            setSearchParams({...params})
        }

        handleClose()
    }

    return (
        <div>
            <Button
                data-testid="open"
                className={styles.button}
                variant="outlined"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                Сортировки
            </Button>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem data-testid="name" sx={styleName } className={styles.item} onClick={() => sort("name")}>Сортировка по имени</MenuItem>
                <MenuItem data-testid="birthday" sx={styleBirthday} className={styles.item} onClick={() => sort("birthday")}>Сортировка по дате</MenuItem>
                <MenuItem data-testid="reset" className={styles.item} onClick={() => sort("")}>Сбросить</MenuItem>
            </Menu>
        </div>
    );
};