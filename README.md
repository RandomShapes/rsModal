Random Shapes Notification/Flash
======
**rsFlash** is a simple notification system build for AngularJS. It provides a directive that can alert a user of anything you choose. It has build in support for bootstrap [alert](http://getbootstrap.com/components/#alerts) classes, it's easy to animate and is incredibly light-weight.

Table of Contents
======
1. [Installation](#installation)
2. [Usage](#usage)
3. [Configuration](#config)

[Installation](id:installtion)
======

The easiest way to get **rsFlash** is by using bower in your terminal.

Navigate to your project directory and run this command

    bower install --save-dev rs-flash

You can also download [**rsFlash**](https://github.com/RandomShapes/rsFlash/archive/master.zip) and include the library in your project by placing this in your index

    <script src="rsFlash/dist/rs-flash.min.js"><script>

[Usage](id:usage)
======

**FIRST** add the module as a dependency.

    angular.module('myCoolApp', ['rs-flash']);

**SECOND** add the directive to your template where ever you'd like.

    <!-- add to your html -->
    <rs-flash></rs-flash>

**THIRD** You can inject and use the $rsFlash service very easily.

    //inject $rsFlash
    function MyCoolCtrl($rsFlash) {
    	//Create on the fly with default
        $rsFlash.create("Holy crap! This is awesome.");
        
        //bind to the scope, so you can trigger with something like a button.
        this.showFlashBasic = function() {
        	$rsFlash.create("This was triggered from a button!");
        }
        
        //Change the type to default Bootstrap alert styles.
        this.showFlashSuccess = function() {
        	$rsFlash.create("This was successful", $rsFlash.type.success);
        }
        
        this.showFlashInfo = function() {
        	$rsFlash.create("This is information", $rsFlash.type.info);
        }
        
        this.showFlashWarning = function() {
        	$rsFlash.create("This is a warning", $rsFlash.type.warning);
        }
        
        this.showFlashDanger = function() {
        	$rsFlash.create("You better start freaking out", $rsFlash.type.danger);
        }
        
        //Clear the flash whenever you want!
        this.clearFlash = function() {
        	$rsFlash.clear();
        }
    }
    
[Configuration](id:config)
======
######Auto-hide
$rsFlash supports hiding after a fixed amount of time, to enable change the configuration like so
   
    //Inject $rsFlashProvider into your config.
    .config(function($rsFlashProvider) {
    	//Add the timeout configuration in milliseconds. Set it to null and it will never timeout
    	$rsFlashProvider.config.timeout = 1000;
    });

######Custom Types/Classes
You can also add your types, this will be bound to the flash as a class so you may style them as you please

	//put this in your config function
    $rsFlashProvider.setTypes({
    	my-custom-type-1: "cool-flash-styles",
    	my-custom-type-2: "even-cooler-styles"
    });
    
    //you can then call them just as you would any other type
    $rsFlash.create("Cool custom type bro", $rsFlash.type.my-custom-type-1);
    
    //and you can style them as you please
    .cool-flash-styles {
    	background-color: #6bae13;
    }
    
######Animation
$rsFlash comes with built in classes that you can edit to add animation

    //Added when shown
    .rs-flash-in {
    	//custom-animation-css
    }
    
    //added when hidden
    .rs-flash-out {
    	//custom-animation-css
    }
