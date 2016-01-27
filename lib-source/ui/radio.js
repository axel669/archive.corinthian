import React from "react";
import icons from "lib-source/ionic-icons.js";

import Grid from "lib-source/ui/grid.js";
import Button from "lib-source/ui/button.js";
import Touchable from "lib-source/ui/touchable.js";
import CenterContent from "lib-source/ui/centercontent.js";

import {Style, Theme} from "lib-source/style.js";

Style.create(
    "core/radio",
    {
        ".item": {
            position: 'relative'
        },
        ".itemContent": {
            paddingLeft: 30,
            cursor: 'default'
        },
        ".icon": {
            width: 30,
            height: 30,
            borderRadius: '50%',
            lineHeight: '30px'
        },
        ".item + ~.cor-touch-active": {
            ".icon": {
                backgroundColor: Theme.get("button/activeColor")
            }
        },
        "~.cor-touch-active": {
            ".gridOverlay": {
                backgroundColor: Theme.get("button/activeColor")
            }
        },
        ".gridItemChecked": {
            color: 'white',
            backgroundColor: Theme.get("button/raised/color")
        }
    }
);

const RadioGroup = ({selectedIndex = null, onChange = () => {}, iconColor, children, label = null, layout = "radio", ...gridProps}) => {
    if (selectedIndex === null || selectedIndex < -1) {
        throw new Error(`selectedIndex not valid (given ${selectedIndex})`);
    }
    const selectItem = (index, value) => {
        if (index !== selectedIndex) {
            onChange(index, value);
        }
    };
    let Container;
    let ChildComponent;
    let title;

    children = React.Children.toArray(children);

    if (layout === 'radio') {
        Container = 'div';
        ChildComponent = RadioItem;
    } else {
        Container = Grid;
        ChildComponent = GridRadioItem;
    }

    if (label !== null) {
        title = <div className={Style.getClass("core:componentLabel")}>{label}</div>;
    }

    children = children.map(
        ({props}, index) => {
            const {value = index} = props;
            props = {
                ...props,
                parentIconColor: iconColor,
                onTap: () => selectItem(index, value),
                checked: index === selectedIndex
            };

            return <ChildComponent key={index} {...props} />;
        }
    );

    return (
        <div>
            {title}
            <Container {...gridProps}>
                {children}
            </Container>
        </div>
    );
};

const RadioItem = ({checked, children, iconColor = null, parentIconColor, height = 40, onTap}) => {
    const iconText = checked === true ? icons["ion-android-radio-button-on"] : icons["ion-android-radio-button-off"];

    return (
        <Touchable component="div" className={Style.getClassName("core/radio:item")} style={{height}} onTap={onTap}>
            <CenterContent style={{position: 'absolute', top: 0, left: 0, color: iconColor}} width={30} height="100%" className={Style.getClassName("core:icon")}>
                <div className={Style.getClassName("core/radio:icon")}>{iconText}</div>
            </CenterContent>
            <CenterContent className={Style.getClassName("core/radio:itemContent")} height="100%" width="100%" style={{textAlign: 'left'}}>
                {children}
            </CenterContent>
        </Touchable>
    );
};
const GridRadioItem = ({checked, children, onTap}) => {
    // const className = `cor-grid-radio-item cor-grid-radio-item-${checked}`;
    const gridClassName = Style.getClassNames({
        "core/radio:gridItemChecked": checked
    });

    return (
        <Touchable component="div" style={{width: '100%', height: '100%'}} onTap={onTap} className={gridClassName}>
            <CenterContent width="100%" height="100%" className={Style.getClassName("core/radio:gridOverlay")}>
                {children}
            </CenterContent>
        </Touchable>
    );
};

export default RadioGroup;
