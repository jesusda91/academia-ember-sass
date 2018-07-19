import Route from '@ember/routing/route';

export default Route.extend({
	model(params) {
		return this.store.findRecord('contact', params.contact_id);
	},

	afterModel(model) {
		console.log(model);
	},

	actions: {
		editContactAction(contact) {
			contact.save().then(()=>this.transitionTo("contacts"));
		}
	}
});
