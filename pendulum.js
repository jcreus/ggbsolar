function Vector(e,t,n){this.x=e||0;this.y=t||0;this.z=n||0}Vector.prototype={negative:function(){return new Vector(-this.x,-this.y,-this.z)},add:function(e){if(e instanceof Vector)return new Vector(this.x+e.x,this.y+e.y,this.z+e.z);else return new Vector(this.x+e,this.y+e,this.z+e)},subtract:function(e){if(e instanceof Vector)return new Vector(this.x-e.x,this.y-e.y,this.z-e.z);else return new Vector(this.x-e,this.y-e,this.z-e)},multiply:function(e){if(e instanceof Vector)return new Vector(this.x*e.x,this.y*e.y,this.z*e.z);else return new Vector(this.x*e,this.y*e,this.z*e)},divide:function(e){if(e instanceof Vector)return new Vector(this.x/e.x,this.y/e.y,this.z/e.z);else return new Vector(this.x/e,this.y/e,this.z/e)},equals:function(e){return this.x==e.x&&this.y==e.y&&this.z==e.z},dot:function(e){return this.x*e.x+this.y*e.y+this.z*e.z},cross:function(e){return new Vector(this.y*e.z-this.z*e.y,this.z*e.x-this.x*e.z,this.x*e.y-this.y*e.x)},length:function(){return Math.sqrt(this.dot(this))},unit:function(){return this.divide(this.length())},min:function(){return Math.min(Math.min(this.x,this.y),this.z)},max:function(){return Math.max(Math.max(this.x,this.y),this.z)},toAngles:function(){return{theta:Math.atan2(this.z,this.x),phi:Math.asin(this.y/this.length())}},angleTo:function(e){return Math.acos(this.dot(e)/(this.length()*e.length()))},toArray:function(e){return[this.x,this.y,this.z].slice(0,e||3)},clone:function(){return new Vector(this.x,this.y,this.z)},init:function(e,t,n){this.x=e;this.y=t;this.z=n;return this}};Vector.negative=function(e,t){t.x=-e.x;t.y=-e.y;t.z=-e.z;return t};Vector.add=function(e,t,n){if(t instanceof Vector){n.x=e.x+t.x;n.y=e.y+t.y;n.z=e.z+t.z}else{n.x=e.x+t;n.y=e.y+t;n.z=e.z+t}return n};Vector.subtract=function(e,t,n){if(t instanceof Vector){n.x=e.x-t.x;n.y=e.y-t.y;n.z=e.z-t.z}else{n.x=e.x-t;n.y=e.y-t;n.z=e.z-t}return n};Vector.multiply=function(e,t,n){if(t instanceof Vector){n.x=e.x*t.x;n.y=e.y*t.y;n.z=e.z*t.z}else{n.x=e.x*t;n.y=e.y*t;n.z=e.z*t}return n};Vector.divide=function(e,t,n){if(t instanceof Vector){n.x=e.x/t.x;n.y=e.y/t.y;n.z=e.z/t.z}else{n.x=e.x/t;n.y=e.y/t;n.z=e.z/t}return n};Vector.cross=function(e,t,n){n.x=e.y*t.z-e.z*t.y;n.y=e.z*t.x-e.x*t.z;n.z=e.x*t.y-e.y*t.x;return n};Vector.unit=function(e,t){var n=e.length();t.x=e.x/n;t.y=e.y/n;t.z=e.z/n;return t};Vector.fromAngles=function(e,t){return new Vector(Math.cos(e)*Math.cos(t),Math.sin(t),Math.sin(e)*Math.cos(t))};Vector.randomDirection=function(){return Vector.fromAngles(Math.random()*Math.PI*2,Math.asin(Math.random()*2-1))};Vector.min=function(e,t){return new Vector(Math.min(e.x,t.x),Math.min(e.y,t.y),Math.min(e.z,t.z))};Vector.max=function(e,t){return new Vector(Math.max(e.x,t.x),Math.max(e.y,t.y),Math.max(e.z,t.z))};Vector.lerp=function(e,t,n){return t.subtract(e).multiply(n).add(e)};Vector.fromArray=function(e){return new Vector(e[0],e[1],e[2])};Vector.angleBetween=function(e,t){return e.angleTo(t)}
inter=-1
document.getElementById("hi").onclick = function () {
clearInterval(inter);
ggbApplet.reset();
ggbApplet.refreshViews();
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

var dt = 0.005;

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

var theta1 = -1.5*Math.PI/4;//-Math.PI/4;
var theta2 = Math.PI/2;

ggbApplet.evalCommand("O=(0,0)")
ggbApplet.evalCommand("A=(0,0)")
ggbApplet.evalCommand("B=(0,0)")
ggbApplet.evalCommand("a=Segment[O,A]")
ggbApplet.evalCommand("b=Segment[A,B]")
ggbApplet.setLabelVisible("a",false);
ggbApplet.setLabelVisible("b",false);
function update () {
	ggbApplet.evalCommand("A=("+l1*Math.sin(theta1)+","+(-l1*Math.cos(theta1))+")")
	ggbApplet.evalCommand("B=("+(l1*Math.sin(theta1)+l2*Math.sin(theta2))+","+(-l1*Math.cos(theta1)-l2*Math.cos(theta2))+")")
	ggbApplet.evalCommand("AA=A");
	ggbApplet.evalCommand("BB=B");
	ggbApplet.setTrace("AA", true);
	ggbApplet.setTrace("BB", true);
	ggbApplet.setColor("AA",0,0,0);
	ggbApplet.setColor("BB",0,0,0);
	ggbApplet.setPointSize("AA", 2);
	ggbApplet.setPointSize("BB", 2);
	ggbApplet.setPointSize("A", 4);
	ggbApplet.setPointSize("B", 4);
	ggbApplet.setLabelVisible("A",false);
	ggbApplet.setLabelVisible("AA",false);
	ggbApplet.setLabelVisible("B",false);
	ggbApplet.setLabelVisible("BB",false);
}
var m1=eval(document.getElementById("m1").value);
var m2=eval(document.getElementById("m2").value);
var l1=eval(document.getElementById("l1").value);
var l2=eval(document.getElementById("l2").value);
var theta1=eval(document.getElementById("a1").value);
var theta2=eval(document.getElementById("a2").value);

var g=9.8;
var dtheta2 = 0;
var dtheta1 = 0;
inter=setInterval(function () {
	mu      =  1+m1/m2;
	d2theta1  =  (g*(Math.sin(theta2)*Math.cos(theta1-theta2)-mu*Math.sin(theta1))-(l2*dtheta2*dtheta2+l1*dtheta1*dtheta1*Math.cos(theta1-theta2))*Math.sin(theta1-theta2))/(l1*(mu-Math.cos(theta1-theta2)*Math.cos(theta1-theta2)));
	d2theta2  =  (mu*g*(Math.sin(theta1)*Math.cos(theta1-theta2)-Math.sin(theta2))+(mu*l1*dtheta1*dtheta1+l2*dtheta2*dtheta2*Math.cos(theta1-theta2))*Math.sin(theta1-theta2))/(l2*(mu-Math.cos(theta1-theta2)*Math.cos(theta1-theta2)));
	dtheta1   += d2theta1*dt;
	dtheta2   += d2theta2*dt;
	theta1    += dtheta1*dt;		
	theta2    += dtheta2*dt;
	update();
},10);
}

