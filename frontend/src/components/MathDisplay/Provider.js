/* @flow */
/* global MathJax */
import * as React from 'react';
import loadScript from 'load-script';
import MathJaxContext, {type MathJaxContextValue} from './context';

class MathJaxProvider extends React.Component<*, *> {
	_isMounted = false;
	props: {
		script?: string | boolean,
		options?: Object,
		children: React.Node
	};

	state: MathJaxContextValue;

	static defaultProps = {
		script:
			'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.4/MathJax.js?config=TeX-MML-AM_CHTML',
		options: {
			tex2jax: {
				inlineMath: []
			},
			showMathMenu: false,
			showMathMenuMSIE: false
		}
	};

	constructor(props: *) {
		super(props);

		this.state = {
			MathJax: null,
			registerNode: this.registerNode
		};
	}

	componentDidMount() {
		this._isMounted = true;
		if (this._isMounted) {
			this.load();
		}
	}

	componentDidUpdate() {
		this._isMounted = true;
		if (this._isMounted) {
			this.load();
		}
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	// Is there any math nodes to typeset ?
	hasNodes: boolean = false;

	// Have we already loaded MathJax ?
	loaded: boolean = false;

	/*
	 * Signal that there is at least one node to typeset.
	 * It will trigger the mathjax loading.
	 */
	registerNode = () => {
		this.hasNodes = true;
	};

	/*
	 * Load the MathJax library
	 */
	load = () => {
		const {script} = this.props;
		if (this.loaded || !this.hasNodes) {
			return;
		}

		this.loaded = true;

		if (!script) {
			this.onLoad(null);
			return;
		}

		loadScript(script, this.onLoad);
	};

	onLoad = (err: ?Error) => {
		const {options} = this.props;
		MathJax.Hub.Config(options);

		MathJax.Hub.Register.StartupHook('End', () => {
			this.setState({
				MathJax
			});
		});

		MathJax.Hub.Register.MessageHook("Math PreProcessing Error", (message) => {
			if (this.props.onError) {
				this.props.onError(MathJax, message);
			}
		})

	};

	render() {
		const {children} = this.props;

		return (
			<MathJaxContext.Provider value={this.state}>
				{children}
			</MathJaxContext.Provider>
		);
	}
}

export default MathJaxProvider;
