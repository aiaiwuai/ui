
def fun(obj):
    setattr(obj,"age",10)


class people:
    age = 18
    def __init__(self):
        fun(self)
        print(self.age)

c = people()
print(c.age)


