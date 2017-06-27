1. Explain why do we want sometimes to use setImmediate instead of using setTimeout?
Use setImmediate when we want to have the callback function run after the I/O callbacks have finished running.
One use case is that when we want run a CPU-bound task like recursion, we should queue the iteration using setImmediate
so that other queues like timers, I/O have a chance to run between recursive iteration.

2. Explain the difference between process.nextTick and setImmediate?
process.nextTick adds the callback function to the so-called "priority" queue whose tasks get executed right after the callstack is empty.
setImmediate adds the callback function to the "check" phase's queue whose tasks get executed after I/O callbacks finished.

3. Name 10 global modules available in Node environment.
console, fs, http, net, os, path, process, stream, child_process, net.