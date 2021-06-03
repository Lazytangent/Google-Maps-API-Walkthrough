# Setting up the Google Maps API with Authenticate Me

This is a project built off Authenticate Me that integrates the Google Maps API
to render maps in React with an API key from Google Cloud Services.

This walkthrough will take you through:

1. Getting an API key from Google Cloud Services to use Google Maps
2. Building in your API into the backend of your application
3. Bringing your API key into the frontend via an API route
4. Utilizing your API with the `@react-google-maps/api` package to render a map
   on the page

## Getting an API key

First, let's generate an API key.

To generate a working key, we need to do the following:

1. Create a Google developers project.
2. Enable Maps JavaScript API in that project.
3. Go to credentials to generate an API key.
4. Add the API key to our app.
5. Add billing info to unlock the full set of Maps functionality.

### Create a Google developers project

To get started, first navigate to the [Google Cloud console][gcp-console].

You will need a Google account to be able to log in to the Google Cloud console.

Once you are logged in, click on the `Select a Project` button in the nav bar.
In the newly opened modal, select `New Project`.

![New GCP Project example][maps-api-1]

Choose a name for your project. You can name it something like `benchbnb`. Leave
the `Location` set to `No organization`. Then, click `Create`.

![New GCP Project example 2][maps-api-2]


[gcp-console]: https://console.cloud.google.com/
[maps-api-1]: https://assets.aaonline.io/fullstack/react/projects/bench_bnb/maps_api_1.png
[maps-api-2]: https://assets.aaonline.io/fullstack/react/projects/bench_bnb/maps_api_2.png

### Enable Maps JavaScript API

Once you've created your project, make sure you have selected your newly created
project. Then, open the side menu, select `APIs & Services` > `Library`.

Search for and select `Maps JavaScript API`. Now, `Enable` this API for your
project. (Again, be sure you have selected your newly created project when
enabling this API.)

![Enable JavaScript API][maps-api-3]

[maps-api-3]: https://assets.aaonline.io/fullstack/react/projects/bench_bnb/maps_api_3.png

### Generate an API Key

Open the side menu navigation again, and this time, select `APIs & Services` >
`Credentials`.

Then, click `Create credentials` and select the `API key` option.

Once you've generated a new API key, click `Restrict key`. This will take you to
a new page where you can now rename the API key to something more specific (ie.
'BenchBnB Maps Api Key'). You should also restrict your API key so that it can
only call on the `Maps JavaScript API`.

![Restrict API Access][maps-api-4]

In general, we want to follow the [Principle of Least
Privilege][principle-least-privilege] when it comes to managing our API keys and
what it has access to.

[principle-least-privilege]: https://en.wikipedia.org/wiki/Principle_of_least_privilege
[maps-api-4]: https://assets.aaonline.io/fullstack/react/projects/bench_bnb/maps_api_4.png

### Add API Key to our App

**Quick Note**: It's important to take this upcoming section very seriously!
There have been multiple anecdotes from students who accidentally pushed API
keys to a public GitHub repo. Those keys were then scraped by bad actors who
racked up tens of thousands of dollars in charges using those keys.

With that in mind, let's add our API key to our project!

Any time we add an API key to our project, we want to take precautions to
prevent bad actors from stealing and misusing our keys. In the case of our Maps
API key, because billing is calculated per map load, bad actors might want to
steal your key so that they can load up maps on their own projects.

Because the Maps API key is loaded in the frontend in our HTML, there's actually
not much we can do to prevent the key from being publicly accessible if our web
app is deployed to production. Since you'll most likely be deploying your app
(for example, using Heroku), then it's highly recommended that you protect your
publicly accessible API key by restricting the websites that can use your key.

![How to restrict API key to specific websites][maps-api-5]

To prevent our API key from being pushed to GitHub while still being able to
conveniently use the key locally, we have a couple of options.

The first option is to use React's built-in system to build in environment
variables on build. This does expose the environment variable to bad actors, so
it's best that you restrict where your API key can be used from once you push
you app to production.

The next option, which we'll be using for this walkthrough is to make the API
key an environment variable available in your backend, and to fetch a custom API
route to get that key to the frontend. This way, you can use Google's system to
restrict where your API key can be used from and have backend validations to
make sure the people who are trying to fetch for your API key are actually using
your application.

#### Backend

In the root of your backend, add your Google Maps API key to your `.env` file.
It should now look something like

```plaintext
PORT=5000
DB_USERNAME=«db_username»
DB_PASSWORD=«db_password»
DB_DATABASE=«db_database»
DB_HOST=localhost
JWT_SECRET=«secret»
JWT_EXPIRES_IN=604800
MAPS_API_KEY=«maps_api_key»
```

Next, let's configure our `config/index.js` file to match what we've been doing
with our environment variables throughout the Authenticate Me walkthrough. We'll
add a key of `googleMapsAPIKey` to the exported object with a value of the
environment variable we just added.

It should look something like this:

```js
module.exports = {
  // All other keys from Authenticate Me set up
  googleMapsAPIKey: process.env.MAPS_API_KEY,
};
```

Now, we'll create
