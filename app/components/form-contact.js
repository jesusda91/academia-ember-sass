import Component from '@ember/component';
import { match } from '@ember/object/computed';
import { inject as service } from '@ember/service';

export default Component.extend({

    store: service(),
    isEmailValid: match("email", /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/),

    actions: {
        submitForm() {
            const { name, email, address, phone } = this;
            console.log(name, email, address, phone, this.get("isEmailValid"));
            this.get("store").createRecord("contact", {
                name, email, address, phone
            }).save().then(()=>{
                this.set("successSave", true);
            });
        }
    }
});
