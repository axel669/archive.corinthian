import {defineComponentStyle} from "lib-source/v2/style";
import Button from "lib-source/uiv2/Button";
import Touchable from "lib-source/uiv2/Touchable";

const animationTime = 250;
defineComponentStyle(
    'dialog',
    'core',
    {
        "overlay": {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.35)',
            zIndex: '+100',
            display: 'none',
            WebkitOverflowScrolling: 'auto',
            opacity: 0,
            transition: `opacity ${animationTime}ms linear`
        },

        "window": {
            position: 'absolute',
            backgroundColor: 'white',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.6)',
            borderRadius: 5,
            width: '75%',
            maxWidth: 480,
            padding: 0,
            overflow: 'hidden'
        },
        "window-top": {
            top: '15%',
            left: '50%',
            transform: 'translateX(-50%)'
        },
        "window-center": {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        },

        "content": {
            maxHeight: '40vh',
            WebkitOverflowScrolling: 'touch',
            overflow: 'auto',
            borderBottom: '1px solid lightgray',
            borderTop: '1px solid lightgray'
        },
        "title": {
            padding: '5 15',
            fontSize: 20,
            fontWeight: 900,
            color: 'black'
        }
    }
);

let currentDialog = null;
window.dialog = {
    show(options) {
        return currentDialog.show(options);
    },
    hide(value) {
        return currentDialog.hide(value);
    },
    success(value) {
        return {value, status: 'success'};
    },
    cancel(value) {
        return {value, status: 'canceled'};
    },
    invalid(value = null, reason = 'invalid') {
        return {value, reason};
    }
};
class Dialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: null,
            opacity: null,
            name: null,
            pos: 'top',
            content: null,
            closable: !true,
            buttons: null,
            title: null
        };
        this.animating = false;
        this.resolver = null;
    }

    show = async (displayProps) => {
        if (this.animating === true || this.resolver !== null) {
            return dialog.invalid();
        }
        this.animating = true;
        this.resolver = new Promise(
            resolve => {
                this.response = value => resolve(value);
            }
        );

        const {
            content = null,
            closable = true,
            buttons = [
                {text: 'ok'}
            ],
            title = null,
            setup = null
        } = displayProps;

        this.setState({display: 'block', content, buttons, closable, title});
        await chrono.wait(50);
        this.refs.container.scrollTop = 0;
        if (setup !== null) {
            setup(this.refs.container);
        }
        this.setState({opacity: 1});
        await chrono.wait(animationTime);
        this.animating = false;
        return await this.resolver;
    }
    hide = async (value) => {
        // console.log(this.animating, this.animating === true);
        if (this.animating === true || this.resolve === null) {
            return;
        }
        this.animating = true;
        this.setState({opacity: null});
        await chrono.wait(animationTime);
        this.setState({display: null});
        requestAnimationFrame(() => {
            this.response(value);
            this.response = null;
            this.resolver = null;
        });
        this.animating = false;
    }

    close = () => {
        if (this.state.closable === false) {
            return;
        }
        this.hide(dialog.cancel(null));
    }
    stopper = (evt) => {
        evt.stopPropagation();
    }

    componentDidMount = () => {
        currentDialog = this;
    }
    componentWillUnmount = () => {
        currentDialog = null;
    }

    render = () => {
        const {display, opacity, pos, content, buttons, title} = this.state;
        const buttonList = (buttons || []).map(
            ({text, value = null, cancels = false}, index) => {
                // const valueFunc = (cancels === true) ? dialog.cancel : dialog.success;
                const retValue = (cancels === true) ?
                                    dialog.cancel(value) :
                                    dialog.success(value);
                return <Button text={text} key={index} onTap={() => this.hide(retValue)} block flush />;
            }
        );
        let titleDisplay = null;

        if (title !== null) {
            titleDisplay = <div className="dialog-core-title">{title}</div>;
        }

        return (
            <Touchable component="div" onTap={this.close} className="dialog-core-overlay" style={{display, opacity}}>
                <Touchable component="div" className={`dialog-core-window dialog-core-window-${pos}`} onTap={this.stopper}>
                    {titleDisplay}
                    <div className="dialog-core-content" ref="container">
                        {/*<Button text="demo" block onTap={() => this.hide('test')} />*/}
                        {content}
                    </div>
                    <UI.Flexbox colCount={3}>{buttonList}</UI.Flexbox>
                </Touchable>
            </Touchable>
        );
    }
}

export default Dialog;
