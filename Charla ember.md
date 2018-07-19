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
                <th scope="col">edit</th>
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

```handlebars
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    
    <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                {{#link-to "index" class="nav-link"}}
                    Home
                {{/link-to}}
            </li>
            <li class="nav-item">
                {{#link-to "contacts" class="nav-link"}}
                    Contacts
                {{/link-to}}
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">Pricing</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">About</a>
            </li>
        </ul>
    </div>
</nav>
```

```javascript
import Component from '@ember/component';

export default Component.extend({
    actions: {
        deleteContact(contact) {
            console.log("deleteContact", contact);
            contact.destroyRecord();
        }
    }
});
```

```javascript
<div class="container my-4 list-contact">
    <table class="table">
        <thead class="thead-dark">
            <tr>
                <th scope="col">#</th>
                <th scope="col">name</th>
                <th scope="col">email</th>
                <th scope="col">address</th>
                <th scope="col">phone</th>
                <th scope="col">edit</th>
                <th scope="col">delete</th>
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
                    <td {{action "editContact" contact}}><img src="/assets/images/edit-regular.svg" class="icon-action"></td>
                    <td {{action "deleteContact" contact}}><img src="/assets/images/trash-alt-regular.svg" class="icon-action"></td>
                </tr>
            {{/each}}
        </tbody>
    </table>
</div>
```