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
