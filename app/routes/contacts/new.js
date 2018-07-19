import Route from '@ember/routing/route';

export default Route.extend({

	model() {
		return this.get("store").createRecord("contact");
	},

	actions: {
		editContactAction(contact) {
			contact.save().then(()=>this.transitionTo("contacts.index"));
		}
	},

	deactivate() {
		console.log("willTransition");

		// rollbackAttributes() removes the record from the store
		// if the model 'isNew'
		this.controller.get('model').rollbackAttributes();
	}
});
