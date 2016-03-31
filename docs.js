

module global {
    @function chrono {
        @desc Creates a new instance of {chrono}.
        @args {
            @arg dateTime [Date]
                This is some long description of the thing
                {year, month} destructuring?
                [title]year[title]
        }
        @return chrono

        @function diff {
            @desc A function that will calculate the amount of time to add to the first argument in order to get the second argument.
            @args {
                @arg startDate [chrono] The date to start from.
                @arg targetDate [chrono] The date to get to.
            }
            @return object
        }
        @function now {
            @desc Returns the current date as a chrono object.
            @args {}
            @return chrono
        }
        @function parse {
            @desc Parses a date string and returns the chrono object represented by it.
            @args {
                @arg dateString [string] The string to parse.
            }
            @return chrono
        }
        @function parseMS {
            @desc Parses a date string generated by C# code and returns the chrono object represented by it.
            @args {
                @arg dateString [string] The string to parse.
            }
            @return chrono
        }
        @function trigger {
            @desc Fires a function after a specified time.
            @args {
                @arg delay [number] The number of milliseconds to wait.
                @arg func [function] The function to call.
            }
            @return chronoTrigger
        }
    }

    object chrono {
        @prop dateObject {
            @desc Gets a copy of the internal Date object.
            @type Date
        }

        @prop unixTimestamp {
            @desc Gets the unix timestamp of the chrono object.
            @type number
        }

        @prop milliseconds {
            @desc Gets the milliseconds of the chrono object.
            @type number
        }
        @prop seconds {
            @desc Gets the seconds of the chrono object.
            @type number
        }
        @prop minutes {
            @desc Gets the minutes of the chrono object.
            @type number
        }
        @prop hours {
            @desc Gets the hours of the chrono object.
            @type number
        }
        @prop weekday {
            @desc Gets the weekday of the chrono object.
            @type number
        }
        @prop date {
            @desc Gets the date of the chrono object. This number is adjusted to the range (0-30) unlike the normal Date object.
            @type number
        }
        @prop months {
            @desc Gets the months of the chrono object.
            @type number
        }
        @prop year {
            @desc Gets the year of the chrono object.
            @type number
        }

        @function shift {
            @desc Shifts the date forward or backward in time.
            @args {
                @arg offset [Number] The amount of time to shift the date.
                @arg unit [String] The units to shift by. Valid values are: 'second', 'minute', 'hour', 'day', 'week', 'month', 'year', 'decade'.
            }
            @args {
                @arg duration [object] An object that will shift the date.
            }
            @return chrono
        }
        @function startOf {
            @desc Moves the date to the start of the specified unit.
            @args {
                @arg unit [string] The unit to move to the start of. Valid values are: 'second', 'minute', 'hour', 'day', 'week', 'month', 'year'.
            }
            @return chrono
        }
        @function format {
            @desc Formats the chrono object using the specified string.
            @args {
                @arg format [string] The string describing the format the date should be put into.
            }
            @return string
        }
    }

    object chronoTrigger {
        @prop status {
            @desc The status of the trigger.
            @type string
        }

        @function cancel {
            @desc Cancels the trigger if it hasn't fired yet.
        }
    }
}












module UI {
    element Button {
        @prop onTap {
            @desc The function to call when the button is tapped (mobile) or pressed (desktop).
            @type function
            @optional
            @default `() => {}`
            @args {
                @arg evt [Event] The tap event that occured.
            }
        }

        @prop color {
            @desc The color of the button.
            @type CSS String
            @optional
            @default `"transparent"`
        }

        @prop textColor {
            @desc The color of the text inside the button.
            @type CSS String
            @optional
            @default $Theme.button.color
        }

        @prop width {
            @desc The width of the button.
            @type Number
            @type CSS String
            @optional
            @default `null` (wraps button content)
        }

        @prop height {
            @desc The height of the button.
            @type Number
            @type CSS String
            @optional
            @default `null` (wraps button content)
        }

        @prop flush {
            @desc Makes the button flish with the elements around it (removes the margin).
            @type boolean
            @optional
            @default `false`
        }

        @prop block {
            @desc Makes the button display as a block element.
            @type boolean
            @optional
            @default `false`
        }

        @prop fill {
            @desc Makes the button take the width and height of its container. Overwrites `width` and `height`.
            @type boolean
            @optional
            @default `false`
        }

        @prop raised {
            @desc Changes the button style to a "raised" style. Changes `color` to `Theme.button.color` and `textColor` to `Theme.button.textColor` and adds a box-shadow.
            @type boolean
            @optional
            @default false
        }

        @prop padding {
            @desc Adjusts the padding around the button text.
            @type Number
            @type CSS String
            @optional
            @default `"5px"`
        }

        @prop cornerRadius {
            @desc Adjust the rounding of the button's corners.
            @type Number
            @type CSS String
            @optional
            @default 0
        }

        @prop animation {
            @desc Sets the css class to control property animations on the button.
            @type string
            @optional
            @default null
        }

        @prop text {
            @desc The button text.
            @type string
            @required
        }

        @example
            ```
            <UI.Button text="text" />
            ```
    }
}


module UI {
    element Card {
        @hasChildren
        @prop style {
            @desc Style to apply to the container. See React inline styles for information.
            @type object
            @optional
            @default `null`
        }
        @prop title {
            @desc The title to display on the card.
            @type string
            @optional
            @default `null`
        }
        @example
            ```
            <UI.Card>
                Look, content!
            </UI.Card>
            ```
    }
}


module UI {
    element CenterContent {
        @hasChildren
        @prop width {
            @desc The width of the container.
            @type Number
            @type CSS String
            @optional
            @detaul `null` (wraps content)
        }
        @prop height {
            @desc The height of the container.
            @type Number
            @type CSS String
            @optional
            @detaul `null` (wraps content)
        }
        @prop className {
            @desc Additional class names to give the container.
            @type String
            @optional
            @default `""`
        }
        @prop style {
            @desc Style to apply to the container. See React inline styles for information.
            @type object
            @optional
            @default `null`
        }
        @example
            ```
            <UI.CenterContent width="100%" height="100%">
                Content to center
            </UI.CenterContent>
            ```
    }
}


module UI {
    element Checkbox {
        @managed
        @prop height {
            @desc The height of the element.
            @type number
            @type CSS string
            @optional
            @default `40`
        }
        @prop onChange {
            @desc The function to call when the checkbox value changes.
            @type function
            @optional
            @default `() => {}`
            @args {
                @arg checked [boolean] The new checked state of the checkbox.
            }
        }
        @prop checkColor {
            @desc The color of the check.
            @type CSS string
            @optional
            @default `"black"`
        }
        @prop onIcon {
            @desc The icon to display when the checkbox is checked.
            @type string
            @optional
            @default `"ion-android-checkbox"`
        }
        @prop onffIcon {
            @desc The icon to display when the checkbox is not checked.
            @type string
            @optional
            @default `"ion-android-checkbox-outline-blank"`
        }
        @prop checkSide {
            @desc The side of the label the checkbox is on.
            @type string
            @optional
            @default `"left"`
        }
        @prop checked {
            @desc Whether or not the checkbox is checked.
            @type boolean
            @required
        }
        @prop label {
            @desc The text to display next to the checbox.
            @type string
            @required
        }
        @example
            ```
            <UI.Checkbox label="Checkbox??" checked={this.state.checked} />
            ```
    }
}


module UI {
    element Combobox {
        @blockElement
        @managed
        @hasChildren
        @prop width {
            @desc The width of the element.
            @type number
            @type CSS string
            @optional
            @default `null`
        }
        @prop height {
            @desc The height of the element.
            @type number
            @type CSS string
            @optional
            @default `40`
        }
        @prop onChange {
            @desc The function to call when the item selected changes.
            @type function
            @required
            @args {
                @arg newIndex [number] The index of the selected item.
                @arg* value The value of the selected item. Can be any javascript type.
            }
        }
        @example
            ```
            <UI.Combobox onChange={(newIndex, newValue) => {}} selectedIndex={0}>
                <UI.Item label="Item 1" value={0}>Item 1 Display</UI.Item>
                <UI.Item label="Item 2">Item 2 Display</UI.Item>
                <UI.Item label="No Content Item" value={3} />
            </UI.Combobox>
            ```
    }
}


module UI {
    element Divider {
        @notes The direction of the divider is determined by using Divider.Horizontal and Divider.Vertical.
        @blockElement
        @hasChildren
        @prop width {
            @desc The width of the element.
            @type number
            @type CSS string
            @optional
            @default `null`
        }
        @prop height {
            @desc The height of the element.
            @type number
            @type CSS string
            @required
        }
        @example
            ```
            <UI.Divider.Horizontal height="100%">
                <UI.Item size={30}>
                    Content!
                </UI.Item>
                <UI.Item size={70}>
                    More Content!
                </UI.Item>
            </UI.Divider.Horizontal>
            ```
    }
}


module UI {
    element Flexbox {
        @blockElement
        @hasChildren
        @prop width {
            @desc The width of the element.
            @type number
            @type CSS string
            @optional
            @default `null` (width of the container)
        }
        @prop colCount {
            @desc The number of columns to split content into.
            @type number
            @required
        }
        @example
            ```
            <UI.Flexbox colCount={3}>
                <div>Item 1</div>
                <div>Item 2</div>
                <div>Item 3</div>
                <div>Item 4</div>
                <div>Item 5</div>
                <div>Item 6</div>
                <div>Item 7</div>
            </UI.Flexbox>
            ```
    }
}


















