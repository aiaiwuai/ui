# encode=utf-8
import sys
import json
sys.path.append("../../../med/tup/PkgL2svrHandler")
import  headHuicobus
# print(dir(headHuicobus))
tjson={
    "cmdidlist":{}
}
for name in dir(headHuicobus): # iterate through every module's attributes
    # print(name)
    vtype=type(getattr(headHuicobus,name))
    value=getattr(headHuicobus,name)
    if vtype==int:
        tjson['cmdidlist'][name]=value
        pass
    elif vtype==dict:
        if name[0]!="_":
            tjson[name]=value
        pass
with open("headerHuicobus.json","w") as f:
    json.dump(tjson,f)
# import os
# cpath=os.getcwd()