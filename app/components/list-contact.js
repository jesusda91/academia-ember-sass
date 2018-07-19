import Component from '@ember/component';

export default Component.extend({
    actions: {
        deleteContact(contact) {
            console.log("deleteContact", contact);
            contact.destroyRecord();
        },

        editContact(contact) {
            this.set("editContact", contact);
        }
    }
});
