# HelloSally - ECC GUI

> ✨ Bootstrapped with Create DDS App (CDA).

## Architecture

ECC GUI is following a [Domain-Driven Design](https://en.wikipedia.org/wiki/Domain-driven_design) approach.

In DDD, the taxonomy of a project should be tightly coupled to the business domain in order to make sure the following are respected:

- The primary focus of the project is aligned with the core domain and domain logic,
- The designs and especially the complex ones are based on a model of the domain,
- Collaboration between technical and domain experts focuses on iteratively refine a conceptual model addressing particular domain problems.

Other patterns ECC GUI relates to:

- [naked objects pattern](https://en.wikipedia.org/wiki/Naked_objects),
- [Event Sourcing](https://www.martinfowler.com/eaaDev/EventSourcing.html)

### Event Sourcing

Event sourcing is an architectural pattern which warrants that your entities do track their internal state by means of reading and committing events to an event store.

Event sourcing comes with the following benefits:

- Mitigate [object-relational impedance mismatch](https://en.wikipedia.org/wiki/Object%E2%80%93relational_impedance_mismatch):
Event sourcing treats the data coming from the database as an append-only log of serialised events. Its goals is not to model the state for each entitity or relationships between these entities directly in the database schema. This simplifies the writing and the reading to and from the database.
- Keep the history:
Event sourcing allows us to know how we reached the state of an entity in addition to see its current state. That point is actually quite important as it brings additional benefits:

  - Be able to analyse the event stream and derive important business information from it like things which were not though at the moment the event was designed,
  - Make the system easier to test and debug. Commands and events can be simulated for test purposes. Issues can be replayed in a controlled environment to understand how an entity reached a bad state

## Structure

### Operations

Operations represent the domain-related logic. This is a layer of abstraction exposing an event-based API for the aplication. They are broken up into different domains for separation of concerns.
Everything within the operations folder is stateless and functional.

#### Commands

Commands contain the events for the subdomain they belong to.

#### Constants

Constants contain the constants for the commands.

#### Saga (side effect manager)

Saga catches the events defined within commands and dispatch them to the backend to be handled for instance.

Another example for event-sourced systems would be polling. It will happen in the saga, looping until the backend has fully processed the request.

#### Services

The services provide an abstraction layer around the business logic. It allows the creation of clean interfaces the app can use in addition to process the data coming back from the backend. This is also the place where to handle errors.

### Pages

Pages are components used to display data and drop the user into workflows.

#### Main (index.jsx)

The main component orchestrating presentational components pulled from the components directory.

#### Reducer

The reducer catches different events to populate state for the page.

#### Selector

The selector namespaces the data for the reducer to prevent states stepping on each other.

### Workflows

Workflows are components used to add, change and interact with data.

They offer more features than pages and are basically responses to events (a workflow could be triggered by an event which will be passing some data to it in returns).

When working with workflows, it's important to keep them small and as much independent as possible. This makes it possible to compose simple workflows into a more complex workflow.

> Difference between Pages and Workflows
> The main difference between the two is the responsibility for reading and writing data flows. Pages are more for reading data where workflows are for writing data.

### Shared

Components, pages, workflows specific to a subpart of the application which will be needed and used accross multiple subparts will move into this folder.

### Utils

Helpers used in multiple components or operations too generic and too small to be considered a subpart of the application (which will belong to the shared folder).

## Available Scripts

### npm install

ECC-GUI is using Dell Design System for Product library, which is hosted on our private artifactory repo. So prior to running `npm install`, you will need to configure DDSp registry and disable strict SSL.

```
npm config set registry https://amaas-eos-drm1.cec.lab.emc.com/artifactory/api/npm/DDSp/
npm set strict-ssl false
npm install --save @dell/dds
```

Now you can install the application with:
```
npm install
```

### npm start

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### npm run build

Builds a static copy of your site to the `build/` folder.

It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### npm test

Launches the application test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### Build the Docker image

Please replace proxy_pass in nginx.conf

```
docker build -t hello-sally-app .
```

### Run the Docker container

Ensure file /root/nginx.conf exists


Stop nginx container
```
docker volume prune
```

```
docker run -p 8080:80 --volume=/root/nginx.conf:/etc/nginx/conf.d/nginx.conf hello-sally-app
```

And open your browser on http://localhost:8080


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
