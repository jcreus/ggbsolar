function Vector(e,t,n){this.x=e||0;this.y=t||0;this.z=n||0}Vector.prototype={negative:function(){return new Vector(-this.x,-this.y,-this.z)},add:function(e){if(e instanceof Vector)return new Vector(this.x+e.x,this.y+e.y,this.z+e.z);else return new Vector(this.x+e,this.y+e,this.z+e)},subtract:function(e){if(e instanceof Vector)return new Vector(this.x-e.x,this.y-e.y,this.z-e.z);else return new Vector(this.x-e,this.y-e,this.z-e)},multiply:function(e){if(e instanceof Vector)return new Vector(this.x*e.x,this.y*e.y,this.z*e.z);else return new Vector(this.x*e,this.y*e,this.z*e)},divide:function(e){if(e instanceof Vector)return new Vector(this.x/e.x,this.y/e.y,this.z/e.z);else return new Vector(this.x/e,this.y/e,this.z/e)},equals:function(e){return this.x==e.x&&this.y==e.y&&this.z==e.z},dot:function(e){return this.x*e.x+this.y*e.y+this.z*e.z},cross:function(e){return new Vector(this.y*e.z-this.z*e.y,this.z*e.x-this.x*e.z,this.x*e.y-this.y*e.x)},length:function(){return Math.sqrt(this.dot(this))},unit:function(){return this.divide(this.length())},min:function(){return Math.min(Math.min(this.x,this.y),this.z)},max:function(){return Math.max(Math.max(this.x,this.y),this.z)},toAngles:function(){return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())}},angleTo:function(e){return Math.acos(this.dot(e)/(this.length()*e.length()))},toArray:function(e){return[this.x,this.y,this.z].slice(0,e||3)},clone:function(){return new Vector(this.x,this.y,this.z)},init:function(e,t,n){this.x=e;this.y=t;this.z=n;return this}};Vector.negative=function(e,t){t.x=-e.x;t.y=-e.y;t.z=-e.z;return t};Vector.add=function(e,t,n){if(t instanceof Vector){n.x=e.x+t.x;n.y=e.y+t.y;n.z=e.z+t.z}else{n.x=e.x+t;n.y=e.y+t;n.z=e.z+t}return n};Vector.subtract=function(e,t,n){if(t instanceof Vector){n.x=e.x-t.x;n.y=e.y-t.y;n.z=e.z-t.z}else{n.x=e.x-t;n.y=e.y-t;n.z=e.z-t}return n};Vector.multiply=function(e,t,n){if(t instanceof Vector){n.x=e.x*t.x;n.y=e.y*t.y;n.z=e.z*t.z}else{n.x=e.x*t;n.y=e.y*t;n.z=e.z*t}return n};Vector.divide=function(e,t,n){if(t instanceof Vector){n.x=e.x/t.x;n.y=e.y/t.y;n.z=e.z/t.z}else{n.x=e.x/t;n.y=e.y/t;n.z=e.z/t}return n};Vector.cross=function(e,t,n){n.x=e.y*t.z-e.z*t.y;n.y=e.z*t.x-e.x*t.z;n.z=e.x*t.y-e.y*t.x;return n};Vector.unit=function(e,t){var n=e.length();t.x=e.x/n;t.y=e.y/n;t.z=e.z/n;return t};Vector.fromAngles=function(e,t){return new Vector(Math.cos(e)*Math.cos(t),Math.sin(t),Math.sin(e)*Math.cos(t))};Vector.randomDirection=function(){return Vector.fromAngles(Math.random()*Math.PI*2,Math.asin(Math.random()*2-1))};Vector.min=function(e,t){return new Vector(Math.min(e.x,t.x),Math.min(e.y,t.y),Math.min(e.z,t.z))};Vector.max=function(e,t){return new Vector(Math.max(e.x,t.x),Math.max(e.y,t.y),Math.max(e.z,t.z))};Vector.lerp=function(e,t,n){return t.subtract(e).multiply(n).add(e)};Vector.fromArray=function(e){return new Vector(e[0],e[1],e[2])};Vector.angleBetween=function(e,t){return e.angleTo(t)}

document.getElementById("hi").onclick = function () {
var AU = 149597871000;
function print(v) {
	return "("+v.x/AU+","+v.y/AU+","+v.z/AU+")";
}

function Body(nom, pos, vel, mass) {
	this.nom = nom;
	this.pos = pos.multiply(1000);
	this.vel = vel.multiply(1000);
	this.mass = mass;
	//ggbApplet.evalCommand("SetTrace["+this.nom+",true]");

	this.move = function () {
		ggbApplet.evalCommand(this.nom+"="+print(this.pos));
		ggbApplet.evalCommand(this.nom+this.nom+"="+print(this.pos));
		//ggbApplet.evalCommand("a"+this.nom+"="+print(a(this.pos,this.vel,this.mass).unit()));
	}
	this.move();
	ggbApplet.setPointSize(this.nom, 2);
	ggbApplet.setPointSize(this.nom+this.nom, 1);
	ggbApplet.setColor(this.nom+this.nom,0,0,0);
	ggbApplet.setLabelVisible(this.nom,false);
	ggbApplet.setLabelVisible(this.nom+this.nom,false);
	ggbApplet.setTrace(this.nom+this.nom, true);
}

var G = 6.67E-11;

function rk4(body) {
  var x1 = body.pos;
  var v1 = body.vel;
  var a1 = a(x1, v1, body.mass);

  var x2 = x.add(v1.multiply(0.5*dt));
  var v2 = v.add(a1.multiply(0.5*dt));
  var a2 = a(x2, v2, body.mass);

  var x3 = x.add(v2.multiply(0.5*dt));
  var v3 = v.add(a2.multiply(0.5*dt));
  var a3 = a(x3, v3, body.mass);

  var x4 = x.add(v3.multiply(dt));
  var v4 = v.add(a3.multiply(dt));
  var a4 = a(x4, v4, body.mass);

  var xf = x.add(dt/6)*(v1 + 2*v2 + 2*v3 + v4);
  var vf = v.add(dt/6)*(a1 + 2*a2 + 2*a3 + a4);

  return [xf, vf];
}

var dt = 86400;

function euler(body) {
     body.vel = body.vel.add(a(body.pos,body.vel,body.mass).multiply(dt));
     body.pos = body.pos.add(body.vel.multiply(dt));
}

function acc(bodies) {
	var f = function (x,v,m) {
		var F = new Vector(0,0,0);
		for (var i=0; i<bodies.length; i++) {
			var r = bodies[i].pos.subtract(x);
			if (r.length() < 5E4) { continue; }
			var g = r.multiply(G*bodies[i].mass).multiply(1/Math.pow(r.length(),3));
			F = F.add(g);
		}
		return F;
	}
	return f;
}

var sun = new Body("S", new Vector(4.412960100445353E+05, -1.056006919786789E+05, -2.093236097217392E+04),
			new Vector(6.573363288776926E-03, 9.401663922864669E-03, -1.648805743878167E-04),
			1.989E30)

var mercury = new Body("M", new Vector(-2.442026052766887E+07, 4.091849619827504E+07, 5.612032065956395E+06),
			new Vector(-5.146591592410186E+01, -2.336536564028074E+01, 2.812296976418871E+00),
			3.301E23)

var earth = new Body("E", new Vector(-9.134782488005780E+07, 1.151424995446428E+08, -2.415242112524211E+04),
			new Vector(-2.376962619918467E+01, -1.866728576284719E+01, 1.283436655342306E-03),
			5.98E24)

var mars = new Body("A", new Vector( 2.082313367041399E+08, 2.209663381533407E+07, -4.655797836948094E+06
),
			new Vector( -1.635488517824704E+00, 2.617336693185755E+01, 5.883578119690935E-01),
			6.416E23)

var jupiter = new Body("J", new Vector( -5.799997767497101E+08, 5.463692495987649E+08, 1.069776396212671E+07),
			new Vector( -9.113150818834210E+00,-8.894739485136334E+00, 2.409389972078974E-01),
			1.898E27)


var best = new Body("B", new Vector( -6.663262270974609E+07, 2.466817235110883E+08, 1.752217483768138E+07),
			new Vector( -2.417084355596645E+01, 1.042120058412594E+01, 5.798911610049436E+00),
			1)

var bodies = [sun, mercury, earth, best, mars, jupiter];

var a = acc(bodies);

setInterval(function () {
	for (var j=0; j<bodies.length; j++) {
		euler(bodies[j]);
		bodies[j].move();
	}
},10);
}

