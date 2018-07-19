import Component from '@ember/component';
import { match } from '@ember/object/computed';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({

    store: service(),
    isEmailValid: match("email", /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/),
    watchEditContact: observer("editContact", function() {
        const contact = this.get("editContact");
        this.set("name", contact.get("name"));
        this.set("phone", contact.get("phone"));
        this.set("address", contact.get("address"));
        this.set("delete", contact.get("delete"));
        this.set("isEditing", true);
    }),

    actions: {
        submitForm() {
            const { name, email, address, phone, isEditing } = this;
            const editContact = this.get("editContact");
            console.log(name, email, address, phone, this.get("isEmailValid"));
            if (isEditing) {
                this.get("store").findRecord("contact", this.get("editContact.id")).then(contact=>{
                    contact.set("name", editContact.get("name"));
                    contact.set("phone", editContact.get("phone"));
                    contact.set("address", editContact.get("address"));
                    contact.set("delete", editContact.get("delete"));
                })
            }
            this.get("store").createRecord("contact", {
                name, email, address, phone
            }).save().then(()=>{
                this.set("successSave", true);
            });
        }
    }
});
