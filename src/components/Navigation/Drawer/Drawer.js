import React, { Component } from 'react'
import classes from './Drawer.module.sass'
import Backdrop from '../../UI/Backdrop/Backdrop'

const links = ['Зачем', 'ты', 'сюда',  'зашел?']

class Drawer extends Component {
	renderLinks = () => {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<a>{link}</a>
				</li>
			)
		})
	}

	render() {
		const cls = [classes.Drawer]

		if (!this.props.isOpen) {
			cls.push(classes.close)
		}

		return (
			<>
				<nav className={cls.join(' ')}>
					<ul>{this.renderLinks()}</ul>
				</nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
				
			</>
		)
	}
}

export default Drawer
