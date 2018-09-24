# Top 3 important rule for this project at this stage:
1. Performance (codes are running efficiently, and use small packages instead of large one.)
2. Functionality (Complete all checkboxes of specs as described)
3. Code readibility (Give enough comment to explain what is happening and reasoning of codes)




## Major Stacks used:

Below 6 packages are the core of P001.

### [Unstated](https://github.com/jamiebuilds/unstated)

Using this instead of MobX or Redux, because there's no complex state management foreseeable in this app.

The main usage of Unstated is to share component/function/state at global level, such as login status, GraphQL connection, translation objects etc.

Other state management packages should not be used unless shown absolute necessity

### [React router v4](https://github.com/ReactTraining/react-router)

This is a typical choice


### [Apollo Client v2](https://github.com/apollographql/apollo-client)

A lot of helps for connect to GraphQL API in backend


### [Formik](https://github.com/jaredpalmer/formik)

Use this to save some time and boilerplate.  There are limitations seen on this package though, may remove in v2 of the app.

But for v1, just use it for every form that need submission to server.


### [React-i18next](https://github.com/i18next/react-i18next)

For translation.  The only impact so far for us coder, is for all text that shows to on frontend, use t(*text*) instead of *text*

All other translation related packages should not be used, and checking compatibility with this package is a priority before adding new packages.


### [Styled-component](https://github.com/styled-components/styled-components)

Will help to speed up look and feel coding later on.

All other CSS/UI packages should not be used.


# Structure of the project

`./public` contains translation file and other static files

All source codes are in `./src`

We have a simple structure of Pages > Forms > Components
while stateContainer is globally available to all and implementing `Unstated`


## `./src/component`
Contains all basic React components.
Also contains higher level components that use basic components, but itself does not perform a complete functions that user request.

## `./src/stateContainer`
So far only GqlApi.js and LocaleApi.js
All stateContainers implements `Unstated`, and contains states that shares with other components/forms/pages at a global level

## `./src/form`
All user forms stored here.
Some pages will also be stored here.
Everything in this directory is meant to be called by "Pages"

## `./src/pages`
Is the topmost component that just below router
