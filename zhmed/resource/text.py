def fun(obj):
    setattr(obj, "age", 10)


class people:
    age = 18

    def __init__(self):
        fun(self)
        print(self.age)


c = people()
print(c.age)


import time
print(time.time())
print(time.localtime())
print(time.localtime(time.time()))
print(time.asctime( time.localtime(time.time())))
print(time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()))
print(time.strftime("%a %b %d %H:%M:%S %Y", time.localtime()))
print(time.mktime(time.localtime()))