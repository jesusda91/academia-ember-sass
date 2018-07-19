import Component from '@ember/component';
import { match } from '@ember/object/computed';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

    store: service(),
    isEmailValid: match("email", /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/),

    actions: {
        submitForm(contact) {
			this.sendAction("editContactAction", contact);
			return;
        }
    }
});
