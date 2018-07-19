import Route from '@ember/routing/route';

export default Route.extend({
	model() {
		console.log("model");

        return this.get('store').findAll("contact");
	},

	afterModel(model) {
		console.log(model);

	}
});
