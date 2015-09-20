## Synopsis

This is an ionic starter. Its goal is to help you to build with a minimum of coding a photobook application (e.g. for anniversary). This starter should let you focus on the important part - selecting right pictures and making captions for them.

## Motivation

I wanted to do for my wife an application for the anniversary of our wedding - simple app with our photos of the most important moments for us + our song playing in the background.
Recently, I have got an idea it would be cool to clean it up and release it as an ionic starter.

## Demo

You can check out live demo at:

[https://calm-ravine-4677.herokuapp.com/](https://calm-ravine-4677.herokuapp.com/)

NOTE: music playback works only on native devices.

## Installation

Starter usage:

```
ionic start [your_app_name] https://github.com/equus71/ionic-anniversary-photoapp-starter
```

Install bower dependencies:

```
bower install lodash --save
bower install animate.css --save
```

Install cordova plugin for a music playback/handling media (if you want a music playback):

```
cordova plugin add cordova-plugin-media
```

To build an app follow the standard procedure for [ionic](http://ionicframework.com/docs/guide/publishing.html).

## Usage

In the `data/appData.json` you can define most of the app.
But this is only the plan. You may overwrite anything in the app as well.

Example is shipped with the starter, see: [www/data/appData.json](https://github.com/equus71/ionic-anniversary-photoapp-starter/blob/master/data/appData.json).
Sorry it is cliche, but I did not want to share my private version, so I had to fill the example with some generic content.

The structure is following:
* `galleries` - list of galleries
  * `title` - title of the gallery
  * `subtitle` - subtitle of the gallery visible only in the side menu
  * `name` - a unique name for the gallery (for the app router, e.g. to naviagate with ui-sref)
  * `url` - an url appendix for the gallery (optional, default: "/`name`")
  * `template` - templete to be used for the gallery (optional, default: `templates/basic.html`, available alternative: `templates/basicGlass.html` )
  * `controller` - controller to be used for the gallery (optional, default: `BasicGalleryCtrl` )
  * `avatar` - path to a image used as an avatar in side menu
  * `images` - list of images in gallery
    * `path` - path to an image
    * `text` - text to be displayed with the image
* `music` - define background music (if any)
  * `enabled` - disable/enable music
  * `text` - text in side menu next to the pause/play switch
  * `path` - path to the file with the music; take into account device limitation; I had to use path starting with '/android_asset/[..]' on Android
  * `autoplay` - start music with the app start
* `startPage` - start page picture and text
  * `title` - title on the start page
  * `image` - image for the start page
  * `text` - text for the start page
  * `template` - template for the start page (optional, default: `templates/startPageGlass.html`, available alternative: `templates/startPage.html` )
  * `controller` - controller for the start page (optional, default: `StartPageCtrl` )
* `menu` - side menu settings
  * `title` - title of the menu
  * `startPageTitle` - title of the start page entry (can be different than `startPage.title`)

NOTE: check that your appData.json is a valid JSON file.

The option to change controllers/templates of any state is available so you can easily add some custom behavior, e.g. real time video streaming from the national park you have proposed, etc. (be creative, I did not manage to code more before my anniversary).

#### Colors
Only `*-calm` classes are used for few elements.
Adjust `$calm` in `ionic.app.scss` to change the leading color.

NOTE: you have to enable `ionic.app.scss`

## License

Code: MIT

All the pictures used in example come from pixabay.com and are in the public domain (many thanks to all authors).
