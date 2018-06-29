# Switching to a real API

Chances are, once you get comfortable with this setup, you'll want to hook into some existing API rather than use the simple one that comes with this project. Here's how:

## Update `package.json`

First things first, you need to add `APIHOST` settings in `package.json`. If you look in `src/config.js`, you'll see that it's already configured to read this `APIHOST` setting if it's present.



If you added `http://` or `https://` to your APIHOST setting, then you need to remove it here.

In this file, you'll also see that there's a `/api` that gets prepended to the URL when on the client side. That gets routed through a proxy that's configured in server.js, which we'll get to next.

Why do you need a proxy? So that the `APIHOST` can be set as part of the Node environment, and your client side code can still work. A user's browser doesn't have access to your server's Node environment, so instead the client-side code makes all API calls to this `/api` proxy, which the server configures to hit your real API. That way you can control everything sanely, through environment variables, and set different API endpoints for your different environments.

## Update `server.js`

To update the proxy, find this chunk in `src/server.js`:


You'll want to change this in a few ways:

### 1. Update `target` protocol

If you changed APIHOST to include the `http://` or `https://` protocol, then get rid of the `'http://' +` in the `target` setting. Note that you'll need to restart your server after making these changes or things will break.

### 2. Decide if you need WebSockets

The `ws: true` setting is there to support WebSockets connections, which this demo app supports using [socket.io](http://socket.io/). If your API doesn't use WebSockets, then you can remove this line.

### 3. Add a `changeOrigin` setting

This might be the most important part! It's possible that your API lives at a totally different URL than your front-end app. If that's the case, then you need to add a `changeOrigin` setting. 
