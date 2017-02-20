Api
===

## Basic types

This bundle expose all extra form types and extra form constraints via an API for whatever usage it suits you.

* GET `/extra-form-types.(json|html)`
* GET `/extra-form-constraints.(json|html)`
* GET `extra-form-types/{type_name}/options.(json|html)`

## Configured types

In case you need to create several forms with fields that are always the same, you can save some configured types.

* GET `/configured-extra-form-types.json`
* PUT `/configured-extra-form-types/{name}`
* DELETE `/configured-extra-form-types/{name}`
* POST `/configured-extra-form-types`

Have a look at the [controller](../../Controller/ApiController.php).

TODO : Use NelmioApiDocBundle to document the API

## Use case

As a use case, we built a form editor on top of that API.

This editor has been packaged [in a form type](editor.md).
