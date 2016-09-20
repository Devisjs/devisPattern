"use strict";
class date{
  constructor()
  {
    this.times=[];
    this.end=[];
  }
  time(label)
  {
    this.times[label]=Date.now();
  }
  timeEnd(label)
  {
    let time = this.times[label];
    if (!time) {
      throw new Error('No such label: ' + label);
    }
    var duration = Date.now() - time;
    this.end[label]=duration;
  }
  max()
  {
    //return Math.max(...this.end);
  }
  min()
  {
    //return Math.min(...this.end);
  }
  moyenne()
  {
    let sum=0;
    for(let i=0;i<this.end.length;i++)
    {
      sum+=this.end[i];
    }
    return sum/this.end.length;
  }
}
module.exports=new date();
