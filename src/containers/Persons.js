import React, { Component } from "react";
import { connect } from "react-redux";
import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";
import * as actionType from "../store/actions";

class Persons extends Component {
	state = {
		persons: [],
	};

	personAddedHandler = () => {
		const newPerson = {
			id: Math.random(), // not really unique but good enough here!
			name: "Max",
			age: Math.floor(Math.random() * 40),
		};
		this.setState((prevState) => {
			return { persons: prevState.persons.concat(newPerson) };
		});
	};

	personDeletedHandler = (personId) => {
		this.setState((prevState) => {
			return { persons: prevState.persons.filter((person) => person.id !== personId) };
		});
	};

	render() {
		return (
			<div>
				<AddPerson personAdded={() => this.props.onStorePersons()} />
				{this.props.storedPersons.map((person) => (
					<Person
						key={person.id}
						name={person.name}
						age={person.age}
						clicked={() => this.props.onDeletePerson(person.id)}
					/>
				))}
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		generatedPerson: state.person,
		storedPersons: state.persons,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onStorePersons: (person) => dispatch({ type: actionType.STORE_PERSON, person: person }),
		onDeletePerson: (id) => dispatch({ type: actionType.DELETE_PERSON, personElId: id }),
	};
};
export default connect(mapStateToProps, mapDispatchToProps)(Persons);
