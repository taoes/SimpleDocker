<template>
  <div class="resetPassword">
    <a-form-model :form="updatePasswordForm">
      <a-input class="input" placeholder="请输入原密码" type="password"
               v-model="updatePasswordForm.oldPassword"/>
      <br>
      <a-input class="input" placeholder="请输入新密码" type="password"
               v-model="updatePasswordForm.newPassword"/>
      <br>
      <a-input class="input" placeholder="请再次输入新密码" type="password"
               v-model="updatePasswordForm.confirmPassword"/>
    </a-form-model>

  </div>
</template>

<script>
  export default {
    name: 'ResetPassword',
    props: {
      msg: String
    },
    data() {
      return {
        updatePasswordForm: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: ''
        }
      }
    }, methods: {

    }
  }
</script>


<style scoped>



</style>


=====================================
2021-08-27 17:11:24 0x2ae060527700 INNODB MONITOR OUTPUT
=====================================
Per second averages calculated from the last 61 seconds
-----------------
BACKGROUND THREAD
-----------------
srv_master_thread loops: 15915505 srv_active, 0 srv_shutdown, 389 srv_idle
srv_master_thread log flush and writes: 15915421
----------
SEMAPHORES
----------
OS WAIT ARRAY INFO: reservation count 260656
OS WAIT ARRAY INFO: reservation count 0
OS WAIT ARRAY INFO: reservation count 238248
OS WAIT ARRAY INFO: reservation count 0
OS WAIT ARRAY INFO: reservation count 260114
OS WAIT ARRAY INFO: reservation count 0
OS WAIT ARRAY INFO: reservation count 239112
OS WAIT ARRAY INFO: reservation count 0
OS WAIT ARRAY INFO: reservation count 260342
OS WAIT ARRAY INFO: reservation count 0
OS WAIT ARRAY INFO: reservation count 239430
OS WAIT ARRAY INFO: reservation count 0
OS WAIT ARRAY INFO: reservation count 260487
OS WAIT ARRAY INFO: reservation count 0
OS WAIT ARRAY INFO: reservation count 238999
OS WAIT ARRAY INFO: reservation count 0
OS WAIT ARRAY INFO: signal count 41147035
RW-shared spins 0, rounds 132156488, OS waits 724350
RW-excl spins 0, rounds 277835765, OS waits 697279
RW-sx spins 49165992, rounds 238337216, OS waits 471603
Spin rounds per wait: 132156488.00 RW-shared, 277835765.00 RW-excl, 4.85 RW-sx
------------
TRANSACTIONS
------------
Trx id counter 274204987
Purge done for trx's n:o < 274204987 undo n:o < 0 state: running but idle
History list length 19
LIST OF TRANSACTIONS FOR EACH SESSION:
---TRANSACTION 328567133760720, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133757072, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133757984, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133738832, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133759808, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133758896, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133740656, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133739744, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133756160, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133755248, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133754336, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133753424, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133752512, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133751600, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133750688, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133749776, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133748864, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133747952, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133747040, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133746128, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133745216, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133744304, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133743392, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133742480, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
---TRANSACTION 328567133741568, not started
0 lock struct(s), heap size 1136, 0 row lock(s)
--------
FILE I/O
--------
I/O thread 0 state: waiting for completed aio requests (insert buffer thread)
I/O thread 1 state: waiting for completed aio requests (log thread)
I/O thread 2 state: waiting for completed aio requests (read thread)
I/O thread 3 state: waiting for completed aio requests (read thread)
I/O thread 4 state: waiting for completed aio requests (read thread)
I/O thread 5 state: waiting for completed aio requests (read thread)
I/O thread 6 state: waiting for completed aio requests (read thread)
I/O thread 7 state: waiting for completed aio requests (read thread)
I/O thread 8 state: waiting for completed aio requests (read thread)
I/O thread 9 state: waiting for completed aio requests (read thread)
I/O thread 10 state: waiting for completed aio requests (read thread)
I/O thread 11 state: waiting for completed aio requests (read thread)
I/O thread 12 state: waiting for completed aio requests (read thread)
I/O thread 13 state: waiting for completed aio requests (read thread)
I/O thread 14 state: waiting for completed aio requests (read thread)
I/O thread 15 state: waiting for completed aio requests (read thread)
I/O thread 16 state: waiting for completed aio requests (read thread)
I/O thread 17 state: waiting for completed aio requests (read thread)
I/O thread 18 state: waiting for completed aio requests (write thread)
I/O thread 19 state: waiting for completed aio requests (write thread)
I/O thread 20 state: waiting for completed aio requests (write thread)
I/O thread 21 state: waiting for completed aio requests (write thread)
I/O thread 22 state: waiting for completed aio requests (write thread)
I/O thread 23 state: waiting for completed aio requests (write thread)
I/O thread 24 state: waiting for completed aio requests (write thread)
I/O thread 25 state: waiting for completed aio requests (write thread)
I/O thread 26 state: waiting for completed aio requests (write thread)
I/O thread 27 state: waiting for completed aio requests (write thread)
I/O thread 28 state: waiting for completed aio requests (write thread)
I/O thread 29 state: waiting for completed aio requests (write thread)
I/O thread 30 state: waiting for completed aio requests (write thread)
I/O thread 31 state: waiting for completed aio requests (write thread)
I/O thread 32 state: waiting for completed aio requests (write thread)
I/O thread 33 state: waiting for completed aio requests (write thread)
Pending normal aio reads: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] , aio writes: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] ,
 ibuf aio reads:, log i/o's:, sync i/o's:
Pending flushes (fsync) log: 0; buffer pool: 0
315 OS file reads, 152372607 OS file writes, 16975181 OS fsyncs
0.00 reads/s, 0 avg bytes/read, 11.26 writes/s, 1.00 fsyncs/s
-------------------------------------
INSERT BUFFER AND ADAPTIVE HASH INDEX
-------------------------------------
Ibuf: size 1, free list len 0, seg size 2, 11 merges
merged operations:
 insert 0, delete mark 0, delete 0
discarded operations:
 insert 0, delete mark 0, delete 0
Hash table size 11952371, node heap has 0 buffer(s)
Hash table size 11952371, node heap has 0 buffer(s)
Hash table size 11952371, node heap has 0 buffer(s)
Hash table size 11952371, node heap has 0 buffer(s)
Hash table size 11952371, node heap has 0 buffer(s)
Hash table size 11952371, node heap has 0 buffer(s)
Hash table size 11952371, node heap has 0 buffer(s)
Hash table size 11952371, node heap has 0 buffer(s)
0.00 hash searches/s, 19.02 non-hash searches/s
---
LOG
---
Log sequence number 134645297854
Log flushed up to   134645295797
Pages flushed up to 133117394318
Last checkpoint at  133117394318
0 pending log flushes, 0 pending chkp writes
148379587 log i/o's done, 11.26 log i/o's/second
----------------------
BUFFER POOL AND MEMORY
----------------------
Total large memory allocated 49474437120
Dictionary memory allocated 173209
Buffer pool size   2948940
Free buffers       2373867
Database pages     575073
Old database pages 212200
Modified db pages  2883
Pending reads      0
Pending writes: LRU 0, flush list 0, single page 0
Pages made young 1127310, not young 130
0.00 youngs/s, 0.00 non-youngs/s
Pages read 282, created 574935, written 3464463
0.00 reads/s, 0.00 creates/s, 0.00 writes/s
Buffer pool hit rate 1000 / 1000, young-making rate 0 / 1000 not 0 / 1000
Pages read ahead 0.00/s, evicted without access 0.00/s, Random read ahead 0.00/s
LRU len: 575073, unzip_LRU len: 0
I/O sum[0]:cur[0], unzip sum[0]:cur[0]
----------------------
INDIVIDUAL BUFFER POOL INFO
----------------------
---BUFFER POOL 0
Buffer pool size   737190
Free buffers       592741
Database pages     144449
Old database pages 53301
Modified db pages  1522
Pending reads      0
Pending writes: LRU 0, flush list 0, single page 0
Pages made young 285023, not young 37
0.00 youngs/s, 0.00 non-youngs/s
Pages read 138, created 144379, written 866350
0.00 reads/s, 0.00 creates/s, 0.00 writes/s
Buffer pool hit rate 1000 / 1000, young-making rate 0 / 1000 not 0 / 1000
Pages read ahead 0.00/s, evicted without access 0.00/s, Random read ahead 0.00/s
LRU len: 144449, unzip_LRU len: 0
I/O sum[0]:cur[0], unzip sum[0]:cur[0]
---BUFFER POOL 1
Buffer pool size   737280
Free buffers       595078
Database pages     142202
Old database pages 52472
Modified db pages  676
Pending reads      0
Pending writes: LRU 0, flush list 0, single page 0
Pages made young 276457, not young 30
0.00 youngs/s, 0.00 non-youngs/s
Pages read 33, created 142237, written 865002
0.00 reads/s, 0.00 creates/s, 0.00 writes/s
Buffer pool hit rate 1000 / 1000, young-making rate 0 / 1000 not 0 / 1000
Pages read ahead 0.00/s, evicted without access 0.00/s, Random read ahead 0.00/s
LRU len: 142202, unzip_LRU len: 0
I/O sum[0]:cur[0], unzip sum[0]:cur[0]
---BUFFER POOL 2
Buffer pool size   737190
Free buffers       593045
Database pages     144145
Old database pages 53189
Modified db pages  334
Pending reads      0
Pending writes: LRU 0, flush list 0, single page 0
Pages made young 283257, not young 20
0.00 youngs/s, 0.00 non-youngs/s
Pages read 18, created 144131, written 866736
0.00 reads/s, 0.00 creates/s, 0.00 writes/s
Buffer pool hit rate 1000 / 1000, young-making rate 0 / 1000 not 0 / 1000
Pages read ahead 0.00/s, evicted without access 0.00/s, Random read ahead 0.00/s
LRU len: 144145, unzip_LRU len: 0
I/O sum[0]:cur[0], unzip sum[0]:cur[0]
---BUFFER POOL 3
Buffer pool size   737280
Free buffers       593003
Database pages     144277
Old database pages 53238
Modified db pages  351
Pending reads      0
Pending writes: LRU 0, flush list 0, single page 0
Pages made young 282573, not young 43
0.00 youngs/s, 0.00 non-youngs/s
Pages read 93, created 144188, written 866375
0.00 reads/s, 0.00 creates/s, 0.00 writes/s
Buffer pool hit rate 1000 / 1000, young-making rate 0 / 1000 not 0 / 1000
Pages read ahead 0.00/s, evicted without access 0.00/s, Random read ahead 0.00/s
LRU len: 144277, unzip_LRU len: 0
I/O sum[0]:cur[0], unzip sum[0]:cur[0]
--------------
ROW OPERATIONS
--------------
0 queries inside InnoDB, 0 queries in queue
0 read views open inside InnoDB
Process ID=11035, Main thread ID=47142928361216, state: sleeping
Number of rows inserted 535393117, updated 167170574, deleted 92610306, read 26372925357
20.84 inserts/s, 13.43 updates/s, 0.00 deletes/s, 644.66 reads/s
----------------------------
END OF INNODB MONITOR OUTPUT
============================

