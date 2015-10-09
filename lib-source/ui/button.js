import React from "react";
import fc from "lib-source/factotum.es7.js";
import icons from "lib-source/ionic-icons.js";

import Touchable from "lib-source/ui/touchable.js";

let Button;

Button = React.createClass({
    getDefaultProps () {
        return {
            onTap () {},
            color: null,
            textColor: null,
            shadow: false,
            style: {},
            className: "",
            icon: null,
            fillContainer: false,
            width: null,
            height: null,
            overrideMinHeight: false
        };
    },
    render () {
        let {className, color, textColor, shadow, style, onTap, text, icon, fillContainer, width, height, overrideMinHeight} = this.props;
        let textStyle;

        if (shadow === true) {
            shadow = "0px 1px 3px rgba(0, 0, 0, 0.35)";
        } else {
            shadow = null;
        }

        className = `material-button ${className}`.trim();
        style = {
            ...style,
            backgroundColor: color,
            color: textColor,
            WebkitBoxShadow: shadow,
            width,
            height
        };
        textStyle = {height};
        if (overrideMinHeight === true) {
            style.minHeight = 0;
            textStyle.minHeight = 0;
        }

        if (fillContainer === true) {
            style = {
                ...style,
                margin: 0,
                height: '100%'
            };
            height = '100%';
        }

        if (icon !== null) {
            style.fontFamily = "Ionicons";
            text = icons[icon];
        }

        return (
            <Touchable component="div" className={className} style={style} onTap={onTap}>
                <div className="material-button-overlay" />
                <div className="material-button-text" style={textStyle}>
                    <div style={{display: 'table-cell', verticalAlign: 'middle'}}>
                        {text}
                    </div>
                </div>
            </Touchable>
        );
    }
});

export default Button;
