'use strict';


class Application extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            "div",
            null,
            "Hello World"
        );
    }
}

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }
    tick() {
        this.setState(state => ({
            seconds: state.seconds + 1
        }));
    }
    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return React.createElement(
            'div',
            null,
            'Seconds: ',
            this.state.seconds
        );
    }
}

class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { items: [], text: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                "TODO"
            ),
            React.createElement(TodoList, { items: this.state.items }),
            React.createElement(
                "form",
                { onSubmit: this.handleSubmit },
                React.createElement(
                    "label",
                    { htmlFor: "new-todo" },
                    "What needs to be done?"
                ),
                React.createElement("input", {
                    id: "new-todo",
                    onChange: this.handleChange,
                    value: this.state.text
                }),
                React.createElement(
                    "button",
                    null,
                    "Add #",
                    this.state.items.length + 1
                )
            )
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length) {
            return;
        }
        const newItem = {
            text: this.state.text,
            id: Date.now()
        };
        this.setState(state => ({
            items: state.items.concat(newItem),
            text: ''
        }));
    }
}

class TodoList extends React.Component {
    render() {
        return React.createElement(
            "ul",
            null,
            this.props.items.map(item => React.createElement(
                "li",
                { key: item.id },
                item.text
            ))
        );
    }
}

class MarkdownEditor extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = { value: 'Hello, **world**!' };
    }

    handleChange(e) {
        this.setState({ value: e.target.value });
    }

    getRawMarkup() {
        const md = new Remarkable();
        return { __html: md.render(this.state.value) };
    }

    render() {
        return React.createElement(
            "div",
            { className: "MarkdownEditor" },
            React.createElement(
                "h3",
                null,
                "Input"
            ),
            React.createElement(
                "label",
                { htmlFor: "markdown-content" },
                "Enter some markdown"
            ),
            React.createElement("textarea", {
                id: "markdown-content",
                onChange: this.handleChange,
                defaultValue: this.state.value
            }),
            React.createElement(
                "h3",
                null,
                "Output"
            ),
            React.createElement("div", {
                className: "content",
                dangerouslySetInnerHTML: this.getRawMarkup()
            })
        );
    }
}



window.addEventListener('DOMContentLoaded', (ev => {
    const appRoot = document.querySelector('#app-root');
    ReactDOM.render(React.createElement(Application), appRoot);
    
    const appTimer = document.querySelector('#app-timer');
    ReactDOM.render(React.createElement(Timer), appTimer);
    
    const appTodo = document.querySelector('#app-todo');
    ReactDOM.render(React.createElement(TodoApp, null), appTodo);
    
    const appMarkdown = document.querySelector('#app-mkd');
    ReactDOM.render(React.createElement(MarkdownEditor, null), appMarkdown);
}));