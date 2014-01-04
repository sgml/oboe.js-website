
var Demo = extend(Thing, function Demo(name, options){
    Thing.apply(this, arguments);

    this.height = options.height;    
    this.width = options.width;    
    this.script = pubSub();
    this.colors = options.colors;
    this.paused = false;
    this.inProgress = false;
    
    if( options.endSimulationEvent ) {
       this.script( options.endSimulationEvent ).on(
          function(){
              this.schedule(this.reset.bind(this), 2500);
          }.bind(this)
       );
    }
    
    this.demo = this;  // we are our own demo
});

Demo.newEvent = 'Demo';

Demo.prototype.start = function(){
    if( !this.inProgress ) {
        this.startSimulation();
        this.inProgress = true;
        this.events('started').emit();
    }
};
Demo.prototype.reset = function(){
    if( this.inProgress ) {
        this.events('reset').emit();
        this.inProgress = false;
        this.paused = false;
    }
};

Demo.prototype.pause = function(){
    this.paused = true;
    this.events('paused').emit();
};
Demo.prototype.unpause = function(){
    this.paused = false;
    this.events('unpaused').emit();
};


