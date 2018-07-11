- `ember g route contacts`
- `ember g model contact name:string email:string address:string phone:string`
- `ember g component form-contact`

```handlebars
{{#if successSave}}
    <div class="alert alert-primary" role="alert">
        Contacto guardado correctamente
    </div>
{{/if}}
```
```handlebars
<div class="container my-4">
    <form>
        <div class="form-group">
            <label for="exampleInputname">name</label>
            {{input type="text" class="form-control" id="exampleInputname" aria-describedby="namelHelp" placeholder="Enter name" value=name}}
        </div>
        <div class="form-group">
            <label for="exampleInputemail">email</label>
            {{input type="text" class="form-control" id="exampleInputemail" aria-describedby="emailHelp" placeholder="Enter email" value=email}}
        </div>
        <div class="form-group">
            <label for="exampleInputaddress">address</label>
            {{input type="text" class="form-control" id="exampleInputaddress" aria-describedby="addresslp" placeholder="Enter address" value=address}}
        </div>
        <div class="form-group">
            <label for="exampleInputphone">phone</label>
            {{input type="text" class="form-control" id="exampleInputphone" aria-describedby="phoneHelp" placeholder="Enter phone" value=phone}}
        </div>
        <button type="submit" class="btn btn-primary" {{action "submitForm"}}>Submit</button>
    </form>
</div>
```
```javascript
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
```

- `ember g component list-contact`

```handlebars
<div class="container my-4">
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">address</th>
                <th scope="col">phone</th>
            </tr>
        </thead>
        <tbody>
            {{#each contacts as |contact index|}}
                <tr>
                    <th scope="row">{{index}}</th>
                    <td>{{contact.name}}</td>
                    <td>{{contact.email}}</td>
                    <td>{{contact.address}}</td>
                    <td>{{contact.phone}}</td>
                </tr>
            {{/each}}
        </tbody>
    </table>
</div>
```

```javascript
import Route from '@ember/routing/route';

export default Route.extend({
    model() {
        return this.get('store').findAll("contact");
	}
});
```
```handlebars
{{list-contact contacts=model}}
```