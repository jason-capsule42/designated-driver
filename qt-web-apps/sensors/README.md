# Qt Web Bridge Trial

The purpose of this project is to show a proof of concept that illustrates
passing data back and forth between the Qt runtime and embedded JavaScript
gui modules.

## Spec

### Application Object

The `application` object within a QWebChannel instance presents the interface 
through which the client application will interact with the Qt Application host
via the API described below. It is accessible through the `object` property
of the QWebChannel instance.

```javascript
'use strict';
var wsUri = "ws://localhost:12345";
window.loggedin = false;

window.onload = function() {
    var socket = new WebSocket(wsUri);

    socket.onclose = function() {
        console.error("web channel closed");
    };
    socket.onerror = function(error) {
        console.error("web channel error: " + error);
    };
    socket.onopen = function() {
        window.channel = new QWebChannel(socket, function(channel) {
        	// Incoming event handlers can be set up within this scope.
        	application = channel.objects.application;
        });
    }
}

// Make outgoing api calls to the host application.
application = channel.objects.application;
```

### Events

Events are incoming messages from the host application that the client can
connect to handlers. They should be registered within the function passed to
the QWebChannel constructor (see `application` object example.)

#### displayNum(number)

* The client shall display the indicated number upon receipt of this event.
* The client shall update the displayed number upon receipt of each successive 
	message.
* The initial number to be displayed shall be zero.
* The received number shall be an integer between 0 and 100 inclusive.

```javascript
channel.objects.application.displayNum.connect(function(number) {
	// Handle displaying the number	
});
```

### Signals

Signals are functions that the client application can call on the host. They can
be invoked in any scope that the QWebChannel instance is available.

#### powerOn()

* Upon receipt of the `powerOn` signal , the host shall proceed	to send 
`displayNum` events to the client.

```javascript
channel.objects.application.powerOn();
```

#### powerOff()


* Upon receipt of the `powerOff` signal, the host shall suspend	sending 
`displayNum` events to the client.

```
channel.objects.application.powerOff()
```

#### Build and Run the app

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).
