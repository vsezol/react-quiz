import React, { Component } from 'react'
import classes from './Layout.module.sass'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer';

class Layout extends Component {

	state = {
		menu: true
	}

	toggleMenuHandler = () => {
		this.setState({
			menu: !this.state.menu
		})
	}

	menuCloseHandler = () => {
		this.setState({
			menu: false
		})
	}

	render() {
		return (
			<div className={classes.Layout}>
				<Drawer isOpen={this.state.menu} onClose={this.menuCloseHandler}/>
				<MenuToggle onToggle={this.toggleMenuHandler} isOpen={this.state.menu}/>
				<main>{this.props.children}</main>
			</div>
		)
	}
}

export default Layout
