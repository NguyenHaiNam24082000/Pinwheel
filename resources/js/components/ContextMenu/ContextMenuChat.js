import React, { useState, useEffect } from "react";
import { FaBeer } from "react-icons/fa";

export default function ContextMenuChat(props) {
    const [active, setActive] = React.useState(false),
        [visible, setVisible] = React.useState(false),
        [position, setPosition] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        if (props.active) {
            setActive(props.active);
            setPosition({ x: props.position.x, y: props.position.y });
            setTimeout(() => setVisible(true), 50);
        } else {
            setVisible(false);
            setTimeout(() => setActive(false), 350);
        }
    }, [props.active]);

    React.useEffect(() => {
        setPosition({ x: props.position.x, y: props.position.y });
    }, [props.position]);

    const getStyles = () => {
        const left = visible ? position.x + props.offset.x : position.x,
            opacity = visible ? 1 : 0,
            top = visible ? position.y + props.offset.y : position.y;

        return {
            left: `${left}px`,
            opacity,
            top: `${top}px`,
            transitionDelay: `${props.index * 50}ms`,
            zIndex: '100'
        };
    };

    return (
        <button type="button" className="context-menu-item bg-primary text-base-content" style={active===true ? getStyles():{display: 'none'}}>
            <i className={props.icon} />
            <h1>{props.name}</h1>
        </button>
    );
}
