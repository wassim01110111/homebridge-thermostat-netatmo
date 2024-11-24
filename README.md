# homebridge-thermostat-netatmo

An updated fork of the netatmo thermostat plugin for homebridge. Works with the latest API change.

To use this plugin, you need to register an application on the Netatmo developer platform

1. Visit https://dev.netatmo.com/apps/createanapp#form (login with your netatmo account)
2. Fill out the required application fields
3. Copy and paste the access_token into the configuration
4. Go to https://dev.netatmo.com/apidocumentation/energy#homesdata to find your home_id and paste it into the configuration

# Configuration

```

"accessories": [
    {
        "accessory": "Netatmo Thermostat",
        "name": "Thermostat",
        "access_token": "<access_token from https://dev.netatmo.com/apps/>",
        "home_id": "<secret from https://dev.netatmo.com/apidocumentation/energy#homesdata>"
    }
],
