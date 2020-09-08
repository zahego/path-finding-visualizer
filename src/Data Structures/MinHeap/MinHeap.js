import React from 'react';
eexport default class MinHeap{
    constructor(props){
        super(props);
        this.state={
            heap:[]
        }
    }
    insert=(node)=>{
            //push num in the end of the heap then perform rearrange
            heap.push(node);

            //if length==0, don't need to rearrange
            if(this.state.heap.length>1){
            let currentPosition=this.state.heap.length-1;
            while(currentPosition>1 && this.state.heap[Math.floor(currentPosition/2)]>this.state.heap[currentPosition]){
                /*temp=this.state.heap[currentPosition];
                this.state.heap[currentPosition]=this.state.heap[Math.floor(currentPosition/2)];
                this.state.heap[Math.floor(currentPosition/2)]= temp;*/
                [ this.state.heap[currentPosition], this.state.heap[Math.floor(currentPosition/2)]]=
                [ this.state.heap[Math.floor(currentPosition/2)], this.state.heap[currentPosition]];
                currentPosition=Math.floor(currentPosition/2);
            }
        }
    }
}